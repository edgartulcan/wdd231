const jsonFilepath = 'data/members.json';
const spotCards = document.querySelector("#spot-cards");

async function getMembersData(jsonFilepath) {
    const response = await fetch(
        jsonFilepath);
    const data = await response.json();
    displaySpotlights(data.members);
}

getMembersData(jsonFilepath);

const displaySpotlights = (members) => {

    const filteredMembers = members.filter(
        member => member.membLevel === 2 || member.membLevel === 3
    );

    const shuffledMembers = filteredMembers.sort(() => 0.5 - Math.random());

    const selectedMembers = shuffledMembers.slice(0, 3);

    selectedMembers.forEach((member) => {

        let card = document.createElement("section");
        let name = document.createElement("h2");
        let tagline = document.createElement("h3");
        let image = document.createElement("img");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("a");
        let level = document.createElement("p");

        if (member.membLevel == 2) {
            level.textContent = `Member Level: Silver`;
        } else {
            level.textContent = `Member Level: Gold`;
        } 

        name.textContent = member.name;
        tagline.textContent = member.tagLine;
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

        card.classList.add("spot-card");

        card.appendChild(name, tagline, image, address, phone, website, level);
        card.appendChild(tagline);
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(level);

        spotCards.appendChild(card);

    });    
}