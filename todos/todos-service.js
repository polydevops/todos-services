let nosql = require('../data/nosql');

let service = {};

service.getTodos = function(uid) {
  return nosql
    .get('todos')
    .then(collection => {
      console.log(collection);
      return collection.find({
        "uid": uid
      }).toArray();
    });
};

service.createTodos = function(uid, todos) {
  return nosql
    .get('todos')
    .then(collection => {
      return collection.insertOne(todos);
    })
    .then(result => {
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
