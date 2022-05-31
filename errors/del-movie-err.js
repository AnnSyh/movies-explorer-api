const { ERROR_CODE_DEL_MOVIE } = require('../utils/constants');

class DelMovieError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_DEL_MOVIE;
  }
}

module.exports = DelMovieError;
