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
                path: "Map_AzuraIsland.png",
            },
            {
                name: "Farmlands",
                path: "map_farmlands_prototype_vec.svg",
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
