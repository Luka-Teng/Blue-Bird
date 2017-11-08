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
        <v-card color="cyan darken-2" class="white--text">
          <v-card-title primary-title>
            <div>
              <div class="headline mb-3">{{user.name}}</div>
              <span class="white--text">Hello, your current level is {{user.level}}.</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="white" @click="triggerUpload">Edit</v-btn>
            <v-btn flat color="white" @click="goBack" >Return</v-btn>
          </v-card-actions>
        </v-card>
        <div class="level-font">
          <i>{{user.level}}</i>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row v-if="show_upload">
      <v-spacer></v-spacer>
      <v-flex xs10 class="mt-3 pl-5 rel-pos">
        <v-card color="blue-grey darken-2" class="white--text">
          <v-flex xs3 class="ml-3 pt-3">
            <v-avatar
              size="150px">
              <img :src="imageUrl" width="100%">
            </v-avatar>
          </v-flex>
          <v-card-actions>
            <v-btn raised flat dark @click="onPickFile">Upload Avatar</v-btn>
            <v-btn
              raised
              flat
              dark
              @click="onConfirm">
                Confirm
            </v-btn>
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/*"
              @change="onFilePicked">
          </v-card-actions>
        </v-card>
        <div class="level-font">
          <i>{{user.level}}</i>
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
        show_upload: false,
        imageUrl: "http://icons.iconarchive.com/icons/igh0zt/ios7-style-metro-ui/512/MetroUI-Apps-iCloud-Alt-icon.png",
        image: null
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
    watch: {
      user: {
        handler (value) {
          this.avatar_url = value.avatar
        },
        deep: true
      }
    },
    methods: {
      ...mapActions({
        uploadAvatar: 'uploadAvatar',
        loadUsers: 'loadUsers'
      }),
      triggerUpload () {
        this.show_upload = !this.show_upload
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      },
      onConfirm () {
        this.uploadAvatar({
          userId: this.user.id,
          image: this.image
        }).then(() => {
          this.show_upload = false
          this.loadUsers()
        })
      },
      goBack () {
        this.$router.back()
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
     top: 22px;
     right: 9%;
     color: #fff;
     font-weight: bold;
     font-size: 82px;
  }
</style>
