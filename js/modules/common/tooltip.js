import { isKeyEscape } from '../../helpers/util.js';

const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
const messagesTemplate = document.querySelector('#messages').content;

const closeSuccess = (element) => {
  element.remove();
}

const handleEscClose = (evt, element) => {
  if (isKeyEscape(evt.key)) {
    closeSuccess(element);
  }
}

export const showSuccess = () => {
  const successExemplar = successTemplate.cloneNode(true);
  const successEl = successExemplar.querySelector('.success');
  const successButtonEl = successExemplar.querySelector('.success__button');

  successButtonEl.addEventListener('click', () => closeSuccess(successEl));
  document.addEventListener('keydown', (evt) => handleEscClose(evt, successEl));
  document.querySelector('body').appendChild(successEl);
}

export const showError = () => {
  const errorExemplar = errorTemplate.cloneNode(true);
  const errorsEl = errorExemplar.querySelector('.error');
  const successButtonEl = errorExemplar.querySelector('.error__button');

  successButtonEl.addEventListener('click', () => closeSuccess(errorsEl));
  document.addEventListener('keydown', (evt) => handleEscClose(evt, errorsEl));
  document.querySelector('body').appendChild(errorsEl);
}


export const showLoading = () => {
  const messagesExemplar = messagesTemplate.cloneNode(true);
  const messagesEl = messagesExemplar.querySelector('.img-upload__message');

  document.querySelector('body').appendChild(messagesEl);
}

export const hideLoading = () => {
  document.querySelector('.img-upload__message').remove();
}
