const memberships = [
    {
        rank: 'Non Profit Membership',
        benefits: [
            'Listing in the Chamber directory with website and contact information', 
            'Membership cost waived specifically for non profit organizations'
        ],
        cost: 'Free'
    },
    {
        rank: 'Bronze Membership',
        benefits: [
            'Listing in the Chamber directory with website and contact information',
            'Access to Chamber networking events and educational workshops'
        ],
        cost: '$150'
    },
    {
        rank: 'Silver Membership',
        benefits: [
            'Listing in the Chamber directory with website and contact information',
            'Access to Chamber networking events and educational workshops',
            'Dedicated business spotlight on Chamber website and other marketing'
        ],
        cost: '$250'
    },
    {
        rank: 'Gold Membership',
        benefits: [
            'Listing in the Chamber directory with website and contact information',
            'Access to Chamber networking events and educational workshops',
            'Dedicated business spotlight on Chamber website and other marketing',
            'Priority sponsorship listings on all Chamber publications'
        ],
        cost: '350'
    }    
]

createMembershipCard(memberships);

function createMembershipCard(memberships) {
    const displayLevels = document.querySelector(".levels");

    memberships.forEach(membership => {
        let card = document.createElement("div");
        let name = document.createElement("h3");

        name.textContent = `${membership.rank}`;
        
        card.addEventListener('click', () => {
            displayMembershipDetails(membership);
        });
        
        card.appendChild(name)
        displayLevels.appendChild(card);
    })

}

const membershipDetails = document.querySelector("#memb-details");

function displayMembershipDetails(membership) {
    membershipDetails.innerHTML = '';
    membershipDetails.innerHTML = `
    <button id= "closeModal">❌</button>
    <h2>${membership.rank}</h2>
    <p><strong>Benefits:</strong>
    <ul>
        ${membership.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
    </ul>
    
    <strong>Cost</strong>: ${membership.cost}
    `;
    membershipDetails.showModal();

    closeModal.addEventListener("click", () => {
        membershipDetails.close();
    });
}