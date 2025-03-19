function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalByEsc);
  popup.addEventListener('click', closeModalByOverlayTap);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalByEsc);
  popup.removeEventListener('click', closeModalByOverlayTap);
}

function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

function closeModalByOverlayTap(evt) {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
}

export { openModal, closeModal };