<template>
  <div class="ma-0 pa-0">
    <v-btn class="d-flex flex-row justify-space-between" @click="signInWithGoogle()">
      <span>Sign in with Google</span>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/auth'
const env = require('~/environment/env')

export default {
  name: 'SignUp',
  layout: 'default',
  middleware: 'signUp',
  methods: {
    async signInWithGoogle () {
      try {
        const provider = await new firebase.auth.GoogleAuthProvider()
        const result = await firebase.auth().signInWithPopup(provider)

        if (result.user) {
          const idToken = await result.user.getIdToken()
          const response = await axios.post(env.authEndpoint, { id_token: idToken })

          if (response && response.data && response.data.custom_token) {
            const data = await firebase.auth().signInWithCustomToken(response.data.custom_token)
            await this.$cookies.set('currentUser', data.user)
            await this.$router.push('/')
            window.location.reload(true)
          }
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
