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

function getEmoji(choice) {
  if (choice === "rock") return "🪨";
  if (choice === "paper") return "📄";
  return "✂️";
}

// Update UI
function updateUI(player, computer, result) {
  playerChoiceText.textContent = `You chose: ${player}`;
  computerChoiceText.textContent = `Computer chose: ${computer}`;
  
  resultText.className = "";

  if (result === "win") {
    resultText.textContent = "You win! 🎉";
    resultText.classList.add("win");
    launchConfetti();
  } else if (result === "lose") {
    resultText.textContent = "You lose! 😢";
    resultText.classList.add("lose");
    flashScreen();
  } else {
    resultText.textContent = "It's a tie!";
    resultText.classList.add("tie");
  }

  winsText.textContent = wins;
  lossesText.textContent = losses;
  tiesText.textContent = ties;
}

/* CONFETTI */
function launchConfetti() {
  const duration = 1000; // 5 seconds
  const end = Date.now() + duration;

  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }

    for (let i = 0; i < 15; i++) { // spawn multiple per frame
      const confetti = document.createElement("div");

      confetti.style.position = "fixed";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
      confetti.style.top = "-10px";
      confetti.style.left = Math.random() * window.innerWidth + "px";
      confetti.style.opacity = "0.9";
      confetti.style.pointerEvents = "none";
      confetti.style.borderRadius = "2px";

      confetti.style.transition = "transform 3s linear, opacity 3s";

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.style.transform = `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 360}deg)`;
        confetti.style.opacity = "0";
      }, 10);

      setTimeout(() => confetti.remove(), 3000);
    }

  }, 150); // keeps spawning continuously
}
/* RED FLASH */
function flashScreen() {
  flash.classList.add("show");
  setTimeout(() => {
    flash.classList.remove("show");
  }, 1000);
}

/* RESET */
resetBtn.addEventListener("click", () => {
  wins = 0;
  losses = 0;
  ties = 0;

  winsText.textContent = 0;
  lossesText.textContent = 0;
  tiesText.textContent = 0;

  resultText.textContent = "Make your move!";
  emojiDisplay.textContent = "❓ vs ❓";
});
