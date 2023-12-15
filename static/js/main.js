var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Initialize the leaflet map 
const map = L.map('map');
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
    document.getElementById('aboutPopup').style.display = 'block';
}
function closeAboutPopup() {
    document.getElementById('aboutPopup').style.display = 'none';
}
function showTutorialPopup() {
    document.getElementById('tutorialPopup').style.display = 'block';
}
function closeTutorialPopup() {
    document.getElementById('tutorialPopup').style.display = 'none';
}
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
/**
 * Add custom icons to players and airports
 * Implement the remaining game flow
 */
// global variables
var continents = ["NA", "OC", "AF", "AN", "EU", "AS", "SA"];
// icons
// form for player name
// function to fetch data from API
function getAirports(amount, continent) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!continents.includes(continent)) {
            return new Error("Invalid continent provided.");
        }
        try {
            let response = yield fetch(`http://127.0.0.1:5000/airports/${amount}/${continent}`);
            if (!response.ok) {
                throw new Error(`HTTP error, status: ${response.status}`);
            }
            let airports = yield response.json();
            return airports;
        }
        catch (error) {
            console.error("Error fetching airports:", error.message);
            throw error;
        }
    });
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
function placePlayersOnMap(map, players) {
    players.forEach(player => {
        const { current_location, name } = player;
        const { latitude, longitude } = current_location;
        L.marker([latitude, longitude]).addTo(map).bindPopup(`${name} - ${current_location.name}`);
    });
}
function removeAllPopups() {
    var _a, _b, _c, _d;
    (_a = document.getElementById("popup")) === null || _a === void 0 ? void 0 : _a.remove();
    (_b = document.getElementById("aboutPopup")) === null || _b === void 0 ? void 0 : _b.remove();
    (_c = document.getElementById("tutorialPopup")) === null || _c === void 0 ? void 0 : _c.remove();
    (_d = document.getElementById("gameMenu")) === null || _d === void 0 ? void 0 : _d.remove();
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //getting values from form
        let continent = document.getElementById("continent").value;
        let map_size = document.getElementById("map_size").value;
        let playersamount = document.getElementById("playersamount").value;
        removeAllPopups();
        //fetching suitable airports from api
        let airports = yield getAirports(map_size, continent);
        //placing airports on the map
        airports.forEach(airport => {
            const { latitude, longitude, name } = airport;
            L.marker([latitude, longitude]).addTo(map).bindPopup(name);
            const icon = L.icon(iconUrl = "static/flags/{airport.iso}.png");
            player.setIcon(icon);
        });
        //creating players
        let players = [];
        for (let i = 1; i <= playersamount; i++) {
            let name = prompt(`Player ${i} name:`);
            let player = createPlayer(i, name, airports[0], 0);
            players.push(player);
        }
        //placing players on the map
        placePlayersOnMap(map, players);
    });
}
//# sourceMappingURL=main.js.map