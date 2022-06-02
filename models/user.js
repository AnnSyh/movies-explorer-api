const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt'); // импортируем bcrypt

const BadAuthError = require('../errors/bad-auth-err');
const {
  WRONG_EMAIL,
  WRONG_EMAIL_OR_PASSWORD,
} = require('../utils/constants');

// Опишем схему:
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => isEmail(value),
      message: WRONG_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Мин длина 2 символа'],
    maxlength: [30, 'Мах длина 30 символа'],
    default: 'Александр',
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new BadAuthError(WRONG_EMAIL_OR_PASSWORD));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new BadAuthError(WRONG_EMAIL_OR_PASSWORD));
          }
          return user;
        });
    });
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
