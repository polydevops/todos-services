let express = require('express');
let router = express.Router();

let controller = require('./todos-controller');

router.get('/', function(req, res, next) {
  controller.getTodos(req, res, next);
});

router.post('/', function(req, res, next) {
  controller.createTodos(req, res, next);
});

router.put('/:id', function(req, res, next) {
  controller.updateTodosName(req, res, next);
});

router.delete('/:id', function(req, res, next) {
  controller.deleteTodos(req, res, next);
});

module.exports = router;
