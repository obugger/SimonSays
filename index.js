//Var for storing all colours
var buttonColours = ["red", "blue", "green", "yellow"];
//Variable for storing the pattern of the game.
var gamePattern = [];
//Variable for storing the pattern of the user.
//userClickedPatter will be later compared to gamePattern to code the logic
//of the winning/losing condition.
var userClickedPattern = [];
//This variable is to create the scenario of when the game is started or not.
var started = false;
//Starting level variable.
var level = 0;

//Keyboard input to start the game.
$(document).keydown(function() {

  //If started, change the H1 to level x where x is level of game.
  if(!started) {
    $("#level-title").text("Level " + level);
  //Initiate the simon says sequence and start the game.
    nextSequence();
    started = true;
  }
});

//To check if user's input = game pattern.
function winLose (currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function(){
          nextSequence();
        }, 1000);
      }
    }
    else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over. Press Any Key to Restart.")

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
//To get a random number 0-3 for indexing the colour array:
  var randomNumber = Math.floor(Math.random() * 4);
//Picking a colour at random using the random index variable:
  var randomChosenColour = buttonColours[randomNumber];
//Filling up the Simon Says colour pattern in the empty array:
  gamePattern.push(randomChosenColour);
//The above is the backend for the game choosing the colour at random.

//Animation
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  //Below sound will play for the entire function.
    playSound(randomChosenColour);
  }


//The below code is for the USER to input colour from memory to play.
  $(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    winLose(userClickedPattern.length-1);
  });


//New function to essentially save all sounds.
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Function to add animation of button being clicked.
function animatePress(currentColor) {

  $("#" + currentColor).addClass(".pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass(".pressed");}, 100)

}

function startOver () {
  level = 0;
  started = false;
  gamePattern = [];
}
