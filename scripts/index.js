const page = document.querySelector('.page')

// Захват попапов
const popupElement = document.querySelectorAll('.popup');
const popupEditElement = document.querySelector('.popup_type_edit');
const popupAddElement = document.querySelector('.popup_type_add');
const popupImageElement = document.querySelector('.popup_type_image');

//popup_type_edit
const popupEditButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = document.querySelector('.popup__close-button');

let popupForm = document.querySelector('.popup__form');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
const popupInpitTitle = document.querySelector('.popup__input-text_type_title');
const popupInpitSubtitle = document.querySelector('.popup__input-text_type_subtitle');

//popup_type_add
const popupAddButtonElement = document.querySelector('.profile__add-button');
// const popupAddCloseButtonElement = popupElement.querySelector('.');
// const popupAddInpitTitle = popupElement.querySelector('.');
// const popupAddInpitSubtitle = popupElement.querySelector('.');
// const popupAddForm = popupElement.querySelector('.');
// const profileTitle = document.querySelector('.profile__title');
// const profileSubtitle = document.querySelector('.profile__subtitle');

function fillPopupInputs () {
  popupInpitTitle.value = profileTitle.textContent;
  popupInpitSubtitle.value = profileSubtitle.textContent;
}

const openPopup = function (modal) {
  modal.classList.add('popup_opened');
}

const closePopup = function (modal) {
  modal.classList.remove('popup_opened');
}

page.addEventListener('click', closePopup);


//отрытие попапов
popupEditButtonElement.addEventListener('click', function () {
  openPopup(popupEditElement);
  fillPopupInputs();
});

popupAddButtonElement.addEventListener('click', function () {
  openPopup(popupAddElement);
});

// popupImageElement

//Закрытие попапов
popupEditButtonElement.addEventListener('click', function () {
  closePopup(popupEditElement);
  fillPopupInputs();
});

popupAddButtonElement.addEventListener('click', function () {
  closePopup(popupAddElement);
});


function closeOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.currentTarget);
  };
};

// popupImageElement


const editProfile= function (event) {
  event.preventDefault();
  profileTitle.textContent = popupInpitTitle.value;
  profileSubtitle.textContent = popupInpitSubtitle.value;

  closePopup();
}

popupForm.addEventListener('submit', editProfile);

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
  {
    name: 'Арарат',
    link: 'https://images.unsplash.com/photo-1598304339149-7c7d3d6cfc52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
  }
];
const cardsSectionElement = document.querySelector('.elements');
const cardTemplateElement = document.querySelector('#card-template').content.querySelector('.element');

function createCard(name, link) {
  const cardElement = cardTemplateElement.cloneNode(true);
  const cardTitle = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__image');
  
  cardTitle.textContent = name;
  cardImage.setAttribute('src', link);
  cardsSectionElement.append(cardElement);
};

initialCards.forEach ( (item, index, arr) => {
  createCard(initialCards[index].name, initialCards[index].link);
});

//Лайки
const cardLikeButton = document.querySelector('.element__like-button');
const cardLikeButtonActive = document.querySelector('.element__like-button_active');

function likeCard () {
  cardLikeButton.classList.append(cardLikeButtonActive);
};
cardLikeButton.addEventListener('click', likeCard);
