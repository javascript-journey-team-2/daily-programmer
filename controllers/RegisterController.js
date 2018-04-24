var models  = require('../models/');
var crypto = require('crypto');
var secret = 'andaglos'; 

exports.index = function(req, res) {
	res.render('register/index');
};

exports.store = function(req, res) {

	var passwordEncripsi = crypto.createHmac('sha256', secret)
	.update(req.param('password'))
	.digest('hex');

	// validasi
	req.assert('username', 'Nama diperlukan').isAlpha().withMessage('Username harus terdiri dari angka dan huruf').notEmpty();
    req.assert('email', 'E-mail tidak valid').notEmpty().withMessage('E-mail diperlukan').isEmail();
    req.assert('first_name', 'Nama depan harus terdiri dari angka dan huruf').isAlpha();
    req.assert('last_name', 'Nama belakang harus terdiri dari angka dan huruf').isAlpha();
    //validasi
	var errors = req.validationErrors();  
    console.log(errors);

    if (!errors)
    {
        v_username = req.sanitize( 'username' ).escape().trim();
        v_email = req.sanitize( 'email' ).escape().trim();
        v_first_name = req.sanitize( 'first_name' ).escape().trim();
        v_last_name = req.sanitize( 'last_name' ).escape().trim();

        models.Users.findOne({ where: { username: req.param('username') } }).then(regist => { 
        	console.log(regist);
            if (regist == null) { 
               				
               				models.Users.create({ 
							    username: req.param('username'),
							    first_name: req.param('first_name'),
							    last_name: req.param('last_name'),
							    password: passwordEncripsi,
							    email: req.param('email'),
							    alamat: req.param('alamat'),
							    jabatan: req.param('jabatan'),
							  }).then(function (err) {
								  	if (!err){
				                        console.log(err);
				                        req.flash('msg_error', 'Maaf, sepertinya ada masalah dengan sistem kami...');
				                        res.redirect('/register');
				                    }
				                    else{
					                    req.flash('msg_info', 'Registrasi berhasil...');
					                    res.redirect('/register');
					                }
						    });
            }
            else{
                req.flash('msg_error', 'Maaf, username sudah digunakan...');
                res.render('register', {
		            username: req.param('username'),
		            email: req.param('email'),
		            first_name: req.param('first_name'),
		            last_name: req.param('last_name'),
		        });
            }

        });
    }
    else
    {   
        // menampilkan pesan error
        errors_detail = "<p> Maaf, sepertinya ada salah pengisian, mohon check lagi form registasi ! </p><ul>";
        for (i in errors){
            error = errors[i];
            errors_detail += '<li>'+error.msg;
        }
        errors_detail += "</ul>";

        req.flash('msg_error', errors_detail);
        res.render('register', {
            username: req.param('username'),
            email: req.param('email'),
            first_name: req.param('first_name'),
            last_name: req.param('last_name'),
        });
    }

};


