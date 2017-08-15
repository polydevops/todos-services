let express = require('express');
let router = express.Router();

let controller = require('./todo-item-controller');

router.post('/:id', function(req, res, next) {
  controller.updateTodo(req, res, next);
});

router.put('/:id', function(req, res, next) {
  controller.updateTodo(req, res, next);
});

router.delete('/:id', function(req, res, next) {
  controller.deleteTodo(req, res, next);
});

module.exports = router;
