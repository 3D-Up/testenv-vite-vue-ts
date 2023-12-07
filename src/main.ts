import { createApp } from "vue";
import App from "./App.vue";

// @ts-ignore this disables vue hot module reload - forces full page reload on change - useful for debugging threejs stuff
process.env.NODE_ENV === "production";

createApp(App).mount("#app");
