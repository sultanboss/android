$(document).ready(function(){
	
	var snapper = new Snap({
	  element: document.getElementById('content')
	});

	$('.flat-menu').click(function(){
		snapper.open('left');
		$('#info').slideToggle(200);
		$('#price').slideToggle(100);
		return false;
	});
	
	$('.sidebar-header').click(function(){
		snapper.close();
		return false;
	});

	
	$('.deploy-sidebar, .close-icon').click(function(){
		if( snapper.state().state=="left" ){
			snapper.close();
		} else {
			snapper.open('left');
			$('#info').slideUp(200);
			$('#price').slideUp(100);
		}
		return false;
	});

			
	$('.bxslider').bxSlider({
		pager:false,
		controls:true,
		touchEnabed:true,
		infiniteLoop: true,
		preventDefaultSwipeX:true
	});	
	
	$('.bx-next').click(function(){
		return false;
	});
	
	$('.bx-prev').click(function(){
		return false;
	});	
	
	$('.page-coach').hide();
	
	$('.nav-coach').click(function(){
		$('.page-coach').fadeIn(200);
		document.ontouchmove = function(event){ event.preventDefault();}
		snapper.close();
	});
	
	$('.page-coach').click(function(){
		$('.page-coach').fadeOut(200);
		document.ontouchmove = function(event){ event.allowDefault();}
	});


	// Functions Stars From Here

	var roomType 	= 'liv';
	var tileType 	= 'floor';
	var tileCat 	= 'cre-30cm-x30cm-floor';
	var tilewCat 	= 'cre-20cm-x30cm-wall';
	var room        = 'LIV23';
	var ftile		= '3H-101';
	var wtile		= '601-DBL';
	var pic			= 'LIV23';
	var price       = 39;

	$('.get-room').load('src/room/' + roomType + '.html');
	$('.tiles-cat').load('src/type/' + tileType + '.html');
	$('.get-tiles').load('src/tiles/' + tileCat + '.html');
	$('#info').hide();
	$('#price').hide();
	$('.wall-tiles-enable').hide();

	$('.deploy-category').click(function(){
		$('.page-sidebar-scroll').scrollTop(0);
		if($('.tiles-cat').is(':visible')) {
			if(tileType == 'wall')
				$('.wall-tiles-enable').slideUp(100);
	    	$('.tiles-cat').slideUp(200);
	    }	
	    else {
	    	if(tileType == 'wall')
	    		$('.wall-tiles-enable').slideDown(100);
	    	$('.tiles-cat').slideDown(200);	
	    }
	});

	$('.room-type').live("click",function(){
		var id = this.id;
		if(id != roomType) 
		{
			$('.room-type em').removeClass('nav-onit');
			$(this).children('em').addClass('nav-onit');
			$('.get-room').load('src/room/' + id + '.html');

			if(id == 'bed' || id == 'liv' || id == 'din') {
				if(id == 'bed')
					room = 'BED24';
				else if(id == 'liv')
					room = 'LIV23';
				else if(id == 'din')
					room = 'DIN13';

				if(tileType != 'floor') {
					$('.tiles-cat').html('');
					$('.tiles-cat').load('src/type/floor.html');
					$('.wall-tiles-enable').hide();
					$('.get-tiles').load('src/tiles/' + tileCat + '.html');
				}
				tileType = 'floor';
				ftile = '3H-101';
			}
			else {
				if(id == 'bat')
					room = 'BAT07';
				else if(id == 'kit')
					room = 'KIT07';

				if(tileType != 'wall') {
					$('.tiles-cat').html('');
					$('.tiles-cat').load('src/type/wall.html');
					$('.get-tiles').load('src/tiles/' + tilewCat + '.html');
				}
				tileType = 'wall';
				wtile = '601-DBL';
			}
			$('.tiles-cat').hide();
			roomType = id;
		}
	});

	$('.cat-list, #all-floor, #all-wall').live("click",function(){
		id = this.id;
		if(id != tileCat)
		{
			if(id != 'gallery')
			{
				$('.cat-list em').removeClass('nav-onit');
				$(this).children('em').addClass('nav-onit');
				$('.get-tiles').html('');
				$('.get-tiles').load('src/tiles/' + this.id + '.html');
				$('.tiles-cat').slideUp(200);
				if(tileType == 'wall')
					$('.wall-tiles-enable').slideUp(100);
				tileCat = id;
			}
		}
	});

	$('.nav-room').live("click",function(){
		id = this.id;
		room = id;
		$('.nav-room').css('background', '#232528');
		$(this).css('background', '#2C2D31');
		if(id != pic)
		{
			if(tileType == 'floor')
			{
				id = id + '_' + ftile + '_0.jpg'; 
				$('.preview').html('');
				$('.preview').attr('src', 'uploads/files/' + id);
			}
			else 
			{
				id = id + '_0_' + wtile + '.jpg'; 
				$('.preview').html('');
				$('.preview').attr('src', 'uploads/files/' + id);
			}
			pic = id;
		}
	});

	$('.nav-tile').live("click",function(){
		id = this.id;
		$('.nav-tile').css('background', '#232528');
		$(this).css('background', '#2C2D31');
		if(id != pic)
		{
			if(tileType == 'floor')
			{
				ftile = this.id;
				id = room + '_' + id + '_0.jpg'; 
				$('.preview').attr('src', 'uploads/files/' + id);
			}
			else 
			{
				wtile = this.id;
				id = room + '_0_' + id + '.jpg'; 
				$('.preview').attr('src', 'uploads/files/' + id);
			}
			pic = id;
			if($(this).attr('data-type') == 'simple') {
				$('#info-complex').slideUp(100);
				$('#info-simple').slideDown(100);
				$('#info-cat').html($(this).attr('data-cat'));
				$('#info-size').html($(this).attr('data-size'));
				$('#info-model').html(this.id);
				$('#info-price').html($(this).attr('data-price') + ' TK / SFT');
			}
			else {
				$('#info-simple').slideUp(100);
				$('#info-complex').slideDown(100);
				$('#info-cat').html($(this).attr('data-cat'));
				$('#info-size').html($(this).attr('data-size'));
				$('#info-top').html($(this).attr('data-top'));
				$('#info-dec').html($(this).attr('data-dec'));
				$('#info-bor').html($(this).attr('data-bor'));
				$('#info-bot').html($(this).attr('data-bot'));
				$('#info-price').html($(this).attr('data-price') + ' TK / SFT');
			}
			price = $(this).attr('data-price');
			calculate_price(price);
		}
	});

	$('.deploy-details, .info-close').live("click",function(){
		$('#info').slideToggle(200);
		$('#price').slideToggle(100);	
		$("#room-width").val('');	
		$("#room-height").val('');
		$('#info-area').html('0 SQFT');
    	$('#info-net-price').html('0 TK');
	});

	$('#room-width, #room-height').keyup(function(){
        calculate_price(price);
    });

    function calculate_price(price) {
    	var width = 0;
    	var height = 0;

    	if($("#room-width").val())
    		width = $("#room-width").val();
    	if($("#room-height").val())
    		height = $("#room-height").val();

    	var net_area = width*height;
    	var net_price = net_area*price;

    	$('#info-area').html(net_area + ' SQFT');
    	$('#info-net-price').html(net_price + ' TK');
    }
	
});

