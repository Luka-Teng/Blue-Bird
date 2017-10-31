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
            name: payload.username,
            father_id: payload.father_id
          }).then(() => {
            const userData={
              id: userId,
              name: payload.username,
              father_id: payload.father_id
            }
            return userData
          }).catch((error) => {
            commit('setError', error)
            console.log(error)
            return firebase.auth().currentUser.delete().then(() => {
              return null
            })
          })
        })
        .then((userData) => {
          commit('setLoading', false)
          commit('setUser', userData)
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
                name: obj.name,
                father_id: obj.father_id
              }
              return userData
            })
        })
        .then((userData) => {
          commit('setLoading', false)
          commit('setUser', userData)
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
            name: obj.name,
            father_id: obj.father_id
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
