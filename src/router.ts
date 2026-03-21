import type { RouteRecordRaw } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ExperiencePage from "@/pages/ExperiencePage.vue";
import ProjectsPage from "@/pages/ProjectsPage.vue";
import CVPage from "@/pages/CVPage.vue";
import DebugPage from "@/pages/dev/DebugPage.vue";
import DebugCarouselPage from "@/pages/dev/DebugCarouselPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage
  },
  {
    path: "/experience",
    name: "experience",
    component: ExperiencePage
  },
  {
    path: "/projects",
    name: "projects",
    component: ProjectsPage
  },
  {
    path: "/cv",
    name: "cv",
    component: CVPage
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
    component: NotFoundPage
  }
];

export const scrollBehavior = (to: unknown, from: unknown, savedPosition: unknown) => {
  return savedPosition || { top: 0 };
};
