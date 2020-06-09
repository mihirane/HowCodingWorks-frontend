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

    <client-only>
      <v-btn
        v-if="currentUser == null"
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
              <v-img
                :src="currentUser.photoURL"
                :alt="currentUser.displayName"
              />
            </v-avatar>
          </template>
          <v-list class="py-0">
            <v-list-item class="pl-0 py-2">
              <v-list-item-avatar>
                <img
                  :src="currentUser.photoURL"
                  :alt="currentUser.displayName"
                >
              </v-list-item-avatar>

              <span class="ml-n1">
                <v-list-item-title
                  v-if="currentUser.displayName"
                  class="font-weight-bold pb-1"
                >{{ currentUser.displayName }}</v-list-item-title>
                <v-list-item-subtitle
                  v-if="currentUser.email"
                >{{ currentUser.email }}</v-list-item-subtitle>
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
    </client-only>
  </v-app-bar>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import ClientOnly from 'vue-client-only'

export default {
  name: 'Header',
  components: {
    ClientOnly
  },
  data () {
    return {
      menu: false,
      selected: null
    }
  },
  computed: {
    currentUser () {
      if (this.$cookies.get('currentUser') && this.$cookies.get('currentUser') != null) {
        return this.$cookies.get('currentUser')
      } else {
        return null
      }
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
