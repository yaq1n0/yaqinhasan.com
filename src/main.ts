import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

/* Import Font Awesome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

/* Import Swiper CSS */
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

/* Add entire icon libraries to the library */
library.add(fas, fab);

const app = createApp(App);

app.component("FontAwesomeIcon", FontAwesomeIcon);
app.use(router);

// Handle initial route for SSG pages
if (window.__INITIAL_ROUTE__ && window.__INITIAL_ROUTE__ !== "/") {
  // Wait for router to be ready before setting the route
  router.isReady().then(() => {
    router.push(window.__INITIAL_ROUTE__);
    app.mount("#app");
  });
} else {
  app.mount("#app");
}
