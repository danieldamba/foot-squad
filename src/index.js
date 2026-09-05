import './styles/reset.css';
import './styles/main-styles.css';
import { renderPlayer, renderCountry, renderDashboard } from './scripts/dom-manip.js';
import { createPlayer, createCountry } from './scripts/utils.js';
import { getMySquad, saveData,  loadData, clearData, setMySquad} from './scripts/storage.js';

renderDashboard();


const playerFormSelect = document.querySelector('#player-country');
getMySquad().forEach(country => {
  const option = document.createElement('option');
  option.value = country.name;
  option.textContent = country.name;
  playerFormSelect.appendChild(option);
});

const playerPositionSelect = document.querySelector('#player-position');
const positions = ['GK', 'CB', 'FB', 'CM', 'DM', 'AM', 'WI', 'ST'];
positions.forEach(position => {
  const option = document.createElement('option');
  option.value = position;
  option.textContent = position;
  playerPositionSelect.appendChild(option);
});

const playerButton = document.querySelector('#show-players');
playerButton.addEventListener('click', () => {
  renderPlayer();
});

const countryButton = document.querySelector('#show-countries');
countryButton.addEventListener('click', () => {
  renderCountry();
});

const dashboardButton = document.querySelector('#dashboard-btn');
dashboardButton.addEventListener('click', () => {
  renderDashboard();
});

const countryForm = document.querySelector('#country-form');
countryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const countryName = document.querySelector('#country_name').value;
  const countryContinent = document.querySelector('#country_continent').value;

  createCountry(countryName, countryContinent);

  const countryModal = document.querySelector('#country_modal');
  countryModal.close();

  renderCountry();
  saveData(getMySquad());
});

const playerForm = document.querySelector('#player-form');
playerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const playerName = document.querySelector('#player-name').value;
  const playerPosition = document.querySelector('#player-position').value;
  const playerLevel = document.querySelector('#player-level').value;
  const playerReleaseDate = document.querySelector('#end-Contract').value;
  const playerAge = document.querySelector('#player-age').value;
  const countryId = document.querySelector('#player-country').value;
  let idValue = null;
  let valuesD = [playerName, idValue, playerPosition, playerLevel, playerReleaseDate, playerAge];

  createPlayer([...valuesD], countryId);

  const playerModal = document.querySelector('#player-modal');
  playerModal.close();

  renderPlayer();
  saveData(getMySquad());
});

const addPlayerButton = document.querySelector(`#add-player`);
const addCountryButton = document.querySelector(`#add-country`);
addPlayerButton.addEventListener('click', () => {
  const playerModal = document.querySelector('#player-modal');
  playerModal.showModal();
});

addCountryButton.addEventListener('click', () => {
  const countryModal = document.querySelector('#country-modal');
  countryModal.showModal();
});

// Close modals when clicking the close button
const closeCountryModalButton = document.querySelector('#close-country-modal');
closeCountryModalButton.addEventListener('click', () => {
  const countryModal = document.querySelector('#country-modal');
  countryModal.close();
});

const closePlayerModalButton = document.querySelector('#close-player-modal');
closePlayerModalButton.addEventListener('click', () => {
  const playerModal = document.querySelector('#player-modal');
  playerModal.close();
});
