import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "@/pages/HomePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/pages/AboutPage.vue"),
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import("@/pages/ProjectsPage.vue"),
  },
  {
    path: "/interests",
    name: "interests",
    component: () => import("@/pages/InterestsPage.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/pages/ContactPage.vue"),
  },
  {
    path: "/technical",
    name: "technical",
    component: () => import("@/pages/dev/TechnicalPage.vue"),
  },
  {
    path: "/debug",
    name: "debug",
    component: () => import("@/pages/dev/DebugPage.vue"),
    meta: {
      hideInNav: true // Ensure it doesn't show up in navigation
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/pages/NotFoundPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
