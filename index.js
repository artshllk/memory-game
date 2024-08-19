const cardGrid = document.getElementById("card-grid");
const winnerModal = document.getElementById("winner-modal");
const playAgainButton = document.getElementById("play-again");

const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];
const cards = [...cardValues, ...cardValues];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function createCard(value) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = value;

  card.innerHTML = `
        <div class="card-front"></div>
        <div class="card-back">${value}</div> 
    `;

  card.addEventListener("click", flipCard);
  return card;
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("open");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matches++;

  if (matches === cardValues.length) {
    setTimeout(showWinnerModal, 500);
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("open");
    secondCard.classList.remove("open");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function showWinnerModal() {
  winnerModal.style.display = "flex";
}

function hideWinnerModal() {
  winnerModal.style.display = "none";
  resetGame();
}

function resetGame() {
  matches = 0;
  cardGrid.innerHTML = "";
  initGame();
}

function initGame() {
  shuffle(cards);
  cards.forEach((value) => {
    const card = createCard(value);
    cardGrid.appendChild(card);
  });
}

playAgainButton.addEventListener("click", hideWinnerModal);

initGame();
