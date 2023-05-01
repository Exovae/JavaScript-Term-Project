// Initialize variables to keep track of the game state
let sequence = [];
let humanSequence = [];
let level = 0;

// Select elements from the DOM that will be used for the game
const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');

// Function to allow the human player to take their turn
function humanTurn(level) {
  tileContainer.classList.remove('noclick');
  info.textContent = `Your turn: ${level} Tap${level > 1 ? 's' : ''}`;
}

// Function to highlight and play a sound for a specific colored tile
function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  // Add the "activated" class to the tile to highlight it
  tile.classList.add('activated');

  // Play the sound associated with the tile
  sound.currentTime = 0;
  sound.play();

  // Remove the "activated" class from the tile after 300ms to unhighlight it
  setTimeout(() => {
    tile.classList.remove('activated');
  }, 300);
}

// Function to play a round of tiles in the sequence
function playRound(nextSequence) {
  // Iterate through each color in the sequence and activate the corresponding tile with a delay
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600);
  });
}

// Function to randomly select the next color in the sequence
function nextStep() {
  const tiles = ['red', 'green', 'blue', 'yellow'];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}

// Function to start the next round of the game
function nextRound() {
  // Increment the level
  level += 1;

  // Disable clicking on tiles and display the level number and "Watch!" message
  tileContainer.classList.add('noclick');
  info.textContent = 'Watch!';
  heading.textContent = `Level ${level} of 5`;

  // Create a new sequence by copying the current sequence and adding the next color
  const nextSequence = [...sequence];
  nextSequence.push(nextStep());

  // Play the sequence of tiles
  playRound(nextSequence);

  // Update the sequence to the new sequence
  sequence = [...nextSequence];

  // Allow the human player to take their turn after a delay
  setTimeout(() => {
    humanTurn(level);
  }, level * 600 + 1000);
}
// Function that handles clicks on the game tiles
function handleClick(tile) {
    // Add clicked tile to the human sequence
    const index = humanSequence.push(tile) - 1;
  
    // Play sound associated with the clicked tile
    const sound = document.querySelector(`[data-sound='${tile}']`);
    sound.play();
  
    // Calculate remaining taps for the current round
    const remainingTaps = sequence.length - humanSequence.length;
  
    // If the current tile does not match the sequence, end the game
    if (humanSequence[index] !== sequence[index]) {
      return resetGame('Game over', false);
    }
    
    // If the human sequence matches the sequence for the round
    if (humanSequence.length === sequence.length) {
      // If the human sequence matches the sequence for level 5, end the game with a win
      if (humanSequence.length === 5) {
        return resetGame('Congratulations!', true);
      }
  
      // Start the next round after a short delay
      humanSequence = [];
      info.textContent = 'Good one!';
      setTimeout(() => {
        nextRound();
      }, 1000);
      return;
    }
  
    // Update info text to display the remaining taps for the current round
    info.textContent = `Your turn: ${remainingTaps} Tap${
      remainingTaps > 1 ? 's' : ''
    }`;
  }
  
  // Function that starts the game
  function startGame() {
    // Hide the start button and show the game info and tiles
    startButton.classList.add('hidden');
    info.classList.remove('hidden');
    tileContainer.classList.remove('noclick');
    // Start the first round
    nextRound();
  }
  
  // Add event listeners for the start button and game tiles
  startButton.addEventListener('click', startGame);
  tileContainer.addEventListener('click', event => {
    const { tile } = event.target.dataset;
  
    if (tile) handleClick(tile);
  });
  
  // Function that displays end game message and buttons
  function displayEndMessage(win) {
    const message = document.createElement('div');
    message.innerText = win ? "You win!" : "You lose";
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
  
  // Function that resets the game
  function resetGame(text, win) {
    sequence = [];
    humanSequence = [];
    level = 0;
    // Show the start button and hide the game info and tiles
    startButton.classList.remove('hidden');
    heading.textContent = 'Simon';
    info.classList.add('hidden');
    tileContainer.classList.add('noclick');
    
    // Display the end game message and buttons
    displayEndMessage(win);
  }
  