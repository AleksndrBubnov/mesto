function showError(inputElement, errorElement) {
  inputElement.classList.add("popup__input-text_type_error");
  errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement) {
  inputElement.classList.remove("popup__input-text_type_error");
  errorElement.textContent = inputElement.validationMessage;
}

function checkInputValidity(inputElement, formElement) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  console.log(errorElement);
  console.log(formElement.checkValidity());
  
  if(!isInputValid){
    showError(inputElement, errorElement);
  } else {
    hideError(inputElement, errorElement);
  }
}

function disabledButton(buttonElement) {
  buttonElement.disabled = true;
  buttonElement.classList.add("popup__submit_invalid");
}

function enabledButton(buttonElement) {
  buttonElement.disabled = false;
  buttonElement.classList.remove("popup__submit_invalid");
}

function toggleButtonState(buttonElement, isActive) {
  if (!isActive) {
    disabledButton(buttonElement);
  } else {
    enabledButton(buttonElement);
  }
}

function setEventListener(formElement) {
  const inputList = formElement.querySelectorAll(".popup__input-text");
  const submitButton = formElement.querySelector(".popup__submit");

  toggleButtonState(submitButton, formElement.checkValidity());
  [...inputList].forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(submitButton, formElement.checkValidity());
      checkInputValidity(inputElement, formElement);
    });
  });
  
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(!formElement.checkValidity()) return;
    
    console.log('Форма отправлена!', formElement.checkValidity());
  });
}

function enableValidation() {
  const formsList = document.querySelectorAll(".popup__form");

  [...formsList].forEach(function (formElement){
    setEventListener(formElement);
  });
}

enableValidation();