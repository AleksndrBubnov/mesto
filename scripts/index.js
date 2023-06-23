// захват попапов
const popupElement = document.querySelectorAll('.popup');
const popupEditElement = document.querySelector('.popup_type_edit');
const popupAddElement = document.querySelector('.popup_type_add');
const popupImageElement = document.querySelector('.popup_type_image');

// захват общих элементов попапов
const popupCloseButtonElement = document.querySelector('.popup__close-button');

//popup_type_edit
const popupEditButtonElement = document.querySelector('.profile__edit-button');
const popupForm = document.querySelector('.popup__form');
const popupInpitTitle = document.querySelector('.popup__input-text_type_title');
const popupInpitSubtitle = document.querySelector('.popup__input-text_type_subtitle');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//popup_type_add
const popupAddButtonElement = document.querySelector('.profile__add-button');
const popupAddForm = popupAddElement.querySelector('.popup__form');
const popupAddInpitName = popupAddElement.querySelector('.popup__input-text_type_name');
const popupAddInpitLink = popupAddElement.querySelector('.popup__input-text_type_link');

//popup_type_image
const popupImageCardElement = document.querySelector('.popup__image-place');
const popupImagePictureElement = document.querySelector('.popup__image');
const popupImageNameElement = document.querySelector('.popup__image-name');

// Карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];
const cardsSectionElement = document.querySelector('.elements');
const cardTemplateElement = document.querySelector('#card-template').content.querySelector('.element');


function fillPopupInputs () {
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
//функция закрытия попапов по оверлею
function closeOverlay(evt) {
  if (evt.currentTarget === evt.target || evt.target.classList.contains("popup__close-button")) {
    closePopup(evt.currentTarget);
  };
};

//отрытие попапов
popupEditButtonElement.addEventListener('click', function () {
  openPopup(popupEditElement);
  fillPopupInputs();
});

popupAddButtonElement.addEventListener('click', function () {
  openPopup(popupAddElement);
});

// открытие попапа картинки
function handleClickImage (name, link) {
  openPopup(popupImageElement);
  popupImageNameElement.textContent = name;
  popupImagePictureElement.src = link;
}

//закрытие попапов
popupEditElement.addEventListener('click', closeOverlay);
popupAddElement.addEventListener('click', closeOverlay);
popupImageElement.addEventListener('click', closeOverlay);

//функц. выражение редактирования профиля
const editProfile = function (event) {
  event.preventDefault();
  profileTitle.textContent = popupInpitTitle.value;
  profileSubtitle.textContent = popupInpitSubtitle.value;
  closePopup(popupEditElement);
}

//функц. выражение добавления карточки
const addCard = function (event) {
  event.preventDefault();
  createCard(popupAddInpitName.value, popupAddInpitLink.value, 'prepend')
  closePopup(popupAddElement);
  event.target.reset();
}

// функция лайка карточки
function likeCard(evt) {
  evt.currentTarget.classList.toggle('element__like-button_active');
};

//функция удаления карточки
function deleteCard (card) {
  card.remove();
}

popupForm.addEventListener('submit', editProfile);
popupAddForm.addEventListener('submit', addCard);

function createCard(name, link, key) {
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

  if (key === 'append') {
    cardsSectionElement.append(cardElement);
  }
  if (key === 'prepend')  {
    cardsSectionElement.prepend(cardElement);
  }
};

initialCards.forEach((item, index) => {
  createCard(initialCards[index].name, initialCards[index].link, 'append');
});