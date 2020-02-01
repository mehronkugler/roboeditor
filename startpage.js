window.onload = function () {

	$('#startgame').click(function (event) {

	$.ajax({
  	url: "roboeditor.html",
  	dataType: "html",
  	success: function(data) {
  	  $('#gamearea').innerHTML(data);
  	}
	});

	});

}

