import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyB3EIEGGlmWoI18IsSJSaHyM1IA6dFgP6s",
  authDomain: "danieljtabs.firebaseapp.com",
  databaseURL: "https://danieljtabs.firebaseio.com",
  projectId: "danieljtabs",
  storageBucket: "danieljtabs.appspot.com",
  messagingSenderId: "683650911557",
  appId: "1:683650911557:web:bb3a93728d3dcd385fc22c"
};

firebase.initializeApp(config);

const database = firebase.firestore();
const auth = firebase.auth();
const providers = {
  google: new firebase.auth.GoogleAuthProvider()
};

export { database, auth, providers };
export default firebase;
