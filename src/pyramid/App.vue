<template>
	<v-app>
		<loading></loading>
		<v-navigation-drawer
			v-model="sideNav"
			permanent
			dark
      clipped
			app
			class="blue lighten-1">
	    <v-list>
	      <v-list-tile
					v-for="item in items"
					:key="item.title"
					class="nav-link"
					:to="{ name: item.link}">
	        <v-list-tile-action>
	          <v-icon dark>{{ item.icon }}</v-icon>
	        </v-list-tile-action>
	        <v-list-tile-content>
	          <v-list-tile-title>
							{{ item.title }}
						</v-list-tile-title>
	        </v-list-tile-content>
	      </v-list-tile>
	    </v-list>
	  </v-navigation-drawer>

	  <v-toolbar dark clipped-left fixed app class="blue darken-1">
			<v-icon dark class="mt-1">device_hub</v-icon>
			<v-toolbar-title>
				<router-link :to="{ name: 'home'}" tag="span" style="cursor:pointer">PYRAMID</router-link>
      </v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
        <v-btn
          v-if="isLoggedIn"
          flat
          @click="logout">
          <v-icon left dark>exit_to_app</v-icon>
          Logout
        </v-btn>
				<v-btn
          v-if="!isLoggedIn"
          flat
          :to="{ name: 'signIn'}">
          <v-icon left dark>photo_filter</v-icon>
          LogIn
        </v-btn>
				<v-btn
          v-if="!isLoggedIn"
          flat
          :to="{ name: 'signUp'}">
          <v-icon left dark>person_add</v-icon>
          SignUp
        </v-btn>
			</v-toolbar-items>
		</v-toolbar>
	  <main>
	    <v-content>
	      <v-container fluid>
					<alert></alert>
	        <router-view></router-view>
	      </v-container>
	    </v-content>
	  </main>
	  <v-footer app></v-footer>
	</v-app>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'
  export default {
		data () {
			return {
				sideNav: true
			}
		},
		computed: {
			...mapGetters({
				user_key: 'user_key'
			}),
			isLoggedIn () {
				return this.user_key !== null && this.user_key !== undefined
			},
			items () {
				let items = [
					{ title: 'home', icon: 'home', link: 'home' },
        ]
				if (this.isLoggedIn) {
					items = [
						{ title: 'home', icon: 'home', link: 'home' },
	          { title: 'Profile', icon: 'account_box', link: 'profile' },
						{ title: 'mobile', icon: 'developer_board', link: 'mobile' }
	        ]
				}
				return items
			}
		},
		methods: {
			...mapActions({
				logout: 'logout'
			})
		}
  }
</script>

<style>
.nav-link>a.router-link-exact-active {
	color: #444 !important;
}
.nav-link>a:not(.router-link-exact-active) {
	color: #fff !important;
}
</style>
