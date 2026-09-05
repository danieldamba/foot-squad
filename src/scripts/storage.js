import {Player, Country }from "./factory.js";

const STORAGE_KEY = 'mySquadData';

let MY_SQUAD = loadData();

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadData() {

  const data = reinstanceData(localStorage.getItem(STORAGE_KEY));
  return data || [
    new Country('Argentina', 'South America', crypto.randomUUID(), []),
  ];
}

export function clearData() {
  localStorage.removeItem(STORAGE_KEY);
  MY_SQUAD = [];
};

export function getMySquad() {
  return MY_SQUAD;
}

export function setMySquad(data) {
  MY_SQUAD = data;
  saveData(MY_SQUAD);
}

function reinstanceData(data) {
  if (!data) return null;

  const parsedData = JSON.parse(data);

  return parsedData.map(country => {
    const newCountry = new Country(country.name, country.continent, country.id, []);
    newCountry.players = country.players.map(player => new Player(player.name, player.position, player.age));
    return newCountry;
  });
}