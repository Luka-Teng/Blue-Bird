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
    },
    setAvatar (state, payload) {
      state.user.avatar = payload
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
            level: payload.level,
            avatar: payload.avatar
          }).then(() => {
            return userId
          }).catch((error) => {
            commit('setError', error)
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
            level: obj.level,
            avatar: obj.avatar ? obj.avatar : null
          }
          return userData
        })
        .then((userData) => {
          commit('setUser', userData)
        })
        .catch(error => {
          commit('setError', error)
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
              level: users[key].level,
              avatar: users[key].avatar ? users[key].avatar : null
            })
            allUsers = allUsers.sort((a, b) => {
              return a.level > b.level
            })
          }
          commit('loadUsers', allUsers)
        })
        .catch(error => {
          commit('setError', error)
        })
    },
    logout ({commit}) {
      commit('clearError')
      firebase.auth().signOut()
        .then(() => {
          commit('setUserKey', null)
          router.push('/pyramid')
        })
        .catch((error) => {
          commit('setError', error)
        })
    },
    uploadAvatar ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      let avatar
      const userId = payload.userId
      const filename = payload.image.name
      const ref = firebase.storage().ref()
      return ref.child("avatars/" + userId + filename).put(payload.image)
      .then( (fileData) => {
        avatar = fileData.metadata.downloadURLs[0]
        return firebase.database().ref('users').child(userId).update({avatar: avatar})
      })
      .then((data) => {
        commit('setAvatar', avatar)
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setError', error)
        commit('setLoading', false)
      })
    },
    mobile ({dispatch}, payload) {
      const father_id = payload.father_id
      const money = payload.money
      function pyramid(p_father_id, p_money) {
        return firebase.database().ref('users').child(p_father_id)
          .update({
            money: p_money/2
          })
          .then((data) => {
            console.log(data)
          })
      }
    }
  }
}
