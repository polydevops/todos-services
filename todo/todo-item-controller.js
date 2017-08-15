const service = require('./todo-item-service');
const DataResponse = require('../model/data-response');
const ServiceError = require('../model/error');
const ErrorResponse = require('../model/errors-response');


let controller = {};

controller.createTodo = function(req, res, next) {
  service
  .addItem(req.params.id, req.body)
  .then(insertedId => {
    let response = new DataResponse({_id: insertedId});
    console.log(response);
    res.status(201).json(response);
  })
  .catch(err => {
    let errorResponse = new ErrorResponse([new ServiceError("CreateTodoItemError", `Failed to create todo-item: ${err}`)]);
    res.status(500).json(errorResponse);
  });
};

controller.updateTodo = function(req, res, next) {
  service
  .updateItem(req.params.id, req.body.todo)
  .then(success => {
    if (success) {
      res.status(200).end();
    }
  })
  .catch(err => {
    let errorResponse = new ErrorResponse([new ServiceError("UpdateTodoItemError", `Failed to update todo-item: ${err}`)]);
    res.status(500).json(errorResponse);
  });
};

controller.deleteTodo = function(req, res, next) {
  service
  .deleteItem(req.params.id)
  .then(success => {
    if (success) {
      res.status(200).end();
    }
  })
  .catch(err => {
    let errorResponse = new ErrorResponse([new ServiceError("DeleteTodoItemError", `Failed to delete todo-item: ${err}`)]);
    res.status(500).json(errorResponse);
  });
};

module.exports = controller;
