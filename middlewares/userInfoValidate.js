import { Joi, celebrate } from 'celebrate';

export default celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});
