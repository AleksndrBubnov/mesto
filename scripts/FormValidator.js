export class FormValidator {
  #config
  #formElement
  #form 
  #inputList
  #submitButton
  #cardImage 
  #likeButton

  // formSelector: '.popup__form',
  // inputSelector: '.popup__input-text',
  // submitButtonSelector: '.popup__submit',
  // inactiveButtonClass: 'popup__submit_invalid',
  // inputErrorClass: 'popup__input-text_type_error'
  
  constructor(config, formElement) {
    this.#config = config;
    this.#formElement = formElement;
  }
 
  enableValidation() {
    this.#setEventListener();
  }

  enabledButton() {
    this.#submitButton.disabled = false;
    this.#submitButton.classList.remove(this.#config.inactiveButtonClass);
  }
  
  disabledButton() {
    this.#submitButton.disabled = true;
    this.#submitButton.classList.add(this.#config.inactiveButtonClass);
  }

  //работает наоборот 
  resetValidation() {
    // this.#toggleButtonState(true);
    
    this.#inputList.forEach((inputElement) => {
      const errorElement = this.#formElement.querySelector(`#${inputElement.name}-error`);
      this.#hideError(inputElement, errorElement);
    });
  }
  
  #setEventListener() {
    this.#form =  this.#formElement.querySelector(this.#config.formSelector);
    this.#inputList = this.#formElement.querySelectorAll(this.#config.inputSelector);
    this.#submitButton = this.#formElement.querySelector(this.#config.submitButtonSelector);
    // this.#cardImage =  this.#formElement.querySelector(this.#config.);
    // this.#likeButton =  this.#formElement.querySelector(this.#config.);
  
    this.#toggleButtonState(this.#formElement.checkValidity());
  
    [...this.#inputList].forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.#toggleButtonState(this.#formElement.checkValidity());
        this.#checkInputValidity(inputElement, this.#formElement);
      });
    });
    
    this.#formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if(!this.#formElement.checkValidity()) return;
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
    errorElement.textContent = '';
  }
  
  #toggleButtonState(isActive) {
    if (!isActive) {
      this.disabledButton();
    } else {
      this.enabledButton();
    }
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
