import { places } from 'data/places.mjs'

const cardsContainer = document.querySelector("#places-cards")

places.forEach(place => {
    const card = document.createElement('section');
    card.classList.add('card');

    const title = document.createElement('h2');
    title.textContent = place.name;

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = `images/${place.image}`;
    img.alt = place.name;
    img.loading = 'lazy';
    figure.appendChild(img);

    const description = document.createElement('p');
    description.textContent = place.description;

    const address = document.createElement('address');
    address.textContent = place.address;

    const button = document.createElement('button');
    button.textContent = "Learn More";

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(description);
    card.appendChild(address);
    card.appendChild(button);

    cardsContainer.appendChild(card);

});

const visitKey = "last-visit";
const visitDisplay = document.querySelector("#visit");

const lastVisit = localStorage.getItem(visitKey);
const now = new Date();

if (visitDisplay) {
    if (lastVisit) {
        const previous = new Date(lastVisit);
        const diffMs = now - previous;

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (hours >= 24) {
            visitDisplay.textContent = `You last visited ${days} days ago.`;
        } else {
            visitDisplay.textContent = `Back so soon! Awesome!`;            
        } 
    } else {
        visitDisplay.textContent = "Welcome! Let us know if you have any questions.";
    } 
}

localStorage.setItem(visitKey, now.toISOString());