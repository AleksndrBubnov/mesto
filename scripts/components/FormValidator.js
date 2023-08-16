export default class FormValidator {
  #config
  #formElement
  #inputList
  #submitButton
  #form 
  #cardImage 
  #likeButton

  constructor(config, formElement) {
    this.#config = config;
    this.#formElement = formElement;
  }
 
  enableValidation() {
    this.#setEventListener();
  }

  resetValidation() {
    this.#inputList.forEach((inputElement) => {
      const errorElement = this.#formElement.querySelector(`#${inputElement.name}-error`);
      this.#hideError(inputElement, errorElement);
    });
  }

  enabledButton() {
    this.#submitButton.disabled = false;
    this.#submitButton.classList.remove(this.#config.inactiveButtonClass);
  }
  
  disabledButton() {
    this.#submitButton.disabled = true;
    this.#submitButton.classList.add(this.#config.inactiveButtonClass);
  }
 
  #setEventListener() {
    this.#inputList = this.#formElement.querySelectorAll(this.#config.inputSelector);
    this.#submitButton = this.#formElement.querySelector(this.#config.submitButtonSelector);
    // this.#form =  this.#formElement.querySelector(this.#config.formSelector);
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
