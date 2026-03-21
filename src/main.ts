import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import { routes, scrollBehavior } from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// Import only the specific icons we need instead of entire libraries
import {
  faSun,
  faMoon,
  faCode,
  faTerminal,
  faCaretRight,
  faHome,
  faUser,
  faStar,
  faEnvelope,
  faCircleExclamation,
  faBars,
  faClose,
  faArrowRight,
  faArrowLeft,
  faArrowUp,
  faArrowDown,
  faFileAlt,
  faFilePdf,
  faFileWord,
  faListCheck,
  faBook,
  faHeart,
  faSlidersH,
  faBug,
  faBriefcase,
  faDownload,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import "./styles/tailwind.css";

// Add only the specific icons we need
library.add(
  faSun,
  faMoon,
  faCode,
  faTerminal,
  faCaretRight,
  faHome,
  faUser,
  faStar,
  faEnvelope,
  faCircleExclamation,
  faBars,
  faClose,
  faArrowRight,
  faArrowLeft,
  faArrowUp,
  faArrowDown,
  faFileAlt,
  faFilePdf,
  faFileWord,
  faListCheck,
  faBook,
  faHeart,
  faSlidersH,
  faBug,
  faBriefcase,
  faDownload,
  faEye,
  faGithub,
  faLinkedin
);

export const createApp = ViteSSG(App, { routes, scrollBehavior }, ({ app }) => {
  app.component("FontAwesomeIcon", FontAwesomeIcon);
});
