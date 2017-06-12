var MongoClient = require('mongodb').MongoClient;
var url = require('../config/mongo.json').url;

var nosql = {};

nosql.db = function() {
  return MongoClient.connect(url);
};

nosql.get = function(collectionName) {
  return MongoClient
    .connect(url)
    .then(db => {
      let collection = db.collection(collectionName);
      return Promise.resolve(collection);
    });
};

module.exports = nosql;
