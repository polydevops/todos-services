const todosService = require('./todos-service');
const DataResponse = require('../model/data-response');
const ServiceError = require('../model/error');
const ErrorResponse = require('../model/errors-response');

let controller = {};

controller.getTodos = function(req, res, next) {
  todosService
    .getTodos(req.uid)
    .then(todos => {
      let response = new DataResponse(todos);
      res.status(200).json(response);
    })
    .catch(err => {
      let errorResponse = new ErrorResponse([new ServiceError('GetTodosError', `Failed to get todos: ${err}`)]);
      res.status(500).json(errorResponse);
    });
};

controller.createTodos = function(req, res, next) {
  todosService
    .createTodos(req.uid, req.body)
    .then(_id => {
      res.status(201).json(new DataResponse({
        _id: _id
      }));
    })
    .catch(err => {
      let errorResponse = new ErrorResponse([new ServiceError('CreateTodosError', `Failed to create todos: ${err}`)]);
      res.status(500).json(errorResponse);
    });
};

controller.updateTodosName = function(req, res, next) {
  todosService.updateTodosName(req.uid, req.params.id, req.body.name)
    .then(success => {
      console.log(success);
      if (success) res.status(204).end();
    })
    .catch(err => {
      let errorResponse = new ErrorResponse([new ServiceError('UpdateTodosError', `Failed to update todos: ${err}`)]);
      res.status(500).json(errorResponse);
    });
};

controller.deleteTodos = function(req, res, next) {
  todosService
    .deleteTodos(req.uid, req.params.id)
    .then(success => {
      if (success) res.status(204).end();
    })
    .catch(err => {
      let errorResponse = new ErrorResponse([new ServiceError('DeleteTodosError', `Failed to delete todos: ${err}`)]);
      res.status(500).json(errorResponse);
    });
};

module.exports = controller;
