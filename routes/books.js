var express = require('express');
var router = express.Router();
var book = require('../controllers/bookControl')
var token = require('../middleware/token')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add', token, book.createBook);

router.get('/all', token, book.allBooks);

router.get('/:id', token, book.bookEntry);

router.put('/:id', token, book.updateBook);

router.delete('/:id', token, book.deleteBook);

module.exports = router;
