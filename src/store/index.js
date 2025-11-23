import { createStore } from "vuex";

export default createStore({
  state: {
    posts: [
      {
        authorImage: "@/assets/pfp1.jpg",
        date: "Oct 3, 2025",
        image: "@/assets/food.jpg",
        text: "Jippie food hihi!",
        likes: 0,
      },
      {
        authorImage: "@/assets/pfp1.jpg",
        date: "Oct 3, 2025",
        image: null,
        text: "What are bananas made of?",
        likes: 0,
      },
      {
        authorImage: "@/assets/pfp1.jpg",
        date: "Oct 3, 2025",
        image: null,
        text: "Einstein has a funny nose. What do you guys think about that?",
        likes: 0,
      },
      {
        authorImage: "@/assets/pfp1.jpg",
        date: "Oct 3, 2025",
        image: "@/assets/city.jpg",
        text: "Look at the picture I made :O",
        likes: 0,
      },
      {
        authorImage: "@/assets/pfp1.jpg",
        date: "Oct 3, 2025",
        image: null,
        text: "So tired today. Gonna sleep.",
        likes: 0,
      },
      {
        authorImage: "@/assets/pfp1.jpg",
        date: "Oct 3, 2025",
        image: null,
        text: "Eat to much",
        likes: 0,
      },
      {
        authorImage: "@/assets/pfp1.jpg",
        date: "Oct 3, 2025",
        image: null,
        text: "Run my first 10k",
        likes: 0,
      },
      {
        authorImage: "@/assets/pfp1.jpg",
        date: "Oct 3, 2025",
        image: null,
        text: "I want to go home from work",
        likes: 0,
      },
      {
        authorImage: "@/assets/pfp1.jpg",
        date: "Oct 3, 2025",
        image: null,
        text: "Nice food",
        likes: 0,
      },
      {
        authorImage: "@/assets/pfp1.jpg",
        date: "Oct 3, 2025",
        image: null,
        text: "So tired today.",
        likes: 0,
      },
    ],
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
