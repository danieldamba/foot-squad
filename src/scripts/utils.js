import { tr } from "date-fns/locale";
import {Player, Country }from "./factory.js";
import { getMySquad } from "./storage.js";

function createPlayer([...args], countryName) {
  const [name, id, position, level, releaseDate, age] = args;
  if (!dateChecker(releaseDate)) {
    throw new Error('Player is about to expire in less than 15 minutes');
    return;
  }
  name.trim();
  position.trim();
  level.trim();
  releaseDate.trim();
  Number(age);

  const squad = getMySquad();
  const countryIndex = squad.findIndex(country => country.name.toLowerCase() === countryName.toLowerCase());
  if (countryIndex === -1) {
    throw new Error('Country does not exist');
    return;
  }

  let newPlayer = new Player(name, id, position, level, releaseDate, age);
  squad[countryIndex].addPlayer(newPlayer);
}

function removePlayer(playerId, countryName) {
  let country = getMySquad().find(country => country.name.toLowerCase() === countryName.toLowerCase());
  if(!country) {
    throw new Error('Country does not exist');
    return;
  }

  getMySquad()[getMySquad().indexOf(country)].removePlayer(playerId);
};

function updateCountry(countryName, newName) {
  let country = getMySquad().find(country => country.name.toLowerCase() === countryName.toLowerCase());
  if(!country) {
    throw new Error('Country does not exist');
    return;
  }

  getMySquad()[getMySquad().indexOf(country)].updateCountry(newName);
}

function updatePlayer(playerId, countryName, newName, newAge, newPosition, newLevel, newExpDate) {
  let country = getMySquad().find(country => country.name.toLowerCase() === countryName.toLowerCase());
  if(!country) {
    throw new Error('Country does not exist');
    return;
  }

  let player = country.players.find(player => player.id === playerId);
  if(!player) {
    throw new Error('Player does not exist');
    return;
  }

  const countryIndex = getMySquad().indexOf(country);
  const playerIndex = country.players.indexOf(player);
  getMySquad()[countryIndex].players[playerIndex].updatePlayer(newName, newAge, newPosition, newLevel, newExpDate);
}

function createCountry(name, continent, id = null) {
  name.trim();
  continent.trim();

  let countries = getMySquad().map(country => country.name.toLowerCase());
  if (countries.includes(name.toLowerCase())) {
    throw new Error('Country already exists');
    return;
  }

  let newCountry = new Country(name, continent, id);
  getMySquad().push(newCountry);
}

function dateChecker(dateOne) {
  const currentDate = new Date().getTime();
  const expirationDate = new Date(dateOne).getTime();

  let result = expirationDate - currentDate;
  
  if (result < 900000) {
    return false;
  } else {
    return true;
  }
}


export { createPlayer, createCountry };