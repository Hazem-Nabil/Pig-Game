'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
////////////////////// Buttons /////////////////////////
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
///////////////////////////////////////////////
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0Name = document.querySelector('#name--0');
const player1Name = document.querySelector('#name--1');

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;

let scores, currentScore, activePlayer, playing;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  player0Name.textContent = 'player 1';
  player1Name.textContent = 'player 2';
};
init();

// The Rolling Functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating A Dice Roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    //   console.log(diceRoll);

    // display dice Roll
    diceEl.classList.remove('hidden');

    //   choose a random dice
    diceEl.src = `img/dice-${diceRoll}.png`;

    //   check if the dice is 1 ;
    if (diceRoll !== 1) {
      currentScore += diceRoll;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // switch to the other player
    } else {
      switchPlayer();
    }
  }
});

// hold btn Functionality

btnHold.addEventListener('click', function () {
  // add current score to the active player's score
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      // finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      document.querySelector(`#name--${activePlayer}`).textContent =
        'Winner...✨🎈';
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

// Reset btn Functionality

btnNew.addEventListener('click', init);
