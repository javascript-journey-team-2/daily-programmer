var models  = require('../models/');
var crypto = require('crypto');
var secret = 'andaglos'; 
var session_store;

exports.index = function(req, res) {
	res.render('register/index');
};

exports.store = function(req, res) {
	session_store = req.session;
	var passwordEncripsi = crypto.createHmac('sha256', secret)
	.update(req.param('password'))
	.digest('hex');

	// validasi
    req.assert('username', 'Username harus diisi').notEmpty();
    req.assert('first_name', 'Nama depan harus diisi').notEmpty();
    req.assert('last_name', 'Nama belakang harus diisi').notEmpty();
    req.assert('email', 'E-mail harus diisi').notEmpty().withMessage('E-mail harus diisi').isEmail();
    req.assert('alamat', 'Alamat harus diisi').notEmpty();
    req.assert('jabatan', 'Jabatan harus diisi').notEmpty();
    //validasi
	var errors = req.validationErrors();  
    console.log(errors);

    if (!errors)
    {

        v_username = req.sanitize( 'username' ).escape().trim();
        v_first_name = req.sanitize( 'first_name' ).escape().trim();
        v_last_name = req.sanitize( 'last_name' ).escape().trim();
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
            }).then(regist => { 
            if (regist == null) { 				
               		models.Users.create({ 
                            username: v_username,
                            first_name: v_first_name,
                            last_name: v_last_name,
                            password: passwordEncripsi,
                            email: v_email,
                            alamat: v_alamat,
                            jabatan: v_jabatan
					}).then(function (registerr) {
						console.log(registerr);	
						session_store.id = registerr.dataValues.id;
						session_store.username = registerr.dataValues.username;
						session_store.email = registerr.dataValues.email;
						session_store.first_name = registerr.dataValues.first_name;
						session_store.last_name = registerr.dataValues.last_name;
						session_store.jabatan = registerr.dataValues.jabatan;
						session_store.logged_in = true;

						console.log(session_store);
						res.redirect('/home');       
					});
            }
            else{
	                req.flash('msg_error', 'Maaf, username sudah digunakan...');
	                res.render('register', {
                        username: req.param('username'),
                        email: req.param('email'),
                        first_name: req.param('first_name'),
                        last_name: req.param('last_name'),
                        alamat: req.param('alamat'),
                        jabatan: req.param('jabatan')
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
            alamat: req.param('alamat'),
            jabatan: req.param('jabatan')
        });
    }

};


