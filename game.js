var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

if (!started) {
    document.getElementsByClassName("btn").disabled = true;
}
$(document).keypress(function (event) {
    if (!started) {
        nextSequence();
        $("#level-info").hide();
        started = true;

    }
    // $("#level-title").text("Level "+ level);

});

function nextSequence() {
    

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeTo(100, 0.3, function () { $(this).fadeTo(500, 1.0); });
    
}


$(".btn").click(function (e) {
if(started){
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    var index = userClickedPattern.length - 1;

    checkAnswer(index);
}
});

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, 100);

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

        playSound("wrong");
        $(document.body).addClass("game-over");
        setTimeout(function () {
            $(document.body).removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("#level-info").text("Uh-Ohh!! Try again ");
        startOver();
    }


}
if (!started) {
    document.getElementsByClassName("btn").disabled = true;
}
function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
    $("#level-info").show();

}