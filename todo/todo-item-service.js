let nosql = require('../data/nosql');
let ObjectId = require('mongodb').ObjectID;

let service = {};

service.addItem = function(todosId, item) {
  item._id = new ObjectId();
  console.log(todosId);
  return nosql.get('todos')
    .then(collection => {
      return collection
        .update({
          "_id": new ObjectId(todosId)
        }, {
          $push: {
            "todoItems": item
          }
        }, {
          upsert: false
        })
        .then(result => {
          return (result.result.n) ? Promise.resolve(item._id) : Promise.resolve(0);
        });
    });
};

service.updateItem = function(todosId, item) {
  return nosql.get('todos')
    .then(collection => {
      return collection.update({
        "_id": new ObjectId(todosId),
        "todoItems._id": new ObjectId(item._id)
      }, {
        $set: {
          "todoItems.todo": item.todo,
          "todoItems.isDone": item.isDone
        }
      }, {
        upsert: false
      });
    })
    .then(result => {
      return Promise.resolve(result.result.n);
    });
};

service.deleteItem = function(itemId) {
  return nosql.get('todos')
    .then(collection => {
      return collection
        .deleteOne({
          "todoItems._id": new ObjectId(itemId)
        })
        .then(result => {
          return Promise.resolve(result.deletedCount);
        });
    });
};

module.exports = service;
