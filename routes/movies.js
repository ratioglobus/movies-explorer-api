import { Router } from 'express';
import { createMovie, getAllMyMovies, deleteMovie } from '../controllers/movies.js';
import movieIDValidate from '../middlewares/movieIDValidate.js';
import movieInfoValidate from '../middlewares/movieInfoValidate.js';

const movieRouter = Router();

movieRouter.post('/', movieInfoValidate, createMovie);
movieRouter.get('/', getAllMyMovies);
movieRouter.delete('/:movieId', movieIDValidate, deleteMovie);

export default movieRouter;
