const emoji = [
  "😊",
  "😊",
  "😂",
  "😂",
  "🤣",
  "🤣",
  "😍",
  "😍",
  "😎",
  "😎",
  "🤢",
  "🤢"
];
let openCards = [];

let shuffleEmoji = emoji.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < emoji.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmoji[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box)
}

function handleClick(){
  if(openCards.length < 2){
    this.classList.add("boxOpen");
    openCards.push(this);
  }
  if(openCards.length == 2){
    setTimeout(checkMath, 500);
  }
}

function checkMath(){
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  }else{
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }
  openCards = [];
  if (document.querySelectorAll("boxMatch").length === emoji.length) {
    alert("Você ganhou, Buxa!");
  }
}