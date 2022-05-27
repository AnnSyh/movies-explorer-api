const jwt = require('jsonwebtoken');
const { SEKRET_KEY } = require('../constants');
const BadAuthError = require('../errors/bad-auth-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new BadAuthError('Для совершения действия вы должны пройти авторизацию'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SEKRET_KEY);
  } catch (err) {
    next(new BadAuthError('Для совершения действия вы должны пройти авторизацию'));
  }

  req.user = payload;
  return next();
};
