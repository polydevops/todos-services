let nosql = require('../data/nosql');
let ObjectId = require('mongodb').ObjectID;

let service = {};

service.getTodos = function(uid) {
  return nosql
    .get('todos')
    .then(collection => {
      return collection.find({
        "uid": uid
      }).toArray();
    });
};

service.createTodos = function(uid, todos) {
  return nosql
    .get('todos')
    .then(collection => {
      todos._id = new ObjectId();
      todos.uid = uid;
      console.log(todos);
      return collection.insertOne(todos);
    })
    .then(result => {
      console.log(`insertedId -> ${result.insertedId}`);
      return Promise.resolve(result.insertedId);
    });
};

service.updateTodosName = function(uid, id, newName) {
  return nosql
    .get('todos')
    .then(collection => {
      return collection.updateOne({
        uid: uid,
        _id: id
      }, {
        $set: {
          name: newName
        }
      });
    })
    .then(result => {
      return Promise.resolve(result.modifiedCount);
    });
};

service.deleteTodos = function(uid, id) {
  return nosql
    .get('todos')
    .then(collection => {
      return collection.deleteOne({
        uid: uid,
        _id: id
      });
    })
    .then(result => {
      return Promise.resolve(result.deletedCount);
    });
};

module.exports = service;
