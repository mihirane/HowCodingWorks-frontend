import firebase from 'firebase/app'
import 'firebase/functions'
const env = require('~/environment/env')

if (!firebase.apps.length) {
  firebase.initializeApp(env.firebaseConfig)
}

export default firebase
