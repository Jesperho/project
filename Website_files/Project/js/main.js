'use strict';


/**
 * Add custom icons to players and airports
 * Implement the remaining game flow
 * 
 * 
 */
// global variables
const continents = ["NA", "OC", "AF", "AN", "EU", "AS", "SA"];

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

function placePlayersOnMap(map, players) {
  players.forEach(player => {
    const { current_location, name } = player;
    
    const { latitude, longitude } = current_location;

    L.marker([latitude, longitude]).addTo(map).bindPopup(`${name} - ${current_location.name}`);
  });
}


function removeAllPopups() {
  // Check if the popup-menu is open
  const popupMenu = document.getElementById("popup-menu");
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
}

async function main() {

  //getting values from form to init game
  let continent = document.getElementById("continent").value;
  let map_size = document.getElementById("size_map").value;
  let playersamount = document.getElementById("playernum").value;

  //after init removing all popups
  removeAllPopups();

  //fetching suitable airports from api
  let airports = await getAirports(map_size, continent);

  //placing airports on the map
  airports.forEach(airport => {
      const { latitude, longitude, name } = airport;
      L.marker([latitude, longitude]).addTo(map).bindPopup(name);
  });


  //creating players
  let players = [];
  for (let i = 1; i <= playersamount; i++) {
      let name = prompt(`Player ${i} name:`)

      let player = createPlayer(i, name, airports[0], 0);
      players.push(player);
  }

  //placing players on the map
  placePlayersOnMap(map, players);
  


}