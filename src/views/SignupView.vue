<template>
  <div id="login-container">
    <section class="login-box">
      <div class="title">Welcome to PostIt</div>

      <div class="create-account">
        <a
          href="#"
          @click.prevent="
            () =>
              isLogin
                ? $router.push({ name: 'signup' })
                : $router.push({ name: 'login' })
          "
          >{{ isLogin ? "Create an account" : "Log in" }}</a
        >
      </div>

      <p class="or">or</p>
      <p class="login-text">Please {{ isLogin ? "log in" : "sign up" }}</p>

      <form @submit.prevent="submitForm">
        <input type="email" v-model="email" placeholder="Email" required />
        <br />

        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
        <br />

        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

        <button type="submit">{{ isLogin ? "Log in" : "Sign up" }}</button>
      </form>

      <div v-if="isLogin" class="forget-password">
        <a href="#">Forgot password?</a>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      errorMsg: "",
    };
  },
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  methods: {
    validatePassword() {
      const password = this.password;
      let errors = [];

      if (password.length < 8 || password.length >= 15) {
        errors.push(
          "Length must be at least 8 characters and less than 15 characters"
        );
      }

      if (!/^[A-Z]/.test(password)) {
        errors.push("Should start with an uppercase alphabet character");
      }

      if (!/[A-Z]/.test(password)) {
        errors.push("Includes at least one uppercase alphabet character");
      }

      if ((password.match(/[a-z]/g) || []).length < 2) {
        errors.push("Includes at least two lowercase alphabet characters");
      }

      if (!/[0-9]/.test(password)) {
        errors.push("Includes at least one numeric value");
      }

      if (!/_/.test(password)) {
        errors.push('Should include the character "_"');
      }

      if (errors.length > 0) {
        this.errorMsg = "The password is not valid - " + errors.join(", ");
        return false;
      }

      this.errorMsg = "";
      return true;
    },

    async submitForm() {
      if (!this.validatePassword()) return;

      if (this.isLogin) {
        try {
          const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: this.email,
              password: this.password,
            }),
          });

          const { token } = await res.json();

          if (token != null) {
            localStorage.setItem("token", token);
            this.$router.push("/");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: this.email,
              password: this.password,
            }),
          });

          this.$router.push({ name: "login" });
        } catch (error) {
          console.error(error);
        }
      }

      // Password validated → continue (redirect, API call, etc.)
      //this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* @import "../assets/style.css"; */
@import "../assets/loginstyle.css";

.error {
  color: red;
  font-size: 14px;
}
</style>
