import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const threadContext = {
  namespaced: true,
  state: () => ({
    tid: '',
    threadType: '',
    psid: '',
    signedRequest: ''
  }),
  mutations: {
    setTID (state, payload) {
      state.tid = payload
    },
    setThreadType (state, payload) {
      state.threadType = payload
    },
    setPSID (state, payload) {
      state.psid = payload
    },
    setSignedRequest (state, payload) {
      state.signedRequest = payload
    }
  },
  actions: {
    setThreadContext ({ commit }, payload) {
      commit('setTID', payload.tid)
      commit('setThreadType', payload.thread_type)
      commit('setPSID', payload.psid)
      commit('setSignedRequest', payload.signed_request)
    }
  }
}

export default new Vuex.Store({
  modules: {
    threadContext
  }
})
