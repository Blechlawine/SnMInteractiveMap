import Vue from "vue";
import Vuex from "vuex";
import pins from "./pins";
import user from "./user";
import alerts from "./alerts";
import admin from "./admin";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        mapLocationIndex: 0,
        mapLocations: [
            {
                name: "Azura",
                path: "Azura_WIP.webp",
            },
            {
                name: "Farmlands",
                path: "Farmlands_WIP.webp",
            },
        ],
    },
    mutations: {
        setMapLocationIndex(state, index) {
            state.mapLocationIndex = index;
        },
    },
    actions: {
        async startup({ dispatch, state }) {
            if (state.user.authenticated) {
                return dispatch("refreshToken");
            } else {
                return Promise.resolve();
            }
        },
    },
    modules: {
        pins,
        user,
        alerts,
        admin,
    },
});
