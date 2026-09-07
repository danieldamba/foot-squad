import { createCountry, createPlayer } from "./utils.js";
import { saveData, loadData, clearData, getMySquad } from "./storage.js";


function renderPlayer() {
  let mySquad = getMySquad();

  const mainContainer = document.querySelector('#main-content');
  mainContainer.innerHTML = '';

  const playerContainer = document.createElement('div');
  playerContainer.classList.add('player-container');
  if(mySquad.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Your squad is empty. Add some players!';
    playerContainer.appendChild(emptyMessage);
  } else {
    const title = document.createElement('h2');
    title.textContent = 'My Players';
    playerContainer.appendChild(title);
  }
  mySquad.forEach(country => {
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

        const deleteBtn = document.createElement(`button`);
        deleteBtn.classList.add(`delete-btn`);
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
          country.removePlayer(player.id);
          saveData(getMySquad());
          renderPlayer();
        });

        const editPlayer = document.createElement(`button`);
        editPlayer.classList.add(`edit-btn`);
        editPlayer.textContent = 'Edit';
        editPlayer.addEventListener('click', () => {
          const modal = document.createElement('dialog');
          modal.classList.add('edit-player-modal');
          const form = document.createElement('form');
          form.method = 'dialog';
          form.classList.add('edit-player-form');

          const heading = document.createElement('h2');
          heading.textContent = 'Edit Player';
          form.appendChild(heading);

          const createInput = (labelText, name, type, value, attributes = {}) => {
            const label = document.createElement('label');
            label.appendChild(document.createTextNode(labelText));
            const input = document.createElement('input');
            input.name = name;
            input.type = type;
            input.value = value ?? '';
            Object.entries(attributes).forEach(([attribute, attributeValue]) => {
              input.setAttribute(attribute, attributeValue);
            });
            label.appendChild(input);
            form.appendChild(label);
          };

          createInput('Name', 'name', 'text', player.name, { required: '' });
          createInput('Age', 'age', 'number', player.age, { min: '1', required: '' });
          createInput('Position', 'position', 'text', player.position, { required: '' });
          createInput('Level', 'level', 'number', player.level, { min: '1', required: '' });
          createInput(
            'Expiration date',
            'expirationDate',
            'date',
            player.expirationDate,
            { required: '' }
          );

          const buttonContainer = document.createElement('div');
          const cancelButton = document.createElement('button');
          cancelButton.addEventListener('click', () => {
            modal.close();
            modal.remove();
          });
          cancelButton.type = 'button';
          cancelButton.value = 'cancel';
          cancelButton.textContent = 'Cancel';
          const saveButton = document.createElement('button');
          saveButton.type = 'submit';
          saveButton.value = 'save';
          saveButton.textContent = 'Save';
          buttonContainer.append(cancelButton, saveButton);
          form.appendChild(buttonContainer);
          modal.appendChild(form);

          document.body.appendChild(modal);
          form.addEventListener('submit', event => {
            event.preventDefault();
            if (event.submitter.value !== 'save') {
              modal.close();
              modal.remove();
              return;
            }

            const formData = new FormData(form);
            player.updatePlayer(
              formData.get('name'),
              formData.get('age'),
              formData.get('position'),
              formData.get('level'),
              formData.get('expirationDate')
            );
            // Persist the updated in-memory squad to localStorage.
            const updatedSquad = getMySquad();
            saveData(updatedSquad);
            modal.close();
            modal.remove();
            renderPlayer();
          });

          modal.addEventListener('cancel', () => modal.remove(), { once: true });
          modal.showModal();
        });

        playerCard.appendChild(editPlayer);
        playerCard.appendChild(deleteBtn);

        playerContainer.appendChild(playerCard);
      });
    
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