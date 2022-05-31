const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_INTERNAL = 500;

const ERROR_CODE_BAD_AUTH = 401;
const ERROR_CODE_DEL_CARD = 403;
const ERROR_CODE_EXIST_EMAIL = 409;

const AVATAR_REGEX = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;
const LINK_REGEX = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

const IMAGE_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
const NAMERU = /[\Wа-яА-ЯёЁ0-9\s\-?]+/;
const NAMEEN = /[\w\d\s\-?]+/i;

const ACCESS_ERROR = 'Попытка удалить чужую карточку фильма.';
const MOVIE_NOT_FOUND = 'Карточка фильма с указанным _id не найдена.';
const WRONG_DATA_MOVIE = 'Переданы некорректные данные при создании карточки фильма.';
const WRONG_DATA_MOVIE_DELETE = 'Переданы некорректные данные при удалении карточки фильма.';

const WRONG_DATA_PROFILE = 'Неправильные почта или пароль.';
const USER_NOT_FOUND = 'Пользователь не найден, попробуйте еще раз';
const WRONG_DATA_USER = 'Введен некорректный id пользователя';
const WRONG_DATA_USER_UPDATE = 'Переданы некорректные данные при обновлении пользователя';
const WRONG_DATA_USER_CREATE = 'Переданы некорректные данные при создании пользователя';
const EMAIL_ALREADY_EXISTS = 'Введен некорректный id пользователя';

const WRONG_URL_FORMAT = 'Некорректный адрес URL.';

module.exports = {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_INTERNAL,
  ERROR_CODE_BAD_AUTH,
  ERROR_CODE_DEL_CARD,
  ERROR_CODE_EXIST_EMAIL,
  AVATAR_REGEX,
  LINK_REGEX,
  IMAGE_REGEX,
  NAMERU,
  NAMEEN,
  ACCESS_ERROR,
  MOVIE_NOT_FOUND,
  WRONG_DATA_MOVIE,
  WRONG_DATA_MOVIE_DELETE,
  WRONG_DATA_PROFILE,
  USER_NOT_FOUND,
  WRONG_DATA_USER,
  WRONG_DATA_USER_CREATE,
  WRONG_DATA_USER_UPDATE,
  EMAIL_ALREADY_EXISTS,
  WRONG_URL_FORMAT,
};
