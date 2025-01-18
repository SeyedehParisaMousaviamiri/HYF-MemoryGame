// array of cards
const cards=[
  { id: 'card1', imgSrc: 'https://github.com/SeyedehParisaMousaviamiri/HYF-MemoryGame/blob/main/5e5948433f44fd4044f9a30b_kids_english_animals_turtle.png?raw=true', alt:'Happy Turtle' },
  { id: 'card2', imgSrc: 'https://github.com/SeyedehParisaMousaviamiri/HYF-MemoryGame/blob/main/d5917a615428834d0e00554dad14b846.png?raw=true',alt:'Happy Elephant' },
  { id: 'card3', imgSrc: 'https://github.com/SeyedehParisaMousaviamiri/HYF-MemoryGame/blob/main/819-8194770_clip-art-library-download-animal-illustrations-drawing-transparent.png?raw=true', alt:'Happy Raccoon' },
  { id: 'card4', imgSrc: 'https://github.com/SeyedehParisaMousaviamiri/HYF-MemoryGame/blob/main/182-1825580_monkey-png-picture-monkey-safari-animals-clipart-transparent.png?raw=true', alt:'Happy Monkey' },
  { id: 'card5', imgSrc: 'https://github.com/SeyedehParisaMousaviamiri/HYF-MemoryGame/blob/main/360_F_879506485_qhYJc7sZOrBSvZC3gdNfZF54SvFfSh4v.jpg?raw=true', alt:'Happy Kitty' },
  { id: 'card6', imgSrc: 'https://raw.githubusercontent.com/SeyedehParisaMousaviamiri/HYF-MemoryGame/refs/heads/main/vector-blue-dolphin-icon-under-600nw-2277946019.webp', alt:'Happy Dolphin' },
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
  card.classList.toggle('flipped');
});

return card;
}

// Create and append all shuffled cards to the container
shuffledDoubledArray.forEach(data => {
  const card = createCard(data);
  cardContainer.appendChild(card);
});

