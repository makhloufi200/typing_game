$( document ).ready(function() {

	$( "#button1" ).click(function() {
		localStorage.removeItem('check');
		localStorage.setItem("name", $("#name").val());

		var top10 = new Array();

		for(var i = 0; i < 10; i++){
			top10.push({
				name: "Unnknown",
				score: -2000
			});
		}

		localStorage.setItem("top10", JSON.stringify(top10));

  		$(location).attr('href', '../html/game.html');
	});

	$( "#button2" ).click(function() {

		localStorage.setItem("check", "1");
		$(location).attr('href', '../html/final.html');
	});

});