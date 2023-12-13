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
  document.getElementById('playMenu').style.display = 'none';
  document.getElementById('tutorialMenu').style.display = 'none';
  document.getElementById('aboutMenu').style.display = 'none';

  // Show the selected menu
  document.getElementById(menu + 'Menu').style.display = 'block';

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
