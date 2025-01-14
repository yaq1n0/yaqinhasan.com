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
} from "@fortawesome/free-solid-svg-icons";

/* Add icons to the library */
library.add(faHome, faEnvelope, faCode, faBars, faSun, faMoon);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");
