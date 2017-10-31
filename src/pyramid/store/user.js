import * as firebase from 'firebase'
import router from '../router'

export default {
  state: {
    user: null
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          return user.uid
        })
        .then(userId => {
          return firebase.database().ref('users/'+userId).set({
            name: payload.username
          }).then(() => {
            return userId
          })
        })
        .then((userId) => {
          return firebase.database().ref('users/'+userId).once('value')
            .then((data) => {
              const obj = data.val()
              const userData={
                id: userId,
                name: obj.name
              }
              return userData
            })
        })
        .then((userData) => {
          commit('setLoading', false)
          const newUser = {
            id: userData.id,
            name: userData.name
          }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          return user.uid
        })
        .then((userId) => {
          return firebase.database().ref('users/'+userId).once('value')
            .then((data) => {
              const obj = data.val()
              const userData={
                id: userId,
                name: obj.name
              }
              return userData
            })
        })
        .then((userData) => {
          commit('setLoading', false)
          const newUser = {
            id: userData.id,
            name: userData.name
          }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    autoSignIn ({commit}, payload) {
      commit('clearError')
      firebase.database().ref('users/'+payload.uid).once('value')
        .then((data) => {
          const obj = data.val()
          const userData={
            id: payload.uid,
            name: obj.name
          }
          return userData
        })
        .then((userData) => {
          commit('setUser', userData)
        })
        .catch(error => {
          commit('setError', error)
          console.log(error)
        })
    },
    logout ({commit}) {
      commit('clearError')
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', null)
          router.push('/')
        })
        .catch((error) => {
          commit('setError', error)
          console.log(error)
        })
    }
  }
}
