import firebase from 'firebase/app'
const env = require('~/environment/env')

if (!firebase.apps.length) {
  firebase.initializeApp(env.firebaseConfig)
}

export default firebase
