let gamePattern = [];
let userClickedPattern = [];
let buttonColor = ["red", "green", "yellow", "blue"];
level = 0 ;

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColor[randomNumber];
    gamePattern.push(randomColor);
    $("#"+ randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);    
    colorSound(randomColor);
    level++;
    $("#level-title").text("LEVEL " + level);   
}

$(".btn").on("click", function () {
    let thisButton = $(this).attr("id");
    colorSound(thisButton);
    buttonPressed(thisButton);
    userClickedPattern.push(thisButton);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 500);
        }   
    }else{
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        gamePattern =[];
        level=0;
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }
}

$(document).on("keydown",function () {
    if(gamePattern.length === 0){
        nextSequence();
    }
})

function colorSound(color){
    let audio = new Audio("sounds/"+ color +".mp3");
    audio.play();
}

function buttonPressed(which){
    $("#"+ which).addClass("pressed");
    setTimeout(function () {
        $("#"+ which).removeClass("pressed");
    }, 200);
}