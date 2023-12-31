import { messages, names } from "../constants/constans.js";

function getRandomInt(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function generateComment() {
  const randomIndex = getRandomInt(0, messages.length - 1);
  return {
    id: getRandomInt(1, 100000),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: `${messages[randomIndex]} ${messages[randomIndex]}`,
    name: names[getRandomInt(0, names.length - 1)],
  };
}

function generateData() {
  const data = [];
  const ids = new Set();
  for (let i = 0; i < 25; i++) {
    let id;
    do {
      id = getRandomInt(1, 25);
    } while (ids.has(id));
    ids.add(id);
    const comments = [];
    const numComments = getRandomInt(1, 5);
    for (let j = 0; j < numComments; j++) {
      comments.push(generateComment());
    }
    data.push({
      id: id,
      url: `photos/${id}.jpg`,
      description: `Описание фотографии: ${id}`,
      likes: getRandomInt(15, 200),
      comments: comments,
    });
  }
  return data;
}

const dataArray = generateData();

export { dataArray };
