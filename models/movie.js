const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regExp = /^((https?):\/\/)?(www\.)?([A-Za-z0-9]{1}[A-Za-z0-9-]*\.?)*\.{1}[A-Za-z0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;
        return regExp.test(v);
      },
      message: 'Ошибка валидации ссылки!'
    }
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regExp = /^((https?):\/\/)?(www\.)?([A-Za-z0-9]{1}[A-Za-z0-9-]*\.?)*\.{1}[A-Za-z0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;
        return regExp.test(v);
      },
      message: 'Ошибка валидации ссылки!'
    }
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regExp = /^((https?):\/\/)?(www\.)?([A-Za-z0-9]{1}[A-Za-z0-9-]*\.?)*\.{1}[A-Za-z0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;
        return regExp.test(v);
      },
      message: 'Ошибка валидации ссылки!'
    }
  },
  nameRU: {
    type: String,
    required: true
  },
  nameEN: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  movieId: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('movie', movieSchema);
