import { getData } from "../../helpers/api.js";
import { debounce, showErrorNotification } from "../../helpers/util.js";
// Наложение фильтров на изображения
const pictureTemplate = document.querySelector("#picture").content;
const pictureSelector = ".picture";
const picturesElement = document.querySelector(".pictures");
const getDiscussedPictures = (pictures) => {
  return [...pictures].sort(comparePictures);
};
const getRandomPictures = (pictures, quantity) => {
  const listPicture = [];

  while (listPicture.length < quantity) {
    const randomValue = getRandomInteger(0, pictures.length - 1);

    if (listPicture.indexOf(pictures[randomValue]) === -1) {
      listPicture.push(pictures[randomValue]);
    }
  }

  return listPicture;
};
const getData = (onSuccess, onFail) => {
  fetch(Urls.GET)
    .then((response) => handleError(response, onFail))
    .then((result) => onSuccess(result))
    .catch(() => {
      onFail("Произошла ошибка при загрузке данных. Попробуйте ещё раз");
    });
};
const setEventListener = (element, item) => {
  element.addEventListener("click", openPicture(item));
};
const getTemplate = (templateElement, itemSelector) => {
  return templateElement.querySelector(itemSelector).cloneNode(true);
};

const generateElement = (item) => {
  const element = getTemplate(pictureTemplate, pictureSelector);

  const imageElement = element.querySelector(".picture__img");
  const likesElement = element.querySelector(".picture__likes");
  const commentsElement = element.querySelector(".picture__comments");

  imageElement.src = item.url;
  likesElement.textContent = item.likes;
  commentsElement.textContent = item.comments.length;

  setEventListener(element, item);
  return element;
};

const renderElements = (list) => {
  return (section) => {
    list.forEach((item) => {
      section.appendChild(generateElement(item));
    });
  };
};

const removePictures = () => {
  const pictureElements = [...document.querySelectorAll(".picture")];
  pictureElements.forEach((picture) => picture.remove());
  const imageFiltersForm = document.querySelector(".img-filters__form");
  [...imageFiltersForm.children].forEach((element) =>
    element.classList.remove("img-filters__button--active")
  );
};

const handlePictureRendering = (evt, pictures) => {
  removePictures();
  evt.target.classList.add("img-filters__button--active");
  const successElements = renderElements(pictures);
  successElements(picturesElement);
};

const setEventListeners = (pictures) => {
  document
    .querySelector(".img-filters")
    .classList.remove("img-filters--inactive");
  const btnFilterRandom = document.querySelector("#filter-random");
  const btnFilterDiscussed = document.querySelector("#filter-discussed");
  const btnFilterDefault = document.querySelector("#filter-default");

  btnFilterDefault.addEventListener(
    "click",
    debounce((evt) => handlePictureRendering(evt, pictures), 1000)
  );
  btnFilterRandom.addEventListener(
    "click",
    debounce(
      (evt) => handlePictureRendering(evt, getRandomPictures(pictures, 10)),
      1000
    )
  );
  btnFilterDiscussed.addEventListener(
    "click",
    debounce(
      (evt) => handlePictureRendering(evt, getDiscussedPictures(pictures)),
      1000
    )
  );
};

getData((result) => {
  const successElements = renderElements(result);
  successElements(picturesElement);
  setEventListeners(result);
}, showErrorNotification);
