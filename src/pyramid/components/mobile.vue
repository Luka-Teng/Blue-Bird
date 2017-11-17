<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs2>
        <v-avatar
          :tile="tile"
          :size="avatarSize"
          class="grey lighten-4"
        >
          <img :src="avatar_url" alt="avatar">
        </v-avatar>
      </v-flex>
      <v-flex xs10 pl-5 class="rel-pos">
        <v-card color="orange lighten-2" class="white--text">
          <v-card-text primary-title>
            <v-flex xs12>
              <v-slider label="Money" v-model="money" :max="20000" thumb-color="red" thumb-label></v-slider>
            </v-flex>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="white" @click="onDonation">Donate</v-btn>
          </v-card-actions>
        </v-card>
        <div class="level-font">
          <i>{{money}}</i>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import * as firebase from 'firebase'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    data () {
      return {
        tile: false,
        avatarSize: '100%',
        avatar_url: null,
        money: 0
      }
    },
    computed: {
      ...mapGetters({
        user: 'user'
      })
    },
    mounted () {
      if (this.user.avatar) {
        this.avatar_url = this.user.avatar
      }
    },
    methods: {
      ...mapActions({
        mobile: 'mobile'
      }),
      onDonation () {
        this.mobile({
          father_id: this.user.father_id,
          money: this.money
        })
      }
    }
  }
</script>

<style scoped>
  .upload-field{
    border: 1px dashed #aaa;
    margin-top: 30px;
    padding: 20px;
  }
  .level-font{
    position: absolute;
    top: 81px;
    right: 9%;
    color: #fff;
    font-weight: bold;
    font-size: 55px;
  }
</style>
