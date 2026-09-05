class Country {
  constructor(name, continent, id, players = []) { 
    this.name = name;
    this.continent = continent;
    this.id = !id ? crypto.randomUUID() : id;
    this.players = players || [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayer(playerId) {
    this.players = this.players.filter(player => player.id !== playerId);
  }

  updateCountry(name, continent) {
    this.name = name;
    this.continent = continent;
  }

}

class Player {
  constructor(name, id, position, level, releaseDate, age) {
    this.name = name;
    this.id = !id ? crypto.randomUUID() : id;
    this.position = position || `CM`;
    this.level = level || 1;
    this.signDate = new Date();
    this.liked = false;
    this.expirationDate = new Date(releaseDate);
    this.age = age || null;
  }

  updatePlayer(name, age, position, level, expDate) {
    this.name = name;
    this.age = age;
    this.position = position;
    this.level = level;
    this.expirationDate = new Date(expDate);
  }

  toggleLike() {
    this.liked = this.liked === false ? true : false;
  }

}

export { Country, Player };