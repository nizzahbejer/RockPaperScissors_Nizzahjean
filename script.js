// Score tracking
let wins = 0;
let losses = 0;
let ties = 0;

// Select elements
const buttons = document.querySelectorAll("button");
const playerChoiceText = document.getElementById("player-choice");
const computerChoiceText = document.getElementById("computer-choice");
const resultText = document.getElementById("result-text");

const winsText = document.getElementById("wins");
const lossesText = document.getElementById("losses");
const tiesText = document.getElementById("ties");

const resetBtn = document.getElementById("reset");
const flash = document.getElementById("flash");




// Choices array
const choices = ["rock", "paper", "scissors"];

// Add click event to each button
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    const computer = choices[Math.floor(Math.random() * 3)];
    const result = getResult(player, computer);

    updateUI(player, computer, result);
  });
});

// Random computer choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Determine winner
function getResult(player, computer) {
  if (player === computer) {
    ties++;
    return "It's a tie!";
  }

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    wins++;
    return "You win! 🎉";
  } else {
    losses++;
    return "You lose! 😢";
  }
}

// Update UI
function updateUI(player, computer, result) {
  playerChoiceText.textContent = `You chose: ${player}`;
  computerChoiceText.textContent = `Computer chose: ${computer}`;
  resultText.textContent = result;

  winsText.textContent = wins;
  lossesText.textContent = losses;
  tiesText.textContent = ties;
}
