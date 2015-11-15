var bannerRotationDurations = 3000,
content = [
   {
	   ico: "img/advTab1.png",
	   banner: "/banners/banner1.html",
	   bg: "img/img1.jpg",
	   video: "video/marks.mp4",
	   iframe: "img/img1.jpg",
   },
   {
	   ico: "img/advTab2.png",
	   banner: "/banners/banner2.html",
	   bg: "img/img2.jpg",
	   video: "video/ducati.mp4",
	   iframe: "mirrors/ducati/index.html",
   },
   {
	   ico: "img/advTab3.png",
	   banner: "/banners/banner3.html",
	   bg: "img/img3.jpg",
	   video: "video/eset.mp4",
	   iframe: "img/img3.jpg",
   },
   {
	   ico: "img/advTab3.png",
	   banner: "/banners/banner4.html",
	   bg: "img/img3.jpg",
	   video: "video/eset.mp4",
	   iframe: "img/img3.jpg",
   }
];


var tabs = $(".nav"),
	tabContent= $(".tab-content"),
	advVideo = $("#advVideo"),
	unfreezeTimout = null;

for(var ii = 0; ii < content.length; ii++) {
	
	tabs.append($.parseHTML(
		'<li role="presentation" class="tab-content-item '+ ((ii === 0) ? "active" : "") +'" ' + 
		   'data-index="'+ii+'">'+
		   ' <a href="#" aria-controls="home" role="tab" data-toggle="tab">'+
			    '<div class="tabGlyphicon" role="info">'+
		  			'<center><img class="tabGlyphiconImg" src="' + content[ii].ico + '"></center>'+
				'</div>'+
		    '</a>'+
	   '</li>'
	));
	
//	$(".tab-content-item").on("click", function(e){
//		bannerRotate = false;
//		$(".tab-content-item").removeClass("active");
//		var this$ = $(this),
//			curItem = this$.data("index");
//		this$.addClass("active");
//		
//		var tabPane = $(".tab-pane"),
//			curTabPane = tabPane.eq(curItem),
//			fliper = tabPane.find(".flip-container .flipper");
//			
//		fliper.removeClass("animate-flip");
//		tabPane.removeClass("block-disp");
//		curTabPane.addClass("block-disp");
//			
//		$('body').css('background-image','url('+content[curItem].bg+')');
//		
//		if(unfreezeTimout !== null) {
//			clearTimeout(unfreezeTimout);
//		}
//		
//		unfreezeTimout = setTimeout(function() {
//			bannerRotate = true;
//			curItem = (curItem === (content.length - 1)) ? 0 : curItem+1;
//		}, 6000);
//	});
	
	tabContent.append($.parseHTML(		
		'<div role="tabpanel" class="tab-pane ' + 
				((ii === 0) ? "block-disp": "") + '" ' + 
				'data-index="'+ii+'">'+
			'<div class="flip-container">'+
			'<div class="flipper">'+
				'<div class="front">'+
			    	'<p><iframe class="contentImg" src="' + content[ii].banner + '" style="pointer-events:none;"></iframe>'+
			    	'<div class="backgroudTab" data-url="' + content[ii].banner + '"></div>'+
			    	'</p>'+
		    	'</div>'+
				'<div class="back">'+
					'<p><iframe class="contentImg" src="' + 
		   			((ii === content.length-1) ? content[0].banner : content[ii + 1].banner) + 
		   			'" style="pointer-events:none;"></iframe>'+
				    '<div class="backgroudTab" data-url="' + 
					((ii === content.length-1) ? content[0].banner : content[ii + 1].banner) + 
					'"></div>'+
				    '</p>'+
			    '</div>'+
	    	'</div>'+
	        '</div>'+
	    '</div>'
	));
	
	//CONTENT CLICK ================================================
	$(".tab-pane, .tab-content-item").on('click', function(e){
			var this$ = $(e.delegateTarget),
				index = this$.data("index");
			
			$("#shop iframe").attr('src', "");
			$("#shop iframe").attr('src', content[index].iframe);
			
			$("#advVideo > .row").css('display', 'none');	
			
			var v = document.getElementsByTagName("video");
			for(var jj = 0; jj < v.length; jj++) {
				v[jj].pause();
			}
			
			document.getElementsByTagName("video")[index].currentTime = 0;
			document.getElementsByTagName("video")[index].play();

			$("#advVideo > .row").eq(index).css('display', 'block');	
			
			bannerRotate = false; //content builder defined
			
			$('body').css({
				'background-image': 'none',
				'background-color': '#8C8781'
			});
			
			if($("#shop").css('display') == 'none'){
				$("#shop").slideDown();
			}
			
			if($("#content").css('display') != 'none'){
				$("#content").slideUp();
			}
			
			if($("#advVideo").css('display') == 'none'){
				$("#advVideo").slideDown();
			}
	});
	
	advVideo.append($.parseHTML(
		'<div class="row adv-video-row">'+
			'<center>'+
			'<video width="100%" height="100%" loop>'+
			  '<source src="' + content[ii].video + '" type="video/mp4">'+
			  'Your browser does not support the video tag.'+
			'</video>'+
			'</center>'+
		'</div>'
	));
	
	var v = document.getElementsByTagName("video");
	for(var jj = 0; jj < v.length; jj++) {
		v[jj].load();
	}
}

$('body').css('background-image','url('+content[0].bg+')');

/* ROTATE BANNERS */
var curItem = 0,
	bannerRotate = true;
setInterval(function(e){
	if(bannerRotate) {
		var tabPane = $(".tab-pane"),
			curTabPane = tabPane.eq((curItem >= content.length - 1) ? 0 : curItem + 1),
			tabContentItems = $(".tab-content-item"),
			curTabContentItem = tabContentItems.eq((curItem >= content.length - 1) ? 0 : curItem + 1),
			fliper = tabPane.find(".flip-container .flipper"),
			curFliper = fliper.eq(curItem);
			
		fliper.removeClass("animate-flip");
		curFliper.addClass("animate-flip");
		
		tabContentItems.removeClass("active");
		curTabContentItem.addClass("active");
			
		$('body').css('background-image','url('+content[(curItem >= content.length - 1) ? 0 : curItem + 1].bg+')');
	
		setTimeout(function(){
			if(bannerRotate) {
				tabPane.removeClass("block-disp");
				curTabPane.addClass("block-disp");
			}
		}, 600);
			
		(curItem >= content.length - 1) ? curItem = 0 : curItem++;
	}
}, ((bannerRotationDurations < 2000) ? 2000 : bannerRotationDurations));

