const express = require('express');
const { validateCreateUser, validateLogin } = require('../middlewares/validations');
const userRouter = require('./user');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/not-found-err');
const {
  createUser,
  login,
} = require('../controllers/user');
// const { AVATAR_REGEX } = require('../utils/constants');
const auth = require('../middlewares/auth'); // авторизация

const app = express();
// Краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роуты, не требующие авторизации
//  регистрация
app.post('/signup', validateCreateUser, createUser);
//  авторизация (логин)
app.post('/signin', validateLogin, login);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use(userRouter);
app.use(moviesRouter);

// Обработаем некорректный маршрут и вернём ошибку 404
app.use('*', auth, (req, res, next) => next(new NotFoundError(`Страницы по адресу ${req.baseUrl} не существует;`)));

module.exports = app;
