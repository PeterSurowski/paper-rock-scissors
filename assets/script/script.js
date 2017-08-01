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
var userChoice;
var opponentChoice;
var userComments;
var userWins = 0;
var opponentWins = 0;
var ties = 0;

//If the player chooses player 1...
$('#player-1').on('click', function() {
  $('.container, .input-group').show();
  $('#choose-screen').hide();
  $('#player-2-image').attr('src', 'assets/images/neighborhood-watch450X200.jpg')
})

// If the user chooses paper...
$('#paper').on('click', function() {
  event.preventDefault();
  // Change the userChoice var in the database to "paper."
  database.ref().set({
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
    userChoice: userChoice
  });
  database.ref().on('value', function(snapshot) {
    $('#user-output').text(snapshot.val().userChoice);
  });  
});

$('#scissors').on('click', function() {
  event.preventDefault();
  userChoice = 'scissors';
  database.ref().set({
    userChoice: userChoice
  });
  database.ref().on('value', function(snapshot) {
    $('#user-output').text(snapshot.val().userChoice);
  });
});
  
// I might need this later:
/*
  });*/
   
