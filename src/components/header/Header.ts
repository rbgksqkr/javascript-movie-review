import './Header.css';

import SEARCH_BUTTON_IMG from '../../assets/images/search_button.png';
import { dom } from '../../utils/dom';
import Button from '../common/button/Button';

interface IHeaderProps {
  imageSrc: string;
  onSubmit?: (e: SubmitEvent) => void;
}

class Header {
  $target: HTMLElement;
  #imageSrc: string;

  constructor({ imageSrc, onSubmit }: IHeaderProps) {
    this.$target = document.createElement('header');
    this.#imageSrc = imageSrc;
    this.render();

    const $form = dom.getElement<HTMLFormElement>(this.$target, 'form');
    if (onSubmit) $form.addEventListener('submit', onSubmit);
  }

  template() {
    return /*html*/ `
      <h1 id='logo'>
        <a href=${process.env.NODE_ENV === 'production' ? process.env.PUBLIC_PATH : '/'}>
          <img src=${this.#imageSrc} alt="MovieList 로고" />
        </a>
      </h1>
      <form class="search-box">
        <input id="search-input" type="text" placeholder="검색" />
      </form>
`;
  }

  render() {
    this.$target.innerHTML += this.template();
    const searchButton = this.#createSearchButton();
    const miniSearchButton = this.#createMiniSearchButton();

    const $form = dom.getElement(this.$target, '.search-box');
    $form.appendChild(searchButton.$target);
    this.$target.appendChild(miniSearchButton.$target);

    const $image = dom.getElement<HTMLImageElement>(this.$target, 'h1 > a > img');
    $image.setAttribute('src', this.#imageSrc);
  }

  #createSearchButton() {
    const childImage = document.createElement('img');
    childImage.setAttribute('src', SEARCH_BUTTON_IMG);
    childImage.classList.add('search-button-icon');

    return new Button({
      id: 'search-button',
      classNames: ['search-button'],
      children: [childImage],
    });
  }

  #createMiniSearchButton() {
    const childImage = document.createElement('img');
    childImage.setAttribute('src', SEARCH_BUTTON_IMG);
    childImage.classList.add('search-button-icon');

    return new Button({
      id: 'mini-search-button',
      classNames: ['mini-search-button'],
      children: [childImage],
      onClick: () => {
        dom.getElement(this.$target, '#logo').classList.add('clicked-logo');
        dom.getElement(this.$target, '.search-box').classList.add('clicked-form');
        dom.getElement(this.$target, '#mini-search-button').classList.add('clicked-button');
      },
    });
  }
}

export default Header;
