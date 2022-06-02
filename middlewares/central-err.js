const { ERROR_CODE_INTERNAL, SERVER_ERROR } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = ERROR_CODE_INTERNAL, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR_CODE_INTERNAL
        // ? `err.name = ${err.name} ; err.message = ${err.message} ; Ошибка по умолчанию.`
        ? SERVER_ERROR
        : message,
    });
  return next();
};
