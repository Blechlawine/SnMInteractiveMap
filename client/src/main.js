import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:9000/api";
axios.defaults.validateStatus = (status) => status > 100 && status < 400;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((req) => {
    if (store.state.user.jwt !== undefined) {
        req.headers.authorization = `Bearer: ${store.state.user.jwt}`;
    }
    return req;
});
axios.interceptors.response.use(
    (res) => {
        return Promise.resolve(res);
    },
    async (err) => {
        if (err.response.status == 403) {
            let originalRequest = err.response.config;
            await store.dispatch("refreshToken").catch((err) => {
                if (!router.currentRoute.path.startsWith("/login")) {
                    router.push("/login");
                }
            });
            return axios(originalRequest);
        }
        return Promise.reject(err);
    }
);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
