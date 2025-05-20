
const board = document.getElementById("game-board");
const restart = document.getElementById("restart-btn")
const winMessage = document.getElementById("win-message")

const numbers = [1, 2, 3, 4, 5, 6, 7, 8]
let cards = [...numbers, ...numbers];
let flippedCards = [];
let matchedPairs = 0;

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const createCard = (number) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const inner = document.createElement("div");
    inner.classList.add("card-inner")

    const front = document.createElement("div");
    front.classList.add("card-front")

    const back = document.createElement("div");
    back.classList.add("card-back");
    back.textContent = number;

    inner.appendChild(front)
    inner.appendChild(back)
    card.appendChild(inner)

    card.addEventListener("click", () => flipCard(card, number));
    return card;
}

function flipCard(card, number) {
    if (flippedCards.length === 2 || card.classList.contains("flipped") || card.classList.contains("matched")) {
        return;
    }
    card.classList.add("flipped")
    flippedCards.push({ card, number })

    if (flippedCards.length === 2) {
        const [first, second] = flippedCards;

        if (first.number === second.number) {
            first.card.classList.add("matched");
            second.card.classList.add("matched");
            matchedPairs++;

            if (matchedPairs === numbers.length) {
                setTimeout(() => {
                    winMessage.style.display = "block"
                    winMessage.style.animation = "pop .6s ease";
                }, 500);
            }
            flippedCards = [];
        } else {
            setTimeout(() => {
                first.card.classList.remove("flipped")
                second.card.classList.remove("flipped");
                flippedCards = [];
            }, 1000);

        }
    }

}

function setupGame(){
    board.innerHTML='';
    matchedPairs=0;
    flippedCards=[]
    winMessage.style.display='none';
    winMessage.style.animation='none';

    shuffle(cards).forEach((num) => {
        const card= createCard(num)
        board.appendChild(card)
        
    });
}

restart.addEventListener("click", setupGame)
setupGame();