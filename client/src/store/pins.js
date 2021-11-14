import axios from "axios";

export default {
    state: () => ({
        categories: [],
        types: [],
        pins: [],
    }),
    mutations: {
        setCategories(state, payload) {
            state.categories = payload;
        },
        setTypes(state, payload) {
            state.types = payload;
        },
        setPins(state, payload) {
            state.pins = payload;
        },
        updateType(state, { type }) {
            const typeIndex = state.types.indexOf(state.types.find((t) => t.id === type.id));
            Object.assign(state.types[typeIndex], type);
        },
        updatePrivateType(state, { type }) {
            const typeIndex = state.types.indexOf(state.types.find((t) => t.id === type.id));
            Object.assign(state.types[typeIndex], type);
        },
        addPrivatePin(state, payload) {
            payload.private = true;
            state.pins.push(payload);
        },
        updatePrivatePin(state, editedPin) {
            const pinIndex = state.pins.indexOf(state.pins.find((p) => p.id === editedPin.id));
            Object.assign(state.pins[pinIndex], editedPin);
        },
        addPrivateType(state, payload) {
            payload.private = true;
            state.types.push(payload);
        },
        addPrivateCategory(state, payload) {
            payload.private = true;
            state.categories.push(payload);
        },
        setPrivateCategories(state, payload) {
            payload.forEach((item) => {
                item.private = true;
            });
            state.categories = state.categories.concat(payload);
        },
        setPrivateTypes(state, payload) {
            payload.forEach((item) => {
                item.private = true;
            });
            state.types = state.types.concat(payload);
        },
        setPrivatePins(state, payload) {
            payload.forEach((item) => {
                item.private = true;
            });
            state.pins = state.pins.concat(payload);
        },
    },
    actions: {
        async fetchAll({ dispatch }) {
            await dispatch("fetchCategories");
            await dispatch("fetchTypes");
            await dispatch("fetchPins");
            dispatch("loadPrivateData");
        },
        async fetchCategories({ commit }) {
            await axios.get("/categories").then((res) => {
                const categories = res.data.data.categories;
                categories.forEach((cat) => {
                    cat.private = false;
                });
                commit("setCategories", categories);
            });
        },
        async fetchTypes({ commit }) {
            await axios.get("/types").then((res) => {
                const types = res.data.data.types;
                types.forEach((type) => {
                    type.visible = true;
                    type.private = false;
                });
                commit("setTypes", types);
            });
        },
        async fetchPins({ commit }) {
            await axios.get("/pins").then((res) => {
                const pins = res.data.data.pins;
                pins.forEach((pin) => {
                    pin.private = false;
                });
                commit("setPins", pins);
            });
        },
        loadPrivateData({ commit }) {
            const stored = localStorage.getItem("privateData");
            if (stored) {
                const parsed = JSON.parse(stored);
                commit("setPrivateCategories", parsed.categories);
                commit("setPrivateTypes", parsed.types);
                commit("setPrivatePins", parsed.pins);
            }
        },
        createNecessaryTypesAndCategoriesForPin({ state, commit }, pin) {
            const categoryExists = state.categories.find((cat) => cat.id === pin.category.id);
            if (!categoryExists) {
                commit("addPrivateCategory", pin.category);
            }
            pin.categoryId = pin.category.id;
            const typeExists = state.types.find((type) => type.id === pin.type.id);
            const typeExistsInCategory = pin.type.categoryId === pin.category.id;
            if (!typeExists) {
                pin.type.categoryId = pin.category.id;
                commit("addPrivateType", pin.type);
            }
            if (!typeExistsInCategory && typeExists) {
                const newType = {
                    ...pin.type,
                    id: `private_${pin.type.id}`,
                    categoryId: pin.category.id,
                };
                pin.type = newType;
                const newTypeExists = state.types.find((type) => type.id === newType.id);
                if (!newTypeExists) {
                    commit("addPrivateType", pin.type);
                }
            }
            pin.typeId = pin.type.id;
            delete pin.category;
            delete pin.type;
            return Promise.resolve();
        },
        async addPrivatePin({ commit, dispatch }, pin) {
            await dispatch("createNecessaryTypesAndCategoriesForPin", pin);
            commit("addPrivatePin", pin);
            dispatch("savePrivateData");
        },
        async updatePrivatePin({ commit, dispatch }, pin) {
            await dispatch("createNecessaryTypesAndCategoriesForPin", pin);
            commit("updatePrivatePin", pin);
            dispatch("savePrivateData");
        },
        savePrivateData({ getters }) {
            localStorage.setItem(
                "privateData",
                JSON.stringify({
                    categories: getters["privateCategories"],
                    types: getters["privateTypes"],
                    pins: getters["privatePins"],
                })
            );
        },
    },
    getters: {
        publicCategories: (state) => state.categories.filter((cat) => !cat.private),
        publicTypes: (state) => state.types.filter((type) => !type.private),
        publicPins: (state) => state.pins.filter((pin) => !pin.private),
        privateCategories: (state) => state.categories.filter((cat) => cat.private),
        privateTypes: (state) => state.types.filter((type) => type.private),
        privatePins: (state) => state.pins.filter((pin) => pin.private),
        getType: (state) => (typeId) => state.types.find((type) => type.id === typeId),
        getCategoryTypes: (state) => (categoryId) => state.types.filter((type) => type.categoryId === categoryId),
        getTypePins: (state) => (typeId) => state.pins.filter((pin) => pin.typeId === typeId),
    },
};
