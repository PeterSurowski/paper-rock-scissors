// Initializing Firebase.
var config = {
  apiKey: "AIzaSyBdBcAyclaQ-Z8jkY3gQ9mMagX3jiiwDDo",
  authDomain: "paperrockscissors-d24c7.firebaseapp.com",
  databaseURL: "https://paperrockscissors-d24c7.firebaseio.com",
  projectId: "paperrockscissors-d24c7",
   storageBucket: "paperrockscissors-d24c7.appspot.com",
   messagingSenderId: "51018353390"
};

firebase.initializeApp(config);

// Creating a var to reference the database.
var database = firebase.database();

// Creating some vars and initial values.
var player1Chosen = false;
var player2Chosen = false;
var userChoice;
var opponentChoice;
var userComments;
var userWins = 0;
var opponentWins = 0;
var ties = 0;

//If the other user chooses a player before you.
database.ref().on('value', function(snapshot) {
  var sv = snapshot.val();
  if (snapshot.child("player1Chosen").exists() && sv.player1Chosen === true) {
    $('.container, .input-group').show();
    $('#choose-screen').hide();
    $('#player-1-image').attr('src', 'assets/images/neighborhood-watch450X200.jpg');
    database.ref().set({
      player1Chosen: player1Chosen,
      player2Chosen: true
    });
  } else if (snapshot.child("player2Chosen").exists() && sv.player2Chosen === true) {
    $('.container, .input-group').show();
    $('#choose-screen').hide();
    $('#player-2-image').attr('src', 'assets/images/neighborhood-watch450X200.jpg');
    database.ref().set({
      player1Chosen: true,
      player2Chosen: player2Chosen
    });
  } 
});
    

//If the player chooses player 1...
$('#player-1').on('click', function() {
  $('.container, .input-group').show();
  $('#choose-screen').hide();
  $('#player-2-image').attr('src', 'assets/images/neighborhood-watch450X200.jpg');
  database.ref().set({
    player1Chosen: true
  })
  
  //CONTINUE CODING HERE
  database.ref().on('value', function(snapshot) {
    var sv = snapshot.val();
    
  });
});

//If the player chooses player 2...
$('#player-2').on('click', function() {
  $('.container, .input-group').show();
  $('#choose-screen').hide();
  $('#player-1-image').attr('src', 'assets/images/neighborhood-watch450X200.jpg');
  player2Chosen = true;
});



// If the user chooses paper...
$('#paper').on('click', function() {
  event.preventDefault();
  // Change the userChoice var in the database to "paper."
  database.ref().set({
    player1Chosen,
    userChoice: 'paper'
  });
  database.ref().on('value', function(snapshot) {
    $('#user-output').text(snapshot.val().userChoice);
  });
});

$('#rock').on('click', function() {
  event.preventDefault();
  userChoice = 'rock';
  database.ref().set({
    player1Chosen,
    userChoice: 'rock'
  });
  database.ref().on('value', function(snapshot) {
    $('#user-output').text(snapshot.val().userChoice);
  });  
});

$('#scissors').on('click', function() {
  event.preventDefault();
  userChoice = 'scissors';
  database.ref().set({
    player1Chosen,
    userChoice: 'scissors'
  });
  database.ref().on('value', function(snapshot) {
    $('#user-output').text(snapshot.val().userChoice);
  });
});
  

   
