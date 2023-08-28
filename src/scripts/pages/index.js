import '../../pages/index.css';
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import {
  popupEditElement,
  popupEditOpenButtonElement,
  popupEditForm,
  popupInpitTitle,
  popupInpitSubtitle,
  profileTitleSelector,
  profileSubtitleSelector,
  popupAddElement,
  popupAddOpenButtonElement,
  popupAddForm,
  popupImageElement,
  popupImagePictureElement,
  popupImageNameElement,
  initialCards,
  cardTemplateSelector,
  config
} from "../utils/constants.js";
import { } from "../utils/utils.js";

const profileInfo = new UserInfo({
  nameSelector: profileTitleSelector,
  descriptionSelector: profileSubtitleSelector
});

profileInfo.setUserInfo({
  nameText: 'Саша Бубнов',
  descriptionText: 'Веб-разработчик'
});

const editPopup = new PopupWithForm({
  popupSelector: ".popup_type_edit",
  handleSubmit: (formData) => { }
});

const addPopup = new PopupWithForm({
  popupSelector: ".popup_type_add",
  handleSubmit: (formData) => {
    const card = new Card(formData, cardTemplateSelector, handleClickImage);
    const cardElement = card.generate();
    cardSection.addItem(cardElement, 'prepend');
    addPopup.close(popupAddElement);
  }
});

const cardImagePopup = new PopupWithImage(".popup_type_image");

editPopup.setEventListener();
addPopup.setEventListener();
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

function fillEditPopupInputs() {
  popupInpitTitle.value = profileInfo.getUserInfo().name;
  popupInpitSubtitle.value = profileInfo.getUserInfo().description;
}


const editProfile = (event) => {
  event.preventDefault();
  profileInfo.setUserInfo({
    nameText: popupInpitTitle.value,
    descriptionText: popupInpitSubtitle.value
  });
  editPopup.close(popupEditElement);
}
popupEditForm.addEventListener('submit', editProfile);

const sectionData = {
  items: initialCards,
  renderer: (item) => {
    cardSection.addItem(
      createCard(item, cardTemplateSelector, handleClickImage),
      'append'
    );
  }
}

const cardSection = new Section(sectionData, '.card-section');
cardSection.renderItems();

function createCard(data, cardTemplateSelector, handleClickImage) {
  return new Card(data, cardTemplateSelector, handleClickImage).generate();
}

const popupEditFormValidation = new FormValidator(config, popupEditForm);
const popupAddFormValidation = new FormValidator(config, popupAddForm);

popupEditFormValidation.enableValidation();
popupAddFormValidation.enableValidation();
