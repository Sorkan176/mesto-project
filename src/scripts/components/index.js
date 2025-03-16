import '../../pages/index.css'
import { createCard } from './card.js'
import { openModal, closeModal } from './modal.js'
import { enableValidation } from './validate.js'
import { updateProfileData, updateProfileImage, addCardToServer, deleteCardFromServer,
  addLike, deleteLike, renderLoading } from './api.js'


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


// загрузить данные профиля
fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me', {
  headers: {
    authorization: '450ee041-353e-4009-b774-e38bda343da7'
  }
})
  .then(res => res.json())
  .then((result) => {
    //console.log(result);
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileImage.style.backgroundImage=`url(${result.avatar})`;
  })
  .catch(err => console.error(err));


// загрузить картинки с сервера
fetch('https://nomoreparties.co/v1/apf-cohort-202/cards', {
  headers: {
    authorization: '450ee041-353e-4009-b774-e38bda343da7'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
    result.forEach((card) => placesList.append(createCard(card)));
  })
  .catch(err => console.error(err));


// добавление одного обработчика на общий контейнер с карточками
placesList.addEventListener('click', function (evt) {
  const evtTarget = evt.target;

  if (evtTarget.classList.contains('card__like-button')) {
    const cardId = evtTarget.parentElement.parentElement.id;
    evtTarget.classList.toggle('card__like-button_is-active');

    if (evtTarget.classList.contains('card__like-button_is-active')) {
      //evtTarget.textContent = Number(evtTarget.textContent) + 1;
      addLike(cardId)
        .then(likesCount => {
          evtTarget.textContent = likesCount;
        })
    } else {
      //evtTarget.textContent = Number(evtTarget.textContent) - 1;
      deleteLike(cardId)
        .then(likesCount => {
          evtTarget.textContent = likesCount;
        })
    }
  }

  if (evtTarget.classList.contains('card__delete-button')) {
    deleteCardFromServer(evtTarget.parentElement.id);
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


document.querySelectorAll('.popup').forEach((popupItem) => popupItem.classList.add('popup_is-animated'));


// обработчики для окна профиля
profileEditButton.addEventListener('click', function openProfileEdit()  {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

closeProfilePopupButton.addEventListener('click', () => closeModal(profilePopup));

profileForm.addEventListener('submit', function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(profileSubmitButton, true);
  updateProfileData(
    nameInput.value,
    jobInput.value,
    profileName,
    profileDescription,
    profilePopup,
    profileSubmitButton
  );
});

// обработчики для обновления картинки профиля
profileImage.addEventListener('click', function openProfileImageEdit() {
  profileImageUrl.value = '';
  openModal(profileImagePopup);
});

closeProfileImagePopupButton.addEventListener('click', () => closeModal(profileImagePopup));

profileImageForm.addEventListener('submit', function handleProfileImageSubmit(evt) {
  evt.preventDefault();
  renderLoading(profileImageSubmitButton, true);
  updateProfileImage(
    profileImageUrl.value,
    profileImage,
    profileImagePopup,
    profileImageSubmitButton
    );
})


// обработчики для окна добавления новой карточки
cardAddButton.addEventListener('click', function openCardAdding() {
  cardNameInput.value = '';
  cardUrlInput.value = '';
  openModal(cardPopup);
});

closeCardPopupButton.addEventListener('click', () => closeModal(cardPopup));

cardForm.addEventListener('submit', function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(cardSubmitButton, true);
  addCardToServer(
    cardNameInput.value,
    cardUrlInput.value,
    placesList,
    cardPopup,
    cardSubmitButton);
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