import Vue from 'vue'
import Router from 'vue-router'
import signUp from './../components/user/signUp'
import signIn from './../components/user/signIn'
import profile from './../components/user/profile'
import home from './../components/home'
import about from './../components/about'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: 'signUp',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: 'signIn',
      name: 'signIn',
      component: signIn
    },
    {
      path: 'about',
      name: 'about',
      component: about
    },
    {
      path: 'profile',
      name: 'profile',
      component: profile
    }
  ]
})

export default router
