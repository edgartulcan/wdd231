import {places} from '../data/places.mjs'
console.log(places);


const showHere = document.querySelector("#allplaces")


function displayItems(places){
    places.forEach(x => {
        //build the card element
        const thecard = document.createElement('div')
        //build photo element
        const thephoto = document.createElement('img')
        thephoto.src = `images/${x.url}`
        thephoto.alt = x.name
        thephoto.loading = 'lazy';
        thecard.appendChild(thephoto)
        
        const thetitle = document.createElement('h2')
        thetitle.innerHTML = x.name
        thecard.appendChild(thetitle)
        
        const theaddress = document.createElement('address')
        theaddress.innerHTML = x.address
        thecard.appendChild(theaddress)
        
        const thedesc = document.createElement('p')
        thedesc.innerHTML = x.description
        thecard.appendChild(thedesc)
        
        const button = document.createElement('button')
        button.textContent = 'LEARN MORE'
        button.classList.add('learn-more-btn');
        button.addEventListener('click', ()=>{
            alert(`Hello there, this is a nice place even to visit. We will add more information about ${x.name} in the future.`);
        });
        thecard.appendChild(button);
        
        showHere.appendChild(thecard)
    })
}

displayItems(places)



function visitas() {
    const lastdate = localStorage.getItem('last');

    if (lastdate){
        const now = new Date();
        const last = new Date(lastdate);


        const difference = now - last;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));


        alert(`"You last visited ${days} days ago.`)
    }
    else{
        alert(`WELCOME.`);
    }
    localStorage.setItem('last', new Date().toISOString());
}
window.onload = visitas;