import Vue from "vue";
import Vuex from "vuex";
import pins from "./pins";
import user from "./user";
import alerts from "./alerts";

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
        startup({dispatch, state}) {
            return new Promise(async (resolve, reject) => {
                await dispatch("checkAuthenticated");
                if (state.user.authenticated) {
                    dispatch("refreshToken").catch(err => {
                        reject(err);
                    });
                }
                resolve(null);
            });
        },
    },
    modules: {
        pins,
        user,
        alerts,
    },
});
