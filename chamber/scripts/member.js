const jsonFilepath = 'data/members.json';
const cards = document.querySelector('#cards');

async function getMembersData(jsonFilepath) {
    const response = await fetch(
        jsonFilepath);
    const data = await response.json();
    displayMembers(data.members);
}

getMembersData(jsonFilepath);

const displayMembers = (members) => {
    members.forEach((member) => {
        
        let card = document.createElement("section");
        let image = document.createElement("img");
        let name = document.createElement("h2");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("a");
        let level = document.createElement("p");
        
        if (member.membLevel == 2) {
            level.textContent = `Member Level: Silver`;
        } else if (member.membLevel == 3) {
            level.textContent = `Member Level: Gold`;
        } else {
            level.textContent = `Member Level: Member`;
        } 

        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phoneNumber;
        
        website.href = member.websiteUrl;
        website.textContent = "Website";
        website.target = "_blank";
        
        image.setAttribute("src", member.imageFile);
        image.setAttribute("alt", `${member.name} logo`);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "auto");
        image.setAttribute("height", "100");
        
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(level);

        cards.appendChild(card);
    });
}

const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");


gridButton.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
});

listButton.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});