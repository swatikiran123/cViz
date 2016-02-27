
/* banner toggle */
$(document).ready(function(){
	$(".js-removebanner").click(function() {
	  $("div.banner").hide(600).fadeOut('slow');
	  $("div.smallbanner").show().fadeIn('slow');
	});

	$(".js-showbanner").click(function() {
	  $("div.banner").show(600).fadeIn('slow');
	  $("div.smallbanner").hide().fadeOut('slow');
	});
});

