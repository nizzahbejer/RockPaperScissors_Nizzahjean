// SCORE
let wins = 0;
let losses = 0;
let ties = 0;

// ELEMENTS
const gameButtons = document.querySelectorAll(".buttons button");

const playerChoiceText = document.getElementById("player-choice");
const computerChoiceText = document.getElementById("computer-choice");
const resultText = document.getElementById("result-text");

const winsText = document.getElementById("wins");
const lossesText = document.getElementById("losses");
const tiesText = document.getElementById("ties");

const emojiDisplay = document.getElementById("emoji-display");

const resetBtn = document.getElementById("reset");

const flash = document.getElementById("flash");

// CHOICES
const choices = ["rock", "paper", "scissors"];

// BUTTON EVENTS
gameButtons.forEach(button => {

  button.addEventListener("click", () => {

    const player = button.dataset.choice;

    const computer =
      choices[Math.floor(Math.random() * choices.length)];

    const result = getResult(player, computer);

    updateUI(player, computer, result);

  });

});

// DETERMINE RESULT
function getResult(player, computer){

  if(player === computer){
    ties++;
    return "tie";
  }

  if(
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ){
    wins++;
    return "win";
  }

  losses++;
  return "lose";
}

// EMOJI FUNCTION
function getEmoji(choice){

  if(choice === "rock") return "✊";

  if(choice === "paper") return "📄";

  return "✂️";
}

// UPDATE UI
function updateUI(player, computer, result){

  playerChoiceText.textContent =
    `You chose: ${player}`;

  computerChoiceText.textContent =
    `Computer chose: ${computer}`;

  emojiDisplay.textContent =
    `${getEmoji(player)} vs ${getEmoji(computer)}`;

  resultText.className = "";

  if(result === "win"){

    resultText.textContent = "You Win! 🎉";

    resultText.classList.add("win");

    launchConfetti();

  }
  else if(result === "lose"){

    resultText.textContent = "You Lose! 😢";

    resultText.classList.add("lose");

    flashScreen();

  }
  else{

    resultText.textContent = "It's a Tie!";

    resultText.classList.add("tie");

  }

  winsText.textContent = wins;
  lossesText.textContent = losses;
  tiesText.textContent = ties;
}

// CONFETTI
function launchConfetti(){

  const duration = 1000;

  const end = Date.now() + duration;

  const interval = setInterval(() => {

    if(Date.now() > end){
      clearInterval(interval);
      return;
    }

    for(let i = 0; i < 15; i++){

      const confetti =
        document.createElement("div");

      confetti.style.position = "fixed";

      confetti.style.width = "10px";
      confetti.style.height = "10px";

      confetti.style.background =
        `hsl(${Math.random() * 360}, 100%, 50%)`;

      confetti.style.top = "-10px";

      confetti.style.left =
        Math.random() * window.innerWidth + "px";

      confetti.style.opacity = "0.9";

      confetti.style.pointerEvents = "none";

      confetti.style.borderRadius = "2px";

      confetti.style.transition =
        "transform 3s linear, opacity 3s";

      document.body.appendChild(confetti);

      setTimeout(() => {

        confetti.style.transform =
          `translateY(${window.innerHeight + 50}px)
           rotate(${Math.random() * 360}deg)`;

        confetti.style.opacity = "0";

      }, 10);

      setTimeout(() => {
        confetti.remove();
      }, 3000);

    }

  }, 150);

}

// RED FLASH
function flashScreen(){

  flash.classList.add("show");

  setTimeout(() => {

    flash.classList.remove("show");

  }, 500);

}

// RESET
resetBtn.addEventListener("click", () => {

  wins = 0;
  losses = 0;
  ties = 0;

  winsText.textContent = 0;
  lossesText.textContent = 0;
  tiesText.textContent = 0;

  resultText.textContent = "Make your move!";
  resultText.className = "";

  playerChoiceText.textContent = "You chose: -";
  computerChoiceText.textContent = "Computer chose: -";

  emojiDisplay.textContent = "❓ vs ❓";

});
