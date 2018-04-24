var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/UserController');
var Auth_mdw = require('../middlewares/auth');

router.get('/',Auth_mdw.check_login, user_controller.index); 

router.get('/add-user',Auth_mdw.check_login, user_controller.addUser); 

router.post('/add-user',Auth_mdw.check_login, user_controller.prosesaddUser); 

router.get('/edit-user/(:id)',Auth_mdw.check_login, user_controller.editUser); 

router.post('/edit-user/(:id)',Auth_mdw.check_login, user_controller.UpdateUser); 

router.get('/delete-user/(:id)',Auth_mdw.check_login, user_controller.DeleteUser); 


module.exports = router;
