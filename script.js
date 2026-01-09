console.log("JS caricato");

const buttons = document.querySelectorAll(".info-btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const info = button.nextElementSibling;

    info.classList.toggle("open");

    button.innerText = info.classList.contains("open") 
      ? "Nascondi info" 
      : "Mostra info";
  });
});
