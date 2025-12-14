<template>
  <div class="responsive-layout">
    <aside class="left-aside">
      <p>This is the left aside.</p>
    </aside>

    <!-- Use PostComponent for each post and pass id as prop and key -->
    <main>
      <!-- eslint-disable-next-line -->
      <PostComponent
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :authorImage="post.authorImage"
        :date="post.date"
        :image="post.image"
        :title="post.title"
        :text="post.content"
        :likes="post.likes"
      />
      <!-- Add Post -->
      <div class="reset-container">
        <button
          v-if="isLoggedIn"
          class="reset-button"
          @click="$router.push('/add')"
        >
          Add Post
        </button>
        <button
          v-if="isLoggedIn"
          class="reset-button"
          @click.prevent="onDeleteAll"
        >
          DELETE ALL
        </button>
        <!--<button class="reset-button" @click="$store.dispatch('resetLikes')">
          Reset Likes
        </button>-->
      </div>
    </main>

    <aside class="right-aside">
      <p>This is the right aside.</p>
    </aside>
  </div>
</template>
<script>
import { mapState } from "vuex";
import PostComponent from "@/components/PostComponent.vue";
export default {
  mounted() {
    this.$store.dispatch("getPosts");
  },
  data() {
    null;
  },
  methods: {
    async onDeleteAll() {
      for (let i = 0; i < this.posts.length; i++) {
        await fetch("http://localhost:3000/posts/" + this.posts[i].id, {
          method: "DELETE",
          credentials: "include",
        });
      }

      this.$store.commit("setPosts");
    },
  },
  computed: {
    ...mapState({
      posts: (state) => state.posts,
    }),
    isLoggedIn() {
      // This should be replaced with a proper authentication check, e.g., from Vuex or a global state.
      // For now, always return true if the backend session is valid.
      // You may want to refactor this to use a global auth state.
      return true;
    },
  },
  components: {
    PostComponent,
  },
  // Removed watcher for localStorage token, as authentication is now cookie-based.
};
</script>
<style>
.responsive-layout {
  display: flex;
  gap: 1rem;
}

main {
  flex: 2;
}
@media (max-width: 768px) {
  .responsive-layout {
    flex-direction: column;
  }
  .left-aside {
    order: 1;
  }
  main {
    order: 2;
  }
  .right-aside {
    order: 3;
  }
}

@media (min-width: 769px) {
  aside {
    max-width: 200px;
  }
}

.left-aside,
.right-aside {
  border-radius: 1rem;
  padding: 1rem;
  margin-top: 1rem;
  color: #442323;
  flex: 1;
}

.left-aside {
  background: linear-gradient(135deg, #f5d0e2, #ff7ebe, #7a1036);
}

.right-aside {
  background: linear-gradient(225deg, #f5d0e2, #ff7ebe, #7a1036);
}

.reset-container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.reset-button {
  background: #bfe8ff;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
  color: #04263a;
  font-weight: 600;
}

.reset-button:hover {
  background: #aee0ff;
}
</style>
