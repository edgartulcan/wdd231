const myInfo = new URLSearchParams(window.location.search);


// console.log(myInfo.get('first'));
// console.log(myInfo.get('last'));
// console.log(myInfo.get('title'));
// console.log(myInfo.get('email'));
// console.log(myInfo.get('phone'));
// console.log(myInfo.get('organization'));
// console.log(myInfo.get('description'));
// console.log(myInfo.get('timestamp'));


document.querySelector('#results').innerHTML = `
<p>Welcome ${myInfo.get('first')} ${myInfo.get('last')}</p>
<p>Thank you for send us your information, your data has been successfully received.</p>
<p>This is the information we received:</p>
<p>Email: ${myInfo.get('email')}</p> 
<p>Phone: ${myInfo.get('phone')}</p>
<p>Your registration was recorded on ${myInfo.get('timestamp')}</p>
<p>You will receive a message from a member of our team to contact you. Please be aware.</p>
`