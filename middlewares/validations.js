const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const isURL = require('validator/lib/isURL');
const { WRONG_URL_FORMAT } = require('../utils/constants');

const validationUrl = (value, helpers) => {
  if (isURL(value)) {
    return value;
  }
  return helpers.message(WRONG_URL_FORMAT);
};

const {
  NAMERU,
  NAMEEN,
} = require('../utils/constants');

// POST /signup
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
    password: Joi.string().required(),
  }),
});

// POST /signin
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Некорректный email');
    }),
    password: Joi.string().required(),
  }),
});

// PATCH /users/me
const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

// POST /movies
const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validationUrl),
    trailerLink: Joi.string().required().custom(validationUrl),
    thumbnail: Joi.string().required().custom(validationUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().pattern(NAMERU),
    nameEN: Joi.string().required().pattern(NAMEEN),
  }),
});

// DELETE /movies/:_id
const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateUser,
  validateCreateMovie,
  validateDeleteMovie,
};
