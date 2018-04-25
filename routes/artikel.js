var express = require('express');
var router = express.Router();
var artikel_controller = require('../controllers/ArtikelController');
var Auth_mdw = require('../middlewares/auth');

router.get('/', Auth_mdw.check_login, artikel_controller.index); 

router.get('/add-artikel',Auth_mdw.check_login, artikel_controller.addArtikel); 

router.post('/add-artikel',Auth_mdw.check_login, artikel_controller.prosesAddArtikel); 

module.exports = router;
