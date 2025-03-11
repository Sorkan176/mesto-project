import { createCard } from './components/card.js'
import { openModal, closeModal } from './components/modal.js'
import { enableValidation } from './components/validate.js'
import { initialCards } from './cards.js'


const placesList = document.querySelector(".places__list");

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const profilePopup = document.querySelector('.popup_type_edit');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const closeProfilePopupButton = profilePopup.querySelector('.popup__close');

const cardAddButton = profile.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup_type_new-card');
const closeCardPopupButton = cardPopup.querySelector('.popup__close');
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardPopup.querySelector('.popup__input_type_url');

const imagePopup = document.querySelector('.popup_type_image');
const imageName = imagePopup.querySelector('.popup__caption');
const imageSource = imagePopup.querySelector('.popup__image');
const imageCloseButton = imagePopup.querySelector('.popup__close');

// добавление одного обработчика на общий контейнер с карточками
placesList.addEventListener('click', function (evt) {
  const evtTarget = evt.target;

  if (evtTarget.classList.contains('card__like-button')) {
    evtTarget.classList.toggle('card__like-button_is-active');
  }

  if (evtTarget.classList.contains('card__delete-button')) {
    evtTarget.closest('.places__item').remove();
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

// добавление карточек из "коробки"
document.querySelectorAll('.popup').forEach((popupItem) => popupItem.classList.add('popup_is-animated'));

initialCards.forEach((card) => {
  placesList.append(createCard(card));
});


// обработчики для окна профиля
profileEditButton.addEventListener('click', function openProfileEdit()  {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

closeProfilePopupButton.addEventListener('click', () => closeModal(profilePopup));

profilePopup.addEventListener('submit', function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
});


// обработчики для окна добавления новой карточки
cardAddButton.addEventListener('click', function openCardAdding() {
  cardNameInput.value = '';
  cardUrlInput.value = '';
  openModal(cardPopup);
});

closeCardPopupButton.addEventListener('click', () => closeModal(cardPopup));

cardPopup.addEventListener('submit', function handleCardFormSubmit(evt) {
  evt.preventDefault();
  placesList.prepend(createCard({name: cardNameInput.value, link: cardUrlInput.value}));
  closeModal(cardPopup);
});

// обработчик закрытия картинки по кнопке
imageCloseButton.addEventListener('click', () => closeModal(imagePopup));


// валидация форм
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationSettings);