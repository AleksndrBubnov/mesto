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
  ValidationConfig,
} from "../scripts/utils/constants.js";

const api = new Api(apiConfig);

let userId;
console.log(api.getUserData());
// помогите допилить проект, пожалуйста :с

// Promise.all([api.getUserData(), api.getInitialCards()])
//   .then(([userData, cardItems]) => {
//     userInfo.setUserInfo(userData);
//     userInfo.setUserAvatar(userData);
//     userId = userData._id;

//     cardSection.renderCards(cardItems)
//   })
//   .catch((err) => console.log(err));

const cardSection = new Section({
  renderer: (item) => {
    cardSection.addItem(
      createCard(item),
      'append'
    );
  }
},
  '.card-section'
);

api.getInitialCards()
  .then(initialCards => cardSection.renderCards(initialCards))
  .catch(error => console.log(error));

const profileInfo = new UserInfo({
  titleSelector: profileTitleSelector,
  subtitleSelector: profileSubtitleSelector,
  avatarSelector: profileAvatarSelector
});

profileInfo.setUserInfo({
  titleText: 'Саша Бубнов',
  subtitleText: 'Веб-разработчик',
});

profileInfo.setUserAvatar('https://sun9-57.userapi.com/impg/PWanIVE9Hcd5q06Dng7JAGgMqjO_bu8lFpq2bQ/UZ4ca3V0dUQ.jpg?size=1080x1080&quality=95&sign=4fa773eefa4fcbe5028871dbee490807&type=album');

const avatarPopup = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  handleSubmit: popupAvatarSubmit
});
avatarPopup.setEventListeners();

const editPopup = new PopupWithForm({
  popupSelector: popupEditSelector,
  handleSubmit: popupEditSubmit
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm({
  popupSelector: popupAddSelector,
  handleSubmit: popupAddSubmit
});
addPopup.setEventListeners();

const deletePopup = new PopupWithConfirmation({
  popupSelector: popupDeleteSelector,
  handleSubmit: asdasdhandleClickDelete
});
deletePopup.setEventListeners();

const cardImagePopup = new PopupWithImage(popupImageSelector);
cardImagePopup.setEventListeners();

const popupAvatarFormValidation = new FormValidator(ValidationConfig, popupAvatarForm);
const popupEditFormValidation = new FormValidator(ValidationConfig, popupEditForm);
const popupAddFormValidation = new FormValidator(ValidationConfig, popupAddForm);

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

function popupAvatarSubmit(formData) {
  const profile = profileInfo.getUserInfo();

  profileInfo.setUserAvatar({
    avatarSrc: formData.avatar
  });

  avatarPopup.close();
}

function popupEditSubmit(formData) {
  const profile = profileInfo.getUserInfo();
  
  profileInfo.setUserInfo({
    titleText: formData.title,
    subtitleText: formData.subtitle,
    avatarSrc: profile.avatar
  });

  editPopup.close();
}

function popupAddSubmit(formData) {
  const cardElement = createCard(formData);
  cardSection.addItem(cardElement, 'prepend');

  addPopup.close();
}

function popupDeleteSubmit() {
  // api.removeCard();
  deletePopup.close();
}

function createCard(data) {
  const card = new Card(data, cardTemplateSelector, handleClickLike, asdasdhandleClickDelete, handleClickImage);
  const cardElement = card.generate();
  return cardElement;
}

function handleClickLike(cardLikeButton) {
  cardLikeButton.classList.toggle('card__like-button_active');
}
function handleClickDelete(cardElement) {
  deletePopup.open();
}

function handleClickImage(name, link) {
  cardImagePopup.open({ name, link });
}


function asdasdhandleClickDelete(cardElement) {
  deletePopup.open();
  deletePopup.setSubmitAction(() => {
    deletePopup.loading(true)
    api.removeCard(cardElement.getCardId())
      .then(() => {
        cardElement.deleteCard();
        deletePopup.close()
      })
      .catch((err) => console.log(err))
      .finally(() => deletePopup.loading(false))
  })
}