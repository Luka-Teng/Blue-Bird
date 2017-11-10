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
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(user => {
        return user.uid
      }).then(userId => {
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
      }).then((userId) => {
        commit('setLoading', false)
        commit('setUserKey', userId)
      }).catch(error => {
        commit('setLoading', false)
        commit('setError', error)
      })
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(user => {
        return user.uid
      }).then((userId) => {
        commit('setLoading', false)
        commit('setUserKey', userId)
      }).catch(error => {
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
      firebase.database().ref('users/'+payload).once('value').then((data) => {
        const obj = data.val()
        const userData={
          id: payload,
          name: obj.name,
          father_id: obj.father_id,
          level: obj.level,
          avatar: obj.avatar ? obj.avatar : null,
          money: obj.money ? obj.money : null
        }
        return userData
      }).then((userData) => {
        commit('setUser', userData)
      }).catch(error => {
        commit('setError', error)
      })
    },
    loadUsers ({commit}) {
      firebase.database().ref('users').on('value', function (data) {
        const users = data.val()
        let allUsers = []
        for (let key in users) {
          allUsers.push({
            id: key,
            name: users[key].name,
            father_id: users[key].father_id,
            level: users[key].level,
            avatar: users[key].avatar ? users[key].avatar : null,
            money: users[key].money ? users[key].money : null,
          })
        }
        allUsers = allUsers.sort((a, b) => {
          return a.level > b.level
        })
        commit('loadUsers', allUsers)
      })
    },
    logout ({commit}) {
      commit('clearError')
      firebase.auth().signOut().then(() => {
        commit('setUserKey', null)
        router.push('/pyramid')
      }).catch((error) => {
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
      return ref.child("avatars/" + userId + filename).put(payload.image).then((fileData) => {
        avatar = fileData.metadata.downloadURLs[0]
        return firebase.database().ref('users').child(userId).update({avatar: avatar})
      }).then((data) => {
        commit('setAvatar', avatar)
        commit('setLoading', false)
      }).catch((error) => {
        commit('setError', error)
        commit('setLoading', false)
      })
    },
    mobile ({dispatch, commit, state}, payload) {
      commit('clearError')
      commit('setLoading', true)
      const ref = firebase.database().ref("users")
      const money = payload.money
      let father_id = payload.father_id
      let last_users = null
      function pyramid(users, father_id, money) {
        for (let key in users) {
          if (key === father_id) {
            if (!users[key].money) users[key].money = 0
            if (users[key].father_id) {
              users[key].money += money/2
              pyramid(users, users[key].father_id, money/2)
            } else {
              users[key].money += money
            }
            break
          }
        }
      }
      ref.transaction((users) => {
        if (users) {
          pyramid(users, father_id, money)
        }
        last_users = users
        return users
      }).then(() => {
        commit('setLoading', false)
        let allUsers = []
        let currentUser = null
        for (let key in last_users) {
          if (key === state.user_key) currentUser = last_users[key]
          allUsers.push({
            id: key,
            name: last_users[key].name,
            father_id: last_users[key].father_id,
            level: last_users[key].level,
            avatar: last_users[key].avatar ? last_users[key].avatar : null,
            money: last_users[key].money ? last_users[key].money : null,
          })
        }
        allUsers = allUsers.sort((a, b) => {
          return a.level > b.level
        })
        commit('loadUsers', allUsers)
        commit('setUser', currentUser)
      }).catch((error) => {
        commit('setError', error)
        commit('setLoading', false)
      })
    }
  }
}
