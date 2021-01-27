'use strict';

// Selecting All Elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const player0Score = document.querySelector('#score--0');
const player1Score = document.querySelector('#score--1');

const player0CurScore = document.querySelector('#current--0');
const player1CurScore = document.querySelector('#current--1');

const dice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


// Starting Conditions
let playing, scores, currentScore, activePlayer;

function init() {

  playing = true;

  dice.classList.add('hidden');

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');

  activePlayer = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  

  scores = [0, 0];
  player0Score.textContent = 0;
  player1Score.textContent = 0;
  
  currentScore = 0;
  player0CurScore.textContent = 0;
  player1CurScore.textContent = 0;

};

init();


function switchFunction() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  
  // Switch to the next player
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active'); 
}


// Rolling the dice functionality
btnRoll.addEventListener('click', function() {
  if (playing) {
    // Generating a random dice roll
    const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    dice.classList.remove('hidden');
    dice.src = `img/dice-${randomDiceNumber}.png`;
    
    // Check for rolled 1: if true, switch to next player 
    if (randomDiceNumber !== 1) {
      // Add dice number to the current score
      currentScore += randomDiceNumber;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } 
    else {
      // Switch to the next player
      switchFunction();
    } 
  }
});


btnHold.addEventListener('click', function() {
  if (playing) {
    // Add current score to the active player's score
    scores[activePlayer] += currentScore; 
    document.getElementById(`score--${activePlayer}`).textContent  = scores[activePlayer]; 

    // Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;

      dice.classList.add('hidden');

      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }
    else {
      // Switch to the next player
      switchFunction();
    }
  }
});


btnNew.addEventListener('click', init);


