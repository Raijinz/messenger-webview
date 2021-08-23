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

const userProfile = {
  namespaced: true,
  state: () => ({
    id: '',
    name: '',
    firstName: '',
    lastName: '',
    profilePic: '',
    locale: '',
    timezone: '',
    gender: ''
  }),
  mutations: {
    setID (state, payload) {
      state.id = payload
    },
    setName (state, payload) {
      state.name = payload
    },
    setFirstName (state, payload) {
      state.firstName = payload
    },
    setLastName (state, payload) {
      state.lastName = payload
    },
    setProfilePic (state, payload) {
      state.profilePic = payload
    },
    setLocale (state, payload) {
      state.locale = payload
    },
    setTimezone (state, payload) {
      state.timezone = payload
    },
    setGender (state, payload) {
      state.gender = payload
    }
  },
  actions: {
    setUserProfile ({ commit }, payload) {
      commit('setID', payload.id)
      commit('setName', payload.name)
      commit('setFirstName', payload.first_name)
      commit('setLastName', payload.last_name)
      commit('setProfilePic', payload.profile_pic)
      commit('setLocale', payload.locale)
      commit('setTimezone', payload.timezone)
      commit('setGender', payload.gender)
    }
  }
}

export default new Vuex.Store({
  modules: {
    threadContext,
    userProfile
  }
})
