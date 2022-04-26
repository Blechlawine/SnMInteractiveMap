import axios from "axios";

export default {
    state: () => ({
        categories: [],
        types: [],
        pins: [],
    }),
    mutations: {
        setAdminCategories(state, payload) {
            state.categories = payload;
        },
        setAdminTypes(state, payload) {
            state.types = payload;
        },
        setAdminPins(state, payload) {
            state.pins = payload;
        },
        toggleCategoryOpen(state, id) {
            const category = state.categories.find((c) => c.id === id);
            category.open = !category.open;
        },
        toggleTypeOpen(state, id) {
            const pinType = state.types.find((t) => t.id === id);
            pinType.open = !pinType.open;
        },
    },
    actions: {
        async fetchAdminCategories({ commit }) {
            await axios.get("/categories/all").then((res) => {
                const categories = res.data.data.categories;
                categories.forEach((cat) => {
                    cat.private = false;
                    cat.open = false;
                });
                commit("setAdminCategories", categories);
            });
        },
        async fetchAdminTypes({ commit }) {
            await axios.get("/types/all").then((res) => {
                const types = res.data.data.types;
                types.forEach((type) => {
                    type.visible = true;
                    type.private = false;
                    type.open = false;
                });
                commit("setAdminTypes", types);
            });
        },
        async fetchAdminPins({ commit }) {
            await axios.get("/pins/all").then((res) => {
                const pins = res.data.data.pins;
                pins.forEach((pin) => {
                    pin.private = false;
                });
                commit("setAdminPins", pins);
            });
        },
        async fetchAdminData({ dispatch }) {
            await dispatch("fetchAdminCategories", true);
            await dispatch("fetchAdminTypes", true);
            await dispatch("fetchAdminPins", true);
        },
    },
};
