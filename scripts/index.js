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
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
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