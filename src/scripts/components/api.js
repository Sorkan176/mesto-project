import { closeModal } from './modal.js'
import { disableSubmitButton } from "./validate";
import {createCard} from "./card";


const config = {
  baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
  headers: {
    authorization: '450ee041-353e-4009-b774-e38bda343da7',
    'Content-Type': 'application/json'
  }
}


// загрузка данных профиля
function getProfileDate(profileName, profileDescription, profileImage) {
  fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((profile) => {
      profileName.textContent = profile.name;
      profileDescription.textContent = profile.about;
      profileImage.style.backgroundImage=`url(${profile.avatar})`;
    })
    .catch(err => console.error(err));
}


// загрузка картинок с сервера
function getInitialCards(placesList) {
  fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((result) => {
      result.forEach((card) => placesList.append(createCard(card)));
    })
    .catch(err => console.error(err));
}


// изменение кнопки при загрузке
function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}


// обновление данных профиля на сервере
function updateProfileData(nameInput, jobInput, profileName, profileDescription, profilePopup, profileSubmitButton) {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
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


// обновление фотографии профиля
function updateProfileImage(imageInput, profileImage, profileImagePopup, profileImageSubmitButton) {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
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


//добавление карточки на сервер
function addCardToServer(cardNameInput, cardUrlInput, placesList, cardPopup, cardSubmitButton) {
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
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


// удаление карточки на сервере
function deleteCardFromServer(cardId) {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => res.json())
    .then()
    .catch(err => console.error(err));
}


// добавление лайка на карточку
function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => res.json())
    .then(res => {
      return res.likes.length;
    })
    .catch(err => console.error(err));
}

// удаление лайка с карточки
function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => res.json())
    .then(res => {
      return res.likes.length;
    })
    .catch(err => console.error(err));
}


export { getInitialCards, getProfileDate, updateProfileData, updateProfileImage, addCardToServer,
  deleteCardFromServer, addLike, deleteLike, renderLoading };