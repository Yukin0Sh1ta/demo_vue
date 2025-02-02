import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import VueQrcode from "vue-qrcode";

const app = createApp(App);

app.use(router);
app.component("vue-qrcode", VueQrcode);
app.use(ElementPlus);
app.mount("#app");
