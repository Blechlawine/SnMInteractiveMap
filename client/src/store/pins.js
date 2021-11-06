import axios from "axios";

export default {
    state: () => ({
        categories: [],
    }),
    mutations: {
        setCategories(state, payload) {
            state.categories = payload;
        },
    },
    actions: {
        fetchCategories({commit}) {
            axios.get("/categories").then(res => {
                commit("setCategories", res.data.data.categories);
            });
        },
    },
};