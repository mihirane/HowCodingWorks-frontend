import axios from 'axios'
import firebase from 'firebase/app'

export default async function ({ app, store, error }) {
  try {
    if (app.$cookies.get('currentUser') !== null) {
      const response = await axios.post(app.$env.adminClaimsEndpoint, {
        uid: app.$cookies.get('currentUser').uid
      })

      if (response && response.data && response.data.custom_token) {
        await firebase.auth().signInWithCustomToken(response.data.custom_token)
        const idToken = await firebase.auth().currentUser.getIdTokenResult()

        if (!idToken.claims.admin) {
          error({ statusCode: 404, message: '404 Not Found' })
        }
      } else {
        error({ statusCode: 404, message: '404 Not Found' })
      }
    } else {
      error({ statusCode: 404, message: '404 Not Found' })
    }
  } catch (errorObj) {
    // eslint-disable-next-line
    console.log(errorObj)
    error({ statusCode: 404, message: '404 Not Found' })
  }
}
