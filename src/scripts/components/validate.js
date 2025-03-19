// отобразить ошибки у поля ввода формы
function showInputError(validSettings, formElement, inputElement, errorMessage) {
  inputElement.classList.add(validSettings.inputErrorClass);
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.classList.add(validSettings.errorClass);
  formError.textContent = errorMessage;
}

// скрыть ошибки у поля формы
function hideInputError(validSettings, formElement, inputElement){
  inputElement.classList.remove(validSettings.inputErrorClass);
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.classList.remove(validSettings.errorClass);
  formError.textContent = '';
}

// проверить корректность поля ввода формы
function checkInputValidity(validSettings, formElement, inputElement){
  if (!inputElement.validity.valid) {
    showInputError(validSettings, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(validSettings, formElement, inputElement);
  }
}

// проверить корректность всех полей ввода формы
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// сделать кнопку неактивной
function disableSubmitButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

// изменить состояние кнопки
function toggleButtonState(inactiveButtonClass, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

// сбросить валидацию формы при её закрытии: скрыть ошибки ввода и отключить кнопку отправки
const resetValidation = (validSettings, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validSettings.inputSelector));
  const buttonElement = formElement.querySelector(validSettings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(validSettings, formElement, inputElement);
  });

  disableSubmitButton(buttonElement, validSettings.inactiveButtonClass);
};

// добавить обработчики событий для валидации формы: проверка ввода в полях и управление состоянием кнопки отправки
const setEventListeners = (validSettings, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validSettings.inputSelector));
  const buttonElement = formElement.querySelector(validSettings.submitButtonSelector);

  disableSubmitButton(buttonElement, validSettings.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(validSettings, formElement, inputElement);
      toggleButtonState(validSettings.inactiveButtonClass, inputList, buttonElement);
    });
  });
};

// включить валидацию для всех форм
const enableValidation = (validSettings) => {
  const formList = Array.from(document.querySelectorAll(validSettings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(validSettings, formElement);
  });
};

export { enableValidation, disableSubmitButton, resetValidation };