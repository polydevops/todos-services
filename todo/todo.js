let express = require('express');
let router = express.Router();

let controller = require('./todo-item-controller');

router.post('/', function(req, res, next) {
  controller.createTodo(req, res, next);
});

router.post('/:id', function(req, res, next) {
  controller.updateTodo(req, res, next);
});

router.delete('/:id', function(req, res, next) {
  controller.deleteTodo(req, res, next);
});

module.exports = router;
