import { Joi, celebrate } from 'celebrate';
import { URLExp } from '../utils/const.js';

export default celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(new RegExp(URLExp)),
    trailerLink: Joi.string().required().pattern(new RegExp(URLExp)),
    thumbnail: Joi.string().required().pattern(new RegExp(URLExp)),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
