<template>
  <div class="page">
    <h1>Add Post</h1>

    <form @submit.prevent="submitPost">
      <input v-model="title" required placeholder="Title" />
      <textarea
        v-model="body"
        placeholder="Write your post…"
        rows="6"
        required
      ></textarea>

      <div class="actions">
        <button type="submit" :disabled="loading || !body">
          {{ this.$route.name === "editpost" ? "Edit" : "Add" }}
        </button>
        <button
          v-if="this.$route.name === 'editpost'"
          @click.prevent="onDelete"
        >
          Delete
        </button>
        <button type="button" @click.prevent="cancel" :disabled="loading">
          Cancel
        </button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddPostView",

  data() {
    return {
      body: "",
      title: "",
      loading: false,
      error: "",
    };
  },

  beforeMount() {
    const token = localStorage.getItem("token");

    if (token == null && !token?.length) {
      this.$router.push("/");
    }

    if (this.$route.name === "editpost") {
      this.getPost();
    }
  },

  methods: {
    async onDelete() {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:3000/posts/" + this.$route.params.id, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      this.$router.push("/");
    },
    async getPost() {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(
          "http://localhost:3000/posts/" + this.$route.params.id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        const { title, content } = await res.json();
        this.body = content;
        this.title = title;
      } catch (error) {
        console.error(error);
      }
    },
    async submitPost() {
      this.loading = true;
      this.error = "";

      const isEdit = this.$route.name === "editpost";
      const url = isEdit
        ? "http://localhost:3000/posts/" + this.$route.params.id
        : "http://localhost:3000/posts";

      try {
        const token = localStorage.getItem("token");

        const res = await fetch(url, {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({
            title: this.title,
            content: this.body,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Request failed: ${res.status}`);
        }

        this.$router.push("/");
      } catch (err) {
        this.error = err.message || "Failed to add post.";
      } finally {
        this.loading = false;
      }
    },

    cancel() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
textarea {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
