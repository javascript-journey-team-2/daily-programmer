var models  = require('../models');
var session_store;

exports.index = function(req, res) {
	session_store = req.session;
	models.Users.count().then(countuser => {
		models.BahasaPemrogramans.count().then(bp => {
			models.Artikels.count().then(artikels => {
		  		res.render('home/index',{ session_store:session_store,countuser:countuser,countbp:bp,countartikel:artikels }); 
			})
		})
	})
};
