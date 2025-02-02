import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Main",
      component: () => import("./view/Main.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("./view/Login.vue"),
    },
    {
      path: "/person",
      name: "Person",
      component: () => import("./view/Person.vue"),
    },
  ],
});

export default router;
