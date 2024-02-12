import mongoose from 'mongoose';
import validator from 'validator';

const movieScheme = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validator: {
        validator: (v) => validator.isURL(v),
        message: "Неправильный формат поля 'image'",
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validator: {
        validator: (v) => validator.isURL(v),
        message: "Неправильный формат поля 'image'",
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validator: {
        validator: (v) => validator.isURL(v),
        message: "Неправильный формат поля 'image'",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

export default mongoose.model('movie', movieScheme);
