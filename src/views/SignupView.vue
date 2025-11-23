<template>
  <app-header />

  <main>
    <div id="login-container">
      <section class="login-box">
        <div class="title">Welcome to PostIt</div>

        <div class="create-account">
          <a href="#">Create an account</a>
        </div>

        <p class="or">or</p>
        <p class="login-text">Please log in</p>

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

          <button type="submit">Sign up</button>
        </form>

        <div class="forget-password">
          <a href="#">Forget password</a>
        </div>
      </section>
    </div>
  </main>

  <app-footer />
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

    submitForm() {
      if (!this.validatePassword()) return;

      // Password validated → continue (redirect, API call, etc.)
      this.$router.push("/");
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
