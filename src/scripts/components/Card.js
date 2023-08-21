export default class Card {
  #name;
  #link;
  #template;
  #cardElement;
  #cardTitle;
  #cardImage;
  #cardLikeButton;
  #cardDeleteButton;
  #handleClickImage;

  constructor({ name, link }, templateSelector, handleClickImage) {
    this.#name = name;
    this.#link = link;
    this.#template = templateSelector;
    this.#handleClickImage = handleClickImage;
  }

  generateCard() {
    this.#cardElement = this.#getTemplate();
      this.#cardTitle = this.#cardElement.querySelector('.card__title');
      this.#cardImage = this.#cardElement.querySelector('.card__image');
      this.#cardLikeButton = this.#cardElement.querySelector('.card__like-button');
      this.#cardDeleteButton = this.#cardElement.querySelector('.card__delete-button');
    
    this.#cardTitle .textContent = this.#name;
    this.#cardImage.src = this.#link;
    this.#cardImage.alt = this.#name;

    this.#setEventListeners();

    return this.#cardElement;
  }
  
  #getTemplate() {
    const cardTemplate = document
    .querySelector(this.#template)
    .content.querySelector('.card')
    .cloneNode(true);

    return cardTemplate;
  }

  #setEventListeners() {
    this.#cardImage.addEventListener('click', () => {
      this.#handleClickImage(this.#name, this.#link);
    });
  
    this.#cardLikeButton.addEventListener('click', () => {
      this.#toggleLike();
    });
  
    this.#cardDeleteButton.addEventListener('click', () => {
      this.#deleteCard();
    });
  }

  #toggleLike() {
    this.#cardLikeButton.classList.toggle('card__like-button_active');
  };

  #deleteCard() {
    this.#cardElement.remove();
  }
}
