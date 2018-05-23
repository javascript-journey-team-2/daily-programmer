
$(function () {

	var dataArtikel = [];

	muatData(0);

	function muatData(jumlahRequestData){
		$.ajax({
			url : '/artikel/data',
			contentType : 'application/json',
			data : { jumlah : jumlahRequestData},
			success : function (response){
				loadData(response.artikel.rows,jumlahRequestData,response.artikel.count)
			}
		});
	};

	function searchData(jumlahRequestData,search){
		$.ajax({
			url : '/artikel/search',
			contentType : 'application/json',
			data : { jumlah : jumlahRequestData, search : search},
			success : function (response){
				console.log(response);
				// loadData(response.artikel.rows,jumlahRequestData,response.artikel.count)
			}
		});
	};

	function loadData(data,jumlahRequestData,jumlahData){

		if (jumlahRequestData == 0) {
			dataArtikel = data;
		}else{
			for (var i = 0 ; i < data.length; i++) {
				dataArtikel.push(data[i]);
			}
		}

		var box = $('#box-artikel');

		box.html('');

		dataArtikel.forEach(function (artikel){

			box.append('\
				<div class="box box-widget">\
				<div class="box-header with-border">\
				<div class="user-block">\
				<img class="img-circle" src="/adminlte/dist/img/avatar04.png" alt="User Image">\
				<span class="username"><a href="#">'+artikel.User.fullName+'</a></span>\
				<span class="description">'+artikel.User.jabatan+'</span>\
				</div>\
				\
				</div>\
				\
				<div class="box-body">\
				\
				<p>'+artikel.keterangan+'</p>\
				\
				<p>Artikel '+artikel.BahasaPemrograman.name+'</p>\
				\
				<div class="attachment-block clearfix">\
				<img class="attachment-img" src="/adminlte/dist/img/codetalk.jpg" alt="Attachment Image">\
				\
				<div class="attachment-pushed">\
				<h4 class="attachment-heading"><a href="'+artikel.sumber_artikel+'">'+artikel.jenis_bahasan+'</a></h4>\
				\
				<div class="attachment-text">\
				'+artikel.keterangan+'\
				</div>\
				</div>\
				</div>\
				<button type="button" class="btn btn-default btn-xs"><i class="fa fa-thumbs-o-up"></i> Like</button>\
				<span class="pull-right text-muted">45 likes</span>\
				</div>\
				\
				</div>\
				');
		});

		if (jumlahRequestData == jumlahData) {
			$('#load-more').remove();
		}else{
			var button_load_more = $('#load-more');
			button_load_more.html('');

			button_load_more.append('\
				<button class="btn btn-success btn-block btn-lg pull-left" id="muat-data" data="'+jumlahRequestData+'"> Load More </button>\
				');
		};


	};

	$(document).on('click','#muat-data', function(){
		var jumlahRequestData = $(this).attr("data");
		jumlahRequestData = parseInt(jumlahRequestData) + 3;
		if (jumlahRequestData > dataArtikel.length) {
			$(this).attr("data", dataArtikel.length);
			muatData(dataArtikel.length);
		}else{
			$(this).attr("data",jumlahRequestData);
			muatData(jumlahRequestData);
		}

	});

	$(document).on('keyup','#cariArtikel', function(){
		let search =  $(this).val();
		searchData(3,search)
		console.log(search);
	});

});
