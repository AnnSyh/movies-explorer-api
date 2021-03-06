/*
+ GET  /movies - возвращает все сохранённые текущим  пользователем фильмы
+ POST /movies - создаёт фильм с переданными в теле country, director, duration, year,
                                                  description, image,
                                                  trailer, nameRU, nameEN и thumbnail, movieId
+ DELETE /movies/_id -  удаляет сохранённый фильм по id
*/

const Movie = require('../models/movie');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const DelMovieError = require('../errors/del-movie-err');

const {
  WRONG_DATA_MOVIE,
  WRONG_DATA_MOVIE_DELETE,
  MOVIE_NOT_FOUND,
  ACCESS_ERROR,
} = require('../utils/constants');

// GET /movies — возвращает все movies
module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id }).sort({ createdAt: -1 })
    .then((movies) => {
      res.send({ movies });
    })
    .catch(next);
};

// POST /movies — создаёт movies
module.exports.addMovieToDataBase = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      // console.log('catch err = ', err);
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(WRONG_DATA_MOVIE));
      }
      return next(err);
    });
};

// DELETE /movies/:_id — удаляет карточку по идентификатору
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError(MOVIE_NOT_FOUND);
      } else if (!movies.owner.equals(req.user._id)) {
        throw new DelMovieError(ACCESS_ERROR);
      } else {
        return movies.remove().then(() => res.send(movies));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(WRONG_DATA_MOVIE_DELETE));
      }
      return next(err);
    });
};
