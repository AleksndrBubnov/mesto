export default class UserInfo {
  #title;
  #subtitle;
  #avatar;

  constructor({ titleSelector, subtitleSelector, avatarSelector })  {
    this.#title = document.querySelector(titleSelector);
    this.#subtitle = document.querySelector(subtitleSelector);
    this.#avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return { 
      title: this.#title.textContent, 
      subtitle: this.#subtitle.textContent,
      avatar: this.#avatar.src
    };
  }

  setUserInfo({ titleText, subtitleText, avatarSrc}) {
    this.#title.textContent = titleText;
    this.#subtitle.textContent = subtitleText;
    this.#avatar.src = avatarSrc;
  }
}
