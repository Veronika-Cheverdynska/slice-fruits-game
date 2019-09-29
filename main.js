let playing = false;
let score;
let livesLeft;
let fruits = ['apple', 'banana', 'cherries', 'grapes', 'lemon', 'orange', 'pineapple', 'raspberry', 'strawberry', 'watermelon'];
let step;
let action;

$(function() {
//Click on the start/reset button
$("#start-reset-btn").click(function() {
   //Check if we are playing
   if(playing === true) {
      //Reload page
      location.reload();
   }else{
      playing = true;
      $(".game-over").hide();
      score = 0;
      $("#score").html('Score: <span id="score-value">' + score + '</span>');
      livesLeft = 3;
      addHearts();
      //Change text of the button from start to reset
      $("#start-reset-btn").html("Reset Game");
      //Start sending fruits
      startAction();
   }
});

$("#fruit").mouseover(function () {
   sliceFruit();

});
$("#fruit").click(function () {
   sliceFruit();
});

//Functions
function sliceFruit() {
   score++;
   $("#score").html('Score: <span id="score-value">' + score + '</span>');
   document.querySelector("#slice-sound").play();
   //Stop fruit
   clearInterval(action);
   //Hide fruit
   $("#fruit").hide("explode", 500);

   //Send new fruit
   setTimeout(startAction, 500);
}

function addHearts() {
   $("#lives").empty();
   for(i = 0; i < livesLeft; i++){
      $("#lives").append('<i class="fas fa-heart life"></i>');
   }
}

function startAction() {
generateFruit();
//Genrate a random step
step = 1 + Math.round(3*Math.random());
action = setInterval(function() {
   $("#fruit").css('top', $("#fruit").position().top + step);
   //Check if the fruit is enough low
   if($("#fruit").position().top > $(".playing-board").height()){
      //Check if we have hearts left
      if(livesLeft > 0) {
         generateFruit();
         //Reduce lives by one
         livesLeft--;
         addHearts();
      }else{
         //Game Over
         playing = false;
         $("#start-reset-btn").html("Start Game");
         $("#score").html('');
         $(".game-over").html('<p>Game Over!</p><p>Your score is ' + score + '</p>');
         $(".game-over").css('display', 'flex');
         stopAction();
      }
   }
}, 10);
}

function chooseFruit() {
   //Generate a random fruit
   $("#fruit").attr('src', 'img/' + fruits[Math.round(9*Math.random())] + '.png');
}

function generateFruit() {
   $("#fruit").show();
   chooseFruit();
   $("#fruit").css({'left' : Math.round(($(".playing-board").width() - 60)*Math.random()), 'top' : -100});
}

function stopAction() {
   clearInterval(action);
   $("#fruit").hide();
}

});