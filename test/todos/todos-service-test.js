const assert = require('chai').assert;
const service = require('../../todos/todos-service');

const nosql = require('../../data/nosql');

const mockTodos = require('../data/todos.json');
const mockTodo = require('../data/todo.json');
const mockUid = 123456789;

let insertTodos = function(mockTodo) {
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

let insertTodo = function() {
  return nosql
    .get('todos')
    .then(collection => {
      return collection.insertOne(mockTodo);
    })
}

let deleteTodos = function() {
  return nosql.get('todos')
    .then(collection => {
      return collection.remove();
    });
};

describe('todos-service', function() {
  describe('#getTodos()', function() {

    before('insert some todos', function() {
      return insertTodos();
    });

    after('delete all todos', function() {
      return deleteTodos();
    })

    it('should get a list of todos', function() {

      let expectedTodosLength = 2;

      return service
        .getTodos(mockUid)
        .then(todos => {
          assert.isOk(todos);
          assert.equal(todos.length, expectedTodosLength);
          for (var i = 0; i < todos.length; i++) {
            let actualTodos = todos[i];
            let expectedTodos = mockTodos[i];
            assert.isOk(actualTodos);
            assert.equal(actualTodos.name, expectedTodos.name);
            assert.equal(actualTodos.created, expectedTodos.created);
            assert.isOk(expectedTodos['todo-items']);
          }
        });
    });


  });

  describe('#createTodos', function() {

    before('delete all todos', function() {
      return deleteTodos();
    });

    after('delete all todos', function() {
      return deleteTodos();
    })

    it('should create a todos', function() {
      return service
        .createTodos(mockUid, mockTodos[0])
        .then(insertedId => {
          assert.isOk(insertedId);
        });
    });
  });

  describe('#updateTodosName', function() {

    let getTodo = function(id) {
      return nosql
        .get('todos')
        .then(collection => {
            return collection.find({
              _id: id
            }).toArray();
        })
    }

    before('insert a todos', function() {
      return insertTodos(mockTodo);
    });

    after('delete a todos', function() {
      return deleteTodos();
    })

    it('should update the todo name', function() {
      return service
        .updateTodosName(mockUid, mockTodo._id, 'NEW TODOS')
        .then(modifiedCount => {
          assert.equal(1, modifiedCount);
          return getTodo(mockTodo._id);
        })
        .then(todos => {
          let todo = todos[0];
          assert.isOk(todo);
          assert.equal('NEW TODOS', todo.name);
        });
    });
  });

  describe("#deleteTodos", function() {

    before('insert some todos', function() {
      return insertTodos();
    });

    after('delete all todos', function() {
      return deleteTodos();
    })

    it('should delete a todos', function() {
      return service
      .deleteTodos(mockUid, mockTodos[0]._id)
      .then(deletedCount => {
        assert.equal(1, deletedCount);
      })
    })
  })

});
