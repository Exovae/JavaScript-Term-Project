const cards = document.querySelectorAll('.card');
const totalPairs = cards.length / 2;

let cardFlipped = false;
let allowFlip = false;
let firstCard, secondCard;
let matchedCount = 0;


function flipCard() {
  if (allowFlip) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!cardFlipped) {
    cardFlipped = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  matchCheck();
}

function matchCheck() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  allowFlip = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [cardFlipped, allowFlip] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function matchCheck() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  
    if (isMatch) {
      matchedCount++;
      disableCards();
      if (matchedCount === totalPairs) {
        // All cards are matched, display a message
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
    document.body.appendChild(message);
    } else {
      unflipCards();
    }
  };