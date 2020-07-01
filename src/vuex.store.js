import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        appLoaded: false,
        user: {
            loggedIn: false,
            data: {
                id: '',
                name: "",
                email: '',
                jobTitle: '',
                location: "",
                bio: '',
                photo: ''
            }
        }
    },
    getters: {
        user(state) {
            return state.user
        }
    },
    mutations: {
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
        },
        SET_USER(state, data) {
            state.user.data = data;
        },
        APP_LOADED(state, data){
            state.appLoaded = data;
        }
    },
    actions: {
        fetchUser({commit}, user) {
            commit("SET_LOGGED_IN", user !== null);
            if (user) {
                commit("SET_USER", {
                    ...user
                });
            } else {
                commit("SET_USER", null);
            }
        },
        logOut({commit}) {
            commit("SET_LOGGED_IN", false);
            commit("SET_USER", null);
        },
        appIsLoaded({commit}, loaded) {
            commit("APP_LOADED", loaded);
        }
    }
});