let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "blue", "green"];

let started = false;
let level = 0;

let start = document.querySelector('.start');
let h2 = document.querySelector('h2');

start.addEventListener('click', function () {
      if (started == false) {
            console.log('game started');
            started = true
            levelUp();
            start.innerText = "Playing"
      }
})

function gameFlash(btn, color) {
      btn.classList.add(color);
      setTimeout(function () {
            btn.classList.remove(color);
      }, 1000);
}
function highScore(lv) {
      let Score = 0;
      Score += lv;
      if (Score == lv) {
            level = Score;
            h2.innerHTML = `Game Is Over! <br> High Score : ${Score}`;
      }
}

function levelUp() {
      userSeq = [];
      level++;
      h2.innerText = `Game Level : ${level}`;
      let randColor = btns[Math.floor(Math.random() * 4)];
      let randBtn = document.querySelector(`.${randColor}`);
      gameSeq.push(randColor);
      console.log(gameSeq);
      gameFlash(randBtn, "flash");
}

function checkAns(indx) {
      if (userSeq[indx] === gameSeq[indx]) {
            console.log('same value');
            if (userSeq.length === gameSeq.length) {
                  setTimeout(levelUp, 1000);
            }
      } else {
            highScore(level);
            start.innerText = "Reset";
            let mainDiv = document.querySelector('.main-div');
            mainDiv.style.backgroundColor = "red";
            setTimeout(function () {
                  let mainDiv = document.querySelector('.main-div');
                  mainDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  mainDiv.style.backDropFilter = 'blur(20px)';
            }, 3000)
            reset();
      }
}
function reset() {
      started = false;
      gameSeq = [];
      userSeq = [];
      level = 0;
}

function btnPress() {
      let btn = this;
      gameFlash(btn, "bgcolor");
      userColor = btn.getAttribute('id');
      userSeq.push(userColor);
      checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll('.btn');
for (let btn of allBtns) {
      btn.addEventListener('click', btnPress)
}
