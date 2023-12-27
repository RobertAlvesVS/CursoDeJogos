const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    playerSides: {
        player1: "player-cards",
        player1BOX: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBOX: document.querySelector("#computer-cards"),
    },
    button: document.getElementById("next-duel")
};



const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: "./src/assets/icons/dragon.png",
        winOf: [1],
        loseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: "./src/assets/icons/magician.png",
        winOf: [2],
        loseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: "./src/assets/icons/exodia.png",
        winOf: [0],
        loseOf: [1],
    },
]

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name
    state.cardSprites.type.innerText = "Attibute : " + cardData[index].type
}

async function removeAllCardsImages() {
    let cards = state.playerSides.computerBOX;
    let imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img => img.remove()));

    cards = state.playerSides.player1BOX;
    imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img => img.remove()))
}

async function checkDuelResult(playerCardId, computerCardId) {
    let duelResults = "Draw";
    let playerCard = cardData[playerCardId];

    if (playerCard.winOf.includes(computerCardId)) {
        duelResults = "Win";
        state.score.playerScore++;
    }

    if (playerCard.loseOf.includes(computerCardId)) {
        duelResults = "Lose";
        state.score.computerScore++;
    }
    try {
        await playAudio(duelResults);
    } catch { }
    return duelResults;
}

async function drawButton(text) {
    state.button.innerText = text;
    state.button.style.display = "block";
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function setCardsField(cardID) {
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.fieldCards.player.src = cardData[cardID].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResult = await checkDuelResult(cardID, computerCardId);

    await updateScore();
    await drawButton(duelResult);
}

async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    if (fieldSide === state.playerSides.player1) {
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });

        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(IdCard);
        });
    }



    return cardImage;
}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function resetDuel() {
    state.cardSprites.avatar.src = "";
    state.button.style.display = "none";
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
    state.cardSprites.name.innerText = "Seleciona";
    state.cardSprites.type.innerText = "A Carta";
    init();
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    audio.play();
}


function init() {
    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.computer);
    const bgm = document.getElementById("bgm");
    bgm.play();
}
init();

