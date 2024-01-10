import { FILE_TYPES, Scale } from "../../constants/constans.js";
import { isKeyEscape, showErrorNotification } from "../../helpers/util.js";
import { sendPhoto } from "../../helpers/api.js";
import {
  hideLoading,
  showError,
  showLoading,
  showSuccess,
} from "../common/tooltip.js";

const fileInputEl = document.querySelector("#upload-file");
const editFormEl = document.querySelector(".img-upload__overlay");
const imageUploadPreview = editFormEl.querySelector(".img-upload__preview");
const resetButtonEl = editFormEl.querySelector(".img-upload__cancel");
const imageUploadScaleFieldset = editFormEl.querySelector(".img-upload__scale");
const scaleControlValueEl = editFormEl.querySelector(".scale__control--value");
const imagePreviewEl = imageUploadPreview.querySelector("img");
const effectsItemEls = document.querySelectorAll(".effects__item");
const sliderEl = document.querySelector(".effect-level__slider");
const effectLevelValue = document.querySelector(".effect-level__value");
const effectLavelWrapper = document.querySelector(".img-upload__effect-level");
const bodyEl = document.querySelector("body");
const imgUploadEl = document.querySelector(".img-upload__form");
const uploadLabelEl = document.querySelector(".img-upload__label");
const imagePreview = imageUploadPreview.querySelector("img");
const effectsPreviewElements = editFormEl.querySelectorAll(".effects__preview");

const changeSize = (evt) => {
  let valueEl = Number(scaleControlValueEl.value.slice(0, -1));

  if (evt.target.matches(".scale__control--smaller")) {
    valueEl > Scale.MIN ? (valueEl -= Scale.STEP) : (valueEl = Scale.MIN);
  }
  if (evt.target.matches(".scale__control--bigger")) {
    valueEl < Scale.MAX ? (valueEl += Scale.STEP) : (valueEl = Scale.MAX);
  }

  imagePreviewEl.style.transform = `scale(${valueEl * 0.01}`;

  scaleControlValueEl.value = valueEl + "%";
};

const handleScaleControlImage = () => {
  scaleControlValueEl.value = Scale.STANDARD + "%";
  imageUploadScaleFieldset.addEventListener("click", changeSize);
};

/* Инициализация слайдера */
noUiSlider.create(sliderEl, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
});

const removeSlider = () => {
  effectLavelWrapper.classList.add("hidden");
  imagePreviewEl.removeAttribute("class");
  imagePreviewEl.removeAttribute("style");
};

const handleChangeSlider = (filterValue, suffix = 0) => {
  effectLevelValue.value = filterValue;

  sliderEl.noUiSlider.on("update", (_, handle, unencoded) => {
    effectLevelValue.value = unencoded[handle];
    imagePreviewEl.style.filter = `${filterValue}(${
      unencoded[handle] + suffix
    })`;
  });
};

const setEffect = (evt) => {
  if (effectLavelWrapper.classList.contains("hidden")) {
    effectLavelWrapper.classList.remove("hidden");
  }

  switch (evt.target.value) {
    case "chrome":
      sliderEl.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
      });
      handleChangeSlider("grayscale");
      break;
    case "sepia":
      sliderEl.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
      });
      handleChangeSlider("sepia");
      break;
    case "marvin":
      sliderEl.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      handleChangeSlider("invert", "%");
      break;
    case "phobos":
      sliderEl.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
      });
      handleChangeSlider("blur", "px");
      break;
    case "heat":
      sliderEl.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
      });
      handleChangeSlider("brightness");
      break;
    case "none":
      removeSlider();
      break;
  }
};
// Изменение эффекта
const changeEffect = (evt) => {
  if (evt.target.matches(".effects__radio")) {
    imagePreviewEl.className = "";
    imagePreviewEl.classList.add(`effects__preview--${evt.target.value}`);
    setEffect(evt);
  }
};

const handleEffectImage = () => {
  effectsItemEls.forEach((item) =>
    item.addEventListener("click", changeEffect)
  );
};

const handleEscClose = (evt, modalEl, inputEl) => {
  if (isKeyEscape(evt.key)) {
    closeForm(modalEl, inputEl);
  }
};

const closeForm = (modalEl) => {
  modalEl.classList.add("hidden");
  bodyEl.classList.remove("modal-open");
  imgUploadEl.reset();
};

const openForm = (modalEl, closeButtonEl, inputEl) => {
  modalEl.classList.remove("hidden");
  bodyEl.classList.add("modal-open");
  const file = fileInputEl.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
    Array.from(effectsPreviewElements).forEach((item) => {
      item.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }

  closeButtonEl.addEventListener("click", () => closeForm(modalEl), {
    once: true,
  });
  document.addEventListener(
    "keydown",
    (evt) => handleEscClose(evt, modalEl, inputEl),
    { once: true }
  );
};

const openEditForm = () => {
  removeSlider();
  openForm(editFormEl, resetButtonEl, fileInputEl);

  handleScaleControlImage();
  handleEffectImage();
};

const handleDataSending = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  showLoading();
  sendPhoto(
    formData,
    () => {
      closeForm(editFormEl);
      showSuccess();

      hideLoading();
    },
    () => {
      closeForm(editFormEl);
      showErrorNotification, showError();
      hideLoading();
    }
  );
};

imgUploadEl.addEventListener("submit", handleDataSending);
fileInputEl.addEventListener("input", openEditForm);
