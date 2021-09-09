import Vue from "vue"
import Vuex from "vuex"
import instance from "./axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isEn: false,
    userInfo: {},
  },
  mutations: {
    setUserInfo: (state, info) => {
      state.userInfo = info
    },
    setLang: (state, info) => {
      state.isEn = (info == "en" && true) || false
      localStorage.setItem("isEn", info)
    },
  },
  actions: {
    logOut({ commit }) {
      commit("logOut")
    },
    // login({ commit})
    async getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {})
    },
  },
})
