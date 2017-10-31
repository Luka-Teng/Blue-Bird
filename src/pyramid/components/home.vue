<template>
  <div>
    Welcome back! {{user.name}}
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
