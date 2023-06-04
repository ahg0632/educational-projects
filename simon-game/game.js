
const buttonColors = ["red", "blue", "green", "yellow"];

const gamePattern = [];

var userClickedPattern = [];

// const gameMasterPattern = [];

var started = false

var level = 0

function nextSequence() {
    level++;
    $("#level-title").text("Level "+ level);
    var randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColor);
    // return gamePattern.length


    $(document).ready(function() {
        new Audio('/sounds/' + randomChosenColor +'.mp3').play();
        $("#" + randomChosenColor).fadeToggle( "fast", "linear" );
        $("#" + randomChosenColor).fadeToggle( "fast", "linear" );
    });

};


$(".btn").click(function() {
    var userClick = $(this).attr("id");
    userClickedPattern.push(userClick);
    new Audio('/sounds/' + userClick +'.mp3').play();
    animatePress(userClick);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level "+ level);
        nextSequence();
        userClickedPattern = [];
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        gOver();
    }
};

function gOver() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    started = false
    level = 0
    userClickedPattern = [];
}