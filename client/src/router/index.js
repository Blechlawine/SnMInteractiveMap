import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Logout from "@/views/Logout";
const Submissions = () => import("@/views/Submissions");

import store from "@/store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/logout",
        name: "Logout",
        component: Logout,
    },
    {
        path: "/submissions",
        name: "Submissions",
        component: Submissions,
        meta: {
            requiresAuth: true,
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!store.state.user.jwt) {
            if (store.state.user.authenticated) {
                store.dispatch("refreshToken").then((res) => {
                    next();
                    return res;
                });
            } else {
                next({
                    path: "/login",
                    query: { redirect: to.fullPath },
                });
            }
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
