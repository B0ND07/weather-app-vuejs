import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/style.css";
import store from "./store";
import axios from "axios"
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api'


const app = createApp(App);
app.use(Toast, {
    position: "top-right",
    timeout: 1961,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
  });
app.use(router);
app.use(store);

app.mount("#app");
