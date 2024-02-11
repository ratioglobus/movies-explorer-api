import { Router } from 'express';
import { getCurrentUser, updateInfoProfile } from '../controllers/users.js';
import userInfoValidate from '../middlewares/userInfoValidate.js';

const userRouter = Router();

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', userInfoValidate, updateInfoProfile);

export default userRouter;
