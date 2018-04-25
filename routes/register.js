var express = require('express');
var router = express.Router();
var registercontroller = require('../controllers/RegisterController');

/* GET users listing. */
router.get('/', registercontroller.index);
router.post('/', registercontroller.store);

module.exports = router;
