import { getRandomInteger } from '../../helpers/util.js';

const btnFiltersElements = [...document.querySelectorAll('.img-filters__button')];

const getRandomPictures = (pictures, quantity) => {
  const listPicture = [];

  while (listPicture.length < quantity) {
    const randomValue = getRandomInteger(0, pictures.length - 1);

    if (listPicture.indexOf(pictures[randomValue]) === -1) {
      listPicture.push(pictures[randomValue]);
    }
  }

  return listPicture;
}

const comparePictures = (elementOne, elementTwo) => {
  const amountCommentsOne = elementOne.comments.length;
  const amountCommentsTwo = elementTwo.comments.length;

  return amountCommentsTwo - amountCommentsOne;
}

const getDiscussedPictures = (pictures) => {
  return [...pictures].sort(comparePictures);
}

export {
  getRandomPictures,
  getDiscussedPictures
}
