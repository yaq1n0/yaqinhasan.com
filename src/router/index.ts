import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../pages/HomePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../pages/AboutPage.vue"),
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import("../pages/ProjectsPage.vue"),
  },
  {
    path: "/interests",
    name: "interests",
    component: () => import("../pages/InterestsPage.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../pages/ContactPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
