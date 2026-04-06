// /------------Homepage Slideshow---------------------/ 
$('.slideshow').slick({
  dots: true,
  infinite: true,
  speed: 450,
  fade: true,
  slide: 'div',
  cssEase: 'linear',
  autoplay: true,
  autoplaySpeed: 2000
});

// /------------Homepage Slideshow---------------------/ 



// Map JS (with help form claude)

// Leaflet Map
const map = L.map('map').setView([33.5, 36.0], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const markers = [
  { coords: [31.35, 34.30], title: 'Gaza Strip',      info: 'CRITICAL — 70,000+ killed, 1.9M displaced, aid blockade in effect since March 2025.' },
  { coords: [31.90, 35.20], title: 'West Bank',        info: 'CRITICAL — 1,000+ killed since Oct 2023; ongoing military operations.' },
  { coords: [33.51, 36.29], title: 'Damascus, Syria',  info: 'SERIOUS — Post-transition capital; 16.5M Syrians need assistance nationwide.' },
  { coords: [36.20, 37.16], title: 'Aleppo, Syria',    info: 'SERIOUS — Major IDP return destination; fragile recovery underway.' },
  { coords: [35.93, 36.63], title: 'Idlib, Syria',     info: 'SERIOUS — High humanitarian needs; overcrowded IDP camps.' },
  { coords: [33.89, 35.50], title: 'Beirut, Lebanon',  info: 'ELEVATED — Economic collapse epicenter; 2020 port explosion; 2024 conflict damage.' },
  { coords: [33.27, 35.20], title: 'South Lebanon',    info: 'ELEVATED — Ceasefire in effect; 4,400+ killed since Oct 2023; major infrastructure damage.' }
];

markers.forEach(function(m) {
  L.marker(m.coords).addTo(map).bindPopup('<strong>' + m.title + '</strong><br/>' + m.info);
});


// Map JS (with help form claude)


// Timeline JS (Done by me + youtube video)

 const timeline_wrapper = document.querySelector('#timeline-wrapper'),
       timeline = document.querySelectorAll('.timeline li .data');
 
 for(const time of timeline) {
    time.onclick = ()=> time.classList.toggle('show')
 }


const timelineItems = document.querySelectorAll('.timeline li');

for (const item of timelineItems) {
  item.onclick = () => {
    item.querySelector('.data').classList.toggle('show');
  };
}