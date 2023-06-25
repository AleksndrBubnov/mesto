//popup_type_edit
const popupEditElement = document.querySelector('.popup_type_edit');
const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');
const popupEditForm = popupEditElement.querySelector('.popup__form');
const popupInpitTitle = popupEditElement.querySelector('.popup__input-text_type_title');
const popupInpitSubtitle = popupEditElement.querySelector('.popup__input-text_type_subtitle');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//popup_type_add
const popupAddElement = document.querySelector('.popup_type_add');
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');
const popupAddForm = popupAddElement.querySelector('.popup__form');
const popupAddInpitName = popupAddElement.querySelector('.popup__input-text_type_name');
const popupAddInpitLink = popupAddElement.querySelector('.popup__input-text_type_link');

//popup_type_image
const popupImageElement = document.querySelector('.popup_type_image');
const popupImageCardElement = popupImageElement.querySelector('.popup__image-place');
const popupImagePictureElement = popupImageElement.querySelector('.popup__image');
const popupImageNameElement = popupImageElement.querySelector('.popup__image-name');

// Карточки
const cardsSectionElement = document.querySelector('.elements');
const cardTemplateElement = document.querySelector('#card-template').content.querySelector('.element');


function fillEditPopupInputs() {
  popupInpitTitle.value = profileTitle.textContent;
  popupInpitSubtitle.value = profileSubtitle.textContent;
}

//функция открытия попапов
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}
//функция закрытия попапов
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
}
//функция закрытия попапов и по оверлею, и по кнопке
function closeByOverlayOrButton(evt) {
  if (evt.currentTarget === evt.target || evt.target.classList.contains("popup__close-button")) {
    closePopup(evt.currentTarget);
  };
};

//отрытие попапов
popupEditOpenButtonElement.addEventListener('click', function () {
  openPopup(popupEditElement);
  fillEditPopupInputs();
});

popupAddOpenButtonElement.addEventListener('click', function () {
  openPopup(popupAddElement);
});

// открытие попапа картинки
function handleClickImage(name, link) {
  openPopup(popupImageElement);
  popupImageNameElement.textContent = name;
  popupImagePictureElement.alt = name;
  popupImagePictureElement.src = link;
}

//закрытие попапов
popupEditElement.addEventListener('click', closeByOverlayOrButton);
popupAddElement.addEventListener('click', closeByOverlayOrButton);
popupImageElement.addEventListener('click', closeByOverlayOrButton);

//функц. выражение редактирования профиля
const editProfile = function (event) {
  event.preventDefault();
  profileTitle.textContent = popupInpitTitle.value;
  profileSubtitle.textContent = popupInpitSubtitle.value;
  closePopup(popupEditElement);
}

popupEditForm.addEventListener('submit', editProfile);

function createCard(name, link) {
  const cardElement = cardTemplateElement.cloneNode(true);
  const cardTitle = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__image');
  const cardLikeButton = cardElement.querySelector('.element__like-button');
  const cardDeleteButton = cardElement.querySelector('.element__delete-button');

  //обработка клика по картинке
  cardImage.addEventListener('click', () => {
    handleClickImage(name, link);
  })

  //обработка лайка
  cardLikeButton.addEventListener('click', likeCard);

  //обработка кнопки удаления
  cardDeleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  })

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  return cardElement;
};

//функц. выражение добавления карточки
const renderCard = function (event) {
  event.preventDefault();
  addCard(createCard(popupAddInpitName.value, popupAddInpitLink.value), 'prepend');

  closePopup(popupAddElement);
  event.target.reset();
}

popupAddForm.addEventListener('submit', renderCard);

function addCard(cardElement, key) {
  if (key === 'append') {
    cardsSectionElement.append(cardElement);
  }
  if (key === 'prepend') {
    cardsSectionElement.prepend(cardElement);
  }
}

// функция лайка карточки
function likeCard(evt) {
  evt.currentTarget.classList.toggle('element__like-button_active');
};

//функция удаления карточки
function deleteCard(card) {
  card.remove();
}

initialCards.forEach(item => {
  addCard(createCard(item.name, item.link), 'append');
});
