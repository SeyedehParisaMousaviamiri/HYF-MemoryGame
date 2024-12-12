// Select the container
const cardContainer = document.getElementById('card-container');

// Create the card element
const card = document.createElement('div');
card.setAttribute('class', 'card');

// Create the inner container for flipping
const inner = document.createElement('div');
inner.setAttribute('class',' inner');

// Create the card front
const cardFront = document.createElement('div');
cardFront.setAttribute('class','card-front');

// Create the card back
const cardBack = document.createElement('div');
cardBack.setAttribute('class','card-back');

// Append everything to the card
cardContainer.appendChild(card);
card.appendChild(inner);
inner.appendChild(cardFront);
inner.appendChild(cardBack);

// Card Styles
card.style.width = '200px';
card.style.height = '150px';
card.style.perspective = '1000px';// For 3-D animation
card.style.display = 'flex';
card.style.borderRadius = '8px';
card.style.boxShadow = '0 4px 8px';
card.style.padding = '16px';
card.style.margin = '16px auto';
card.style.justifyContent = 'center';

// Inner container styles
inner.style.display = 'flex';
inner.style.justifyContent = 'center';
inner.style.alignItems = 'center';
inner.style.transformStyle = 'preserve-3d'; // For 3D flipping effect
inner.style.transition = 'transform 0.6s';

// Front of the card styles
cardFront.style.position = 'absolute';
cardFront.style.backfaceVisibility = 'hidden'; // Prevents front from showing on the back side
cardFront.style.display = 'flex';

// Back of the card styles
cardBack.style.position = 'absolute';
cardBack.style.backfaceVisibility = 'hidden'; // Prevents back from showing on the front side
cardBack.style.display = 'flex';
cardBack.style.transform = 'rotateY(180deg)'; // Initially rotate the back side

// Set content for the card
const img = document.createElement('img');
img.src = "https://cdn.prod.website-files.com/5e4e48af45b75d848013007e/5e5948433f44fd4044f9a30b_kids_english_animals_turtle.png";
img.alt = "Placeholder Image";
img.style.width = '200px';
img.style.height = '200px';
cardBack.appendChild(img);

// Flipping
card.addEventListener('click', () => {
  card.classList.toggle('flipped');
});

// CSS for the flipped effect
const style = document.createElement('style');
document.head.appendChild(style);
style.sheet.insertRule(`
  .card.flipped .inner {
    transform: rotateY(180deg);
  }
`);
