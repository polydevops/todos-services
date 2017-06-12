let service = require('./todo-item-service');

let controller = {};

controller.createTodo = function(req, res, next) {
  service
  .addItem(req.body.todosId, req.body.todo)
  .then(insertedId => {
    res.status(201).json({_id: insertedId});
  })
  .catch(err => {
    res.status(500).json({
      msg: "Failed to create todo.",
      err: err
    });
  });
};

controller.updateTodo = function(req, res, next) {
  service
  .updateItem(req.body.todosId, req.body.todo)
  .then(success => {
    if (success) {
      res.status(200).end();
    }
  })
  .catch(err => {
    res.status(500).json({
      msg: "Failed to update todo.",
      err: err
    });
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
    res.status(500).json({
      msg: "Failed to update todo.",
      err: err
    });
  });
};

module.exports = controller;
