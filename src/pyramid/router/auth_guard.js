import store from '../store'

export default (to, from, next) => {
  if (store.getters.user_key) {
    next()
  } else {
    next('/pyramid/signIn')
  }
}
