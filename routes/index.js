var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login/index', { title: 'Express' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
	res.render('home/home', { title: 'Express' });
});

/* GET home page. */
router.get('/register', function(req, res, next) {
	res.render('register/index', { title: 'Express' });
});

module.exports = router;
