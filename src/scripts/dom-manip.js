import { createCountry, createPlayer } from "./utils.js";
import { saveData, loadData, clearData, getMySquad } from "./storage.js";


function renderPlayer() {
  let mySquad = getMySquad();

  const mainContainer = document.querySelector('#main-content');
  mainContainer.innerHTML = '';

  const playerContainer = document.createElement('div');
  playerContainer.classList.add('player-container');

  mySquad.forEach(country => {
    if (country.players.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = `No players in ${country.name}. Add some players!`;
      playerContainer.appendChild(emptyMessage);
    } else {
      country.players.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.classList.add('player-card');

        const playerName = document.createElement('h3');
        playerName.textContent = player.name;
        playerCard.appendChild(playerName);

        const playerPosition = document.createElement('p');
        playerPosition.textContent = `Position: ${player.position}`;
        playerCard.appendChild(playerPosition);

        const playerAge = document.createElement('p');
        playerAge.textContent = `Age: ${player.age}`;
        playerCard.appendChild(playerAge);

        const countryName = document.createElement('p');
        countryName.textContent = `Country: ${country.name}`;
        playerCard.appendChild(countryName);

        playerContainer.appendChild(playerCard);
      });
    }
  });

  mainContainer.appendChild(playerContainer);
}

function renderCountry() {
  let mySquad = getMySquad();

  const mainContainer = document.querySelector('#main-content');
  mainContainer.innerHTML = '';

  const countryContainer = document.createElement('div');
  countryContainer.classList.add('country-container');

  const title = document.createElement('h2');
  title.textContent = 'My Countries';
  countryContainer.appendChild(title);

  if (mySquad.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Your squad is empty. Add some countries!';
    countryContainer.appendChild(emptyMessage);
  } else {
    mySquad.forEach(country => {
      const countryCard = document.createElement('div');
      countryCard.classList.add('country-card');

      const countryName = document.createElement('h3');
      countryName.textContent = country.name;
      countryCard.appendChild(countryName);

      const playerCount = document.createElement('p');
      playerCount.textContent = `Players: ${country.players.length}`;
      countryCard.appendChild(playerCount);

      countryContainer.appendChild(countryCard);
    });
  }

  mainContainer.appendChild(countryContainer);
}

function renderDashboard() {
  let mySquad = getMySquad();

  const mainContainer = document.querySelector('#main-content');
  mainContainer.innerHTML = '';

  const dashboardContainer = document.createElement('div');
  dashboardContainer.classList.add('dashboard-container');

  const title = document.createElement('h2');
  title.textContent = 'My Squad';
  dashboardContainer.appendChild(title);

  if (mySquad.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Your squad is empty. Add some players!';
    dashboardContainer.appendChild(emptyMessage);
  } else {
    const playerCont = document.createElement('div');
    const countryCont = document.createElement('div');
    playerCont.classList.add('player-container');
    countryCont.classList.add('country-container');

    mySquad.forEach(country => {
      const countryCard = document.createElement('div');
      countryCard.classList.add('country-card');

      const countryName = document.createElement('h3');
      countryName.textContent = country.name;
      countryCard.appendChild(countryName);
      countryCont.appendChild(countryCard);


      country.players.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.classList.add('player-card');

        const playerName = document.createElement('h3');
        playerName.textContent = player.name;
        playerCard.appendChild(playerName);

        const playerPosition = document.createElement('p');
        playerPosition.textContent = `Position: ${player.position}`;
        playerCard.appendChild(playerPosition);

        const playerAge = document.createElement('p');
        playerAge.textContent = `Age: ${player.age}`;
        playerCard.appendChild(playerAge);

        const countryName = document.createElement('p');
        countryName.textContent = `Country: ${country.name}`;
        playerCard.appendChild(countryName);

        playerCont.appendChild(playerCard);
      });
    });

    dashboardContainer.appendChild(playerCont);
    dashboardContainer.appendChild(countryCont);
  }

  mainContainer.appendChild(dashboardContainer);
}


export { renderPlayer, renderCountry, renderDashboard };