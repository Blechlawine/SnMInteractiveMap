import Vue from "vue";
import Vuex from "vuex";
import pins from "./pins";

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
    actions: {},
    modules: {
        pins
    },
});
