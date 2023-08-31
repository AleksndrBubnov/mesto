import './index.css';
import Api from "../scripts/components/Api.js"
import Section from "../scripts/components/Section.js";
import Card from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js"
import PopupWithImage from "../scripts/components/PopupWithImage.js"
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js"
import FormValidator from "../scripts/components/FormValidator.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {
  popupAvatarOpenButtonElement,
  popupAvatarSelector,
  popupAvatarForm,
  popupEditOpenButtonElement,
  popupEditSelector,
  popupEditForm,
  profileAvatarSelector,
  profileTitleSelector,
  profileSubtitleSelector,
  popupAddOpenButtonElement,
  popupAddSelector,
  popupAddForm,
  popupImageSelector,
  popupDeleteSelector,
  cardTemplateSelector,
  apiConfig,
  config,
  initialCards
} from "../scripts/utils/constants.js";

const api = new Api(apiConfig);
console.log(api);

const profileInfo = new UserInfo({
  titleSelector: profileTitleSelector,
  subtitleSelector: profileSubtitleSelector,
  avatarSelector: profileAvatarSelector
});

profileInfo.setUserInfo({
  titleText: 'Саша Бубнов',
  subtitleText: 'Веб-разработчик',
  avatarSrc: 'https://sun9-57.userapi.com/impg/PWanIVE9Hcd5q06Dng7JAGgMqjO_bu8lFpq2bQ/UZ4ca3V0dUQ.jpg?size=1080x1080&quality=95&sign=4fa773eefa4fcbe5028871dbee490807&type=album'
});

const avatarPopup = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  handleSubmit: (formData) => {
    const profile = profileInfo.getUserInfo();

    profileInfo.setUserInfo({
      titleText: profile.title,
      subtitleText: profile.subtitle,
      avatarSrc: formData.avatar
    });

    avatarPopup.close();
  }
});
avatarPopup.setEventListener();

const editPopup = new PopupWithForm({
  popupSelector: popupEditSelector,
  handleSubmit: (formData) => {
    profileInfo.setUserInfo({
      titleText: formData.title,
      subtitleText: formData.subtitle
    });

    editPopup.close();
  }
});
editPopup.setEventListener();

const addPopup = new PopupWithForm({
  popupSelector: popupAddSelector,
  handleSubmit: (formData) => {
    const cardElement = createCard(formData);
    cardSection.addItem(cardElement, 'prepend');
    
    addPopup.close();
  }
});
addPopup.setEventListener();

// const deletePopup = new PopupWithConfirmation({
//   // popupSelector: popupDeleteSelector,
//   // handleSubmit: (formData) => {
//   //   deletePopup.close();
//   // }
// });
// deletePopup.setEventListener();

const cardImagePopup = new PopupWithImage(popupImageSelector);
cardImagePopup.setEventListener();

const sectionData = {
  items: initialCards,
  renderer: (item) => {
    cardSection.addItem(
      createCard(item),
      'append'
    );
  }
}

const cardSection = new Section(sectionData, '.card-section');
cardSection.renderItems();
// api.getInitialCards()
//   .then( initialCards => cardSection.renderItems())
//   .catch(error => console.log(error));
// api.getInitialCards().then(dataTasks => console.log(dataTasks))

const popupAvatarFormValidation = new FormValidator(config, popupAvatarForm);
const popupEditFormValidation = new FormValidator(config, popupEditForm);
const popupAddFormValidation = new FormValidator(config, popupAddForm);

popupAvatarFormValidation.enableValidation();
popupEditFormValidation.enableValidation();
popupAddFormValidation.enableValidation();

popupAvatarOpenButtonElement.addEventListener('click', function () {
  popupAddFormValidation.resetValidation();
  popupAddFormValidation.disabledButton();
  avatarPopup.open();
});

popupEditOpenButtonElement.addEventListener('click', function () {
  editPopup.setInputValues(profileInfo.getUserInfo());
  popupEditFormValidation.resetValidation();
  popupEditFormValidation.enabledButton();
  editPopup.open();
});

popupAddOpenButtonElement.addEventListener('click', function () {
  popupAddFormValidation.resetValidation();
  popupAddFormValidation.disabledButton();
  addPopup.open();
});

function createCard(data) {
  const card = new Card(data, cardTemplateSelector, handleClickImage);
  const cardElement = card.generate();
  return cardElement
}

function handleClickImage(name, link) {
  cardImagePopup.open({ name, link });
}
