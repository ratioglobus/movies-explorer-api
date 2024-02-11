import mongoose from 'mongoose';
import validator from 'validator';

const userScheme = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validator: {
        validator: (v) => validator.isEmail(v),
        message: 'Неправильный формат',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
    },
  },
  { versionKey: false },
);

export default mongoose.model('user', userScheme);
