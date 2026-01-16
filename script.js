const spotList = [
  { 
    name: "Arrifana", 
    waveType: "Right and long Left", 
    breakType: "Point break", 
    level: "Intermediate", 
    tide: "Mid/High",
    notes: "Located under the cliffs, very well protected from north winds."
  },
  { 
    name: "Amado", 
    waveType: "A-frame peaks", 
    breakType: "Beach break", 
    level: "All levels", 
    tide: "All tides",
    notes: "Very consistent spot, perfect for learning and daily surf."
  },
  { 
    name: "Monte Clérigo", 
    waveType: "Right and Left", 
    breakType: "Beach break", 
    level: "Beginner", 
    tide: "Mid tide",
    notes: "Works best with medium swells. Watch out for some rocks."
  },
  { 
    name: "Carrapateira", 
    waveType: "Powerful peaks", 
    breakType: "Beach break", 
    level: "Advanced", 
    tide: "Mid tide",
    notes: "Fast waves and strong rip currents. For experienced surfers."
  },
  { 
    name: "Bordeira", 
    waveType: "Long Left and peaks", 
    breakType: "Beach break", 
    level: "Beginner", 
    tide: "Low/Mid tide",
    notes: "Huge beach with plenty of space, can have strong currents."
  },
  { 
    name: "Sagres (Tonèl)", 
    waveType: "Powerful Right", 
    breakType: "Point break", 
    level: "Advanced", 
    tide: "All tides",
    notes: "Exposed to the full power of the Atlantic swell."
  },
  { 
    name: "Castelejo", 
    waveType: "Fast peaks", 
    breakType: "Beach break", 
    level: "Intermediate", 
    tide: "Low tide",
    notes: "Very consistent and wild landscape. Remote vibes."
  },
  { 
    name: "Zambujeira", 
    waveType: "Short and hollow", 
    breakType: "Reef break", 
    level: "Advanced", 
    tide: "Mid tide",
    notes: "Technical wave over a rocky bottom. For experts only."
  }
];

const container = document.getElementById("spots-container");
const searchBar = document.getElementById("search-bar");

// VARIABILE DI STATO: ricorda quale filtro è attivo ("all" oppure "beginners")
let currentFilter = "all";

// FUNZIONE UNICA DI FILTRAGGIO (Combina testo + livello)
function applyFilters() {
  const searchText = searchBar.value.toLowerCase();

  const filteredData = spotList.filter(spot => {
    // 1. Controlla il nome
    const matchesSearch = spot.name.toLowerCase().includes(searchText);
    
    // 2. Controlla il livello in base al bottone attivo
    let matchesLevel = true;
    if (currentFilter === "beginners") {
      matchesLevel = (spot.level === "Beginner" || spot.level === "All levels");
    }

    // Ritorna vero solo se ENTRAMBE le condizioni sono soddisfatte
    return matchesSearch && matchesLevel;
  });

  displaySpots(filteredData);
}

function displaySpots(data) {
  container.innerHTML = "";
  
  data.forEach((spot) => {
    const card = `
      <div class="spot">
        <div>
          <h2>${spot.name}</h2>
          <div class="badge-container">
            <span class="badge-wave">🌊 ${spot.waveType}</span>
            <span class="badge-break">📍 ${spot.breakType}</span>
          </div>
          <div class="info">
            <ul>
              <li><strong>Skill Level:</strong> ${spot.level}</li>
              <li><strong>Best Tide:</strong> ${spot.tide}</li>
              <li><strong>Notes:</strong> ${spot.notes}</li>
            </ul>
          </div>
        </div>
        <button class="info-btn">Spot Details</button>
      </div>
    `;
    container.innerHTML += card;
  });

  attachInfoEvents();
}

function attachInfoEvents() {
  document.querySelectorAll(".info-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const info = button.previousElementSibling.querySelector(".info");
      info.classList.toggle("open");
      button.innerText = info.classList.contains("open") ? "Close" : "Spot Details";
    });
  });
}

// EVENTI
searchBar.addEventListener("keyup", applyFilters);

document.getElementById("btn-beginners").addEventListener("click", (e) => {
  currentFilter = "beginners";
  applyFilters();
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
});

document.getElementById("btn-all").addEventListener("click", (e) => {
  currentFilter = "all";
  applyFilters();
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
});

// Avvio
displaySpots(spotList);