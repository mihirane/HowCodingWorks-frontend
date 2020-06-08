<template>
  <v-app-bar app height="90%">
    <img
      alt="How Coding Works Logo"
      src="/logo.svg"
      class="elevation-2 logo"
      style="cursor: pointer; border-radius: 8.7px;"
      @click="navigateToHome()"
    >
    <v-spacer />

    <v-btn
      v-if="$cookies.get('currentUser') == null"
      color="primary"
      @click="navigateToSignUp()"
    >
      Join Us
    </v-btn>
    <template v-else>
      <v-menu
        v-model="menu"
        bottom
        left
        close-on-content-click
        offset-y
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on }">
          <v-avatar style="cursor: pointer;" @click="menu = true; selected = null;" v-on="on">
            <img
              v-if="$cookies.get('currentUser').photoURL"
              :src="$cookies.get('currentUser').photoURL"
              v:bind:alt="$cookies.get('currentUser').displayName"
            >
          </v-avatar>
        </template>
        <v-list class="py-0">
          <v-list-item class="pl-0 py-2">
            <v-list-item-avatar>
              <img
                v-if="$cookies.get('currentUser').photoURL"
                :src="$cookies.get('currentUser').photoURL"
                v:bind:alt="$cookies.get('currentUser').displayName"
              >
            </v-list-item-avatar>

            <span class="ml-n1">
              <v-list-item-title
                v-if="$cookies.get('currentUser').displayName"
                class="font-weight-bold pb-1"
              >{{ $cookies.get('currentUser').displayName }}</v-list-item-title>
              <v-list-item-subtitle
                v-if="$cookies.get('currentUser').email"
              >{{ $cookies.get('currentUser').email }}</v-list-item-subtitle>
            </span>
          </v-list-item>
          <v-divider />
          <v-list-item-group v-model="selected">
            <v-list-item @click="navigateToProfile()">
              <v-list-item-content>
                <v-list-item-title>My Profile</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action />
            </v-list-item>
            <v-list-item @click="signOutUser()">
              <v-list-item-content>
                <v-list-item-title>Sign Out</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action />
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'Header',
  data () {
    return {
      menu: false,
      selected: null
    }
  },
  methods: {
    signOutUser () {
      return firebase.auth().signOut()
        .then(async () => {
          await this.$cookies.set('currentUser', null)
          window.location.reload(true)
        }).catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
    },
    navigateToHome () {
      return this.$router.push('/')
    },
    navigateToProfile () {
      return this.$router.push('/profile')
    },
    navigateToSignUp () {
      return this.$router.push('/signUp')
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 64px;
  height: 63px;
}
</style>
