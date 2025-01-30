// Select the container
const cardContainer = document.getElementById('card-container');
let flippedCards = [];
let flipCount = 0;
let startTime = null;
let timerInterval = null;

const flipCounterElement = document.getElementById('flipCounter');
const timerElement = document.getElementById('timer');
const starElementsArray = Array.from(document.querySelectorAll('.star'));
const restartButtons = document.querySelectorAll('.restart');

//Shuffle the cards using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index
    [array[i], array[j]] = [array[j], array[i]];  // Swap elements
  }
  return array;
}
// Fetch JSON data, create cards, and append them to the container
async function fetchData() {
  try {
   const response = await fetch("https://raw.githubusercontent.com/SeyedehParisaMousaviamiri/SeyedehParisaMousaviamiri.github.io/refs/heads/main/data3.json");
   const data= await response.json();

    let cards = data; // Store the fetched cards
    const doubledArray = [...cards, ...cards]; // Double the cards
    const shuffledDoubledArray = shuffleArray(doubledArray); // Shuffle the doubled array

// Create and append all shuffled cards to the container
cardContainer.innerHTML = '';
shuffledDoubledArray.forEach(json => {
  const card = createCard(json);
  cardContainer.appendChild(card);
});
 } catch (error) {
    console.error("Error fetching or processing data:", error);
    cardContainer.innerHTML = `<p>Error loading game. Please try again later.</p>`;
  }
}
// Update the star rating based on moves
function updateStarRating() {
  const totalStars = starElementsArray.length;
  starElementsArray.forEach((star, index) => {
    if (flipCount <= 16) {
      // All stars visible
      star.style.opacity = 1;
    } else if (flipCount > 16 && flipCount <= 24) {
      // 4 stars visible
      star.style.opacity = index < totalStars - 1 ? 1 : 0.1;
    } else if (flipCount > 24 && flipCount <= 32) {
      // 3 stars visible
      star.style.opacity = index < totalStars - 2 ? 1 : 0.1;
    } else if (flipCount > 32 && flipCount <= 36) {
      // 2 stars visible
      star.style.opacity = index < totalStars - 3 ? 1 : 0.1;
    } else {
      // 1 star visible
      star.style.opacity = index < totalStars - 4 ? 1 : 0.1;
    }
  });
}

function countFlips() {
  flipCount++;
  flipCounterElement.textContent = `Moves: ${flipCount}`;
  updateStarRating();
}

//Timer
function startTimer() {
  if (!startTime && !timerInterval) {
    startTime = Date.now(); // Capture the time when the first card is clicked
    timerInterval = setInterval(updateTimer, 1000); // Update the timer every second
  }
}

function updateTimer() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  timerElement.textContent = `Time: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  } 
  startTime = null;
}

// Create card DOM elements
function createCard(json) {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = json.id;

  const inner = document.createElement('div');
  inner.className = 'inner';

  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';
  const frontImg = document.createElement('img');
  frontImg.src = 'https://github.com/SeyedehParisaMousaviamiri/HYF-MemoryGame/blob/main/Img/HappyJungle.png?raw=true';
  frontImg.alt = 'Card Front';
  cardFront.appendChild(frontImg);

  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';
  const backImg = document.createElement('img');
  backImg.src = json.imgSrc;
  backImg.alt = 'Card Back';
  cardBack.appendChild(backImg);

  inner.appendChild(cardFront);
  inner.appendChild(cardBack);
  card.appendChild(inner);

  card.addEventListener('click', () => {
    if (!card.classList.contains('flipped') && flippedCards.length < 2 && !card.classList.contains('matched')) {
      card.classList.add('flipped');
      flippedCards.push(card);

      if (flippedCards.length === 1) startTimer();
      countFlips();

      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
      }
    }
  });

  return card;
}

//update best performance
let bestPerformance = Infinity; 

function checkBestPerformance(flipCount) {
  if (flipCount < bestPerformance) {
    bestPerformance = flipCount; 
    document.getElementById('bestPerformance').textContent = bestPerformance;
  }
}

// Check if the flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.querySelector('.card-back img').src === card2.querySelector('.card-back img').src) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    console.log('Cards matched:', card1.id, card2.id);
    flippedCards = [];
    checkGameOver(); 
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

// Check if the game is finished
function checkGameOver() {
  const matchedCards = document.querySelectorAll('.card.matched');
  const totalCards = document.querySelectorAll('.card').length;

  if (matchedCards.length === totalCards) {
    stopTimer(); // Stop the timer immediately
    checkBestPerformance(flipCount);
    setTimeout(() => {
      alert('Congratulations! You matched all the cards!');
    }, 500);
  }
}

// start the game
function startGame() {
  stopTimer();
  startTime = null;
  flipCount = 0;
  flippedCards = [];
  flipCounterElement.textContent = 'Moves: 0';
  timerElement.textContent = 'Time: 0:00';

  starElementsArray.forEach(star => (star.style.opacity = 1));
  fetchData();
}

// Restart button event listeners
restartButtons.forEach(button => button.addEventListener('click', startGame));

// Start the game on load
startGame();
