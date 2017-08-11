let key = require('../config/service-account-key.json');
let firebase = require('firebase-admin');
let Error = require('../model/error');
let ErrorResponse = require('../model/errors-response');

let middleware = {};

// initialize firebase
firebase.initializeApp({
  credential: firebase.credential.cert(key),
  databaseURL: 'https://todos-32e4b.firebaseio.com'
});

middleware.verifyUser = function(req, res, next) {
  firebase
    .auth()
    .verifyIdToken(req.get('Authorization'))
    .then(function(uid) {
      req.uid = uid;
      next();
    })
    .catch(function(err) {
      res.status(401).json(new ErrorResponse(new Error("AuthError", `Failed to verify user: ${err}`)));
    });
};

module.exports = middleware;
