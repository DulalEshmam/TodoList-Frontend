import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/List",
      name: "ToDo",
      component: () => import("../views/ToDoView.vue"),
    },

    {
      path: "/test",
      name: "test",
      component: () => import("../views/HomeViewTest.vue"),
    },
  ],
});

export default router;
