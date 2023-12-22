import { BIG_PICTURE_CONFIG } from "../../constants/constans.js";
import { isKeyEscape } from "../../helpers/util.js";
const bigPictureElement = document.querySelector(
  BIG_PICTURE_CONFIG.bigPictureSelector
);
const closeButtonElement = document.querySelector(
  BIG_PICTURE_CONFIG.closeButtonSelector
);
const countCommentsShown = bigPictureElement.querySelector(
  BIG_PICTURE_CONFIG.socialCommentCountSelector
);
const socialListCommentsElement = bigPictureElement.querySelector(
  BIG_PICTURE_CONFIG.socialListCommentSelector
);
const commentsLoader = bigPictureElement.querySelector(
  ".social__comments-loader"
);
const bodyElement = document.querySelector("body");
let temp;

const generateComment = (commentItem) => {
  const socialComment = document.createElement("li");
  socialComment.classList.add("social__comment");

  const socialPicture = document.createElement("img");
  socialPicture.classList.add("social__picture");
  socialPicture.src = commentItem.avatar;
  socialPicture.alt = `Аватар пользователя ${commentItem.name}`;
  socialPicture.setAttribute("width", 35);
  socialPicture.setAttribute("height", 35);
  socialComment.appendChild(socialPicture);

  const socialText = document.createElement("p");
  socialText.classList.add("social__text");
  socialText.textContent = commentItem.message;
  socialComment.appendChild(socialText);

  return socialComment;
};

const renderComments = (parentElement, commentItems) => {
  commentItems.forEach((item) => {
    parentElement.appendChild(generateComment(item));
  });
};
// Загрузка комментариев
const addComments = (counter, comments) => {
  socialListCommentsElement.innerHTML = "";
  const partComments = comments.slice(0, counter * 5);
  countCommentsShown.innerHTML = `${partComments.length} из <span class="comments-count">${comments.length}</span> комментариев`;
  renderComments(socialListCommentsElement, partComments);
  if (partComments.length === comments.length) {
    commentsLoader.classList.add("hidden");
  }
};

const generatePicture = (item) => {
  const bigPictureImageElement = bigPictureElement.querySelector(
    BIG_PICTURE_CONFIG.bigPictureImageSelector
  );
  const likesCountElement = bigPictureElement.querySelector(
    BIG_PICTURE_CONFIG.likesCountSelector
  );
  const socialCaptionElement = bigPictureElement.querySelector(
    BIG_PICTURE_CONFIG.socialCaptionSelector
  );

  bigPictureImageElement.src = item.url;
  likesCountElement.textContent = item.likes;
  commentsLoader.classList.add("hidden");

  socialListCommentsElement.innerHTML = "";
  if (item.comments.length > 5) {
    let counter = 1;
    commentsLoader.classList.remove("hidden");
    countCommentsShown.innerHTML = `5 из <span class="comments-count">${item.comments.length}</span> комментариев`;

    commentsLoader.addEventListener(
      "click",
      (temp = () => {
        counter++;
        addComments(counter, item.comments);
      })
    );
  } else {
    countCommentsShown.innerHTML = `${item.comments.length} комментария`;
  }

  renderComments(socialListCommentsElement, item.comments.slice(0, 5));

  socialCaptionElement.textContent = item.description;
};

const closePicture = (modalElement) => {
  modalElement.classList.add("hidden");
  bodyElement.classList.remove("modal-open");
  commentsLoader.removeEventListener("click", temp);
};

const handleEscClose = (evt, modalElement) => {
  if (isKeyEscape(evt.key)) {
    closePicture(modalElement);
  }
};

const openPicture = (item) => {
  return () => {
    let counter = 1;
    generatePicture(item, counter);

    bigPictureElement.classList.remove("hidden");
    bodyElement.classList.add("modal-open");
    document.addEventListener(
      "keydown",
      (evt) => handleEscClose(evt, bigPictureElement),
      { once: true }
    );

    closeButtonElement.addEventListener(
      "click",
      () => closePicture(bigPictureElement, item, counter),
      { once: true }
    );
  };
};

const setEventListener = (element, item) => {
  element.addEventListener("click", openPicture(item));
};

export { setEventListener, addComments };
