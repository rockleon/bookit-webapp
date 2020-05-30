import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fullName: null,
    email: null,
    avatar: null,
    isLoggedIn: false,
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
  },
  mutations: {
    setFullName(state, data) {
      state.fullName = data;
    },
    setEmail(state, data) {
      state.roles = data;
    },
    setAvatar(state, data) {
      state.avatar = data;
    },
    setIsLoggedIn(state, data) {
      state.isLoggedIn = data;
    },
  },
  actions: {
    saveUserData({ commit }, payload) {
      let fullName = "";
      fullName = payload.first_name || "";
      fullName += " ";
      fullName += payload.last_name || "";

      commit("setFullName", fullName);
      commit("setEmail", payload.email);
      commit("setAvatar", payload.profile_details.id_card_details.path);
      commit("setIsLoggedIn", true);
    },
    deleteUserData({ commit }) {
      commit("setFullName", null);
      commit("setEmail", null);
      commit("setAvatar", null);
      commit("setIsLoggedIn", false);
    },
  },
  plugins: [createPersistedState()],
});
