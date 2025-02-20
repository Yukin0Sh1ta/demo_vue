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
      path: "/person",
      name: "Person",
      component: () => import("./view/Person.vue"),
    },
    {
      path: "/head",
      name: "Head",
      component: () => import("./components/Head.vue"),
    },
    {
      path: "/body",
      name: "Body",
      component: () => import("./components/Body.vue"),
    },
  ],
});

export default router;
