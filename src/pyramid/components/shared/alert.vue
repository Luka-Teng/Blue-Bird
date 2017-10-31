<template>
  <v-container v-if="error">
    <v-layout row>
      <v-flex xs12>
        <v-alert error dismissible @input="onClose" :value="true">
          {{ error.message }}
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        error: 'error'
      })
    },
    methods: {
      ...mapActions({
        clearError: 'clearError'
      }),
      onClose () {
        this.clearError()
      }
    }
  }
</script>
