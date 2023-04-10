// Get DOM elements
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const canvas = document.getElementById("canvas");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const resultText = document.getElementById("result-text");

// Define options object
let options = {
  animals: [
    "Dog",
    "Cat", 
    "Tiger", 
    "Horse", 
    "Squirrel", 
    "Giraffe",
    "Snake"
  ],
  fruits: [
    "Apple",
    "Banana",
    "Orange",
    "Watermelon",
    "Pear",
    "Strawberry",
    "Lemon"
  ],
  countries: [
    "Denmark",
    "Australia",
    "Armenia",
    "Ireland",
    "Yemen",
    "Zimbabwe",
    "Latvia"
  ],
};

// Declare variables
let count = 0;
let winCount = 0;
let chosenWord = "";

// Function to display options buttons
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Choose A Catagory</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

// Function to disable buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

// Function to generate word based on selected option
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";
  let optionArray = options[optionValue];
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  userInputSection.innerHTML = displayItem;
};

const initializer = () => {
    // Initialize win count and guess count to 0
    winCount = 0;
    count = 0;
  
    // Clear out the letter and options containers
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
  
    // Hide letter and new game container
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
  
    // Clear out the letter container
    letterContainer.innerHTML = "";
  
    // Create an array of letter rows
    let letters = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  
    // Loop through each letter row and create buttons for each letter
    for (let i = 0; i < letters.length; i++) {
      let row = letters[i];
      let rowDiv = document.createElement("div");
      rowDiv.classList.add("letter-row");
  
      // Loop through each letter in the row and create a button for it
      for (let j = 0; j < row.length; j++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = row[j];
  
        // Add an event listener to the button to handle guessing
        button.addEventListener("click", () => {
          let charArray = chosenWord.split("");
          let dashes = document.getElementsByClassName("dashes");
  
          // Check if the guessed letter is in the chosen word
          if (charArray.includes(button.innerText)) {
            charArray.forEach((char, index) => {
              if (char === button.innerText) {
                dashes[index].innerText = char;
                winCount += 1;
  
                // If all letters have been guessed, display a win message and block further input
                if (winCount == charArray.length) {
                  resultText.innerHTML = `<h2 class='win-msg'>You Win!</h2><p>The word was <span>${chosenWord}</span></p>`;
                  blocker();
                }
              }
            });
          } else {
            count += 1;
  
            // Draw another part of the hangman on an incorrect guess
            drawMan(count);
  
            // If the hangman is complete, display a loss message and block further input
            if (count == 6) {
              resultText.innerHTML = `<h2 class='lose-msg'>You Lost</h2><p>The word was <span>${chosenWord}</span></p>`;
              blocker();
            }
          }
  
          // Disable the guessed letter button
          button.disabled = true;
        });
  
        // Add the button to the letter row
        rowDiv.appendChild(button);
      }
  
      // Add the row to the letter container
      letterContainer.appendChild(rowDiv);
    }
  
    // Display the options for category selection
    displayOptions();
  
    // Draw the initial hangman
    let { initialDrawing } = canvasCreator();
    initialDrawing();
  };

// Creates a canvas object for drawing the hangman
const canvasCreator = () => {
    // Get the canvas element from the HTML
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2.5;
  
    // Function to draw a line
    const drawLine = (fromX, fromY, toX, toY) => {
      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.stroke();
    };
  
    // Draw a circle for the head
    const head = () => {
      context.beginPath();
      context.arc(70, 30, 10, 0, Math.PI * 2, true);
      context.stroke();
    };
  
    // Draw a line for the body
    const body = () => {
      drawLine(70, 40, 70, 80);
    };
  
    // Draw a line for the left arm
    const leftArm = () => {
      drawLine(70, 50, 50, 70);
    };
  
    // Draw a line for the right arm
    const rightArm = () => {
      drawLine(70, 50, 90, 70);
    };
  
    // Draw a line for the left leg
    const leftLeg = () => {
      drawLine(70, 80, 50, 110);
    };
  
    // Draw a line for the right leg
    const rightLeg = () => {
      drawLine(70, 80, 90, 110);
    };
  
    // Function to draw the initial hangman
    const initialDrawing = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      drawLine(10, 130, 130, 130);
      drawLine(10, 10, 10, 131);
      drawLine(10, 10, 70, 10);
      drawLine(70, 10, 70, 20);
    };
  
    // Return the functions as an object
    return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
  };
  
  // Function to draw the different parts of the hangman based on the count
  const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
      case 1:
        head();
        break;
      case 2:
        body();
        break;
      case 3:
        leftArm();
        break;
      case 4:
        rightArm();
        break;
      case 5:
        leftLeg();
        break;
      case 6:
        rightLeg();
        break;
      default:
        break;
    }
  };

// Event listener for clicking the new game button
newGameButton.addEventListener("click", initializer);
window.onload = initializer;

const returnButton = document.getElementById("returnButton");
returnButton.addEventListener('click', () => {
  window.location.href = "https://lisabalbach.com/richa518/CIT190/FinalProject/finalsGames.html";
});


  
