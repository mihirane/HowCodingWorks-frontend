const admin = require('firebase-admin');
admin.initializeApp();

//===========================================================================================================//

const functions = require('firebase-functions')
const { Nuxt } = require('nuxt')
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser())

const config = {
  dev: false
}

const nuxt = new Nuxt(config)

let isReady = false
const readyPromise = nuxt
  .ready()
  .then(() => {
    isReady = true
    return null
  })
  .catch(() => {
    process.exit(1)
  })

async function handleRequest (req, res) {
  if (!isReady) {
    await readyPromise
  }
  res.set('Cache-Control', 'public, max-age=1, s-maxage=1')
  await nuxt.render(req, res)
}

app.get('*', handleRequest)
app.use(handleRequest)
exports.nuxtssr = functions.https.onRequest(app)

exports.addNewUserToDB = functions.auth.user().onCreate(async (user) => {
  try {
      const doc = await db.collection("users").doc(user.uid).set({
          followedTopics: [],
          savedPosts: [],
          darkMode: false
      });

      if (doc) {
          return "New user added to firestore";
      }
      else {
          throw Error("New user not added to firestore");
      }
  }
  catch (error) {
      console.log(error);
      return error;
  }
});
