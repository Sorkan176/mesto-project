function createCard(card) {
  const cardTemplate = document.querySelector("#card-template").content.cloneNode(true);
  const cardItem = cardTemplate.querySelector(".card");
  const cardTitle = cardTemplate.querySelector(".card__title");
  const cardImage = cardTemplate.querySelector(".card__image");
  const cardLikes = cardTemplate.querySelector(".card__like-button");
  const cardDeleteButton = cardTemplate.querySelector(".card__delete-button");

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardItem.setAttribute('id', card._id);
  cardLikes.textContent = card.likes.length;

  // todo возможно стоит брать это значение из поля возвращаемого объекта
  if (card.owner && card.owner._id !== "084435b1fc533211387501ad") {
    cardDeleteButton.style.display = "none";
  }

  if (card.likes.some(like => like._id === "084435b1fc533211387501ad")) {
    cardLikes.classList.toggle('card__like-button_is-active')
  }


  return cardTemplate;
}

export { createCard };