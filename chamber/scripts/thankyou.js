const formInfo = new URLSearchParams(window.location.search);

document.querySelector("#info").innerHTML = `
<p><strong>Name: </strong>${formInfo.get("first")} ${formInfo.get("last")}</p>
<p><strong>Email: </strong>${formInfo.get("email")}</p>
<p><strong>Phone: </strong>${formInfo.get("phone")}</p>
<p><strong>Business/Organization: </strong>${formInfo.get("organization-name")}</p>
<p><strong>Membership Level: </strong>${formInfo.get("radio")}</p>
<p><strong>Submitted On: </strong>${formInfo.get("timestamp")}</p>`;
