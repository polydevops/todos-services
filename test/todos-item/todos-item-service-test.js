const assert = require('chai').assert;
const service = require('../../todo/todo-item-service');
const dataHelper = require('../data/helper');

const nosql = require('../../data/nosql');

const mockTodos = require('../data/todos.json');
const mockTodo = require('../data/todo.json');
const mockItem = require('../data/todo-item.json');
const mockUid = 123456789;

const ObjectId = require('mongodb').ObjectId;


describe('todo-item-service', function() {

  describe('#createItem', function() {

    before('create a todos with no items', function() {
      return dataHelper.insertTodos(mockTodo);
    });

    after('delete todos', function() {
      return dataHelper.deleteTodos();
    })

    it('should add an item to an existing todos', function() {
      return service.addItem(mockTodo._id, mockItem)
        .then(id => {
          assert.isOk(id);
          assert.typeOf(id, 'object');
        });
    });
  });

  describe('#updateItem', function() {

    before('insert a todo', function() {
      return dataHelper.insertTodos(mockTodo);
    })

    after('delete todos', function() {
      return dataHelper.deleteTodos();
    })

    it('should change the #todo of the item', function() {
      return service.updateItem(mockTodo._id, mockItem)
        .then(modifiedCount => {
          assert.isOk(modifiedCount);
          assert.equal(1, modifiedCount);
        })
    });
  });

  describe('#deleteItem', function() {
    it('should delete a todo with id #', function() {

    })
  })

});
