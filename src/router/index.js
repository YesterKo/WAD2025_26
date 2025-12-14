import { createRouter, createWebHashHistory } from "vue-router";
import PostsView from "../views/PostsView.vue";
import SignupView from "../views/SignupView.vue";

const routes = [
  {
    path: "/",
    name: "posts",
    component: PostsView,
    meta: { requiresAuth: true }, //protects home
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/login",
    name: "login",
    component: SignupView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/add",
    name: "addpost",
    component: () => import("../views/AddPostView.vue"),
  },
  {
    path: "/post/:id",
    name: "editpost",
    component: () => import("../views/AddPostView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
