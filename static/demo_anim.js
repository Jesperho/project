async function start_game() {
  const player_name = "demo";
  const airports = await fetch("/airports/10/EU");
  console.log(airports);
}

var map = L.map('map').setView([51.505, -0.09], 13);

const plane_icon = L.icon({
  iconUrl: 'static/airplane-icon.png',
  iconSize: [100, 100],
});

var player_pos_marker = L.marker([51.505, -0.09], { icon: plane_icon }).addTo(map);

player_pos_marker.on("click", function (e) { console.log("player got clicked") })

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


function place_marker(event) {
  var new_marker = new L.marker(event.latlng).addTo(map);
}

function zoom_to_game_area() {

}

function roll_dice() {
  return Math.floor(Math.random() * 6) + 1;
}


map.on('click', function (event) {
  console.log("You clicked the map at " + event.latlng.toString())
  var pos = map.latLngToLayerPoint(player_pos_marker.getLatLng());
  var fx = new L.PosAnimation();
  fx.once('end', function () {
    const latlng = map.latLngToLayerPoint(event.latlng);
    console.log(latlng);
    pos.x = latlng.x;
    pos.y = latlng.y;
    fx.run(player_pos_marker._icon, pos, 0.8);
  });
  fx.run(player_pos_marker._icon, pos, 0.3);
  player_pos_marker.setLatLng(event.latlng);
}
);

start_game();

// airports = Airport.query.filter_by(** kwargs).limit(400).all()
// map = Map(location = (50, 15), zoom_start = 4)
// for airport in airports:
//   Marker(
//     location = (airport.latitude_deg, airport.longitude_deg),
//     popup = Popup(html = airport.name),
//     icon = Icon(icon_url = "flags/{iso}.png".format(iso = airport.iso_country)),
//   ).add_to(map)

