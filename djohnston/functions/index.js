const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const express = require('express');
const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://djtabsite.firebaseio.com"
});

app.get('/tabs', (req,res) => {
  admin
  .firestore()
  .collection('tabs')
  .get()
  .then((data) => {
    let tabs = [];
    data.forEach((doc) => {
      tabs.push(doc.data());
    })
    return res.json(tabs);
  })
  .catch((err) => console.error(err));
})

app.post('/createTab', (req,res) =>{
  const newTab = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  }

  admin
  .firestore()
  .collection('tabs')
  .add(newTab)
  .then((doc) => {
    res.json({ message: `Tab ${doc.id} created successfully`});
  })
  .catch((err) => {
    res.status(500).json({error: 'something went wrong'});
    
  })
})

exports.api = functions.https.onRequest(app);