const NAMES = [
  'Арина',
  'Георгий',
  'Лидия',
  'Антон',
  'Ксения',
  'Александра',
  'Иван', 'Алиса',
  'Евгений', 'Вероника',
  'Макар',
  'Владислав',
  'Маргарита',
  'Денис',
  'Матвей',
  'Николь',
  'Милана',
  'Елена',
  'Дарья',
  'Давид',
  'Пелагея',
  'Марьяна',
  'Тимур',
  'Екатерина',
  'Кирилл',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENTS_COUNT = {
  MIN: 1,
  MAX: 18,
};
const PHOTOS_COUNT = 25;

const MESSAGES_COMMENTS_COUNT = {
  MIN: 1,
  MAX: 2,
}

const BIG_PICTURE_CONFIG = {
  bigPictureSelector: '.big-picture',
  bigPictureImageSelector: '.big-picture__img img',
  likesCountSelector: '.likes-count',
  commentsCountSelector: '.comments-count',
  socialCommentSelector: '.social__comment',
  socialListCommentSelector: '.social__comments',
  socialCaptionSelector: '.social__caption',
  closeButtonSelector: '.big-picture__cancel',
  socialCommentCountSelector: '.social__comment-count',
  commentsLoaderSelector: '.comments-loader',
}

const Scale = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
  STANDARD: 100,
}

const Urls = {
  GET:'https://25.javascript.pages.academy/kekstagram/data',
  POST:'https://25.javascript.pages.academy/kekstagram',
};

const TOOLTIP_SHOW_TIME = 5000;

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

export {
  NAMES,
  MESSAGES,
  COMMENTS_COUNT,
  PHOTOS_COUNT,
  MESSAGES_COMMENTS_COUNT,
  BIG_PICTURE_CONFIG,
  Scale,
  Urls,
  Keys,
  TOOLTIP_SHOW_TIME,
  FILE_TYPES
}
