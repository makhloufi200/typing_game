/**
 *
 */
    var can, ctx, step, steps = 0, delay = 30;
    var effect = 0;

    var array = localStorage.getItem("array").split(",");

	var index = 0;
	var leng = array.length;
	var level = 1;
	var time_left = 119;
	var ok = 0;
	var score = 0;
	var oldLevel = level;

	var font_size = 8;

	function init() {
		can = document.getElementById("MyCanvas1");
		ctx = can.getContext("2d");
		ctx.fillStyle = "blue";
		ctx.font = "20pt Verdana";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		$("#level").text(level);
		$("#time").text(time_left);
		$("#score").text(score);

		setInterval(function () {
			if(time_left > 0){
				time_left--;
				$("#time").text(time_left);

			}
		}, 1000);

		step = 0;
		steps = can.height + 50;
		$(document).keypress(function (eventObject) {
		    if(eventObject.keyCode == 13){
		    	var aux = array[index].substring(0, array[index].length);
		    	if($("#word").val() === aux){
		    		$("#add").text("Good +" + aux.length);
		    	    $("#add").fadeIn(300);
		    	    $("#add").fadeOut(300);
		    		//add bonus seconds
		    	    score += aux.length;
		    	    $("#score").text(score);
		    	}else{
		    	    //add penalty
		    	    $("#penalty").text("Wrong -" + aux.length);
		    	    $("#penalty").fadeIn(300);
		    	    $("#penalty").fadeOut(300);
		    	    score -= aux.length;
		    	    $("#score").text(score);
		    	}
		    	step = 0;
	    		index++;
	    		if(index >= leng){
	    			index = 0;
	    		}
	    		$("#word").val('');
		    }
		});
	    RunTextRightToLeft(array);

	}

	function RunTextRightToLeft(array) {

		//redirect to highscore etc
		if(time_left <= 0){
			sessionStorage.setItem("score", score);
			$(location).attr('href', '../html/final.html');
		}


		level = Math.floor(time_left / 20);

	    $("#level").text(6 - level);
		step++;
	    ctx.clearRect(0, 0, can.width, can.height);
	    ctx.save();
	    ctx.translate(can.width / 2, step);

	    //level 1 => simple words with 10 delay
	    if(6 - level  == 1){
	    	delay = 10;

			font_size += 0.5;

			if(font_size == 25){
				font_size = 10;
			}

			ctx.font = font_size + "pt Verdana";
		}

		//level 2 => simple words with 20 delay + resize text.
		if(6 - level  == 2){
			delay = 12;
			ctx.rotate(Math.PI * 2 / steps * step);
		}

		//level 3 =>
		if(6 - level  == 3){
	    	delay = 15;
	    	ctx.scale(-1, 1);
		}

		//level 4 =>
		if(6 - level == 4){
			ctx.textAlign = "right";
			delay = 25;
			if(effect == 100){
	    		effect = 1;
	    	}
	    	ctx.transform(1,0,0,1,effect,0);
	    	effect += 1;
		}

		//level 5 =>
		if(6 - level == 5){
			ctx.textAlign = "center";
			font_size += 0.1;

			if(font_size >= 15 && font_size < 16){
				font_size = 8;
			}

			ctx.font = font_size + "pt Verdana";
		}

		//level 6 =>
		if(6 - level == 6){
			var gradient = ctx.createLinearGradient(0, 0, can.width, 0);
			gradient.addColorStop(0, "rgba(255, 0, 0, 1)");
			gradient.addColorStop(0.15, "rgba(255, 255, 0, 1)");
			gradient.addColorStop(0.3, "rgba(0, 255, 0, 1)");
			gradient.addColorStop(0.5, "rgba(0, 255, 255, 1)");
			gradient.addColorStop(0.65, "rgba(0, 0, 255, 1)");
			gradient.addColorStop(0.8, "rgba(255, 0, 255, 1)");
			gradient.addColorStop(1, "rgba(255, 0, 0, 1)");
			ctx.stroke();
			ctx.fillStyle = gradient;
		}

	    ctx.fillText(array[index], 0, 0);
	    ctx.restore();

	    if(oldLevel != level){
	    	console.log("das");
			oldLevel = level;
			step = 0;
			index = (5 - level) * 20;
		}

	    if (step == steps){
	    	font_size = 0;

	    	if(oldLevel != level){
	    		console.log("das");
			 	oldLevel = level;
			  	index = (5 - level) * 20;
			}

	    	$("#skipped").text("Skipped -" + 3);
		    $("#skipped").fadeIn(300);
		    $("#skipped").fadeOut(300);
	    	score -= 3;
	    	$("#score").text(score);

		    $("#word").val('');
	    	step = 0;
			index++;
			if(index == leng){
				index = 0;
			}
	    }

	    if (step < steps && time_left > 0){
	    	var t = setTimeout(function() {
	    		RunTextRightToLeft(array);
	    	}, delay)
	    }
	}



