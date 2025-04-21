import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import AboutPage from "@/pages/AboutPage.vue";
import ProjectsPage from "@/pages/ProjectsPage.vue";
import InterestsPage from "@/pages/InterestsPage.vue";
import ContactPage from "@/pages/ContactPage.vue";
import DebugPage from "@/pages/dev/DebugPage.vue";
import DebugCarouselPage from "@/pages/dev/DebugCarouselPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
  {
    path: "/projects",
    name: "projects",
    component: ProjectsPage,
  },
  {
    path: "/interests",
    name: "interests",
    component: InterestsPage,
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactPage,
  },
  {
    path: "/debug",
    name: "debug",
    component: DebugPage
  },
  {
    path: "/debug-carousel",
    name: "debug-carousel",
    component: DebugCarouselPage
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundPage,
  },
];

// Using HTML5 history mode for cleaner URLs
const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
