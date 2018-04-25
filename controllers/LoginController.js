var models  = require('../models');
var crypto = require('crypto');
var dateFormat = require('dateformat');
var now = new Date();
var secret = 'andaglos';
var session_store;

exports.index = function(req, res) {
	res.render('login/index'); 
};

exports.login = function(req, res) {
	session_store = req.session;
	var password = crypto.createHmac('sha256', secret)
	.update(req.param('password'))
	.digest('hex');

	if (req.param('username') == "" || req.param('password') == "") {
		req.flash('info', 'Maaf, tidak boleh ada inputan yang kosong!');
		res.redirect('/login');
	}else{

		models.Users.findOne({ where: { username: req.param('username'), password:password } }).then(users => {

			// count.push(users.dataValues);
			console.log(users);
			if (users != null) {

				session_store.idUser = users.dataValues.id;
				session_store.username = users.dataValues.username;
				session_store.email = users.dataValues.email;
				session_store.first_name = users.dataValues.first_name;
				session_store.last_name = users.dataValues.last_name;
				session_store.jabatan = users.dataValues.jabatan;
				session_store.fullName = users.dataValues.first_name + " " + users.dataValues.last_name;
				session_store.since_member = dateFormat(users.dataValues.createdAt, "mmmm yyyy");
				session_store.logged_in = true;

				console.log(session_store);
				console.log(dateFormat(users.dataValues.createdAt, "mmmm yyyy"))
				res.redirect('/home');

			}else{
				req.flash('info', 'Maaf, akun yang anda masukan tidak terdaftar!');
				res.redirect('/login');
			}

		});
	}
};


exports.logout = function(req, res) {
	req.session.destroy(function(err){
		if(err){
			console.log(err);
		}
		else
		{
			res.redirect('/login');
		}
	});

};


