// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import router from './router'
import store from './store'
import * as firebase from 'firebase'
import './stylus/main.styl'
import alert from './components/shared/alert'
import {mapGetters, mapActions} from 'vuex'

Vue.component('alert', alert)
Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyBLJDkIVxy9ccuDuJPcVFrusuaz1nlad1g",
      authDomain: "luka-pj.firebaseapp.com",
      databaseURL: "https://luka-pj.firebaseio.com",
      projectId: "luka-pj",
      storageBucket: "luka-pj.appspot.com"
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  },
  computed: {
    ...mapGetters({
      user_key: 'user_key'
    })
  },
  methods: {
    ...mapActions({
      loadUser: 'loadUser',
      loadUsers: 'loadUsers'
    })
  },
  watch: {
    user_key (value) {
      this.loadUser(value)
      this.loadUsers()
    }
  }
})
