<template>
  <v-container fluid>
    <v-layout row wrap>
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
                    <v-select
                      name="father_id"
                      label="Father ID"
                      id="father_id"
                      :items="select_items"
                      v-model="father_id"></v-select>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="level"
                      label="Level"
                      id="level"
                      v-model="level"
                      disabled></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit"
                      :disabled="!isValid"
                      class="blue darken-2 pure--text">
                      Sign up
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
  import * as firbase from 'firebase'
  export default {
    data () {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        father_id: '',
        level: ''
      }
    },
    computed: {
      ...mapGetters({
        user_key: 'user_key',
        users: 'allUsers'
      }),
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      },
      isValid () {
        return this.email !== '' && this.password !== '' && this.confirmPassword !== '' && this.comparePasswords === ''
      },
      select_items () {
        if (this.users){
          return this.users.map((item) => {
            return {
              text: item.id + ' / ' + item.name + ' / ' + item.level,
              value: item.id
            }
          })
        }
      }
    },
    methods: {
      ...mapActions({
        signUserUp: 'signUserUp',
        loadUsers: 'loadUsers'
      }),
      onSignup () {
        this.signUserUp({
          email: this.email,
          password: this.password,
          username: this.username,
          father_id: this.father_id,
          level: this.level,
          avatar: 'https://firebasestorage.googleapis.com/v0/b/pyramid-746b4.appspot.com/o/avatar.jpg?alt=media&token=91791231-62cc-4bc3-93ad-59a9c081a77f'
        })
      }
    },
    created () {
      this.loadUsers()
    },
    watch: {
      father_id (value) {
        this.level = parseInt(this.users.find((user) => {
          return user.id === value
        }).level) + 1
      },
      user_key (value) {
        this.$router.push('/pyramid')
      }
    }
  }
</script>
