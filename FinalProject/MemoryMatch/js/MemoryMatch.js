// Select all elements with class "card" and store them in the "cards" array
const cards = document.querySelectorAll('.card');

// Calculate the total number of pairs of cards by dividing the length of the "cards" array by 2
const totalPairs = cards.length / 2;

// Initialize variables for tracking the state of the game
let cardFlipped = false;
let allowFlip = false;
let firstCard, secondCard;
let matchedCount = 0;

// Function to handle card flipping
function flipCard() {
  // If the game is not in a state where cards can be flipped, return
  if (allowFlip) return;
  // If the clicked card is the first card or if it is already flipped, return
  if (this === firstCard) return;

  // Add the "flip" class to the clicked card to show that it has been flipped
  this.classList.add('flip');

  // If this is the first card flipped, store it in "firstCard" and return
  if (!cardFlipped) {
    cardFlipped = true;
    firstCard = this;

    return;
  }

  // If this is the second card flipped, store it in "secondCard" and check if the cards match
  secondCard = this;
  matchCheck();
}

// Function to check if the two flipped cards match
function matchCheck() {
  // Check if the two flipped cards have the same data attribute value
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  // If they match, disable clicking on those cards and reset the board
  isMatch ? disableCards() : unflipCards();
}

// Function to disable clicking on matched cards and reset the board
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

// Function to unflip cards if they don't match, and reset the board
function unflipCards() {
  allowFlip = true;

  // Wait 1500ms before removing the "flip" class from the two cards and resetting the board
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

// Function to reset the game board
function resetBoard() {
  // Reset variables for tracking the state of the game
  [cardFlipped, allowFlip] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Immediately-invoked function expression to shuffle the cards on page load
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// Add event listener for clicking on each card to flip it
cards.forEach(card => card.addEventListener('click', flipCard));

// Function to check if the two flipped cards match and display a message if all cards have been matched
function matchCheck() {
  // Check if the two flipped cards have the same data attribute value
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  // If they match, increment the count of matched pairs, disable clicking on those cards, and check if all cards have been matched
// Check if the two flipped cards match
if (isMatch) {
  // Increment the count of matched pairs
  matchedCount++;

  // Disable clicking on the matched cards
  disableCards();

  // If all cards have been matched, display a message and buttons to play again or return to the menu
  if (matchedCount === totalPairs) {
    const message = document.createElement('div');
    message.innerText = "You win!";
    message.classList.add('message');
    document.body.appendChild(message);
  
    const playAgainBtn = document.createElement('button');
    playAgainBtn.innerText = "Play again";
    playAgainBtn.addEventListener('click', () => {
      window.location.reload();
    });
    message.appendChild(playAgainBtn);
  
    const returnBtn = document.createElement('button');
    returnBtn.innerText = "Return to menu";
    returnBtn.addEventListener('click', () => {
      window.location.href = "https://lisabalbach.com/richa518/CIT190/FinalProject/finalsGames.html";
    });
    message.appendChild(returnBtn);
  }

  // Display the message
  document.body.appendChild(message);
} else {
  // If the cards don't match, unflip them
  unflipCards();
}
};