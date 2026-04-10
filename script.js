const spotList = [
  {
    name: "Arrifana",
    waveType: "Right and long Left",
    breakType: "Point break",
    level: "Intermediate",
    tide: "Mid/High",
    notes: "Located under the cliffs, very well protected from north winds.",
    lat: 37.2969,
    lon: -8.8731
  },
  {
    name: "Amado",
    waveType: "A-frame peaks",
    breakType: "Beach break",
    level: "All levels",
    tide: "All tides",
    notes: "Very consistent spot, perfect for learning and daily surf.",
    lat: 37.2208,
    lon: -8.8594
  },
  {
    name: "Monte Clérigo",
    waveType: "Right and Left",
    breakType: "Beach break",
    level: "Beginner",
    tide: "Mid tide",
    notes: "Works best with medium swells. Watch out for some rocks.",
    lat: 37.3269,
    lon: -8.8789
  },
  {
    name: "Carrapateira",
    waveType: "Powerful peaks",
    breakType: "Beach break",
    level: "Advanced",
    tide: "Mid tide",
    notes: "Fast waves and strong rip currents. For experienced surfers.",
    lat: 37.1933,
    lon: -8.9005
  },
  {
    name: "Bordeira",
    waveType: "Long Left and peaks",
    breakType: "Beach break",
    level: "Beginner",
    tide: "Low/Mid tide",
    notes: "Huge beach with plenty of space, can have strong currents.",
    lat: 37.2061,
    lon: -8.9014
  },
  {
    name: "Sagres (Tonèl)",
    waveType: "Powerful Right",
    breakType: "Point break",
    level: "Advanced",
    tide: "All tides",
    notes: "Exposed to the full power of the Atlantic swell.",
    lat: 36.9981,
    lon: -8.9372
  },
  {
    name: "Castelejo",
    waveType: "Fast peaks",
    breakType: "Beach break",
    level: "Intermediate",
    tide: "Low tide",
    notes: "Very consistent and wild landscape. Remote vibes.",
    lat: 37.1067,
    lon: -8.9178
  },
  {
    name: "Zambujeira",
    waveType: "Short and hollow",
    breakType: "Reef break",
    level: "Advanced",
    tide: "Mid tide",
    notes: "Technical wave over a rocky bottom. For experts only.",
    lat: 37.5253,
    lon: -8.7884
  }
];

const container = document.getElementById("spots-container");
const searchBar = document.getElementById("search-bar");

let currentFilter = "all";

function applyFilters() {
  const searchText = searchBar.value.toLowerCase();
  const filteredData = spotList.filter(spot => {
    const matchesSearch = spot.name.toLowerCase().includes(searchText);
    let matchesLevel = true;
    if (currentFilter === "beginners") {
      matchesLevel = (spot.level === "Beginner" || spot.level === "All levels");
    }
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

const map = L.map("map").setView([37.2, -8.87], 9);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

const levelColors = {
  "Beginner": "#00796b",
  "Intermediate": "#f57c00",
  "Advanced": "#c62828",
  "All levels": "#1565c0"
};

function getMarkerIcon(level) {
  const color = levelColors[level] || "#00796b";
  return L.divIcon({
    className: "",
    html: `<div style="
      background-color: ${color};
      width: 14px; height: 14px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
}

spotList.forEach(spot => {
  L.marker([spot.lat, spot.lon], { icon: getMarkerIcon(spot.level) })
    .addTo(map)
    .bindPopup(`
      <strong>${spot.name}</strong><br>
      🌊 ${spot.waveType}<br>
      📍 ${spot.breakType}<br>
      🎯 ${spot.level}
    `);
});

displaySpots(spotList);