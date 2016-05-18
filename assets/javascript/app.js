
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
var choice1 = "";
var choice2 = "";
var player = true;


$(document).ready(function(){

	// Clear the Database
	dataRef.remove();

	// Populating the players name in the player1 div
	dataRef.child("player/1").on('child_added', function(snapshot) {
		 if (snapshot.key() == "name"){
		 	$("#player1").html(snapshot.val());
		 }	
	}, function (errorObject) {

	    console.log("The read failed: " + errorObject.code);

	}); 

	// Populating the players name in the player2 div
	dataRef.child("player/2").on('child_added', function(snapshot) {
		 if (snapshot.key() == "name"){
		 	$("#player2").html(snapshot.val());
		 }	
	}, function (errorObject) {

	    console.log("The read failed: " + errorObject.code);

	}); 

	// dataRef.on("child_added", function(snapshot) {

	// // If any errors are experienced, log them to console. 
	// }, function (errorObject) {

	//     console.log("The read failed: " + errorObject.code);

	// });


	// Capture Button Click
	$("#submitName").on("click", function() {
	  
	  	if (player === true){

	  		// Get tje value from the input box
	 		player1 = $('#inputName').val().trim();
	 		player = false;
	 		dataRef.update({
				"player/1/name": player1,
				"player/1/choice": choice1,
				"player/1/wins": player1Wins,
				"player/1/losses": losses1
			})

			// Clear the value for the input box
	        $("#inputName").val('');
			
	 	} else {

	  		player2 = $('#inputName').val().trim();
	  		dataRef.update({
				"player/2/name": player2,
				"player/2/choice": choice2,
				"player/2/wins": wins2,
				"player/2/losses": losses2
			})
			$("#inputName").hide();
			$("#submitName").hide();		
	 	}

	  // Don't refresh the page!
	  return false;
	});

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
		player1 = "s";
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


});

function picks() {

	// Increment wins/losses/ties counters bases on what players 1 & 2 choose.
	if ((player1 == "r") && (player2 == "r")) {
		ties = ties + 1;
	} else if ((player1 == "r") && (player2 == "s")) {
		player1Wins++;
		player2Losses++;
	} else if ((player1 == "r") && (player2 == "p")) {
		player2Wins++;
		player1Losses++;
	} else if ((player1 == "s") && (player2 == "p")) {
		player1Wins++;
		player2Losses++;
	} else if ((player1 == "s") && (player2 == "r")) {
		player2Wins++;
		player1Losses++;
	} else if ((player1 == "s") && (player2 == "s")) {
		ties = ties + 1;
	} else if ((player1 == "p") && (player2 == "s")) {
		player2Wins++;
		player1Losses++;
	} else if ((player1 == "p") && (player2 == "p")) {
		ties = ties + 1;
	} else if ((player1 == "p") && (player2 == "r")) {
		player1Wins++;
		player2Losses++;
	}
}