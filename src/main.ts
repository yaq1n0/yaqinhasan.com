import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

/* Import Font Awesome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faEnvelope,
  faCode,
  faBars,
  faSun,
  faMoon,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

/* Add icons to the library */
library.add(
  // Solid icons
  faHome,
  faEnvelope,
  faCode,
  faBars,
  faSun,
  faMoon,
  faFileAlt,
  // Brand icons
  faGithub,
  faLinkedin,
);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");
