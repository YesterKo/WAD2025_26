<template>
  <article class="post" @click="onClick">
    <header>
      <img :src="authorImage" width="50" alt="The Author's profile picture" />
      <p>{{ date }}</p>
    </header>
    <img :src="image" />
    <p>{{ title }}</p>
    <p>{{ text }}</p>
    <!--<button @click="increaseLikes" class="like-button" aria-label="Like post">
      <i class="fa-regular fa-thumbs-up"></i>
      <span class="likes-count">{{ likes }}</span>
    </button>-->
  </article>
</template>

<script>
export default {
  props: ["id", "authorImage", "date", "image", "text", "likes", "title"],
  methods: {
    increaseLikes() {
      if (this.id != null) {
        this.$store.dispatch("addLike", this.id);
      }
    },
    onClick() {
      this.$router.push({ name: "editpost", params: { id: this.id } });
    },
  },
};
</script>

<style>
.post {
  cursor: pointer;
  background-color: #f3c1d9;
  border-radius: 1rem;
  padding: 1rem;
  max-width: 90ch;
  margin: 2rem auto;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      border-radius: 50%;
    }
  }

  > img {
    max-width: 100%;
    border-radius: 1rem;
    margin-top: 1rem;
  }
}

.like-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.likes-count {
  font-weight: 600;
}
</style>
