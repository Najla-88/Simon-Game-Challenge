var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

// only in the begining start the game with keypress
$(document).keypress(function() {
    if (!started) {
        nextSequence();
        started = true;
    }
})

// an event listener for any press on the buttons
$('.btn').on('click', function() {

    if (started) {
        // get the button color from its id value
        var userChosenColour = $(this).attr('id');

        // store the user clicked inside array (Log clicks)
        userClickedPattern.push(userChosenColour);

        // make animate for the button that clicked based on its color
        animatePress(userChosenColour);

        // play sound for the button that clicked based on its color
        playSound(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
    }
});

function nextSequence() {

    // make the userClickedPattern null in every new level 
    userClickedPattern = [];

    // change the title every time call this function
    $('#level-title').text('Level ' + ++level);

    // generate random number between 0 and 3
    var randomNumber = Math.floor(Math.random() * 4);

    // get the color from buttonColors by the random number
    var randomChosenColor = buttonColors[randomNumber];

    // store the color in array 
    gamePattern.push(randomChosenColor);

    // play sound for the random color generated
    playSound(randomChosenColor);

    // time for the fade = 100 millisecond = 1 second
    var fadeTime = 100;
    // to make animate for the button that its sound played
    $('#' + randomChosenColor).fadeIn(fadeTime).fadeOut(fadeTime).fadeIn(fadeTime);
}

function playSound(name) {
    // play sound based on the color name
    var sound = new Audio("sounds/" + name + '.mp3');
    sound.play();
}

function animatePress(currentColour) {
    // make animate on button based on the color name
    $('#' + currentColour).addClass('pressed');
    setTimeout(function() {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // console.log("Success");
        if ((currentLevel + 1) == level) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        $('#level-title').text('Game Over, Press Any Key to Restart.');
        $('body').addClass('game-over');
        playSound('wrong');
        setTimeout(function() {
            $('body').removeClass('game-over');
            startOver();
        }, 200);
    }

}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}