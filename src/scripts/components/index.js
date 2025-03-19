import '../../pages/index.css'
import { openModal, closeModal } from './modal.js'
import { disableSubmitButton, enableValidation, resetValidation } from './validate.js'
import { getInitialCards, setOwnerId, getProfileDate, updateProfileData, updateProfileImage, addCardToServer,
  deleteCardFromServer, addLike, deleteLike, renderLoading } from './api.js'
import {createCard} from "./card";



const placesList = document.querySelector(".places__list");

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const profileImage = profile.querySelector('.profile__image');

const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const closeProfilePopupButton = profilePopup.querySelector('.popup__close');
const profileSubmitButton = profilePopup.querySelector('.popup__button');

const profileImagePopup = document.querySelector('.popup_type_new-profile-image');
const profileImageForm = profileImagePopup.querySelector('.popup__form');
const closeProfileImagePopupButton = profileImagePopup.querySelector('.popup__close');
const profileImageSubmitButton = profileImageForm.querySelector('.popup__button');
const profileImageUrl = profileImageForm.querySelector('.popup__input_type_url');

const cardAddButton = profile.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup_type_new-card');
const cardForm = cardPopup.querySelector('.popup__form');
const closeCardPopupButton = cardPopup.querySelector('.popup__close');
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardPopup.querySelector('.popup__input_type_url');
const cardSubmitButton = cardPopup.querySelector('.popup__button');

const imagePopup = document.querySelector('.popup_type_image');
const imageName = imagePopup.querySelector('.popup__caption');
const imageSource = imagePopup.querySelector('.popup__image');
const imageCloseButton = imagePopup.querySelector('.popup__close');

// валидация форм
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


Promise.all([getProfileDate(), getInitialCards()])
  .then(([profile, cards]) => {

    // загрузка данных профиля
    profileName.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileImage.style.backgroundImage = `url(${profile.avatar})`;
    setOwnerId(profile._id);

    // загрузка и отображение карточек с сервера
    cards.forEach((card) => placesList.append(createCard(card)));
  })
  .catch(err => console.error(err));


// добавление одного обработчика на общий контейнер с карточками
placesList.addEventListener('click', function (evt) {
  const evtTarget = evt.target;

  if (evtTarget.classList.contains('card__like-button')) {
    const cardId = evtTarget.parentElement.parentElement.id;
    evtTarget.classList.toggle('card__like-button_is-active');

    if (evtTarget.classList.contains('card__like-button_is-active')) {
      addLike(cardId)
        .then(card => {
          evtTarget.textContent = card.likes.length;
        })
        .catch(err => console.error(err));
    } else {
      deleteLike(cardId)
        .then(card => {
          evtTarget.textContent = card.likes.length;
        })
        .catch(err => console.error(err));
    }
  }

  if (evtTarget.classList.contains('card__delete-button')) {
    deleteCardFromServer(evtTarget.parentElement.id)
      .then(() => {
        evtTarget.closest('.places__item').remove();
      })
      .catch(err => console.error(err));

  }

  if (evtTarget.classList.contains('card__image')) {
    const card = evtTarget.closest('.places__item');
    const cardTitle = card.querySelector('.card__title');
    imageName.textContent = cardTitle.textContent;
    imageSource.src = evtTarget.src;
    imageSource.alt = cardTitle.textContent;
    openModal(imagePopup);
  }
});


// плавное появление попапов
document.querySelectorAll('.popup').forEach((popupItem) =>
  popupItem.classList.add('popup_is-animated'));


// обработчик закрытия картинки по кнопке
imageCloseButton.addEventListener('click', () => closeModal(imagePopup));


// обработчики для окна профиля
profileEditButton.addEventListener('click', function openProfileEdit()  {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

closeProfilePopupButton.addEventListener('click', () => {
  closeModal(profilePopup);
  resetValidation(validationSettings, profileForm);
});

profileForm.addEventListener('submit', function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(profileSubmitButton, true);
  updateProfileData(nameInput.value, jobInput.value)
    .then(profileData => {
      profileName.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      closeModal(profilePopup);
      disableSubmitButton(profileSubmitButton, 'popup__button_disabled');
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(profileSubmitButton, false);
    });
});


// обработчики для обновления картинки профиля
profileImage.addEventListener('click', function openProfileImageEdit() {
  profileImageUrl.value = '';
  openModal(profileImagePopup);
});

closeProfileImagePopupButton.addEventListener('click', () => {
  closeModal(profileImagePopup);
  resetValidation(validationSettings, profileImageForm);
});

profileImageForm.addEventListener('submit', function handleProfileImageSubmit(evt) {
  evt.preventDefault();
  renderLoading(profileImageSubmitButton, true);
  updateProfileImage(profileImageUrl.value)
    .then(imageData => {
      profileImage.style.backgroundImage = `url(${imageData.avatar})`;
      closeModal(profileImagePopup);
      disableSubmitButton(profileImageSubmitButton, 'popup__button_disabled');
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(profileImageSubmitButton, false);
    });
})


// обработчики для окна добавления новой карточки
cardAddButton.addEventListener('click', function openCardAdding() {
  cardNameInput.value = '';
  cardUrlInput.value = '';
  openModal(cardPopup);
});

closeCardPopupButton.addEventListener('click', () => {
  closeModal(cardPopup);
  resetValidation(validationSettings, cardForm);
});

cardForm.addEventListener('submit', function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(cardSubmitButton, true);
  addCardToServer(cardNameInput.value, cardUrlInput.value)
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
});


enableValidation(validationSettings);