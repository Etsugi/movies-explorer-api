const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const ConflictingRequestError = require('../errors/conflicting-request-err');
const {
  badRequestErrMess,
  movieNotFoundErrMess,
  forbiddenErrMess,
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
  const owner = req.user._id;

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
      owner
    });

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

async function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  const id = req.user._id;

  try {
    const movie = await Movie.findById(movieId)
      .orFail(() => {
        throw new NotFoundError(movieNotFoundErrMess);
      });
    if (movie.owner.toString() !== id) {
      throw new ForbiddenError(forbiddenErrMess);
    } else {
      const delMovie = await Movie.findByIdAndRemove(movieId)
        .populate(['owner']);
      res.send(delMovie);
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
