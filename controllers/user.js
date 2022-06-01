/*
login   /POST  авторизация(залогинивание) пользователя по email и password
GET     /users/:userId - возвращает пользователя по _id
GET     /users — возвращает всех пользователей
POST    /signup — создаёт пользователя по обязательным полям email и password
GET     /users/me       - возвращает информацию о пользователе (email и имя)
PATCH   /users/me       - обновляет информацию о пользователе (email и имя)
*/
const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcrypt'); // импортируем bcrypt
const jwt = require('jsonwebtoken'); // импортируем jwt
const User = require('../models/user');
const { devJwtKey } = require('../utils/config');

const SALT_ROUNDS = 10;

const BadAuthError = require('../errors/bad-auth-err');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ExistEmailError = require('../errors/exist-email-err');

const {
  USER_NOT_FOUND,
  WRONG_DATA_PROFILE,
  WRONG_DATA_USER,
  EMAIL_ALREADY_EXISTS,
  WRONG_DATA_USER_CREATE,
  WRONG_DATA_USER_UPDATE,
} = require('../utils/constants');

// + login (/POST)  авторизация(залогинивание) пользователя по email и password
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log('user._id = ', user._id);
      // const token = jwt.sign({ _id: user._id }, SEKRET_KEY, { expiresIn: '7d' });
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : devJwtKey, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      next(new BadAuthError(WRONG_DATA_PROFILE));
    });
};

// + GET /users/:userId - возвращает пользователя по _id
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      next(new NotFoundError(USER_NOT_FOUND));
    })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw (new NotFoundError(USER_NOT_FOUND));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // eslint-disable-next-line max-len
        // return next(new BadRequestError(`_id Ошибка. ${req.params} Введен некорректный id пользователя`));
        return next(new BadRequestError(WRONG_DATA_USER));
      }
      return next(err);
    });
};

//  + GET /users — возвращает всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((result) => res.send(result))
    .catch(next);
};
// ----------------------
// + POST /signup — создаёт пользователя по обязательным полям email и password
module.exports.createUser = (req, res, next) => {
  const { name } = req.body;
  // хешируем пароль
  return bcrypt.hash(req.body.password, SALT_ROUNDS)
    .then((hash) => User.create({
      name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send({
        name: user.name,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(WRONG_DATA_USER_CREATE));
      }
      if (err.code === 11000) {
        return next(new ExistEmailError(EMAIL_ALREADY_EXISTS));
      }
      return next(err);
    });
};

// GET /users/me  - возвращает информацию о пользователе (email и имя)
module.exports.getCurrentUser = (req, res, next) => {
  // console.log('req.user._id = ', req.user._id);
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND));
      }
      return res.status(200).send(user);
    })
    .catch((err) => next(err));
};

// PATCH /users/me  - обновляет информацию о пользователе (email и имя)
module.exports.updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(WRONG_DATA_USER_UPDATE));
      }
      if (err.code === 11000) {
        next(new ExistEmailError(EMAIL_ALREADY_EXISTS));
      }
      return next(err);
    });
};
