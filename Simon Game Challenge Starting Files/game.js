var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "green", "blue", "yellow"];
var level = 0; 
var started = false;
var firstTime = true;

$(document).keypress(function () { 
    if(level === 0  && started == false){
        started = true;
        nextSequence();
    }
});

$(".row div").click(function () { 
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
    });

function nextSequence(){
    var randomNumber = Math.floor((Math.random())*4);
    var randomChoosenColours = buttonColours[randomNumber];
    
    gamePattern.push(randomChoosenColours);
    $("#"+ randomChoosenColours).fadeIn(100).fadeOut(100).fadeIn(100);    
   
  playSound(randomChoosenColours);
  animatePress(randomChoosenColours);
  
  level = level + 1;
  $("h1").text("level "+ level);
  userClickedPattern = [];
  
}






function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
     }

function animatePress(currentColour){
     $("#"+currentColour).addClass("pressed");
     setTimeout(function removeC(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}



function checkAnswer(currentLevel){
    var gpLength = gamePattern.length;
    var ucpLength = userClickedPattern.length;    
    if (userClickedPattern[currentLevel]== gamePattern[currentLevel]) {
        console.log("success");

        if (gpLength === ucpLength){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
        }


else{
    console.log("wrong");
    var audioWrong = new Audio("sounds/wrong.mp3");
    audioWrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 100);
    $("h1").text(`Chutiya sala, <br> chal dubara start kr by pressing key`);
    $(document).keydown(function () { 
        startOver();
    });
}

}

function startOver(){
    gamePattern = [];
    started = false;
    level = 0;
}
















