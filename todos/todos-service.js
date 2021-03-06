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
      todos.uid = uid;
      createTodosId(todos);
      createTodoItemIds(todos.todoItems);
      return collection.insertOne(todos);
    })
    .then(result => {
      if (result.insertedCount) {
        return Promise.resolve(todos._id);
      } else {
        return Promise.resolve(null);
      }

    });
};

let createTodosId = (todos) => {
  todos._id = new ObjectId();
};

let createTodoItemIds = (todoItems) => {
  return todoItems.map((x) => {
    x._id = new ObjectId();
    return x;
  });
};

service.updateTodosName = function(uid, id, newName) {
  return nosql
    .get('todos')
    .then(collection => {
      return collection.update({
        "uid": uid,
        "_id": new ObjectId(id)
      }, {
        $set: {
          "name": newName
        }
      });
    })
    .then(result => {
      return Promise.resolve(result.result.n);
    });
};

service.deleteTodos = function(uid, id) {
  return nosql
    .get('todos')
    .then(collection => {
      return collection.deleteOne({
        "uid": uid,
        "_id": new ObjectId(id)
      });
    })
    .then(result => {
      return Promise.resolve(result.deletedCount);
    });
};

module.exports = service;
