const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictingRequestError = require('../errors/conflicting-request-err');
const {
  badRequestErrMess,
  movieNotFoundErrMess,
  conflictMovieReqErrMess
} = require('../utils/error-messages');

async function getMovies(req, res, next) {
  try {
    const movie = await Movie.find({})
      .populate(['owner']);
    res.send(movie);
  } catch (err) {
    next(err);
  }
}

async function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId
  } = req.body;
  const userId = req.user._id;
  const checkMovie = await Movie.findOne({ movieId });
  if (checkMovie) {
    try {
      const addOwner = await Movie.findOneAndUpdate(
        { movieId },
        { $addToSet: { owner: userId } },
        { new: true }
      )
        .populate(['owner']);

      res.send(addOwner);
    } catch (err) {
      if (err.code === 11000) {
        const conflictingRequestError = new ConflictingRequestError(conflictMovieReqErrMess);
        next(conflictingRequestError);
      }
      if (err.name === 'ValidationError') {
        const badRequestError = new BadRequestError(badRequestErrMess);
        next(badRequestError);
      }
      next(err);
    }
  } else {
    try {
      const movie = await Movie.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        thumbnail,
        nameRU,
        nameEN,
        movieId,
        owner: userId
      })
        .populate(['owner']);

      res.send(movie);
    } catch (err) {
      if (err.code === 11000) {
        const conflictingRequestError = new ConflictingRequestError(conflictMovieReqErrMess);
        next(conflictingRequestError);
      }
      if (err.name === 'ValidationError') {
        const badRequestError = new BadRequestError(badRequestErrMess);
        next(badRequestError);
      }
      next(err);
    }
  }
}

async function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  const userId = req.user._id;
  const delMovie = await Movie.findOne({ movieId });
  try {
    if (delMovie) {
      const delOwner = await Movie.findOneAndUpdate(
        { movieId },
        { $pull: { owner: userId } }
      )
        .populate(['owner']);

      res.send(delOwner);
    } else {
      throw new NotFoundError(movieNotFoundErrMess);
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      const badRequestError = new BadRequestError(badRequestErrMess);
      next(badRequestError);
    }
    next(err);
  }
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie
};
