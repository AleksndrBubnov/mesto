export default class UserInfo {
  #name;
  #about;
  #avatar;

  constructor(titleSelector, subtitleSelector, avatarSelector)  {
    this.#name = document.querySelector(titleSelector);
    this.#about = document.querySelector(subtitleSelector);
    this.#avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return { 
      name: this.#name.textContent, 
      about: this.#about.textContent,
    };
  }

  setUserInfo(userData) {
    this.#name.textContent = userData.name;
    this.#about.textContent = userData.about;
  }

  setUserAvatar(userData) {
    this.#avatar.src = userData.avatar;
  }
}
