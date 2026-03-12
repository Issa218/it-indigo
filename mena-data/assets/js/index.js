// Timestamps
const now = new Date();
const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

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

// ReliefWeb News API
async function loadNews() {
  const container = document.getElementById('news-feed');
  try {
    const res = await fetch(
      'https://api.reliefweb.int/v1/reports?appname=levant-crisis-monitor' +
      '&filter[operator]=OR' +
      '&filter[conditions][0][field]=primary_country.name&filter[conditions][0][value]=Syria' +
      '&filter[conditions][1][field]=primary_country.name&filter[conditions][1][value]=Palestinian%20Territory' +
      '&filter[conditions][2][field]=primary_country.name&filter[conditions][2][value]=Lebanon' +
      '&sort[]=date:desc&limit=6' +
      '&fields[include][]=title&fields[include][]=date&fields[include][]=source'
    );
    if (!res.ok) throw new Error('API unavailable');
    const data = await res.json();
    if (!data.data || data.data.length === 0) throw new Error('No results');

    let html = '<ul>';
    data.data.forEach(function(item) {
      const f = item.fields;
      const date = f.date && f.date.created
        ? new Date(f.date.created).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'Recent';
      const source = f.source && f.source[0] ? f.source[0].name : 'UN/NGO Source';
      html += '<li><strong>' + source + '</strong> — ' + f.title + ' <em>(' + date + ')</em></li>';
    });
    html += '</ul>';
    container.innerHTML = html;

  } catch (e) {
    container.innerHTML = `
      <ul>
        <li><strong>OCHA (Syria)</strong> — Syria Humanitarian Situation Report: 16.5 million people remain in need of assistance. <em>(2025)</em></li>
        <li><strong>UNRWA (Palestine)</strong> — UNRWA blocked from bringing aid into Gaza; warehouses hold food for over 1.1 million people unable to enter. <em>(2025)</em></li>
        <li><strong>UNHCR (Syria)</strong> — Over 1.2 million Syrian refugees return home following the fall of the Assad regime. <em>(2025)</em></li>
        <li><strong>World Bank (Lebanon)</strong> — Lebanon GDP contracted 7.1% in 2024; cumulative decline nears 40% since 2019. <em>(2025)</em></li>
        <li><strong>UNICEF (Palestine)</strong> — Over 660,000 children in Gaza deprived of formal education for a third consecutive year. <em>(2025)</em></li>
        <li><strong>IOM (Lebanon)</strong> — Lebanon hosts ~1.12 million registered Syrian refugees; highest refugee-to-population ratio globally. <em>(2025)</em></li>
      </ul>
    `;
  }
}

loadNews();