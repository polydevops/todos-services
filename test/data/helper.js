const nosql = require('../../data/nosql');

var helper = {};

helper.insertTodos = function(mockTodo) {
  if (mockTodo) {
    return nosql
      .get('todos')
      .then(collection => {
        return collection.insertOne(mockTodo);
      });
  } else {
    return nosql
      .get('todos')
      .then(collection => {
        return collection.insertMany(mockTodos);
      });
  }
};

helper.deleteTodos = function() {
  return nosql.get('todos')
    .then(collection => {
      return collection.remove();
    });
};

module.exports = helper;
