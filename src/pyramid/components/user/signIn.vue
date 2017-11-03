<template>
  <v-container>
    <v-layout row>
      <v-flex xs9>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="email"
                      id="email"
                      v-model="email"
                      type="email"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit"
                      :disabled="!isValid || loading"
                      :loading="loading"
                      class="blue darken-2 pure--text">
                      Sign in
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      ...mapGetters({
        loading: 'loading',
        user_key: 'user_key'
      }),
      isValid () {
        return this.email !== '' && this.password !== ''
      }
    },
    methods: {
      ...mapActions({
        signUserIn: 'signUserIn'
      }),
      onSignin () {
        this.signUserIn({email: this.email, password: this.password})
      }
    },
    watch: {
      user_key (value) {
        this.$router.push('/pyramid')
      }
    }
  }
</script>
