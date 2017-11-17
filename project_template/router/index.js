import Vue from 'vue'
import Router from 'vue-router'
import hello from './../components/Hello'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/basicGame/hello',
      name: 'hello',
      component: hello
    }
  ]
})

export default router
