setInterval(function(){
	var video = document.getElementsByTagName("video");
	video[0].pause();
	video[0].currentTime = 0;
	video[0].play();	
}, 11400);