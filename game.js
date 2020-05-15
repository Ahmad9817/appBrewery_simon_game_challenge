var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// detects click and carries out actions

$(".btn").click(function () {
  var userChoosenColour = $(this).attr("id");
  userClickedPattern.push(userChoosenColour);

  playSound(userChoosenColour);
  animatePress(userChoosenColour);

  checkAnswer(userClickedPattern.length - 1)
})



// Adding Click Animation to the button

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(removeTheClass, 100);

  function removeTheClass() {
    $("." + currentColour).removeClass("pressed");
  }
}


$("body").keypress(function() {
  if (!started) {
    nextSequence();
    $("#level-title").text("Level " + level)
    started = true;
  }
});


function nextSequence() {
  userClickedPattern = [];

  randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);

  console.log(gamePattern);
  $("#" + randomChoosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColour);

  level++;
  $("#level-title").text("Level " + level)

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  }

  else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {$("body").removeClass("game-over")}, 200)
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}

