<component>
<div class="responsive-layout">
  <aside class="left-aside">
    <p>This is the left aside.</p>
  </aside>

<!-- TODO: add logic to use post component and populate it -->
  <main>
      <PostComponent v-for="post in posts">
  </main>

  <aside class="right-aside">
    <p>This is the right aside.</p>
  </aside>
</div>
</component>
<script>
export default {
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
};
</script>
