// array of cards
const cards=[
  { id: 'card1', imgSrc: 'https://github.com/SeyedehParisaMousaviamiri/HYF-MemoryGame/blob/main/5e5948433f44fd4044f9a30b_kids_english_animals_turtle.png?raw=true', alt:'Happy Turtle' },
  { id: 'card2', imgSrc: 'https://github.com/SeyedehParisaMousaviamiri/HYF-MemoryGame/blob/main/d5917a615428834d0e00554dad14b846.png?raw=true',alt:'Happy Elephant' },
  { id: 'card3', imgSrc: 'https://github.com/SeyedehParisaMousaviamiri/HYF-MemoryGame/blob/main/819-8194770_clip-art-library-download-animal-illustrations-drawing-transparent.png?raw=true', alt:'Happy Raccoon' },
  { id: 'card4', imgSrc: 'https://github.com/SeyedehParisaMousaviamiri/HYF-MemoryGame/blob/main/182-1825580_monkey-png-picture-monkey-safari-animals-clipart-transparent.png?raw=true', alt:'Happy Monkey' },
  { id: 'card5', imgSrc: 'https://github.com/SeyedehParisaMousaviamiri/HYF-MemoryGame/blob/main/360_F_879506485_qhYJc7sZOrBSvZC3gdNfZF54SvFfSh4v.jpg?raw=true', alt:'Happy Kitty' },
  { id: 'card6', imgSrc: 'https://github.com/SeyedehParisaMousaviamiri/HYF-MemoryGame/blob/main/vector-blue-dolphin-icon-under-600nw-2277946019.webp', alt:'Happy Dolphin' },
];

// Select the container
const cardContainer = document.getElementById('card-container');

//Double the cards
const doubledArray = [...cards, ...cards];

//Shuffle the cards using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index
    [array[i], array[j]] = [array[j], array[i]];  // Swap elements
  }
  return array;
}

// Generate the shuffled doubled cards
const shuffledDoubledArray = shuffleArray(doubledArray);

//Flip counting
let flippedCards=[];
let flipCount=0;
const flipCounterElement=document.getElementById('flipCounter');

function incrementFlipCounter() {
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

function createCard(data) {
// Create the card element
const card = document.createElement('div');
card.setAttribute('class', 'card');
card.setAttribute('id', data.id);

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
img.src = data.imgSrc;
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
incrementFlipCounter();

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

// Create and append all shuffled cards to the container
shuffledDoubledArray.forEach(data => {
  const card = createCard(data);
  cardContainer.appendChild(card);
});

