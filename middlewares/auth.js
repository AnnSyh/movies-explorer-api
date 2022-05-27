const jwt = require('jsonwebtoken');
const { SEKRET_KEY } = require('../constants');
const BadAuthError = require('../errors/bad-auth-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (error, req, res, next) => {
  const { authorization } = req.headers; // достаём авторизационный заголовок
  if (!authorization || !authorization.startsWith('Bearer ')) { // убеждаемся, что он есть или начинается с Bearer
    return next(new BadAuthError(`err.message = ${error.message} ; Необходима авторизация 1.`));
  }

  const token = authorization.replace('Bearer ', ''); // извлечём токен
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SEKRET_KEY); // попытаемся верифицировать токен
  } catch (err) {
    next(new BadAuthError(`err.message = ${err.message} ; Необходима авторизация 2.`));
  }

  req.user = payload;// записываем пейлоуд в объект запроса
  console.log('middlewares; auth.js: req.user = ', req.user);
  return next();// пропускаем запрос дальше
};
