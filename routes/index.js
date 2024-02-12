import { Router } from 'express';
import { errors } from 'celebrate';

import userRouter from './users.js';
import movieRouter from './movies.js';
import { login, createUser } from '../controllers/users.js';
import auth from '../middlewares/auth.js';
import userAuthValidate from '../middlewares/userAuthValidate.js';
import generalErrorHandler from '../utils/generalErrorHandler.js';
import GeneralErrors from '../utils/GeneralErrors.js';
import { requestLogger, errorLogger } from '../middlewares/logData.js';

const router = Router();

router.use(requestLogger);
router.post('/signin', userAuthValidate, login);
router.post('/signup', userAuthValidate, createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', auth, (req, res, next) => {
  next(GeneralErrors.NotFound('Страница не найдена'));
});

router.use(errorLogger);
router.use(errors());
router.use(generalErrorHandler);

export default router;
