
// Select the container
const cardContainer = document.getElementById('card-container');
let cards =[];

//Shuffle the cards using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index
    [array[i], array[j]] = [array[j], array[i]];  // Swap elements
  }
  return array;
}

//Flip counting
let flippedCards=[];
let flipCount=0;
const flipCounterElement=document.getElementById('flipCounter');

function countFlips() {
  flipCount++;
  flipCounterElement.textContent = `Moves: ${flipCount}`;
}

//Timer
const timerElement = document.getElementById('timer');
let startTime = null;
let timerInterval = null;

// Start the timer
function startTimer() {
  if (!startTime) {
    startTime = Date.now(); // Capture the time when the first card is clicked
    timerInterval = setInterval(updateTimer, 1000); // Update the timer every second
  }
}

// Update the timer
function updateTimer() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  timerElement.textContent = `Time: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Create card DOM elements
function createCard(json) {
// Create the card element
const card = document.createElement('div');
card.setAttribute('class', 'card');
card.setAttribute('id', json.id);

// Create the inner container for flipping
const inner = document.createElement('div');
inner.setAttribute('class','inner');

// Create the card front
const cardFront = document.createElement('div');
cardFront.setAttribute('class','card-front');

// Create the front image
const frontImg = document.createElement('img');
frontImg.src = 'https://github.com/SeyedehParisaMousaviamiri/HYF-MemoryGame/blob/main/pngtree-safari-animal-vector-png-image_6882736.png?raw=true';
frontImg.alt = "Card Front Image";
cardFront.appendChild(frontImg);

// Create the card back
const cardBack = document.createElement('div');
cardBack.setAttribute('class','card-back');

// Add the image to the back
const img = document.createElement('img');
img.src = json.imgSrc;
img.alt = "Card Back Image";
cardBack.appendChild(img);

// Append everything to the card
card.appendChild(inner);
inner.appendChild(cardFront);
inner.appendChild(cardBack);

// Flipping
card.addEventListener('click', () => {
  if (!card.classList.contains('flipped')) {
  card.classList.toggle('flipped');
  flippedCards.push(card);

// Start the timer on the first flip
  if (flippedCards.length === 1) {
    startTimer();
  }
  
// Update flip count 
countFlips();

  //Just 2 cards are flipped
if (flippedCards.length === 2) {
  setTimeout(() => {
    flipAllCardsBack();
   }, 1000);
  }
 }
});



return card;
}

//Flip back cards
function flipAllCardsBack() {
  flippedCards.forEach(card => {
    card.classList.remove('flipped');
  });
  flippedCards = []; // Clear the flipped cards array
}

// Fetch JSON data, create cards, and append them to the container
fetch("https://raw.githubusercontent.com/SeyedehParisaMousaviamiri/SeyedehParisaMousaviamiri.github.io/refs/heads/main/data.json")
  .then(response => response.json())
  .then(myJson => {
    cards = myJson; // Store the fetched cards
    const doubledArray = [...cards, ...cards]; // Double the cards
    const shuffledDoubledArray = shuffleArray(doubledArray); // Shuffle the doubled array
// Create and append all shuffled cards to the container
shuffledDoubledArray.forEach(json => {
  const card = createCard(json);
  cardContainer.appendChild(card);
});
})
.catch(error => console.error("Error fetching JSON data:", error));
