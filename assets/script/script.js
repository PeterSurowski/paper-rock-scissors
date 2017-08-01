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
var player1data;
var player2data;
var player1Chosen = false;
var player2Chosen = false;
var userChoice;
var opponentChoice;
var userComments;
var player1wins = 0;
var player2wins = 0;
var ties = 0;
var chatOutput = '';

// Print initial scores to scoreboard:
database.ref().child('scores').set({
  ties: ties,
  player1wins: player1wins,
  player2wins: player2wins
});

database.ref().child('chat').set({
  chatOutput: chatOutput
})
/*
//If the other user chooses a player before you.
database.ref().on('value', function(snapshot) {
  var sv = snapshot.val();
  if (snapshot.child('player1Chosen').exists() && sv.player1Chosen === true) {
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
    */

//If the player chooses player 1...
$('#player-1').on('click', function() {
  $('.container, .input-group').show();
  $('#choose-screen').hide();
  $('#player-2-image').attr('src', 'assets/images/neighborhood-watch450X200.jpg');
  database.ref().child('player1data').set({
    userChoice: ''
  });
});

//If the player chooses player 2...
$('#player-2').on('click', function() {
  $('.container, .input-group').show();
  $('#choose-screen').hide();
  $('#player-1-image').attr('src', 'assets/images/neighborhood-watch450X200.jpg');
  database.ref().child('player2data').set({
    userChoice: ''
  });
});

// If player-1 chooses paper:
$('#paper-1').on('click', function() {
  event.preventDefault();
  // Change the userChoice var in the database to "paper."
  database.ref().child('player1data').set({
    userChoice: 'paper'
  });
  database.ref().on('value', function(snapshot) {
    $('#user-output').text(snapshot.child('player1data').val().userChoice);
  });
});
// If player-1 chooses rock:
$('#rock-1').on('click', function() {
  event.preventDefault();
  database.ref().child('player1data').set({
    userChoice: 'rock'
  });
  database.ref().on('value', function(snapshot) {
    $('#user-output').text(snapshot.child('player1data').val().userChoice);
  });  
});
// If player-1 chooses scissors:
$('#scissors-1').on('click', function() {
  event.preventDefault();
  database.ref().child('player1data').set({
    userChoice: 'scissors'
  });
  database.ref().on('value', function(snapshot) {
    $('#user-output').text(snapshot.child('player1data').val().userChoice);
  });
});

// If player-2 chooses paper:
$('#paper-2').on('click', function() {
  event.preventDefault();
  // Change the userChoice var in the database to "paper."
  database.ref().child('player2data').set({
    userChoice: 'paper'
  });
  database.ref().on('value', function(snapshot) {
    $('#opponent-output').text(snapshot.child('player2data').val().userChoice);
  });
});
// If player-2 chooses rock:
$('#rock-2').on('click', function() {
  event.preventDefault();
  database.ref().child('player2data').set({
    userChoice: 'rock'
  });
  database.ref().on('value', function(snapshot) {
    $('#opponent-output').text(snapshot.child('player2data').val().userChoice);
  });  
});
// If player-2 chooses scissors:
$('#scissors-2').on('click', function() {
  event.preventDefault();
  database.ref().child('player2data').set({
    userChoice: 'scissors'
  });
  database.ref().on('value', function(snapshot) {
    $('#opponent-output').text(snapshot.child('player2data').val().userChoice);
  });
});
  
// Logic to determine a tie:
$('button').on('click', function() {
  database.ref().on('value', function(snapshot) {
    if (snapshot.child('player1data').val().userChoice === 'paper' && snapshot.child('player2data').val().userChoice === 'paper') {
      database.ref().child('ties').set({
        ties: ties++
      })
    $('#ties').text(snapshot.child('ties'));
    };
  });
})


// Logic for chat functionality:
// When the send button is clicked...
$('#send').on('click', function() {
  var chatInput = $('#chat-input').val();
  database.ref().child('chat').set({
    chatOutput: chatInput
  });
  database.ref().on('value', function(snapshot) {
    $('#chat-output').text(snapshot.child('chat').val().chatOutput);
  });
});
