$(document).ready(function(e){
	
  //============================================
  //timeout reload on doing nothing

  var interval = null,
	reloadTime = 30000;

  $(this).on("mousemove, click, keydown", function(){
  	clearInterval(interval);
  	interval = setInterval(function(){
  		$("#closeRow button").trigger("click");
  	}, reloadTime);
  });
	  
	  
	$(".mainMenuButton").on("click", function(e){
		bannerRotate = false; //content builder defined
		
		$('body').css({
			'background-image': 'none',
			'background-color': '#8C8781'
		});
		
        $( "#menu" ).animate({ "top": "0" },{
            step: function( now, fx ) {
                var current = $('#infoM img').css('top');
                $('#infoM img').css('top',now);
            }
        }, "slow");
        
        $("#shop").css("padding-top", "100px");
        
		var this$ = $(this);
        $("#shop iframe").show();
        $('#placeholder').hide();

		var array = ['img/nav.png','img/informa.png','img/actcii.png','img/web.png'];
		for(var i=0; i<array.length; i++) {
			$('#allDiv .row div').eq(i).children().children().attr('src',array[i]);
		}

		$(this).children().attr('src','img/nav.png');

		if(this$.attr('id') == 'navi') {

			 $(this).children().attr('src','img/selected_nav.png');

            if($("#content").css('display') != 'none'){
                $("#content").slideUp();
            }
            $("#shop iframe").hide();
            $('#placeholder').show();


		} else if(this$.attr('id') == 'shares') {
			$(this).children().attr('src','img/actcii_selected.png');
			$("#shop iframe").attr('src', 'mirrors/shares.png');
			
		} else if(this$.attr('id') == 'brow') {
			$(this).children().attr('src','img/selected_web.png');
			$("#shop iframe").attr('src', 'mirrors/google.png');
						
		} else if(this$.attr('id') == 'info') {

			$(this).children().attr('src','img/iform_selected.png');
			$("#shop iframe").attr('src', 'mirrors/silpo.htm');
						
		}
		
		if($("#shop").css('display') == 'none'){
			$("#shop").slideDown();
		}
		
		if($("#content").css('display') != 'none'){
			$("#content").slideUp();
		}
		
		if(interval!=null) {
			clearInterval(interval);
		}
		
		interval = setInterval(function(){
		  	$("#closeRow button").trigger("click");
		}, reloadTime);
	});
	
	$("#closeRow button").on("click", function(e){
		bannerRotate = true; //content builder defined
		$("#shop").css("padding-top", "2em");
		var array = ['img/nav.png','img/informa.png','img/actcii.png','img/web.png'];
		for(var i=0; i<array.length; i++) {
			$('#allDiv .row div').eq(i).children().children().attr('src',array[i]);
		}
		
		$("#placeholder").css('display', 'none');
		
		if($("#content").css('display') == 'none'){
			$("#content").slideDown();
		}
		
		if($("#advVideo").css('display') != 'none'){
			$("#advVideo").slideUp();
		}
		
		var v = document.getElementsByTagName("video");
		for(var jj = 0; jj < v.length; jj++) {
			v[jj].pause();
		}
		
		if($("#shop").css('display') != 'none'){
			$("#shop").slideUp();
            $('body').append($('#infoM'));
			$("#menu").hide();
            $( ".pulse" ).animate({ "top": "51%" },{
                step: function( now, fx ) {
                    var current = $('#infoM img').css('top');
                    $('#infoM img').css('top',now);
                },
                complete: function () {
                    $("#menu").css('top','51%');
                }
            }, "slow");
		}
	});
		
	//MENU =================================================
    $("#infoM").on('click',function()
    {
        if ( $( "#menu" ).is( ":hidden" ) ) {
            $('#menu').append(this);
            $('#menu').fadeIn('slow', function () {
                $('#allDiv div').each(function(i,one){
                    $(one).fadeIn('slow').removeClass('hidden');

                });
            });
        }
        else
        {
            $('body').append(this);
            $('#menu').fadeOut('slow', function () {
                $('#allDiv div').each(function(i,one){
                    $(one).addClass('hidden');
                }) });
        }
        
		if(interval!=null) {
			clearInterval(interval);
		}
		
		interval = setInterval(function(){
		  	$("#closeRow button").trigger("click");
		}, reloadTime);

    });
});