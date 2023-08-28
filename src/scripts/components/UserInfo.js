export default class UserInfo {
  #title;
  #subtitle;

  constructor({ titleSelector, subtitleSelector })  {
    this.#title = document.querySelector(titleSelector);
    this.#subtitle = document.querySelector(subtitleSelector);
  }

  getUserInfo() {
    return { 
      title: this.#title.textContent, 
      subtitle: this.#subtitle.textContent
    };
  }

  setUserInfo({ titleText, subtitleText}) {
    this.#title.textContent = titleText;
    this.#subtitle.textContent = subtitleText;
  }
}
