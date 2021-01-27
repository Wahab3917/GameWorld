'use strict';

const car = document.querySelector('#car');
const obstacle = document.querySelector('#obstacle');
let counter = 0;

const playBtn = document.querySelector('#play-btn');
let startgame = false;

const up = new Audio();
up.src = 'audio/up.wav';

const dead = new Audio();
dead.src = 'audio/dead.mp3';

function start() {

  startgame = true;

  function jump() {
    if (car.classList != 'jump') {
      car.classList.add('jump');
    }
  
    setTimeout(function() {
      car.classList.remove('jump');
    }, 300);
  }

  let isAlive = setInterval(function() {
    // getting current car y position
    let carTop = parseInt(window.getComputedStyle(car).getPropertyValue('top'));
    
    // getting current obstacle x position
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
  
    // getting collision
    if (obstacleLeft < 100 && obstacleLeft > -20 && carTop >= 150) {
      obstacle.style.animation = "none";
      
      dead.play();
      alert(`Game Over, Your Score: ` + Math.floor(counter/100));
  
      counter = 0;
      obstacle.style.animation = "block 1000ms infinite linear";
    }
    else {
      counter++;
      document.querySelector('#score-span').innerHTML = Math.floor(counter/100);
    }
  
  }, 10);
    
  document.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 || e.keyCode == 38){
      jump();
      up.play();
    }
  });  

}

playBtn.addEventListener('click', function() {
  if (!startgame) {
    start();
  } else return

  obstacle.style.animation = "block 1000ms infinite linear";
})


