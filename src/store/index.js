import { createStore } from "vuex";

export default createStore({
  state: {
    posts: [
      {
        id: 0,
        authorImage: "img/pfp1.jpg",
        date: "Oct 3, 2025",
        image: "img/food.jpg",
        text: "Jippie food hihi!",
        likes: 0,
      },
      {
        id: 1,
        authorImage: "img/pfp1.jpg",
        date: "Oct 3, 2025",
        image: null,
        text: "What are bananas made of?",
        likes: 0,
      },
      {
        id: 2,
        authorImage: "img/pfp1.jpg",
        date: "Oct 3, 2025",
        image: null,
        text: "Einstein has a funny nose. What do you guys think about that?",
        likes: 0,
      },
      {
        id: 3,
        authorImage: "img/pfp1.jpg",
        date: "Oct 3, 2025",
        image: "img/city.jpg",
        text: "Look at the picture I made :O",
        likes: 0,
      },
      {
        id: 4,
        authorImage: "img/pfp1.jpg",
        date: "Oct 3, 2025",
        image: null,
        text: "So tired today. Gonna sleep.",
        likes: 0,
      },
      {
        id: 5,
        authorImage: "img/pfp1.jpg",
        date: "Oct 3, 2025",
        image: null,
        text: "Eat to much",
        likes: 0,
      },
      {
        id: 6,
        authorImage: "img/pfp1.jpg",
        date: "Oct 3, 2025",
        image: null,
        text: "Run my first 10k",
        likes: 0,
      },
      {
        id: 7,
        authorImage: "img/pfp1.jpg",
        date: "Oct 3, 2025",
        image: null,
        text: "I want to go home from work",
        likes: 0,
      },
      {
        id: 8,
        authorImage: "img/pfp1.jpg",
        date: "Oct 3, 2025",
        image: null,
        text: "Nice food",
        likes: 0,
      },
      {
        id: 9,
        authorImage: "img/pfp1.jpg",
        date: "Oct 3, 2025",
        image: null,
        text: "So tired today.",
        likes: 0,
      },
    ],
  },
  getters: {},
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
  },
  actions: {
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
