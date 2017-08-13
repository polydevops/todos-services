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
      console.log(todos);
      return collection.insertOne(todos);
    })
    .then(result => {
      if (result.nInserted) {
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
