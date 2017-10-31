<template>
  <v-container>
    <v-layout row>
      <v-flex xs9>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="username"
                      label="username"
                      id="username"
                      v-model="username"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
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
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="father_id"
                      label="Father ID"
                      id="father_id"
                      v-model="father_id"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit"
                      :disabled="!isValid || loading"
                      :loading="loading"
                      class="blue darken-2 pure--text">
                      Sign up
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
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        father_id: ''
      }
    },
    computed: {
      ...mapGetters({
        loading: 'loading',
        user: 'user'
      }),
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      },
      isValid () {
        return this.email !== '' && this.password !== '' && this.confirmPassword !== '' && this.comparePasswords === ''
      }
    },
    methods: {
      ...mapActions({
        signUserUp: 'signUserUp'
      }),
      onSignup () {
        this.signUserUp({
          email: this.email,
          password: this.password,
          username: this.username,
          father_id: this.father_id
        })
      }
    }
  }
</script>
