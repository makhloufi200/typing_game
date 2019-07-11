/**
 *
 */
$( document ).ready(function() {
	var score = sessionStorage.getItem('score');
	var top10 = JSON.parse(localStorage.getItem("top10"));
	var check = localStorage.getItem('check');
	var newtop10 = [];

	for(var i = 0; i < 10; i++){
			newtop10.push({
				name: "Unnknown",
				score: -2000
			});
		}


	var length = top10.length;

	var player = {
		name: name,
		score: score
	};

	var ok = -1;

	for(var i = 0; i < 10; i++){
		var a = parseInt(player.score);
		var b = parseInt(top10[i].score);
		if(a > b){
			ok = i;
			break;
	 	}
	 	newtop10[i] = top10[i];
	}

	for(var i = ok; i < 10; i++){
		newtop10[i+1] = top10[i];
	}

	for (var i = 0; i < 10; i++) {
		if(i == ok && check != 1){
			document.getElementById( 'table' ).innerHTML +=
	       		'<tr id = "row' + i + '"><td>' + '<input type="text" id="name">' +'</td><td>' + player.score + '</td></tr>';
		}else{
			document.getElementById( 'table' ).innerHTML +=
	       		'<tr id = "row' + i + '"><td>' + newtop10[i].name +'</td><td>' + newtop10[i].score + '</td></tr>';
		}
	}

	$( "#button1" ).click(function() {
		localStorage.removeItem('check');
		if(ok != -1 && $("#name").val() != null){
			newtop10[ok].name = $("#name").val();
			newtop10[ok].score = player.score;
		}
		localStorage.setItem("top10", JSON.stringify(newtop10));
  		$(location).attr('href', '../html/game.html');
	});
});