var models  = require('../models');
var session_store;

exports.index = function(req, res) {
	session_store = req.session;
	res.render('home/index',{ session_store:session_store }); 
};
