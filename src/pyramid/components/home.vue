<template>
  <div>
    Welcome back! <span v-if="user">{{user.name}}</span>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        user: 'user'
      })
    }
  }
</script>
