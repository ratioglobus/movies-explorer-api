import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import Movie from '../models/movie.js';
import GeneralErrors from '../utils/GeneralErrors.js';

export const getAllMyMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    return res.send(movies);
  } catch (error) {
    return next(error);
  }
};

export const createMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
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

    const newMovie = await new Movie({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    });

    return res.status(StatusCodes.CREATED).send(await newMovie.save());
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(GeneralErrors.BadRequest('Переданы некорректные данные при создании фильма'));
    }
    return next(error);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId).orFail();
    if (movie.owner.toString() !== req.user._id) {
      return next(GeneralErrors.Forbidden('Нельзя удалять фильмы других пользователей'));
    }
    return Movie.deleteOne(movie).orFail().then(() => {
      res.send({ message: 'Фильм удалён' });
    });
  } catch (error) {
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(GeneralErrors.NotFound('Фильм с указанным ID не найден'));
    }
    return next(error);
  }
};
