export class FormValidator {
  #config
  constructor(config) {
    this.#config = config;
  }
 
  enableValidation() {
    const formsList = document.querySelectorAll(this.#config.formSelector);

    [...formsList].forEach(formElement => this.#setEventListener(formElement));
  }
  
  #setEventListener(formElement) {
    const inputList = formElement.querySelectorAll(this.#config.inputSelector);
    const submitButton = formElement.querySelector(this.#config.submitButtonSelector);
  
    this.#toggleButtonState(submitButton, formElement.checkValidity());
  
    [...inputList].forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.#toggleButtonState(submitButton, formElement.checkValidity());
        this.#checkInputValidity(inputElement, formElement);
      });
    });
    
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if(!formElement.checkValidity()) return;
    });
  }
  
  #checkInputValidity(inputElement, formElement) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    
    if(!isInputValid){
      this.#showError(inputElement, errorElement);
    } else {
      this.#hideError(inputElement, errorElement);
    }
  }
  
  #showError(inputElement, errorElement) {
    inputElement.classList.add(this.#config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
  #hideError(inputElement, errorElement) {
    inputElement.classList.remove(this.#config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
  #toggleButtonState(buttonElement, isActive) {
    if (!isActive) {
      this.#disabledButton(buttonElement);
    } else {
      this.#enabledButton(buttonElement);
    }
  }
  
  #enabledButton(buttonElement) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(this.#config.inactiveButtonClass);
  }
  
  #disabledButton(buttonElement) {
    buttonElement.disabled = true;
    buttonElement.classList.add(this.#config.inactiveButtonClass);
  }
}

// //**** Валидация, реализованная в функциональном стиле ****
// function enableValidation(config) {
//   const formsList = document.querySelectorAll(config.formSelector);

//   [...formsList].forEach(formElement => setEventListener(formElement, config));
// }

// function setEventListener(formElement, config) {
//   const inputList = formElement.querySelectorAll(config.inputSelector);
//   const submitButton = formElement.querySelector(config.submitButtonSelector);

//   toggleButtonState(submitButton, formElement.checkValidity(), config);

//   [...inputList].forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       toggleButtonState(submitButton, formElement.checkValidity(), config);
//       checkInputValidity(inputElement, formElement, config);
//     });
//   });
  
//   formElement.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     if(!formElement.checkValidity()) return;
//   });
// }

// function checkInputValidity(inputElement, formElement, config) {
//   const isInputValid = inputElement.validity.valid;
//   const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  
//   if(!isInputValid){
//     showError(inputElement, errorElement, config);
//   } else {
//     hideError(inputElement, errorElement, config);
//   }
// }

// function showError(inputElement, errorElement, config) {
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = inputElement.validationMessage;
// }

// function hideError(inputElement, errorElement, config) {
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.textContent = inputElement.validationMessage;
// }

// function toggleButtonState(buttonElement, isActive, config) {
//   if (!isActive) {
//     disabledButton(buttonElement, config);
//   } else {
//     enabledButton(buttonElement, config);
//   }
// }

// function enabledButton(buttonElement, config) {
//   buttonElement.disabled = false;
//   buttonElement.classList.remove(config.inactiveButtonClass);
// }

// function disabledButton(buttonElement, config) {
//   buttonElement.disabled = true;
//   buttonElement.classList.add(config.inactiveButtonClass);
// }

// enableValidation(config);
