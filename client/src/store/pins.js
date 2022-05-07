import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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
        addPrivateType(state, payload) {
            payload.private = true;
            payload.status = "private";
            payload.id = payload.id ?? uuidv4();
            state.types.push(payload);
        },
        updateType(state, type) {
            const typeIndex = state.types.indexOf(state.types.find((t) => t.id === type.id));
            Object.assign(state.types[typeIndex], type);
        },
        deleteType(state, type) {
            const typeIndex = state.types.indexOf(state.types.find((t) => t.id === type.id));
            state.types.splice(typeIndex, 1);
        },
        addPrivatePin(state, payload) {
            payload.private = true;
            payload.status = "private";
            payload.id = payload.id ?? uuidv4();
            state.pins.push(payload);
        },
        deletePin(state, pin) {
            const pinIndex = state.pins.indexOf(state.pins.find((p) => p.id === pin.id));
            state.pins.splice(pinIndex, 1);
        },
        updatePin(state, editedPin) {
            const pinIndex = state.pins.indexOf(state.pins.find((p) => p.id === editedPin.id));
            Object.assign(state.pins[pinIndex], editedPin);
        },
        addPrivateCategory(state, payload) {
            payload.private = true;
            payload.status = "private";
            payload.id = payload.id ?? uuidv4();
            state.categories.push(payload);
        },
        deleteCategory(state, category) {
            const catIndex = state.categories.indexOf(state.categories.find((c) => c.id === category.id));
            state.categories.splice(catIndex, 1);
        },
        updateCategory(state, editedCategory) {
            const catIndex = state.categories.indexOf(state.categories.find((c) => c.id === editedCategory.id));
            Object.assign(state.categories[catIndex], editedCategory);
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
        createDefaultFieldsForPrivatePin(_, pin) {
            return Promise.resolve({
                ...pin,
                id: pin.id ?? uuidv4(),
                status: "private",
                private: true,
            });
        },
        createDefaultFieldsForPrivateType(_, type) {
            return Promise.resolve({
                ...type,
                id: type.id ?? uuidv4(),
                visible: true,
                status: "private",
                private: true,
            });
        },
        createDefaultFieldsForPrivateCategory(_, category) {
            return Promise.resolve({
                ...category,
                id: category.id ?? uuidv4(),
                status: "private",
                private: true,
            });
        },
        async addPrivatePin({ commit, dispatch }, pin) {
            let _pin = await dispatch("createDefaultFieldsForPrivatePin", pin);
            _pin.typeId = _pin.type.id;
            delete _pin.type;
            commit("addPrivatePin", _pin);
            dispatch("savePrivateData");
            return Promise.resolve(_pin);
        },
        async updatePrivatePin({ commit, dispatch }, pin) {
            commit("updatePin", pin);
            dispatch("savePrivateData");
            return Promise.resolve(pin);
        },
        deletePrivatePin({ dispatch, commit }, pin) {
            commit("deletePin", pin);
            dispatch("savePrivateData");
        },
        async addPrivateType({ commit, dispatch }, type) {
            let _type = await dispatch("createDefaultFieldsForPrivateType", type);
            _type.categoryId = _type.category.id;
            delete _type.category;
            commit("addPrivateType", _type);
            dispatch("savePrivateData");
            return Promise.resolve(_type);
        },
        async updatePrivateType({ dispatch, commit }, type) {
            commit("updateType", type);
            dispatch("savePrivateData");
            return Promise.resolve(type);
        },
        deletePrivateType({ state, dispatch, commit }, type) {
            const pinsOfType = state.pins.filter((pin) => pin.typeId === type.id);
            pinsOfType.forEach((p) => {
                commit("deletePin", p);
            });
            commit("deleteType", type);
            dispatch("savePrivateData");
        },
        async addPrivateCategory({ commit, dispatch }, category) {
            let _category = await dispatch("createDefaultFieldsForPrivateCategory", category);
            commit("addPrivateCategory", _category);
            dispatch("savePrivateData");
            return Promise.resolve(_category);
        },
        async updatePrivateCategory({ dispatch, commit }, category) {
            commit("updateCategory", category);
            dispatch("savePrivateData");
            return Promise.resolve(category);
        },
        deletePrivateCategory({ state, dispatch, commit }, category) {
            const typesOfCategory = state.types.filter((t) => t.categoryId === category.id);
            typesOfCategory.forEach((t) => {
                const pinsOfType = state.pins.filter((pin) => pin.typeId === t.id);
                pinsOfType.forEach((p) => {
                    commit("deletePin", p);
                });
                commit("deleteType", t);
            });
            commit("deleteCategory", category);
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
