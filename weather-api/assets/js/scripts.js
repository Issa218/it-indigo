async function displayTemp() {
  // Clear previous results
  document.getElementById('errorMsg').textContent = '';
  document.getElementById('locationInfo').innerHTML = '';
  document.getElementById('forecastContainer').innerHTML = '';

  const locationInput = document.getElementById('locationInput').value.trim();

  // Validate input
  if (!locationInput) {
    document.getElementById('errorMsg').textContent =
      'Error: Location is required. Please enter a location.';
    return;
  }

  // Step 1: Geocoding
  let geoData;
  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationInput)}&count=10&language=en&format=json`;
    const geoRes = await fetch(geoUrl);
    geoData = await geoRes.json();
  } catch (e) {
    document.getElementById('errorMsg').textContent =
      'Error: Failed to reach the geocoding API. Please try again.';
    return;
  }

  if (!geoData.results || geoData.results.length === 0) {
    document.getElementById('errorMsg').textContent =
      `Error: No location found matching "${locationInput}". Please try a different search term.`;
    return;
  }

  const loc = geoData.results[0];

  // Display location info
  document.getElementById('locationInfo').innerHTML = `
    <h2>Location Details</h2>
    <table>
      <tr><th>Name</th><td>${loc.name || 'N/A'}</td></tr>
      <tr><th>Admin1</th><td>${loc.admin1 || 'N/A'}</td></tr>
      <tr><th>Country</th><td>${loc.country || 'N/A'}</td></tr>
      <tr><th>Latitude</th><td>${loc.latitude}</td></tr>
      <tr><th>Longitude</th><td>${loc.longitude}</td></tr>
    </table>
  `;

  // Step 2: Weather forecast
  let weatherData;
  try {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&hourly=temperature_2m&temperature_unit=fahrenheit&forecast_days=7`;
    const weatherRes = await fetch(weatherUrl);
    weatherData = await weatherRes.json();
  } catch (e) {
    document.getElementById('errorMsg').textContent =
      'Error: Failed to retrieve weather forecast. Please try again.';
    return;
  }

  if (!weatherData.hourly || !weatherData.hourly.time) {
    document.getElementById('errorMsg').textContent =
      'Error: Weather forecast data unavailable for this location.';
    return;
  }

  const msg2 = weatherData;
  const tempdate = [];
  const count = msg2.hourly.time.length;

  // Build table rows
  let rows = '';
  for (let i = 0; i < count; i++) {
    // Convert date to unix milliseconds
    let unixmillsec = Date.parse(msg2.hourly.time[i]);
    // Create temporary date variable
    let tmpdate = new Date(unixmillsec);
    // Extract the date/time string for a more friendly format
    tempdate[i] = tmpdate.toLocaleString();

    rows += `<tr>
      <td>${tempdate[i]}</td>
      <td>${msg2.hourly.temperature_2m[i] !== null ? msg2.hourly.temperature_2m[i] + ' °F' : 'N/A'}</td>
    </tr>`;
  }

  document.getElementById('forecastContainer').innerHTML = `
    <h2>Temperature Forecast (7 Days)</h2>
    <table>
      <thead>
        <tr>
          <th>Date / Time</th>
          <th>Temperature (°F)</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

function clearAll() {
  document.getElementById('locationInput').value = '';
  document.getElementById('errorMsg').textContent = '';
  document.getElementById('locationInfo').innerHTML = '';
  document.getElementById('forecastContainer').innerHTML = '';
}