var hangman;

function Hangman() {
  this.words = ["sweden", "brazil", "spain", "germany"];
  this.secretWord = "";
  this.letters = [];
  this.guessedLetter = "";
  this.errorsLeft = 5;
  this.messages = {
    win: "You won!",
    loose: "Game over!",
    guessed: "You already guessed this letter, please try again..",
    notValidLetter: "Please enter a valid letter from a-z",
  };
}

Hangman.prototype._getWord = function() {
  return this.words[Math.floor(Math.random() * this.words.length)];
};

Hangman.prototype._checkIfLetter = function(keyCode) {
  return /^[a-zA-Z]*$/.test(String.fromCharCode(keyCode));
};

Hangman.prototype._checkClickedLetters = function(key) {
  return !this.letters.includes(key);
};

Hangman.prototype._addCorrectLetter = function(key) {
  if (this.secretWord.includes(key)) {
    console.log(`${key} is part of the secret word`);
    for (let ix = 0; ix < hangman.secretWord.length; ix++) {
      if (hangman.secretWord[ix] === key) {
        this.guessedLetter += key;
      }
    }
    if (this._checkWinner()) {
      console.log(this.messages.win);
    }
  } else {
    console.log(`${key} is NOT part of the secret word`);
    this._addWrongLetter();
    if (this._checkGameOver()) {
      console.log(this.messages.loose);
    }
  }
};

Hangman.prototype._addWrongLetter = function(letter) {
  return this.secretWord.includes(letter)
    ? this.errorsLeft
    : (this.errorsLeft -= 1);
};

Hangman.prototype._checkGameOver = function() {
  return this.errorsLeft === 0;
};

Hangman.prototype._checkWinner = function() {
  return (
    this.secretWord
      .split("")
      .sort()
      .join("") ===
    this.guessedLetter
      .split("")
      .sort()
      .join("")
  );
};

document.getElementById("start-game-button").onclick = function() {
  hangman = new Hangman();
  hangman.secretWord = hangman._getWord();
  console.log(hangman.secretWord);
};

document.onkeydown = function(e) {
  if (hangman != undefined) {
    // Check if char is a valid alpha char.
    if (hangman._checkIfLetter(e.keyCode)) {
      // Check if we already
      if (hangman._checkClickedLetters(e.key)) {
        hangman._addCorrectLetter(e.key);
        hangman.letters.push(e.key);
      } else {
        console.log(hangman.messages.guessed);
      }
    }
  } else {
    console.log(hangman.messages.notValidLetter);
  }
};
