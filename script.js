console.log("JS caricato"); // verifica collegamento JS

// Seleziono tutti i bottoni info
const buttons = document.querySelectorAll(".info-btn");

buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    const info = button.nextElementSibling; // div info subito dopo il bottone
    info.classList.toggle("open");

    // Cambia testo bottone
    if (info.classList.contains("open")) {
      button.innerText = "Nascondi info";
    } else {
      button.innerText = "Mostra info";
    }
  });
});
