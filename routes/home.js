var express = require('express');
var router = express.Router();
var home_controller = require('../controllers/HomeController');
var Auth_mdw = require('../middlewares/auth');

router.get('/',Auth_mdw.check_login, home_controller.index); 

module.exports = router;
