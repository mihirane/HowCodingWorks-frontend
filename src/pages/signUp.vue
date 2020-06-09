<template>
  <div class="ma-0 pa-0">
    <v-btn class="d-flex flex-row justify-space-between" @click="signInWithGoogle()">
      <span>Sign in with Google</span>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios'
import '~/plugins/firebase'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'SignUp',
  layout: 'default',
  middleware: 'signUp',
  methods: {
    async signInWithGoogle () {
      try {
        const provider = await new firebase.auth.GoogleAuthProvider()
        const result = await firebase.auth().signInWithPopup(provider)

        if (result.user && process.client) {
          const idToken = await result.user.getIdToken()
          const response = await axios.post(this.$env.authEndpoint, { id_token: idToken })

          if (response && response.data && response.data.custom_token) {
            const data = await firebase.auth().signInWithCustomToken(response.data.custom_token)
            await this.$cookies.set('currentUser', data.user)
            await window.location.reload(true)
            await this.$router.push('/')
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
