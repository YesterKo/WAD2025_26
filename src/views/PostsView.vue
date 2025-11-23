<template>
  <div class="responsive-layout">
    <aside class="left-aside">
      <p>This is the left aside.</p>
    </aside>

    <!-- TODO: add logic to use post component and populate it -->
    <main>
      <!-- eslint-disable-next-line -->
      <PostComponent
        v-for="post in posts"
        :authorImage="post.authorImage"
        :date="post.date"
        :image="post.image"
        :text="post.text"
        :likes="post.likes"
      />
    </main>

    <aside class="right-aside">
      <p>This is the right aside.</p>
    </aside>
  </div>
</template>
<script>
import PostComponent from "@/components/PostComponent.vue";
export default {
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
  components: {
    PostComponent,
  },
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
</style>
