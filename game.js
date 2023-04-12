
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red" ,"blue", "green", "yellow"];
var level = 0;

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePressed(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).on("keydown",function () {
    nextSequence();
});

function checkAnswer(currentlevel) {
    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
        console.log("success");
        if ( userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence()
            }, 500);
        }  
    }else{
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        userClickedPattern = [];
        gamePattern = [];
        level = 0;
        $("h1").text("Game Over, Press Any Key to Restart");
    }
    
}

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("level " + level);
}

function animatePressed(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}