const state = {
  view: {
    square: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    timerId: null,
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currettime: 60,
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function playSound(){
    let audio = new Audio("./src/audios/hit.mp3");
    audio.play();
}

function countDown() {
  state.values.currettime--;
  state.view.timeLeft.textContent = state.values.currettime;

  if (state.values.currettime <= 0) {
    alert("Game Over! O seu resultado foi " + state.values.result);
    clearInterval(state.values.countDownTimerId);
    clearInterval(state.values.timerId)
  }
}

function randomSquare() {
  state.view.square.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.square[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
  state.view.square.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound();
      }
    });
  });
}

function init() {
  moveEnemy();
  addListenerHitBox();
}

init();
