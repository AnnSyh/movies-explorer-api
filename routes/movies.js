const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  IMAGE_REGEX,
  NAMERU,
  NAMEEN
} = require('../utils/constants');

const {
  getMovies,
  addMovieToDataBase,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(IMAGE_REGEX),
    trailerLink: Joi.string().required().pattern(IMAGE_REGEX),
    thumbnail: Joi.string().required().pattern(IMAGE_REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().pattern(NAMERU),
    nameEN: Joi.string().required().pattern(NAMEEN),
  }),
}), addMovieToDataBase);

router.delete('/movies/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum(),
  }),
}), deleteMovie);

module.exports = router;
