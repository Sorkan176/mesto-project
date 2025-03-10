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

document.querySelectorAll('.popup').forEach((popupItem) => popupItem.classList.add('popup_is-animated'));

function createCard(card) {
  const cardTemplate = document.querySelector("#card-template").content.cloneNode(true);
  const cardTitle = cardTemplate.querySelector(".card__title");
  const cardImage = cardTemplate.querySelector(".card__image");

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const likeButton = cardTemplate.querySelector('.card__like-button');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  });

  const deleteButton = cardTemplate.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function (evt) {
    evt.target.closest('.places__item').remove();
  });

  const imageButton = cardTemplate.querySelector('.card__image');
  imageButton.addEventListener('click', function () {
    imageName.textContent = cardTitle.textContent;
    imageSource.src = cardImage.src;
    imageSource.alt = cardTitle.textContent;
    openModal(imagePopup);
  })

  return cardTemplate;
}

initialCards.forEach((card) => {
  placesList.append(createCard(card));
});


function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalByEsc);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalByEsc);
}

function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

profileEditButton.addEventListener('click', function openProfileEdit()  {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

closeProfilePopupButton.addEventListener('click', () => closeModal(profilePopup));

profilePopup.addEventListener('submit', function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup); // Пока что закроем сразу
});

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

imageCloseButton.addEventListener('click', () => closeModal(imagePopup));


function showInputError(formElement, inputElement, errorMessage) {
  inputElement.classList.add('form__input_type_error');
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.classList.add('form__input-error_active');
  formError.textContent = errorMessage;
}

function hideInputError(formElement, inputElement){
  inputElement.classList.remove('form__input_type_error');
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.classList.remove('form__input-error_active');
  formError.textContent = '';
}


function checkInputValidity (formElement, formInput){
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;});
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('button_inactive');
    buttonElement.removeAttribute('disabled');
  }
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();

const enableOverlayClosing = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popup) => {
    popup.addEventListener('click', function() {
      closeModal(popup);
    })
  })
}

enableOverlayClosing();