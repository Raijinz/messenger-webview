import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const threadContextModule = {
  namespaced: true,
  state: () => ({
    tid: '',
    threadType: '',
    psid: '',
    signedRequest: ''
  }),
  mutations: {
    setTID ({ tid }, payload) {
      tid = payload
    },
    setThreadType ({ threadType }, payload) {
      threadType = payload
    },
    setPSID ({ psid }, payload) {
      psid = payload
    },
    setSignedRequest ({ signedRequest }, payload) {
      signedRequest = payload
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
    threadContext: threadContextModule
  }
})
