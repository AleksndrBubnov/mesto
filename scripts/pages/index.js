import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import FormValidator from "../components/FormValidator.js";
import { 
  popups,
  popupEditElement,
  popupEditOpenButtonElement,
  popupEditForm,
  popupInpitTitle,
  popupInpitSubtitle,
  profileTitle,
  profileSubtitle,
  popupAddElement,
  popupAddOpenButtonElement,
  popupAddForm,
  popupAddInpitName,
  popupAddInpitLink,
  popupImageElement,
  popupImagePictureElement,
  popupImageNameElement,
  initialCards,
  cardsSectionElement,
  cardTemplateSelector,
  config
} from "../utils/constants.js";
// import { handleClickImage } from "../utils/utils.js";

const sectionData = { 
  items: initialCards, 
  renderer: (item) => {
    cardsSectionElement['append'](createCard(item, cardTemplateSelector, handleClickImage));
  } 
}

const cardSection = new Section( sectionData, '.card-section').renderItems();

function createCard (data, cardTemplateSelector, handleClickImage) {
  const card = new Card(data, cardTemplateSelector, handleClickImage).generateCard();
  return card;
}

function addCard(card, key) {
  cardsSectionElement[key](card);
} 

const renderCardFromForm = function (event) {
  event.preventDefault();

  const addFormData = {
    name: popupAddInpitName.value, 
    link: popupAddInpitLink.value
  }

  cardSection.addItem(createCard(addFormData, cardTemplateSelector, handleClickImage), 'prepend');

  closePopup(popupAddElement);
  event.target.reset();
}

popupAddForm.addEventListener('submit', renderCardFromForm);

// initialCards.forEach(function(item){
//   addCard(createCard(item, cardTemplateSelector, handleClickImage), 'append');
// });

function handleClickImage(name, link) {
  popupImageNameElement.textContent = name;
  popupImagePictureElement.alt = name;
  popupImagePictureElement.src = link;
  
  openPopup(popupImageElement);
}

// const editPopup = new PopupWithForm();
// const addPopup = new PopupWithForm();
// const cardPopup = new PopupWithImage(popupImageElement);

// функция заполнения полей попапа редактирования профиля
function fillEditPopupInputs() {
  popupInpitTitle.value = profileTitle.textContent;
  popupInpitSubtitle.value = profileSubtitle.textContent;
}

//функц. выражение редактирования профиля
const editProfile = function (event) {
  event.preventDefault();
  profileTitle.textContent = popupInpitTitle.value;
  profileSubtitle.textContent = popupInpitSubtitle.value;
  closePopup(popupEditElement);
}

popupEditForm.addEventListener('submit', editProfile);

//функция открытия попапов
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

//функция закрытия попапов
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

//функция закрытия попапов и по оверлею, и по кнопке
function closeByOverlayOrButton(event) {
  if (event.currentTarget === event.target || event.target.classList.contains("popup__close-button")) {
    closePopup(event.currentTarget);
  };
};

//функция закрытия попапов по клавише Esс
function closeByEscape(event){
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
};

//отрытие попапов
popupEditOpenButtonElement.addEventListener('click', function () {
  openPopup(popupEditElement);
  fillEditPopupInputs();
  popupEditFormValidation.resetValidation();
  popupEditFormValidation.enabledButton();
});

popupAddOpenButtonElement.addEventListener('click', function () {
  openPopup(popupAddElement);
  popupAddFormValidation.resetValidation();
  popupAddFormValidation.disabledButton();
});

//закрытие попапов
popups.forEach((popup) => {
  popup.addEventListener('mousedown', closeByOverlayOrButton);
});

const popupEditFormValidation = new FormValidator(config, popupEditForm);
const popupAddFormValidation = new FormValidator(config, popupAddForm);

popupEditFormValidation.enableValidation();
popupAddFormValidation.enableValidation();
