const board = document.getElementById("gameBoard");

const statusText = document.getElementById("status");

const timerText = document.getElementById("timer");

const nextGameBtn = document.getElementById("nextGameBtn");

const emojis = ["🍎", "🍌", "🍇", "🍉"];

let cards = [];

let flippedCards = [];

let matchedPairs = 0;

let timeLeft = 30;

let timerInterval;

function startGame() {


  board.innerHTML = "";

  statusText.textContent = "";

  nextGameBtn.style.display = "none";

  flippedCards = [];

  matchedPairs = 0;

  timeLeft = 30;

  timerText.style.color = "#222";

  timerText.style.animation = "";


  cards = [...emojis, ...emojis].sort(() => 0.5 - Math.random());


  cards.forEach((emoji, index) => createCard(emoji, index));


  clearInterval(timerInterval);

  timerText.textContent = `Tempo restante: ${timeLeft}s`;

  timerInterval = setInterval(updateTimer, 1000);

}

function createCard(emoji, index) {

  const card = document.createElement("div");

  card.classList.add("card");

  card.dataset.emoji = emoji;

  card.dataset.index = index;

  card.addEventListener("click", () => flipCard(card));

  board.appendChild(card);

}

function flipCard(card) {

  if (flippedCards.length === 2 || card.classList.contains("flipped") || timeLeft <= 0) return;

  card.textContent = card.dataset.emoji;

  card.classList.add("flipped");

  flippedCards.push(card);

  if (flippedCards.length === 2) {

    checkMatch();

  }

}

function checkMatch() {

  const [card1, card2] = flippedCards;

  if (card1.dataset.emoji === card2.dataset.emoji) {

    matchedPairs++;

    flippedCards = [];

    if (matchedPairs === cards.length / 2) {

      clearInterval(timerInterval);

      timerText.style.animation = "";

      statusText.textContent = "🎉 Parabéns! Você venceu!";

      nextGameBtn.style.display = "inline-block";

      showWinAnimation();

    }

  } else {

    setTimeout(() => {

      card1.textContent = "";

      card2.textContent = "";

      card1.classList.remove("flipped");

      card2.classList.remove("flipped");

      flippedCards = [];

    }, 800);

  }

}

function updateTimer() {

  timeLeft--;

  timerText.textContent = `Tempo restante: ${timeLeft}s`;


  if (timeLeft <= 5) {

    timerText.style.color = "red";

    timerText.style.animation = "blink 0.8s infinite";

  }

  if (timeLeft <= 0) {

    clearInterval(timerInterval);

    timerText.style.animation = "";

    if (matchedPairs < cards.length / 2) {

      statusText.textContent = "❌ Ops, você perdeu!";

      nextGameBtn.style.display = "inline-block";

    }

  }

}

function showWinAnimation() {


  statusText.style.animation = "winPulse 1s infinite";


  document.querySelectorAll(".card.flipped").forEach(card => {

    card.style.animation = "cardGlow 1s infinite";

  });


  for (let i = 0; i < 50; i++) {

    const confetti = document.createElement("div");

    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * window.innerWidth + "px";

    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

    confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 5000);

  }

}

nextGameBtn.addEventListener("click", startGame);


startGame();
