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
import loading from './components/shared/loading'
import {mapGetters, mapActions} from 'vuex'

Vue.component('alert', alert)
Vue.component('loading', loading)
Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created () {
    //初始化firebase
    firebase.initializeApp({
      apiKey: "AIzaSyANNbGCmTjRW84wGLgSRQjfRh6UZ55LZFI",
      authDomain: "pyramid-746b4.firebaseapp.com",
      databaseURL: "https://pyramid-746b4.firebaseio.com",
      projectId: "pyramid-746b4",
      storageBucket: "pyramid-746b4.appspot.com",
      messagingSenderId: "915134254333"
    })
    //自动登录
    this.setLoading(true)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.setLoading(false)
      }
      this.setLoading(false)
    })
    this.loadUsers()
  },
  computed: {
    ...mapGetters({
      user_key: 'user_key'
    })
  },
  methods: {
    ...mapActions({
      loadUser: 'loadUser',
      loadUsers: 'loadUsers',
      setLoading: 'setLoading'
    })
  },
  watch: {
    user_key (value) {
      this.loadUser(value)
    }
  }
})
