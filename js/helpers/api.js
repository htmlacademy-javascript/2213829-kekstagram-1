import { Urls } from '../constants/constans.js';

const handleError = (response, onFail) => {
  return response.ok ? response.json() : onFail('Произошла ошибка');
}

const sendPhoto = (formData, onSuccess, onFail) => {
  fetch(
    Urls.POST,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })

    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    })
}

const getData = (onSuccess, onFail) => {
  fetch(Urls.GET)
    .then((response) =>
      handleError(
        response,
        onFail,
      ))
    .then((result) => onSuccess(result))
    .catch(() => {
      onFail('Произошла ошибка при загрузке данных. Попробуйте ещё раз');
    })
}

export {
  sendPhoto,
  getData
}
