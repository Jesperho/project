var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function get_airport(icao, latlng) {
  const url = "/airports/"
  const response = fetch(url + icao + "/coordinates", { method: "POST" })
    .then(response => response.json())
    .then(json => console.log(json))
}
