import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

library.add(fas, fab);

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
