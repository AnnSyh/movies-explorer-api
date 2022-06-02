const router = require('express').Router();
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validations');

const {
  getMovies,
  addMovieToDataBase,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', validateCreateMovie, addMovieToDataBase);

router.delete('/movies/:_id', validateDeleteMovie, deleteMovie);

module.exports = router;
