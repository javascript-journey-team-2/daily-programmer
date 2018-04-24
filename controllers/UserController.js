var models  = require('../models');
var crypto = require('crypto');
var secret = 'andaglos';
var session_store;

exports.index = function(req, res) {
	session_store = req.session;

	models.Users.findAll().then(users => {

		console.log(JSON.stringify(users))

		res.render('user/index', {
			data: users,
			session_store:session_store
		});

	});

};

exports.addUser = function(req, res) {	
	session_store = req.session;

	res.render('user/addUser',{
		session_store:session_store
	}); 

};

exports.prosesaddUser = function(req, res){
	session_store = req.session;

	req.assert('username', 'Username harus diisi').notEmpty();
	req.assert('nama_depan', 'Nama depan harus diisi').notEmpty();
	req.assert('nama_belakang', 'Nama belakang harus diisi').notEmpty();
	req.assert('email', 'E-mail harus diisi').notEmpty().withMessage('E-mail harus diisi').isEmail();
	req.assert('alamat', 'Alamat harus diisi').notEmpty();
	req.assert('jabatan', 'Jabatan harus diisi').notEmpty();

	var errors = req.validationErrors();  
	console.log(errors);

	if (!errors) {

		var password = crypto.createHmac('sha256', secret)
		.update(req.param('password'))
		.digest('hex');
		v_username = req.sanitize( 'username' ).escape().trim();
		v_nama_depan = req.sanitize( 'nama_depan' ).escape().trim();
		v_nama_belakang = req.sanitize( 'nama_belakang' ).escape().trim();
		v_email = req.sanitize( 'email' ).escape().trim();
		v_alamat = req.sanitize( 'alamat' ).escape().trim();
		v_jabatan = req.sanitize( 'jabatan' ).escape().trim();

		models.Users.findOne({ 
			where: {
				$or: [
				{
					username: 
					{
						$eq: req.param('username') 
					}
				},
				{ 
					email: 
					{
						$eq: req.param('email') 
					}
				}
				]
			}
		}).then(users => {

			console.log(users);
			if (users == null) {

				models.Users.create({ 
					username: v_username,
					first_name: v_nama_depan,
					last_name: v_nama_belakang,
					password: password,
					email: v_email,
					alamat: v_alamat,
					jabatan: v_jabatan
				}).then(function(){
					res.redirect('/user');
				});

			}else{

				req.flash('msg_error', 'Maaf, username atau email sudah digunakan...');
				res.render('user/addUser', { 
					session_store:session_store,
					username: req.param('username'),
					email: req.param('email'),
					nama_depan: req.param('nama_depan'),
					nama_belakang: req.param('nama_belakang'),
					alamat: req.param('alamat'),
					jabatan: req.param('jabatan')
				});
			}

		});

	}else{
        // menampilkan pesan error
        errors_detail = "<p>Maaf, sepertinya ada salah pengisian, mohon check lagi form usernya!</p><ul>";

        for (i in errors)
        {
        	error = errors[i];
        	errors_detail += '<li>'+error.msg+'</li>';
        }

        errors_detail += "</ul>";

        req.flash('msg_error', errors_detail);
        res.render('user/addUser', {
        	session_store: session_store, 
        	username: req.param('username'),
        	email: req.param('email'),
        	nama_depan: req.param('nama_depan'),
        	nama_belakang: req.param('nama_belakang'),
        	alamat: req.param('alamat'),
        	jabatan: req.param('jabatan'),
        });
    }
};