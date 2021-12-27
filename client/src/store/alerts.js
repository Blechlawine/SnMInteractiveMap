import {genRandHex} from "@/utils/utils";

export default {
    state: () => ({
        alerts: [],
    }),
    mutations: {
        pushAlert(state, alert) {
            state.alerts.unshift(alert);
        },
        removeAlert(state, alert) {
            state.alerts = state.alerts.filter((a) => a != alert);
        },
    },
    actions: {
        pushAlert({ commit, dispatch }, alert) {
            alert.id = genRandHex(4);
            commit("pushAlert", alert);
            setTimeout(() => {
                dispatch("removeAlert", alert);
            }, alert.time || 4000);
        },
        removeAlert({ commit }, alert) {
            commit("removeAlert", alert);
        },
    },
};
