import { setEventListener } from './open-picture.js';
import { getData } from '../../helpers/api.js';
import { debounce, showErrorNotification } from '../../helpers/util.js';
import { getDiscussedPictures, getRandomPictures } from './filters-pictures.js';

const pictureTemplate = document.querySelector('#picture').content;
const pictureSelector = '.picture';
const picturesElement = document.querySelector('.pictures');

const getTemplate = (templateElement, itemSelector) => {
  return templateElement.querySelector(itemSelector).cloneNode(true);
}

const generateElement = (item) => {
  const element = getTemplate(pictureTemplate, pictureSelector);

  const imageElement = element.querySelector('.picture__img');
  const likesElement = element.querySelector('.picture__likes');
  const commentsElement = element.querySelector('.picture__comments');

  imageElement.src = item.url;
  likesElement.textContent = item.likes;
  commentsElement.textContent = item.comments.length;

  setEventListener(element, item);
  return element;
}

const renderElements = (list) => {
  return (section) => {
    list.forEach((item) => {
      section.appendChild(generateElement(item));
    })
  }
}

const removePictures = () => {
  const pictureElements = [...document.querySelectorAll('.picture')];
  pictureElements.forEach((picture) => picture.remove());
  const imageFiltersForm = document.querySelector('.img-filters__form');
  [...imageFiltersForm.children].forEach((element) => element.classList.remove('img-filters__button--active'));
}

const handlePictureRendering = (evt, pictures) => {
  removePictures();
  evt.target.classList.add('img-filters__button--active');
  const successElements = renderElements(pictures);
  successElements(picturesElement);
}

const setEventListeners = (pictures) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  const btnFilterRandom = document.querySelector('#filter-random');
  const btnFilterDiscussed = document.querySelector('#filter-discussed');
  const btnFilterDefault = document.querySelector('#filter-default');

  btnFilterDefault.addEventListener('click', debounce((evt) => handlePictureRendering(evt, pictures)));
  btnFilterRandom.addEventListener('click', debounce((evt) => handlePictureRendering(evt, getRandomPictures(pictures, 10))));
  btnFilterDiscussed.addEventListener('click', debounce((evt) => handlePictureRendering(evt, getDiscussedPictures(pictures))));

}

getData((result) => {
  const successElements = renderElements(result);
  successElements(picturesElement);
  setEventListeners(result);
}, showErrorNotification);

