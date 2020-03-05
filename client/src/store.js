import Vue from 'vue'
import Vuex from 'vuex'
import { setDayOfYear } from 'date-fns';

Vue.use(Vuex)

const types = {
    SET_AUTHENTICATED: "SET_AUTHENTICATED", // 是否认证通过
    SET_USER: "SET_USER", // 用户信息
    SET_ADMIN: 'SET_ADMIN' // 管理员信息
}
const state = { // 需要维护的状态
    isAuthenticated: false,
    user: {}, // 存储用户信息
    admin: {} // 存储管理员信息
}
const getters = {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
    admin: state => state.admin
}
const mutations = {
    [types.SET_AUTHENTICATED](state, isAuthenticated) {
        if (isAuthenticated) state.isAuthenticated = isAuthenticated
        else state.isAuthenticated = false
    },
    [types.SET_USER](state, user) {
        if (user) state.user = user
        else state.user = {}
    },
    [types.SET_ADMIN](state, admin) {
        if (admin) state.admin = admin
        else state.admin = {}
    }
}
const actions = {
    setAuthenticated: ({ commit }, isAuthenticated) => {
        commit(types.SET_AUTHENTICATED, isAuthenticated)
    },
    setUser: ({ commit }, user) => {
        commit(types.SET_USER, user)
    },
    setAdmin: ({ commit }, admin) => {
        commit(types.SET_ADMIN, admin)
    },
    clearCurrentState: ({ commit }) => {
        commit(types.SET_AUTHENTICATED, false)
        commit(types.SET_USER, null)
        commit(types.SET_ADMIN, null)

    }
}

export default new Vuex.Store({
    // state: {

    // },
    // mutations: {

    // },
    // actions: {

    // }
    state,
    getters,
    mutations,
    actions
})