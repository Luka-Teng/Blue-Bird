import * as firebase from 'firebase'
import router from '../router'

export default {
  state: {
    user_key: null,
    user: null,
    allUsers:null
  },
  getters: {
    user (state) {
      return state.user
    },
    user_key (state) {
      return state.user_key
    },
    allUsers (state) {
      return state.allUsers
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setUserKey (state, payload) {
      state.user_key = payload
    },
    loadUsers (state, payload) {
      state.allUsers = payload
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
            father_id: payload.father_id,
            level: payload.level
          }).then(() => {
            return userId
          }).catch((error) => {
            commit('setError', error)
            console.log(error)
            return firebase.auth().currentUser.delete().then(() => {
              return null
            })
          })
        })
        .then((userId) => {
          commit('setLoading', false)
          commit('setUserKey', userId)
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
          commit('setLoading', false)
          commit('setUserKey', userId)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    autoSignIn ({commit}, payload) {
      commit('setUserKey', payload.uid)
    },
    loadUser ({commit}, payload) {
      if (!payload) {
        commit('setUser', null)
        return
      }
      firebase.database().ref('users/'+payload).once('value')
        .then((data) => {
          const obj = data.val()
          const userData={
            id: payload,
            name: obj.name,
            father_id: obj.father_id,
            level: obj.level
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
    loadUsers ({commit}) {
      commit('clearError')
      firebase.database().ref('users').once('value')
        .then((data) => {
          const users = data.val()
          let allUsers = []
          for (let key in users) {
            allUsers.push({
              id: key,
              name: users[key].name,
              father_id: users[key].father_id,
              level: users[key].level
            })
            allUsers = allUsers.sort((a, b) => {
              return a.level > b.level
            })
          }
          commit('loadUsers', allUsers)
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
          commit('setUserKey', null)
          router.push('/')
        })
        .catch((error) => {
          commit('setError', error)
          console.log(error)
        })
    }
  }
}
