function showInputError(inputErrorClass, errorClass, formElement, inputElement, errorMessage) {
  inputElement.classList.add(inputErrorClass);
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.classList.add(errorClass);
  formError.textContent = errorMessage;
}

function hideInputError(inputErrorClass, errorClass, formElement, inputElement){
  inputElement.classList.remove(inputErrorClass);
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.classList.remove(errorClass);
  formError.textContent = '';
}

function checkInputValidity(inputErrorClass, errorClass, formElement, inputElement){
  if (!inputElement.validity.valid) {
    showInputError(inputErrorClass, errorClass, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(inputErrorClass, errorClass, formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inactiveButtonClass, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

const setEventListeners = (validSettings, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validSettings.inputSelector));
  const buttonElement = formElement.querySelector(validSettings.submitButtonSelector);

  toggleButtonState(validSettings.inactiveButtonClass, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(validSettings.inputErrorClass, validSettings.errorClass, formElement, inputElement);
      toggleButtonState(validSettings.inactiveButtonClass, inputList, buttonElement);
    });
  });
};

const enableValidation = (validSettings) => {
  const formList = Array.from(document.querySelectorAll(validSettings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(validSettings, formElement);
  });
};

export { enableValidation };