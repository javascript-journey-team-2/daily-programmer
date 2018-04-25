var express = require('express');
var router = express.Router();
var bahasapemrogramancontroller = require('../controllers/BahasaPemrogramanController');
var Auth_mdw = require('../middlewares/auth');


/* GET users listing. */
router.get('/', bahasapemrogramancontroller.index);

router.get('/add-bp',Auth_mdw.check_login, bahasapemrogramancontroller.addBp); 
router.post('/add-bp',Auth_mdw.check_login, bahasapemrogramancontroller.prosesaddBp);
router.get('/edit-bp/(:id)',Auth_mdw.check_login, bahasapemrogramancontroller.editBp); 
router.post('/edit-bp/(:id)',Auth_mdw.check_login, bahasapemrogramancontroller.UpdateBp); 
router.get('/delete-bp/(:id)',Auth_mdw.check_login, bahasapemrogramancontroller.DeleteBp); 

module.exports = router;