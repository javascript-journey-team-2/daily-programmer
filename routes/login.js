var express = require('express');
var router = express.Router();
var login_controller = require('../controllers/LoginController');

router.get('/', login_controller.index); 

router.post('/', login_controller.login); 

module.exports = router;
