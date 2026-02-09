import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

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
  faInfoCircle,
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

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

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
  faInfoCircle,
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

const app = createApp(App);

app.component("FontAwesomeIcon", FontAwesomeIcon);
app.use(router);

// Handle initial route for SSG pages
const initialRoute = window.__INITIAL_ROUTE__;
// async function to handle initial route, is blocking though!
(async () => {
  if (initialRoute && initialRoute !== "/") {
    // Wait for router to be ready before setting the route
    await router.isReady();
    router.push(initialRoute);
  }
  app.mount("#app");
})();
