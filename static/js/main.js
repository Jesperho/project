"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var leaflet_1 = require("./leaflet");
// import * as L from "./leaflet";
// leaflet map
var map_options = {
    center: (0, leaflet_1.latLng)(48.8584, 2.2945),
    zoom: 2,
};
var gameMap = (0, leaflet_1.map)('map', map_options);
(0, leaflet_1.tileLayer)('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(gameMap);
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
    return __awaiter(this, void 0, void 0, function () {
        var response, airports, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!continents.includes(continent)) {
                        return [2 /*return*/, new Error("Invalid continent provided.")];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("http://127.0.0.1:5000/airports/".concat(amount, "/").concat(continent))];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error, status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    airports = _a.sent();
                    return [2 /*return*/, airports];
                case 4:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        console.error("Error fetching airports:", error_1.message);
                    }
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
// function to update game status
// function to show weather at selected airport
// function to check if any goals have been reached
// function to update goal data and goal table in UI
// function to check if game is over
// function to set up game
// this is the main function that creates the game and calls the other functions
function zoomToGameArea() {
    var markers = [];
    gameMap.eachLayer(function (layer) {
        if (layer instanceof leaflet_1.Marker) {
            markers.push(layer);
        }
    });
    var bounds = (0, leaflet_1.latLngBounds)(markers.map(function (marker) { return marker.getLatLng(); }));
    gameMap.fitBounds(bounds);
}
function createPlayer(id, name, currentLocationAirport, co2Budget) {
    return {
        id: id,
        name: name,
        current_location: currentLocationAirport,
        co2_budget: co2Budget
    };
}
function placePlayersOnMap(map, players) {
    players.forEach(function (player) {
        var current_location = player.current_location, name = player.name;
        var latitude = current_location.latitude, longitude = current_location.longitude;
        (0, leaflet_1.marker)([latitude, longitude]).addTo(map).bindPopup("".concat(name, " - ").concat(current_location.name));
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
    return __awaiter(this, void 0, void 0, function () {
        var continent, map_size, players_amount, airports, _i, airports_1, _a, latitude, longitude, name_1, iso, airport_icon, players, i, name_2, player;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    continent = document.getElementById("continent").value;
                    map_size = document.getElementById("map_size").value;
                    players_amount = parseInt(document.getElementById("players_amount").value);
                    removeAllPopups();
                    return [4 /*yield*/, getAirports(map_size, continent)];
                case 1:
                    airports = _b.sent();
                    for (_i = 0, airports_1 = airports; _i < airports_1.length; _i++) {
                        _a = airports_1[_i], latitude = _a.latitude, longitude = _a.longitude, name_1 = _a.name, iso = _a.iso;
                        airport_icon = (0, leaflet_1.icon)({ iconSize: [30, 20], iconUrl: "static/flags/".concat(iso, ".png") });
                        (0, leaflet_1.marker)([latitude, longitude], { icon: airport_icon })
                            .bindPopup(name_1)
                            .addTo(gameMap);
                    }
                    players = [];
                    for (i = 1; i <= players_amount; i++) {
                        name_2 = prompt("Player ".concat(i, " name:"));
                        player = createPlayer(i, name_2, airports[0], 0);
                        players.push(player);
                    }
                    //placing players on the map
                    placePlayersOnMap(gameMap, players);
                    zoomToGameArea();
                    return [2 /*return*/];
            }
        });
    });
}
