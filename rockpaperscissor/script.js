// Score tracking
let score = {
  wins: 0,
  losses: 0,
  ties: 0
};

// Choices
const choices = ["rock", "paper", "scissors"];

// Select elements
const buttons = document.querySelectorAll(".buttons button");
const playerChoiceText = document.getElementById("player-choice");
const computerChoiceText = document.getElementById("computer-choice");
const resultText = document.getElementById("result-text");

const winsText = document.getElementById("wins");
const lossesText = document.getElementById("losses");
const tiesText = document.getElementById("ties");

// Optional reset button (if you add one in HTML)
const resetBtn = document.getElementById("reset");

// Add event listeners to buttons
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    playGame(playerChoice);
  });
});

// Main game function
function playGame(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = getResult(playerChoice, computerChoice);

  updateUI(playerChoice, computerChoice, result);
  updateScore(result);
}

// Generate random computer choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Determine result
function getResult(player, computer) {
  if (player === computer) return "tie";

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win";
  }

  return "loss";
}

// Update UI text
function updateUI(player, computer, result) {
  playerChoiceText.textContent = `You chose: ${capitalize(player)}`;
  computerChoiceText.textContent = `Computer chose: ${capitalize(computer)}`;

  if (result === "win") {
    resultText.textContent = "You win! 🎉";
  } else if (result === "loss") {
    resultText.textContent = "You lose! 😢";
  } else {
    resultText.textContent = "It's a tie! 🤝";
  }
}

// Update score
function updateScore(result) {
  if (result === "win") score.wins++;
  else if (result === "loss") score.losses++;
  else score.ties++;

  winsText.textContent = score.wins;
  lossesText.textContent = score.losses;
  tiesText.textContent = score.ties;
}

// Capitalize helper
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Reset function
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    score = { wins: 0, losses: 0, ties: 0 };

    winsText.textContent = 0;
    lossesText.textContent = 0;
    tiesText.textContent = 0;

    playerChoiceText.textContent = "You chose: -";
    computerChoiceText.textContent = "Computer chose: -";
    resultText.textContent = "Result will appear here";
  });
}