let key = require('../config/service-account-key.json');
let firebase = require('firebase-admin');

let middleware = {};

// initialize firebase
firebase.initializeApp({
  credential: firebase.credential.cert(key),
  databaseURL: 'https://todos-32e4b.firebaseio.com'
});

middleware.verifyUser = function(req, res, next) {
  firebase
    .auth()
    .verifyTokenId(req.get('Authorization'))
    .then(function(uid) {
      req.uid = uid;
      next();
    })
    .catch(function(err) {
      res.json({msg: "Failed to verify user", err: err});
    });
};

module.exports = middleware;
