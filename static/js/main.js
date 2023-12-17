'use strict';
const $ = (id) => document.getElementById(id);

var map = new L.map('map', { zoomControl: false, attributionControl: false });

// Get the tile layer from OpenStreetMaps 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  // Specify the maximum zoom of the map 
  maxZoom: 19,
  // Set the attribution for OpenStreetMaps 
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Set the view of the map 
// with the latitude, longitude and the zoom value 
map.setView([48.8584, 2.2945], 2);

function showMenu(menu) {
  // Hide all menus
  document.getElementById('popup-menu').style.display = 'none';
  document.getElementById('tutorialPopup').style.display = 'none';
  document.getElementById('aboutPopup').style.display = 'none';

  // Show the selected menu
  document.getElementById(menu).style.display = 'block';

  // Show the popup screen
  document.getElementById('popup').style.display = 'block';
}

function showAboutPopup() {
  // Show the about popup screen
  document.getElementById('aboutPopup').style.display = 'block';
}

function closeAboutPopup() {
  // Hide the about popup screen
  document.getElementById('aboutPopup').style.display = 'none';
}

function showTutorialPopup() {
  // Show the about popup screen
  document.getElementById('tutorialPopup').style.display = 'block';
}

function closeTutorialPopup() {
  // Hide the about popup screen
  document.getElementById('tutorialPopup').style.display = 'none';
}

function closePopup() {
  // Hide the popup screen
  document.getElementById('popup').style.display = 'none';
}


/**
 * Add custom icons to players and airports
 * Implement the remaining game flow
 * 
 * 
 */
// global variables
var continents = ["NA", "OC", "AF", "AN", "EU", "AS", "SA"];

// icons

// form for player name

// function to fetch data from API



async function getAirports(amount, continent) {
  if (!continents.includes(continent)) {
    return new Error("Invalid continent provided.");
  }

  try {
    let response = await fetch(`http://127.0.0.1:5000/airports/${amount}/${continent}`);

    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }

    let airports = await response.json();
    return airports;

  } catch (error) {
    console.error("Error fetching airports:", error.message);
    throw error;
  }
}

// function to update game status

// function to show weather at selected airport

// function to check if any goals have been reached

// function to update goal data and goal table in UI

// function to check if game is over

// function to set up game
// this is the main function that creates the game and calls the other functions


function createPlayer(id, name, currentLocationAirport, co2Budget) {
  return {
    id: id,
    name: name,
    current_location: currentLocationAirport,
    co2_budget: co2Budget
  };
}

function place_players_on_map(map, players) {
  players.forEach(player => {
    const { current_location, name } = player;
    const { latitude, longitude } = current_location;
    L.marker([latitude, longitude]).addTo(map).bindPopup(`${name} - ${current_location.name}`);
  });
}


function removeAllPopups() {
  // Check if the popup-menu is open
  const popupMenu = document.getElementById("popup");
  if (popupMenu) {
    // Remove the popup-menu
    popupMenu.parentNode.removeChild(popupMenu);
  }

  // Check if the aboutPopup is open
  const aboutPopup = document.getElementById("aboutPopup");
  if (aboutPopup) {
    // Remove the aboutPopup
    aboutPopup.parentNode.removeChild(aboutPopup);
  }

  // Check if the tutorialPopup is open
  const tutorialPopup = document.getElementById("tutorialPopup");
  if (tutorialPopup) {
    // Remove the tutorialPopup
    tutorialPopup.parentNode.removeChild(tutorialPopup);
  }

  // Remove the gameMenu
  const gameMenu = document.getElementById("gameMenu");
  if (gameMenu) {
    gameMenu.parentNode.removeChild(gameMenu);
  }

  $("game-menu-container").remove();
}


function draw_game_path_polyline(map, airports) {
  let latLongs = [];
  airports.forEach((a) => {
    const { latitude, longitude } = a;
    latLongs.push({ lat: latitude, lng: longitude });
  })
  var game_path_polyline = new L.Polyline(latLongs, { dashArray: '5 10', dashOffset: 10, color: 'red', weight: 3 })
  map.addLayer(game_path_polyline);
}
function zoom_to_game_field(map) {
  let markers = [];
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) { markers.push(layer); }
  });
  let bounds = L.latLngBounds(markers.map(marker => marker.getLatLng()));
  map.fitBounds(bounds, { padding: [20, 20] });
}

function move_player(p) {

}

function calculate_fuel() { }

function is_goal_reached() { return false }

async function main() {
  //getting values from form to init game
  let continent = document.getElementById("continent").value;
  let map_size = document.getElementById("map_size").value;
  let players_amount = document.getElementById("players_amount").value;

  $("game-ui").style["display"] = "block";
  $("map").style["display"] = "flex";
  $("map").style["position"] = "absolute";
  $("map-game-ui-container").appendChild($("map"))
  // $("map-game-ui-container").appendChild($("game-ui"))

  //after init removing all popups
  removeAllPopups();

  //fetching suitable airports from api
  let airports = await getAirports(map_size, continent);

  //placing airports on the map
  airports.forEach(airport => {
    const { latitude, longitude, name, iso } = airport;
    const airport_icon = L.icon({ iconUrl: `static/flags/${iso}.png`, iconSize: [30, 20] });
    L.marker([latitude, longitude], { icon: airport_icon }).addTo(map).bindPopup(name);
  });


  //creating players
  let players = [];
  for (let i = 1; i <= players_amount; i++) {
    let name = prompt(`Player ${i} name:`)

    let player = createPlayer(i, name, airports[0], 0);
    players.push(player);
  }

  place_players_on_map(map, players);
  draw_game_path_polyline(map, airports);
  zoom_to_game_field(map);


  players.forEach((p) => move_player(p))



}
