export default class Card {
  #data;
  #name;
  #link;
  #userId;
  #ownerId;
  #likes;
  #template;
  #handleClicklike;
  #handleClickDelete;
  #handleClickImage;
  #cardElement;
  #cardTitle;
  #cardImage;
  #cardLikeCounter;
  #cardLikeButton;
  #cardDeleteButton;

  constructor(data, userId, templateSelector, handleClicklike, handleClickDelete, handleClickImage) {
    this.#data = data;
    this.#name = data.name;
    this.#link = data.link;
    this.#userId = userId;
    this.#ownerId = data.owner._id;
    this.#likes = data.likes;
    this.#template = templateSelector;
    this.#handleClicklike = handleClicklike;
    this.#handleClickDelete = handleClickDelete;
    this.#handleClickImage = handleClickImage;
  }

  generate() {
    this.#cardElement = this.#getTemplate();
    this.#cardTitle = this.#cardElement.querySelector('.card__title');
    this.#cardImage = this.#cardElement.querySelector('.card__image');
    this.#cardLikeButton = this.#cardElement.querySelector('.card__like-button');
    this.#cardLikeCounter = this.#cardElement.querySelector('.card__like-count')
    this.#cardDeleteButton = this.#cardElement.querySelector('.card__delete-button');

    this.#cardImage.src = this.#link;
    this.#cardImage.alt = this.#name;
    this.#cardTitle.textContent = this.#name;
    this.#cardLikeCounter.textContent = this.#likes.length;

    this.showActiveLikes();
    this.showTrash();
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

  getCardId() {
    return this.#data._id;
  }

  getCardData() {
    const { _id, name, link } = this.#data;
    return { _id, name, link };
  }

  isLiked() {
    return this.#cardLikeButton.classList.contains('card__like-button_active');
  }

  likeCard(counter) {
    this.#likes = this.#data.likes;
    this.#cardLikeButton.classList.toggle('card__like-button_active');
    this.#cardLikeCounter.textContent = counter;
  }

  showActiveLikes() {
    this.#likes.forEach((like) => {
      if (like._id === this.#userId) {
        this.#cardLikeButton.classList.add('card__like-button_active');
      }
    });
  }

  showTrash() {
    if (!(this.#ownerId === this.#userId)) {
      this.#cardDeleteButton.classList.toggle('card__delete-button_hidden');
    }
  }

  deleteCard() {
    this.#cardElement.remove();
    this.#cardElement = null;
  }

  remove() {
    this.#cardElement.remove();
    this.#cardElement = null;
  }

  #setEventListeners() {
    this.#cardLikeButton.addEventListener('click', () => {
      this.#handleClicklike(this);
    });

    this.#cardDeleteButton.addEventListener('click', () => {
      this.#handleClickDelete(this);
    });

    this.#cardImage.addEventListener('click', () => {
      this.#handleClickImage(this.#name, this.#link);
    });
  }
}
