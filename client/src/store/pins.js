import axios from "axios";

export default {
    state: () => ({
        categories: [],
    }),
    mutations: {
        setCategories(state, payload) {
            state.categories = payload;
        },
        updateType(state, {categoryIndex, type, typeIndex}) {
            Object.assign(state.categories[categoryIndex].types[typeIndex], type);
        },
    },
    actions: {
        fetchCategories({commit}) {
            axios.get("/categories").then(res => {
                const categories = res.data.data.categories;
                categories.forEach(category => {
                    category.types.forEach(type => {
                        type.visible = true;
                    });
                });
                commit("setCategories", categories);
            });
        },
    },
};