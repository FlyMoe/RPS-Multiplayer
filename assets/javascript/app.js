
var url ='https://intense-heat-9862.firebaseio.com/'
var dataRef = new Firebase(url);
// Initial Values
var name = "";
var comment = "";
var player1_exists = false;
var player2_exists = false;
var choice = "";
var player1Wins = 0;
var player2Wins = 0;
var player1Losses = 0;
var player2Losses = 0;
var ties = 0;
var player1 = "";
var player2 = "";
var player = true;
var player1Name = "";
var player2Name = "";
var com = "";

// Hide Divs at beginning
$("#rock1").hide();
$("#scissors1").hide();
$("#paper1").hide();
$("#rock2").hide();
$("#scissors2").hide();
$("#paper2").hide();
$("#middle").empty();
$("#playAgain").hide();


$(document).ready(function(){

	// Clear the Database
	dataRef.remove();

	/***************** Add Player's Name ****************/

	// Populating the players name in the player1 div
	dataRef.child("player/1").on('child_added', function(snapshot) {
		 if (snapshot.key() == "name"){
		 	$("#player1").html(snapshot.val());
		 }	
		 // Show Divs Now that a name is chosen
		$("#rock1").show();
		$("#scissors1").show();
		$("#paper1").show();
	}, function (errorObject) {

	    console.log("The read failed: " + errorObject.code);

	}); 

	// Populating the players name in the player2 div
	dataRef.child("player/2").on('child_added', function(snapshot) {
		 if (snapshot.key() == "name"){
		 	$("#player2").html(snapshot.val());
		 }	
		 // Show Divs Now that a name is chosen
		$("#rock2").show();
		$("#scissors2").show();
		$("#paper2").show();
	}, function (errorObject) {

	    console.log("The read failed: " + errorObject.code);

	}); 

	/***************** Add Data to FireBase ****************/

	// Capture Choices Button Click
	$("#submitName").on("click", function() {
	  
	  	if (player === true){

	  		// Get the value from the input box
	 		player1Name = $('#inputName').val().trim();
	 		player = false;
	 		dataRef.update({
				"player/1/name": player1Name,
				"player/1/wins": player1Wins,
				"player/1/losses": player1Losses,
				"chat/comment" : ""
			})

			// Clear the value for the input box
	        $("#inputName").val('');
			
	 	} else {

	  		player2Name = $('#inputName').val().trim();
	  		dataRef.update({
				"player/2/name": player2Name,
				"player/2/wins": player2Wins,
				"player/2/losses": player2Losses
			})
			$("#inputName").hide();
			$("#submitName").hide();		
	 	}

	  // Don't refresh the page!
	  return false;
	});


	/***************** ADD COMMENTS ****************/

	// Capture Comment Button Click
	$("#submitComment").on("click",  function() {

		var comment = $('#inputComments').val().trim();
 		dataRef.update({
			"chat/comment": comment
		});

	  	// Don't refresh the page!
	 	return false;
	});

	dataRef.child("chat").on('value', function (snapshot) {
    	
    	var data = snapshot.val();
    	var comment = $('#inputComments').val().trim();
		var box = $("#comment"); 
 		box.val(box.val() + data.comment + '\n');

	});


 	/***************** Player Choices  ****************/

	// Player 1 chooses Rocks
	$("#rock1").on("click", function() {
		$("#rock1").addClass('chosen');
		$("#scissors1").hide();
		$("#paper1").hide();
		player1 = "r";
	});

	// Player 1 chooses Scissors
	$("#scissors1").on("click", function() {
		$("#scissors1").addClass('chosen');
		$("#rock1").hide();
		$("#paper1").hide();
		player1 = "s";
	});

	// Player1 chooses Paper
	$("#paper1").on("click", function() {
		$("#paper1").addClass('chosen');
		$("#scissors1").hide();
		$("#rock1").hide();
		player1 = "p";
	});

	// Player2 chooses Rock
	$("#rock2").on("click", function() {
		$("#rock2").addClass('chosen');
		$("#scissors2").hide();
		$("#paper2").hide();
		player2 = "r";
		picks();
		$("#wins1").html("Wins: "+player1Wins);
		$("#losses1").html("Losses: "+player1Losses);
		$("#wins2").html("Wins: "+player2Wins);
		$("#losses2").html("Losses: "+player2Losses);
	});

	// Player2 chooses Scissors
	$("#scissors2").on("click", function() {
		$("#scissors2").addClass('chosen');
		$("#rock2").hide();
		$("#paper2").hide();
		player2 = "s";
		picks();
		$("#wins1").html("Wins: "+player1Wins);
		$("#losses1").html("Losses: "+player1Losses);
		$("#wins2").html("Wins: "+player2Wins);
		$("#losses2").html("Losses: "+player2Losses);
	});

	// Player2 chooses Paper
	$("#paper2").on("click", function() {
		$("#paper2").addClass('chosen');
		$("#scissors2").hide();
		$("#rock2").hide();
		player2 = "p";
		picks();
		$("#wins1").html("Wins: "+player1Wins);
		$("#losses1").html("Losses: "+player1Losses);
		$("#wins2").html("Wins: "+player2Wins);
		$("#losses2").html("Losses: "+player2Losses);
	});


	/***************** PLAY AGAIN  ****************/

	// Capture Choices Button Click
	$("#playAgain").on("click", function() {
		playAgain();
	});

});

function picks() {

	// Increment win/loss/tie counters bases on what players 1 & 2 choose.
	if ((player1 == "r") && (player2 == "r")) {
		ties = ties + 1;
		$("#middle").html("It's a tie!");
	} else if ((player1 == "r") && (player2 == "s")) {
		player1Wins++;
		player2Losses++;
		$("#middle").html(player1Name+" Wins!");
	} else if ((player1 == "r") && (player2 == "p")) {
		player2Wins++;
		player1Losses++;
		$("#middle").html(player2Name+" Wins!");
	} else if ((player1 == "s") && (player2 == "p")) {
		player1Wins++;
		player2Losses++;
		$("#middle").html(player1Name+" Wins!");
	} else if ((player1 == "s") && (player2 == "r")) {
		player2Wins++;
		player1Losses++;
		$("#middle").html(player2Name+" Wins!");
	} else if ((player1 == "s") && (player2 == "s")) {
		ties = ties + 1;
		$("#middle").html("It's a tie!");
	} else if ((player1 == "p") && (player2 == "s")) {
		player2Wins++;
		player1Losses++;
		$("#middle").html(player2Name+" Wins!");
	} else if ((player1 == "p") && (player2 == "p")) {
		ties = ties + 1;
		$("#middle").html("It's a tie!");
	} else if ((player1 == "p") && (player2 == "r")) {
		player1Wins++;
		player2Losses++;
		$("#middle").html(player1Name+" Wins!");
	}
	$("#playAgain").show();

	choices();
	dataRef.update({
		"player/1/wins": player1Wins,
		"player/1/losses": player1Losses,
		"player/2/wins": player2Wins,
		"player/2/losses": player2Losses
	})

}

function choices(){

	var choice1 = "";
	var choice2 = "";

	switch(player1) {
	    case "p":
	        choice1 = "paper";
	        break;
	    case "r":
	         choice1 = "rock";
	        break;
	    case "s":
	         choice1 = "scissors";
	        break;
	}

	switch(player2) {
	    case "p":
	        choice2 = "paper";
	        break;
	    case "r":
	         choice2 = "rock";
	        break;
	    case "s":
	         choice2 = "scissors";
	        break;
	}

	dataRef.update({
		"player/1/choice": choice1,
		"player/2/choice": choice2
	})
}

function playAgain() {

	$("#rock1").show();
	$("#scissors1").show();
	$("#paper1").show();
	$("#rock2").show();
	$("#scissors2").show();
	$("#paper2").show();
	$("#middle").empty();
	$("#playAgain").hide();

	if ($("#rock1").hasClass('chosen')) {
		$("#rock1").removeClass('chosen');
	}
	if ($("#rock2").hasClass('chosen')) {
		$("#rock2").removeClass('chosen');
	}
	if ($("#scissors1").hasClass('chosen')) {
		$("#scissors1").removeClass('chosen');
	}
	if ($("#scissors2").hasClass('chosen')) {
		$("#scissors2").removeClass('chosen');
	}
	if ($("#paper1").hasClass('chosen')) {
		$("#paper1").removeClass('chosen');
	}
	if ($("#paper2").hasClass('chosen')) {
		$("#paper2").removeClass('chosen');
	}
}