import '../../pages/index.css';

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
// import {  } from "../utils/utils.js";

const sectionData = { 
  items: initialCards, 
  renderer: (item) => {
    cardSection.addItem(createCard(item, cardTemplateSelector, handleClickImage), 'append');
  } 
}

const cardSection = new Section( sectionData, '.card-section');
cardSection.renderItems();

function createCard (data, cardTemplateSelector, handleClickImage) {
  return new Card(data, cardTemplateSelector, handleClickImage).generateCard();
}

const renderCardFromForm = function (event) {
  event.preventDefault();

  const addFormData = {
    name: popupAddInpitName.value, 
    link: popupAddInpitLink.value
  }
  cardSection.addItem(createCard(addFormData, cardTemplateSelector, handleClickImage), 'prepend');

  addPopup.close(popupAddElement);
  event.target.reset();
}

popupAddForm.addEventListener('submit', renderCardFromForm);

const editPopup = new PopupWithForm(".popup_type_edit");
editPopup.setEventListener();

const addPopup = new PopupWithForm(".popup_type_add");
addPopup.setEventListener();

const cardImagePopup = new PopupWithImage(".popup_type_image");
cardImagePopup.setEventListener();

popupEditOpenButtonElement.addEventListener('click', function () {
  editPopup.open(popupEditElement);
  fillEditPopupInputs();
  
  popupEditFormValidation.resetValidation();
  popupEditFormValidation.enabledButton();
});

popupAddOpenButtonElement.addEventListener('click', function () {
  addPopup.open(popupAddElement); 

  popupAddFormValidation.resetValidation();
  popupAddFormValidation.disabledButton();
});

function handleClickImage(name, link) {
  popupImageNameElement.textContent = name;
  popupImagePictureElement.alt = name;
  popupImagePictureElement.src = link;
  
  cardImagePopup.open(popupImageElement);
}

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

  editPopup.close(popupEditElement);
}

popupEditForm.addEventListener('submit', editProfile);

const popupEditFormValidation = new FormValidator(config, popupEditForm);
const popupAddFormValidation = new FormValidator(config, popupAddForm);

popupEditFormValidation.enableValidation();
popupAddFormValidation.enableValidation();
