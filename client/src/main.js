import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/style.css";
import store from "./store";
import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api'

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
