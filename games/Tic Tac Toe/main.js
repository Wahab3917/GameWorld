// Tic Tac Toe

const XCLASS = 'x';
const CIRCLECLASS = 'circle';
const WINNINGCOMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMsgElement = document.getElementById('winningMsg');
const winningMsgTextElement = document.querySelector('[data-winning-msg-text]');
const restartBtn = document.getElementById('restartBtn');

let circleTurn = false;

startGame();

function startGame() {
  cellElements.forEach(cell => {
    cell.classList.remove(XCLASS);
    cell.classList.remove(CIRCLECLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });

  setBoardHoverClass();
  winningMsgElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLECLASS : XCLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  }
  else if (isDraw()) {
    endGame(true);
  }
  else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMsgTextElement.innerText = 'Draw!';
  }
  else {
    winningMsgTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMsgElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(XCLASS) || cell.classList.contains(CIRCLECLASS);
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(XCLASS);
  board.classList.remove(CIRCLECLASS);
  if (circleTurn) {
    board.classList.add(CIRCLECLASS);
  }
  else {
    board.classList.add(XCLASS);
  }
}

function checkWin(currentClass) {
  return WINNINGCOMBINATIONS.some(combinations => {
    return combinations.every(index => {
      return cellElements[index].classList.contains(currentClass);
    })
  });
}

restartBtn.addEventListener('click', startGame);

