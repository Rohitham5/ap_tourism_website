const placesData = [
  {
    title: "Tirupati",
    image: "images/tirupati.jpg",
    images: ["images/tirupati.jpg", "images/tirupati2.jpg", "images/tirupati3.jpg"],
    desc: "Tirupati is famous for its sacred hill town, housing the iconic Sri Venkateswara Temple. Known for spiritual atmosphere, architecture, and prasadam offerings.",
    attractions: [
      "Sri Venkateswara Temple",
      "Talakona Waterfall",
      "Sri Kapileswara Swamy Temple",
      "Chandragiri Fort",
      "TTD Gardens"
    ]
  },
  {
    title: "Araku Valley",
    image: "images/araku.jpg",
    images: ["images/araku.jpg", "images/araku1.jpg", "images/araku2.jpg"],
    desc: "A picturesque hill station celebrated for coffee plantations, tribal heritage, and lush green beauty.",
    attractions: [
      "Tribal Museum",
      "Padmapuram Gardens",
      "Coffee Plantations"
    ]
  },
  {
    title: "Borra Caves",
    image: "images/borra.jpg",
    images: ["images/borra.jpg", "images/borra1.jpg", "images/borra2.jpg"],
    desc: "Spectacular limestone caves featuring million-year-old formations and colorful natural wonders.",
    attractions: [
      "Katiki Waterfall",
      "Ananthagiri Hills"
    ]
  },
  {
    title: "Visakhapatnam Beaches",
    image: "images/vizag.jpg",
    images: ["images/vizag.jpg", "images/vizag1.jpg", "images/vizag2.jpg"],
    desc: "Coastal paradise along Bay of Bengal, known for scenic beaches and vibrant port city atmosphere.",
    attractions: [
      "RK Beach",
      "Kailasagiri",
      "Submarine Museum"
    ]
  },
  {
    title: "Gandikota",
    image: "images/gandikota.jpg",
    images: ["images/gandikota.jpg", "images/gandikota1.jpg", "images/gandikota2.jpg"],
    desc: "Known as 'Grand Canyon of India', Gandikota boasts spectacular gorge and beautiful Pennar river views.",
    attractions: [
      "Gandikota Fort",
      "Pennar River",
      "Ranganatha Swamy Temple"
    ]
  },
  {
    title: "Lepakshi",
    image: "images/lepakshi.jpg",
    images: ["images/lepakshi.jpg", "images/lepakshi1.jpg", "images/lepakshi2.jpg"],
    desc: "Historic village famous for Veerabhadra Temple, monolithic Nandi, and mural paintings.",
    attractions: [
      "Veerabhadra Temple",
      "Hanging Pillar",
      "Monolithic Nandi"
    ]
  },
  {
    title: "Srisailam",
    image: "images/srisailam.jpg",
    images: ["images/srisailam.jpg", "images/srisailam1.jpg", "images/srisailam2.jpg"],
    desc: "Pilgrimage hill town renowned for Mallikarjuna Temple, scenic dam, and lush forests.",
    attractions: [
      "Mallikarjuna Temple",
      "Srisailam Dam",
      "Akkamahadevi Caves"
    ]
  },
  {
    title: "Amaravati Stupa",
    image: "images/amaravati.jpg",
    images: ["images/amaravati.jpg", "images/amaravati1.jpg", "images/amaravati2.jpg"],
    desc: "Ancient Buddhist monument home to magnificent stupa and sculptures from early Buddhism.",
    attractions: [
      "Amaravati Museum",
      "Buddha Statue"
    ]
  },
  {
    title: "Rajahmundry (Godavari Bridge)",
    image: "images/rajahmundry.jpg",
    images: ["images/rajahmundry.jpg", "images/rajahmundry1.jpg", "images/rajahmundry2.jpg"],
    desc: "River city famous for Godavari Bridge, scenic river cruises, and tranquil ghats.",
    attractions: [
      "Godavari Bridge",
      "Papi Hills",
      "ISKCON Temple"
    ]
  },
  {
    title: "Vijayawada Kanaka Durga Temple",
    image: "images/vijayawada.jpg",
    images: ["images/vijayawada.jpg", "images/vijayawada1.jpg", "images/vijayawada2.jpg"],
    desc: "Hilltop temple dedicated to Goddess Durga, offering panoramic city views and festive atmosphere.",
    attractions: [
      "Kanaka Durga Temple",
      "Prakasam Barrage",
      "Undavalli Caves"
    ]
  }
];

function navigate(section) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });
  document.getElementById(section).classList.add("active");
}

function createPlaceCards() {
  const grid = document.getElementById("placesGrid");
  grid.innerHTML = '';
  placesData.forEach((place, idx) => {
    const card = document.createElement("div");
    card.className = "place-card";
    card.onclick = () => showDetail(idx);
    card.innerHTML = `
      <img src="${place.image}" alt="${place.title}">
      <div class="place-info">
        <span class="place-title">${place.title}</span>
        <span class="place-desc">${place.desc.slice(0, 80)}...</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function showDetail(idx) {
  navigate('detail');
  const place = placesData[idx];
  let currentImg = 0;
  const images = place.images;
  const carouselControls = images.length > 1
    ? `
      <div class="carousel-controls">
        <button class="carousel-btn" onclick="carouselPrev(${idx})">&larr;</button>
        <button class="carousel-btn" onclick="carouselNext(${idx})">&rarr;</button>
      </div>`
    : '';
  document.getElementById("detailContent").innerHTML = `
    <div class="detail-container">
      <div class="detail-images">
        <img src="${images[0]}" alt="${place.title}" id="carouselImg">
        ${carouselControls}
      </div>
      <div class="detail-info">
        <div class="detail-title">${place.title}</div>
        <div class="detail-desc">${place.desc}</div>
        <div class="detail-attract">
          <h3>Nearby Attractions</h3>
          <ul>
            ${place.attractions.map(attr => `<li>${attr}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
  window.carouselIdx = { idx, currentImg };
}
function carouselPrev(idx) {
  let place = placesData[idx], imgs = place.images;
  carouselIdx.currentImg = (carouselIdx.currentImg - 1 + imgs.length) % imgs.length;
  document.getElementById("carouselImg").src = imgs[carouselIdx.currentImg];
}
function carouselNext(idx) {
  let place = placesData[idx], imgs = place.images;
  carouselIdx.currentImg = (carouselIdx.currentImg + 1) % imgs.length;
  document.getElementById("carouselImg").src = imgs[carouselIdx.currentImg];
}

// Initial setup
window.onload = () => {
  createPlaceCards();
  navigate('home');
};
