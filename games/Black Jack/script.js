// Blackjack

let blackjackGame = {
  'you': {'scoreSpan': '#your-result', 'div': '#your-box', 'score': 0},
  'dealer': {'scoreSpan': '#dealer-result', 'div': '#dealer-box', 'score': 0},
  'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
  'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]},
  'wins': 0,
  'loses': 0,
  'draws': 0,
  'isStand': false,
  'turnsOver': false
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('sounds/swish.m4a');

const winSound = new Audio('sounds/cash.mp3');

const loseSound = new Audio('sounds/aww.mp3');

document.querySelector('#hit-button').addEventListener('click', blackjackHit);

document.querySelector('#stand-button').addEventListener('click', dealerLogic);

document.querySelector('#deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
  if (blackjackGame['isStand'] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `img/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  if (blackjackGame['turnsOver'] === true) {  

    blackjackGame['isStand'] = false;

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }

    for (k = 0; k < dealerImages.length; k++) {
      dealerImages[k].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-result').textContent = 0;
    document.querySelector('#dealer-result').textContent = 0;

    document.querySelector('#your-result').style.color = '#fff';
    document.querySelector('#dealer-result').style.color = '#fff';

    document.querySelector('#result').textContent = 'Let\'s Play';
    document.querySelector('#result').style.color = '#000';

    blackjackGame['turnsOver'] = true;
  }
}

function updateScore(card, activePlayer) {
  if (card === 'A') {
  // If adding 11 keeps the score below 21, add 11. Otherwise, add 1
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1] 
    }
    else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
  }
  else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
  }
  else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
  blackjackGame['isStand'] = true;

  while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }

  blackjackGame['turnsOver'] = true;

  let winner = computeWinner();
  showResult(winner);

}


function computeWinner() {
  let winner;

  if (YOU['score'] <= 21) {

    if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
      blackjackGame['wins']++;
      winner = YOU;
    }
    else if (YOU['score'] < DEALER['score']) {
      blackjackGame['loses']++;
      winner = DEALER;
    }
    else if (YOU['score'] === DEALER['score']) {
      blackjackGame['draws']++;
    }

  }

  else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
    blackjackGame['loses']++;
    winner = DEALER;  
  }

  else if (YOU['score'] > 21 && DEALER['score'] > 21) {
    blackjackGame['draws']++;
  }

  console.log('Winner is ', winner);
  return winner;

}


function showResult(winner) {
  let message, messageColor;

  if (blackjackGame['turnsOver'] === true) {
    if (winner === YOU) {
      document.querySelector('#wins').textContent = blackjackGame['wins'];

      message = 'You Won!';
      messageColor = 'green';
      winSound.play();
    }
    else if (winner === DEALER) {
      document.querySelector('#loses').textContent = blackjackGame['loses'];

      message = 'You lose!';
      messageColor = 'red';
      loseSound.play();
    }
    else {
      document.querySelector('#draws').textContent = blackjackGame['draws'];

      message = 'You Draw!';
      messageColor = 'yellow';
    }

    document.querySelector('#result').textContent = message;
    document.querySelector('#result').style.color = messageColor;
  }
}


