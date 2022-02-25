import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validateEmail } from "../validators";

const SALT_WORK_FACTOR = 10;

export const AuthUserSchema = new Schema({
  login: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
    validate: [validateEmail, "Email nieprawidłowy"],
  },
  password: {
    type: String,
    required: true,
    validate: [4, "Hasło powinno posiadać minimum 4 znaki"],
  },
});

AuthUserSchema.pre(save, function (next) {
  const user = this;
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

export const AuthUser = mongoose.model("AuthUser", AuthUserSchema);
