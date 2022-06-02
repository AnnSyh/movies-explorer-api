const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const mongoDataBaseAddress = 'mongodb://localhost:27017/moviesdb';

const devJwtKey = 'some-secret-key';

module.exports = {
  limiter,
  mongoDataBaseAddress,
  devJwtKey,
};
