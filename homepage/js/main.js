$(document).ready(function(){
	var scrArticles = $("#articles");
	$('button').click(function(){
		var articleID = ".article" + this.id;
		$('.dimScreen').addClass('dimActive');
		$('.dimScreen').removeClass('dimInActive');
		$(articleID).removeClass('deActivated');
		scrArticles.css({display: "block"});
		$(articleID).addClass('active');
	});
	$('i.icon-li.icon-remove').click(function(){
		var btnID = this.id;
		var articleID = ".article" + btnID.replace("close", "");
		$('.dimScreen').removeClass('dimActive');
		$('.dimScreen').addClass('dimInActive');
		$(articleID).removeClass('active');
		$(articleID).addClass('deActivated');
	});
});