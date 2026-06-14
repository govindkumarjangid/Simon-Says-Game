let gameSeq = [];
let userSeq = [];
const buttonColors = ["red", "green", "blue", "yellow"];

let started = false;
let level = 0;
let highScore = 0;

const statusHeading = document.getElementById("status-heading");
const highScoreSpan = document.getElementById("high-score");
const buttons = document.querySelectorAll(".simon-btn");


document.addEventListener("keydown", function () {
  if (!started) {
    started = true;
    nextSequence();
  }
});


function nextSequence() {
  userSeq = [];
  level++;
  statusHeading.innerText = `Level ${level}`;
  const randomColor = buttonColors[Math.floor(Math.random() * 4)];
  gameSeq.push(randomColor);
  flashButton(randomColor);
}

function flashButton(color) {
  const btn = document.getElementById(color);
  if (btn) {
    btn.classList.add("flash");
    setTimeout(() => {
      btn.classList.remove("flash");
    }, 250);
  }
}

buttons.forEach(btn => {
  btn.addEventListener("click", function (event) {
    if (started) {
      const userChosenColor = event.target.id;
      userSeq.push(userChosenColor);
      flashButton(userChosenColor);
      checkAnswer(userSeq.length - 1);
    }
  });
});


function checkAnswer(currentIndex) {
  if (userSeq[currentIndex] === gameSeq[currentIndex]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    handleGameOver();
  }
}


function handleGameOver() {
  if (level > highScore) {
    highScore = level;
    highScoreSpan.innerText = highScore;
  }
  statusHeading.innerHTML = `Game Over! Reached Level <strong>${level}</strong><br>Press any key to restart`;
  document.body.classList.add("game-over");
  setTimeout(() => {
    document.body.classList.remove("game-over");
  }, 400);
  resetGame();
}

function resetGame() {
  gameSeq = [];
  userSeq = [];
  level = 0;
  started = false;
}
