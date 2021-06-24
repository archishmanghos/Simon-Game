
var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var countLevel=0;
var gameStart=false;

$("body").keypress(function(){
    if(!gameStart)
    {
        $("#level-title").text("Level " + countLevel);
        started=true;
        nextSequence();
    }
})

function nextSequence(){
    userClickedPattern = [];
    ++countLevel;
    $("#level-title").text("Level " + countLevel);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var selectID="#"+randomChosenColour;
    $(selectID).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function startOver(){
    gamePattern=[];
    userClickedPattern=[];
    countLevel=0;
    gameStart=false;
}

function checkIfSame(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");
        if(gamePattern.length===userClickedPattern.length)
        {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function handler(e){
    var userChosenColour=e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkIfSame(userClickedPattern.length-1);
}

function playSound(name){
    var music="sounds/"+name+".mp3";
    var audio = new Audio(music);
    audio.play();
}

function animatePress(currentColour){
    var idName="#"+currentColour;
    $(idName).addClass("pressed");
    setTimeout(function(){
        $(idName).removeClass("pressed");
    },100);
}

$(".btn").click(handler);
