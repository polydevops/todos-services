const todosService = require('./todos-service');

let controller = {};

controller.getTodos = function(req, res, next) {
  todosService
    .getTodos(req.uid)
    .then(todos => {
      res.status(200).json({
          todos: todos
        })
        .catch(err => {
          res.status(500).json({
            msg: "Failed to retrieve todos.",
            err: err
          });
        });
    });
};

controller.createTodos = function(req, res, next) {
  todosService
    .createTodos(req.uid, req.body.todos)
    .then(id => {
      res.status(201).json({
        id: id
      });
    })
    .catch(err => {
      res.status(500).json({
        msg: "Failed to create todos.",
        err: err
      });
    });
};

controller.updateTodosName = function(req, res, next) {
  todosService.updateTodosName(req.uid, req.params.id, req.body.newName)
    .then(success => {
      if (success) res.status(200).end();
    })
    .catch(err => {
      res.status(500).json({
        msg: "Failed to update todos.",
        err: err
      });
    });
};

controller.deleteTodos = function(req, res, next) {
  todosService
    .deleteTodos(req.uid, req.params.id)
    .then(success => {
      if (success) res.status(200).end();
    })
    .catch(err => {
      res.status(500).json({
        msg: "Failed to delete todos.",
        err: err
      });
    });
};

module.exports = controller;
