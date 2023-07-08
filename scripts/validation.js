function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function checkInputValidity(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  
  if(!isInputValid){
    showError(inputElement, errorElement, config);
  } else {
    hideError(inputElement, errorElement, config);
  }
}

function disabledButton(buttonElement, config) {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
}

function enabledButton(buttonElement, config) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
}

function toggleButtonState(buttonElement, isActive, config) {
  if (!isActive) {
    disabledButton(buttonElement, config);
  } else {
    enabledButton(buttonElement, config);
  }
}

function setEventListener(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  console.log(formElement);

  toggleButtonState(submitButton, formElement.checkValidity(), config);
  [...inputList].forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(submitButton, formElement.checkValidity(), config);
      checkInputValidity(inputElement, formElement, config);
    });
  });
  
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(!formElement.checkValidity()) return;
  });
}

function enableValidation(config) {
  const formsList = document.querySelectorAll(config.formSelector);

  [...formsList].forEach(function (formElement){
    setEventListener(formElement, config);
  });
}


const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_invalid',
  inputErrorClass: 'popup__input-text_type_error'
}


enableValidation(config);