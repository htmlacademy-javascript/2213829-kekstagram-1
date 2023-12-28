import { isKeyEscape } from '../../helpers/util.js';

const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionArea = document.querySelector('.text__description');


const handleCustomValidity = (evt) => {
  hashtagsInput.setCustomValidity('');
  // === Валидация хештега ===
  const textList = evt.target.value.toLowerCase().trim().split(' ');

  const regex = /^#[a-zа-яё1-9]*$/gm
  const isHashtag = textList.some((item) => {
    return regex.test(item)
  });

  if (!isHashtag) {
    hashtagsInput.setCustomValidity('Хэш-тег должен начинаться с символа \'#\' и не содержать спец. символов');
  }

  const isOnlyHash = textList.some(item => item === '#');

  if (isOnlyHash) {
    hashtagsInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
  }

  const isUnique = textList.some((item, index, array) => {
    return array.indexOf(item, index + 1) >= index + 1;
  })

  if (isUnique) {
    hashtagsInput.setCustomValidity('Хэш-теги не должны повторяться');
  }

  if (textList.length > 5) {
    hashtagsInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  }

  hashtagsInput.reportValidity();

}

const cancelEscClose = (evt) => {
  if (isKeyEscape(evt.key)) {
    evt.stopPropagation();
  }
}

hashtagsInput.addEventListener('input', handleCustomValidity);
hashtagsInput.addEventListener('keydown', cancelEscClose);
descriptionArea.addEventListener('keydown', cancelEscClose);


