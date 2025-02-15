const DESCRIPTIONS = [
  'красивый закат',
  'природа - лучший художник',
  'потрясающий вид',
  'еда как искусство',
  'новые места, новые истории',
  'дорога зовёт',
  'ещё один город, ещё одно приключение'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENTATOR_NAMES = [
  'Иван',
  'Светлана',
  'Мария',
  'Кристофер',
  'Виктор',
  'Юлия',
  'Леонид',
  'Василий',
];

const likesNumber = {
  MIN: 15,
  MAX: 200
};

const commentsNumber = {
  MIN: 0,
  MAX: 30
};

const photosNumber = 25;

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const getPhotoId = createIdGenerator();

const getUrlNumber = createIdGenerator();

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createCommentId () {
  const previousValues = [];

  return function () {
    let currentValue = Math.floor(Math.random() * 1000);
    while (previousValues.includes(currentValue)) {
      currentValue = Math.floor(Math.random() * 1000);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getCommentId = createCommentId();

function getComment () {
  return {
    CommentId: getCommentId(),
    avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(COMMENTATOR_NAMES)
  };
}

function getPhotoDescription () {
  return {
    id: getPhotoId(),
    url: `photos/${ getUrlNumber() }.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(likesNumber.MIN, likesNumber.MAX),
    comments: Array.from({length: getRandomInteger(commentsNumber.MIN, commentsNumber.MAX)}, getComment)
  };
}

const mockPhotos = Array.from({length: photosNumber}, getPhotoDescription);

console.log(mockPhotos);
