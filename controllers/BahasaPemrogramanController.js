var models  = require('../models/');
var session_store;

exports.index = function(req, res) {
	models.BahasaPemrogramans.findAll().then(function (bp) {
	session_store = req.session;
	res.render('bahasapemrograman/index',{ data:bp,session_store:session_store,title:"Bahasa Pemrograman" });
	});
};

exports.addBp = function(req, res) {	
	session_store = req.session;

	res.render('bahasapemrograman/addBahasaPemrograman',{
		session_store:session_store
	}); 

};

exports.prosesaddBp = function(req, res){
	session_store = req.session;

	req.assert('name', 'Bahasa Pemrograman harus diisi').notEmpty();


	var errors = req.validationErrors();  
	console.log(errors);

	if (!errors) {

		v_name = req.sanitize( 'name' ).escape().trim();

		models.BahasaPemrogramans.findOne({ 
			where: {
					name:req.param('name') 
					}

		}).then(bps => {
			console.log(bps);
			if (bps == null) {
				models.BahasaPemrogramans.create({ 
					name: v_name,
				}).then(function(){
					req.flash('msg_info', 'Bahasa Pemrograman berhasil dibuat...');
					res.redirect('/bahasapemrograman');
				});
			}else{
				req.flash('msg_error', 'Maaf, Bahasa Pemrograman sudah digunakan...');
				res.render('bahasapemrograman/addBahasaPemrograman', { 
					session_store:session_store,
					name: req.param('name'),
				});
			}

		});

	}else{
        // menampilkan pesan error
        errors_detail = "<p> Maaf, sepertinya ada salah pengisian, mohon check lagi form registasi !  </p><ul>";

        for (i in errors)
        {
        	error = errors[i];
        	errors_detail += '<li>'+error.msg+'</li>';
        }
        errors_detail += "</ul>";
        req.flash('msg_error', errors_detail);
        res.render('bahasapemrograman/addBahasaPemrograman', {
        	session_store: session_store, 
        	name: req.param('name'),
        });
    }
};

exports.editBp = function(req, res){
 	session_store = req.session;
	models.BahasaPemrogramans.findOne({ where: {id:req.params.id}}).then(bps => {
			console.log(bps);
			if (bps != null) {
				 console.log(bps);
            	 res.render('bahasapemrograman/editBahasaPemrograman', { session_store:session_store, bps: bps.dataValues });
			}else{
				req.flash('msg_error', 'Maaf, Bahasa Pemrograman tidak tiketahui...');
				res.redirect('/bahasapemrograman');
			}
		});
};

exports.UpdateBp = function(req,res){
    models.BahasaPemrogramans.update({
         name: req.param('name'),
            },{where: {id:req.params.id}});
    		req.flash('msg_info', 'Bahasa Pemrograman '+req.param('name')+' berhasil diubah...');
            res.redirect('/bahasapemrograman');
};

exports.DeleteBp = function(req,res){
	models.BahasaPemrogramans.findOne({ 
			where: {
					id:req.params.id 
					}
		}).then(bps => {
			console.log(bps);
			if (bps != null) {
				 models.BahasaPemrogramans.destroy({where: {id: req.params.id}});
				 req.flash('msg_info', 'Bahasa Pemrograman berhasil dihapus...');
				 res.redirect('/bahasapemrograman');
			}else{
				req.flash('msg_error', 'Maaf, Bahasa Pemrograman Tidak diketahui...');
				res.redirect('/bahasapemrograman');
			}
		});
};