var models  = require('../models');
var crypto = require('crypto');
var secret = 'andaglos';
var session_store;

exports.index = function(req, res) {
	session_store = req.session;
	res.render('artikel/index', {
		session_store:session_store
	});
};

exports.addArtikel = function(req, res) {	
	session_store = req.session;

	models.BahasaPemrogramans.findAll().then(bahasa_pemrogramans => {

		console.log(JSON.stringify(bahasa_pemrogramans))

		res.render('artikel/addArtikel', {
			data: bahasa_pemrogramans,
			session_store:session_store
		});

	});

};

exports.prosesAddArtikel = function (req, res){
	session_store = req.session;

	req.assert('jenis_bahasan', 'Tema harus diisi').notEmpty();
	req.assert('bahasa_pemrograman', 'Bahasa Pemrograman harus diisi').notEmpty();
	req.assert('sumber_artikel', 'Sumber Artikel harus diisi').notEmpty();
	req.assert('keterangan', 'Keterangan harus diisi').notEmpty();

	var errors = req.validationErrors();  
	console.log(errors);

	if (!errors) {

		v_jenis_bahasan = req.sanitize( 'jenis_bahasan' ).escape().trim();
		v_bahasa_pemrograman = req.sanitize( 'bahasa_pemrograman' ).escape().trim();
		v_keterangan = req.sanitize( 'keterangan' ).escape().trim();

		models.Artikels.create({ 
			jenis_bahasan: v_jenis_bahasan,
			BahasaPemrogramanId: v_bahasa_pemrograman,
			sumber_artikel: req.param('sumber_artikel'),
			keterangan: v_keterangan,
			UserId: session_store.idUser
		}).then(function(){
			console.log(session_store);
			res.redirect('/artikel');
		});

	}else{
        // menampilkan pesan error
        errors_detail = "<p>Maaf, sepertinya ada kesalahan dalam pengisian data, mohon check lagi form artikelnya!</p><ul>";

        for (i in errors)
        {
        	error = errors[i];
        	errors_detail += '<li>'+error.msg+'</li>';
        }

        errors_detail += "</ul>";

        req.flash('msg_error', errors_detail);

        models.BahasaPemrogramans.findAll().then(bahasa_pemrogramans => {

        	console.log(JSON.stringify(bahasa_pemrogramans))

        	res.render('artikel/addArtikel', {
        		data: bahasa_pemrogramans,
        		session_store:session_store,
        		jenis_bahasan: req.param('jenis_bahasan'),
        		bahasa_pemrograman: req.param('bahasa_pemrograman'),
        		sumber_artikel: req.param('sumber_artikel'),
        		keterangan: req.param('keterangan')
        	});

        });
    }
};