const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { devJwtKey } = require('../utils/config');
const BadAuthError = require('../errors/bad-auth-err');

const {
  AUTHORIZATION_REQUIRED,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers; // достаём авторизационный заголовок

  if (!authorization || !authorization.startsWith('Bearer ')) { // убеждаемся, что он есть или начинается с Bearer
    return next(new BadAuthError(AUTHORIZATION_REQUIRED));
  }

  const token = authorization.replace('Bearer ', ''); // извлечём токен
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devJwtKey); // попытаемся верифицировать токен
  } catch (err) {
    next(new BadAuthError(`err.message = ${err.message} ;222 Необходима авторизация.`));
  }

  req.user = payload;// записываем пейлоуд в объект запроса
  console.log('req.user = ', req.user);
  return next();// пропускаем запрос дальше
};
