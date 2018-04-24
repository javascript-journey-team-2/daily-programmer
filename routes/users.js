var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/UserController');
var Auth_mdw = require('../middlewares/auth');

router.get('/',Auth_mdw.check_login, user_controller.index); 

router.get('/add-user',Auth_mdw.check_login, user_controller.addUser); 

router.post('/add-user',Auth_mdw.check_login, user_controller.prosesaddUser); 

module.exports = router;
