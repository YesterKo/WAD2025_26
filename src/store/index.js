import { createStore } from "vuex";

export default createStore({
  state: {
    posts: [],
  },
  getters: {
    posts(state) {
      return state.posts;
    },
  },
  mutations: {
    // Increment likes for a post by id (payload is the post id)
    addLike(state, postId) {
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        // increment the likes count
        post.likes += 1;
      }
    },
    // Reset all posts' likes to 0
    resetLikes(state) {
      state.posts.forEach((p) => {
        p.likes = 0;
      });
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    async getPosts({ commit }) {
      const response = await fetch("http://localhost:3000/posts", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const posts = await response.json();

      console.log("posts", posts);
      commit("setPosts", posts);
    },
    // Action receives the post id and commits the mutation
    addLike({ commit }, postId) {
      commit("addLike", postId);
    },
    // Action to reset likes for all posts
    resetLikes({ commit }) {
      commit("resetLikes");
    },
  },
  modules: {},
});
