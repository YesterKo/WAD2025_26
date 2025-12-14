import { createRouter, createWebHashHistory } from "vue-router";
import PostsView from "../views/PostsView.vue";
import SignupView from "../views/SignupView.vue";
import auth from "../auth.js";

const routes = [
  {
    path: "/",
    name: "posts",
    component: PostsView,
    beforeEnter: auth.requireAuth,
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
    beforeEnter: auth.requireAuth,
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
