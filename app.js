// const path = require('path');
const express = require('express');

const helmet = require('helmet');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const { errors } = require('celebrate');
const cenralErrors = require('./middlewares/central-err');

const app = express();
const routes = require('./routes/routes');

const { limiter, mongoDataBaseAddress } = require('./utils/config');

const { PORT = 3000, NODE_ENV, DATABASE_URL } = process.env; // Слушаем 3000 порт
const { requestLogger, errorLogger } = require('./middlewares/logger');

// функция обработки ошибок при подключении к серверу mongo
async function main() {
  try {
    // await mongoose.connect('mongodb://localhost:27017/moviesdb');
    await mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : mongoDataBaseAddress);
  } catch (error) {
    console.log(error);
  }
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`); // Если всё работает, консоль покажет, какой порт приложение слушает
  });
}
// миддлвары
app.use(limiter); // подключаем rate-limiter
// cors
const cors = (req, res, next) => {
  const { origin } = req.headers;
  // console.log('cors: origin = ', origin);
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};
app.use(cors);

app.use(BodyParser.json()); // подключили миддлвару кот достает значения из тела запроса
app.use(helmet()); // настраиваем заголовки

app.use(requestLogger); // подключаем логгер запросов
app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок
// централизованная обработка ошибок
app.use(errors());
app.use(cenralErrors);

// запуск сервера
main();
