const admin = require('firebase-admin');
const serviceAccount = require("./admin-config.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://howcodingworks-official.firebaseio.com"
});

//===========================================================================================================//

const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const authService = require("./AuthService/AuthService.js");

const app = express();

app.use(cookieParser());
app.use(cors({ origin: true }));

const config = {
  dev: false
};

const nuxt = new Nuxt(config);

let isReady = false;
const readyPromise = nuxt
  .ready()
  .then(() => {
    isReady = true
    return null
  })
  .catch(() => {
    process.exit(1)
  });

async function handleRequest(req, res) {
  req.cookies.currentUser = await JSON.parse(req.cookies.currentUser);

  if (!isReady) {
    await readyPromise;
  }
  res.set('Cache-Control', 'public, max-age=1, s-maxage=1');
  await nuxt.render(req, res);
}

app.post("/adminClaim", async (req, res) => {
  await res.set('Access-Control-Allow-Origin', '*');
  const response = await authService.giveAdminClaimsToUser(req.body.uid);
  return res.send(response);
});

app.post("/auth", async (req, res) => {
  await res.set('Access-Control-Allow-Origin', '*');
  const response = await authService.authenticateUser(req.body.id_token);
  res.send(response);
});

app.get('*', handleRequest)
app.use(handleRequest)
exports.nuxtssr = functions.https.onRequest(app)


//===========================================================================================================//

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

