var express = require('express');
var router = express.Router();
var token = require('../middleware/token');
var validate = require('../middleware/validate')
var userEntry = require('../controllers/userControl');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sign-in', validate.validationRules(), validate.validate, userEntry.userReg);

router.post('/login', userEntry.userLogin);

router.get('/all', token, userEntry.userDisplay);

module.exports = router;
