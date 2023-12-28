'use strict';

import { NAMES, MESSAGES, COMMENTS_COUNT, PHOTOS_COUNT, MESSAGES_COMMENTS_COUNT } from '../constants/constans.js';
import { getRandomInteger } from './util.js';


const getRandomListId = (min, max, count) => {
  const listId = [];

  while (listId.length < count) {
    const randomValue = getRandomInteger(min, max);

    if (listId.indexOf(randomValue) === -1) {
      listId.push(randomValue);
    }
  }

  return listId;
};

const getRandomMessage = (countMessages) => {
  const listMessage = [];

  while (listMessage.length < countMessages) {
    const randomValue = getRandomInteger(0, MESSAGES.length - 1);
    if (listMessage.indexOf(MESSAGES[randomValue]) === -1) {
      listMessage.push(MESSAGES[randomValue]);
    }

  }

  return listMessage.join(' ');
};

const createComment = (userId) => {
  const randomAvatarNumber = getRandomInteger(1, 6);
  const randomNameNumber = getRandomInteger(0, NAMES.length - 1);
  const randomCountMessages = getRandomInteger(MESSAGES_COMMENTS_COUNT.MIN, MESSAGES_COMMENTS_COUNT.MAX);
  const message = getRandomMessage(randomCountMessages);

  return {
    id: userId,
    avatar: `img/avatar-${randomAvatarNumber}.svg`,
    message,
    name: NAMES[randomNameNumber],
  }
};

const createImage = (index, comments) => {

  const randomLikesNumber = getRandomInteger(15, 200);

  return {
    id: index,
    url: `photos/${index + 1}.jpg`,
    description: 'Описание изображения',
    likes: randomLikesNumber,
    comments,
  }
}

const generateImagesList = (countImages) => {
  const listImages = [];

  for (let i = 0; i < countImages; i++) {
    const randomUsersIdList = getRandomListId(1, 250, getRandomInteger(COMMENTS_COUNT.MIN, COMMENTS_COUNT.MAX));

    const comments = randomUsersIdList.map((item, index) => {
      return createComment(randomUsersIdList[index])
    });
    listImages[i] = createImage(i, comments);
  }

  return listImages;
}

const imagesList = generateImagesList(PHOTOS_COUNT);

export { imagesList }
