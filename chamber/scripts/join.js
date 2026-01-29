function openModal(texto){
   const info = document.getElementById("modal-info");
   const dialog = document.getElementById("theDetails");

   info.textContent = texto;
   dialog.showModal();

   document.getElementById("closeModal").addEventListener("click", () =>{
    dialog.close();
});

}


const re = new RegExp("[A-Za-z\\s-]{7,}");

function testInfo(title){
    const ok = re.test(title.value);
    if(!ok){
        alert("Title section only accept alpha characters, hyphens, and spaces with a minimum of seven characters.");
        title.focus();
    }
    return ok;
}
