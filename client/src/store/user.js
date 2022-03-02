import axios from "axios";

export default {
    state: () => ({
        jwt: undefined,
        user: undefined,
        authenticated: false,
    }),
    mutations: {
        setJwt(state, jwt) {
            state.jwt = jwt;
        },
        setUser(state, user) {
            state.user = user;
        },
        setAuthenticated(state, payload) {
            state.authenticated = payload;
        },
    },
    actions: {
        refreshToken({ commit, dispatch }) {
            return new Promise(async (resolve, reject) => {
                await axios
                    .get("/auth/refreshToken", {})
                    .then((res) => {
                        commit("setJwt", res.data.token);
                        commit("setUser", res.data.user);
                        dispatch("setAuthenticated", true);
                        resolve(res);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        login({ commit, dispatch }, payload) {
            return new Promise(async (resolve, reject) => {
                await axios
                    .post("/auth/login", {
                        ...payload,
                    })
                    .then((res) => {
                        commit("setJwt", res.data.token);
                        commit("setUser", res.data.user);
                        dispatch("setAuthenticated", true);
                        dispatch("pushAlert", {
                            title: "Success",
                            text: [res.data.message],
                        });
                        resolve(res);
                    })
                    .catch((error) => {
                        let text = error.response.data.errors.map((err) =>
                            typeof err == "string" ? err : err.message
                        );
                        dispatch("pushAlert", {
                            title: error.response.data.message,
                            text,
                        });
                        reject(error);
                    });
            });
        },
        register({ commit, dispatch }, payload) {
            return new Promise(async (resolve, reject) => {
                await axios
                    .post("/auth/register", {
                        ...payload,
                    })
                    .then((res) => {
                        commit("setJwt", res.data.token);
                        commit("setUser", res.data.user);
                        dispatch("setAuthenticated", true);
                        dispatch("pushAlert", {
                            title: "Success",
                            text: [res.data.message],
                        });
                        resolve(res);
                    })
                    .catch((error) => {
                        let text = error.response.data.errors.map((err) =>
                            typeof err == "string" ? err : err.message
                        );
                        dispatch("pushAlert", {
                            title: error.response.data.message,
                            text,
                        });
                        reject(error);
                    });
            });
        },
        logout({ dispatch, commit }) {
            return new Promise(async (resolve, reject) => {
                await axios
                    .get("/auth/logout", {})
                    .then((res) => {
                        dispatch("setAuthenticated", false);
                        commit("setUser", undefined);
                        commit("setJwt", undefined);
                        dispatch("pushAlert", {
                            title: "Success",
                            text: [res.data.message],
                        });
                        resolve(res);
                    })
                    .catch((error) => {
                        let text = error.response.data.errors.map((err) =>
                            typeof err == "string" ? err : err.message
                        );
                        dispatch("pushAlert", {
                            title: error.response.data.message,
                            text,
                        });
                        reject(error);
                    });
            });
        },
        setAuthenticated({ commit }, payload) {
            commit("setAuthenticated", payload);
            if (payload) localStorage.setItem("authenticated", "true");
            else localStorage.removeItem("authenticated");
        },
        checkAuthenticated({ commit }) {
            let authenticated = localStorage.getItem("authenticated");
            if (authenticated) commit("setAuthenticated", true);
            else commit("setAuthenticated", false);
            return Promise.resolve(authenticated);
        },
    },
};
