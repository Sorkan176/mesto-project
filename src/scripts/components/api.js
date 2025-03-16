import { closeModal } from './modal.js'
import { disableSubmitButton } from "./validate";
import {createCard} from "./card";


function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

// обновить данные профиля на сервере
function updateProfileData(nameInput, jobInput, profileName, profileDescription, profilePopup, profileSubmitButton) {
  fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '450ee041-353e-4009-b774-e38bda343da7',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput,
      about: jobInput
    })
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(profilePopup);
      disableSubmitButton(profileSubmitButton, 'popup__button_disabled');
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(profileSubmitButton, false);
    });
}

// обновить фотографию профиля
function updateProfileImage(imageInput, profileImage, profileImagePopup, profileImageSubmitButton) {
  fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '450ee041-353e-4009-b774-e38bda343da7',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: imageInput
    })
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closeModal(profileImagePopup);
      disableSubmitButton(profileImageSubmitButton, 'popup__button_disabled');
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(profileImageSubmitButton, false);
    });
}

//добавить карточку на сервер
function addCardToServer(cardNameInput, cardUrlInput, placesList, cardPopup, cardSubmitButton) {
  fetch('https://nomoreparties.co/v1/apf-cohort-202/cards', {
    method: 'POST',
    headers: {
      authorization: '450ee041-353e-4009-b774-e38bda343da7',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardNameInput,
      link: cardUrlInput
    })
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then(card => {
      placesList.prepend(createCard(card));
      closeModal(cardPopup);
      disableSubmitButton(cardSubmitButton, 'popup__button_disabled');
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(cardSubmitButton, false);
    });
}

// удалить карточку на сервере
function deleteCardFromServer(cardId) {
  fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '450ee041-353e-4009-b774-e38bda343da7',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then()
    .catch(err => console.error(err));
}

function addLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '450ee041-353e-4009-b774-e38bda343da7',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => {
      return res.likes.length;
    })
    .catch(err => console.error(err));
}

function deleteLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '450ee041-353e-4009-b774-e38bda343da7',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => {
      return res.likes.length;
    })
    .catch(err => console.error(err));
}


export { updateProfileData, updateProfileImage, addCardToServer, deleteCardFromServer, addLike, deleteLike, renderLoading };