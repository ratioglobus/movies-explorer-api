import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import generateToken from '../utils/jwt.js';
import GeneralErrors from '../utils/GeneralErrors.js';

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
      .select('+password')
      .orFail(() => next(GeneralErrors.Unauthorized('Введены неправильная почта или пароль')));
    const matched = await bcrypt.compare(String(password), user.password);
    if (!matched) {
      return next(GeneralErrors.Unauthorized('Введены неправильная почта или пароль'));
    }
    const token = generateToken({ _id: user._id });
    return res.send({ token });
  } catch (error) {
    if (error.message === 'NotAutanticate') {
      return next(GeneralErrors.Unauthorized('Введены неправильная почта или пароль'));
    }
    return next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const newUser = await bcrypt
      .hash(req.body.password, 10)
      .then((hash) => User.create({ ...req.body, password: hash }));

    const token = generateToken({ _id: newUser._id });
    
    return res.status(StatusCodes.CREATED).send({
      name: newUser.name,
      _id: newUser._id,
      email: newUser.email,
      token,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(GeneralErrors.BadRequest('Введены неправильная почта или пароль'));
    }
    if (error.code === 11000) {
      return next(GeneralErrors.Conflict('Пользователь с таким адресом электронной почты уже существует'));
    }
    return next(error);
  }
};

export const updateInfoProfile = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const updatedInfo = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    ).orFail();
    return res.json(updatedInfo);
  } catch (error) {
    if (error.code === 11000) {
      return next(GeneralErrors.Conflict('Пользователь с таким адресом электронной почты уже существует'));
    }
    if (error instanceof mongoose.Error.ValidationError) {
      return next(GeneralErrors.BadRequest('Переданы некорректные данные при создании пользователя'));
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(GeneralErrors.NotFound(`Пользователь по указанному ID ${req.user._id} не найден`));
    }
    return next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    return res.status(StatusCodes.OK).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(GeneralErrors.NotFound(`Пользователь по указанному ID ${req.params.id} не найден`));
    }
    return next(error);
  }
};
