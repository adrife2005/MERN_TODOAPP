import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc Register new User
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const err = new Error('You must fill out all the fields');
    err.status = 400;
    return next(err);
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    const err = new Error(
      `User with the email: ${email} already exist, please enter a different email `
    );
    err.status = 400;
    return next(err);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    const err = new Error('Invalid User Data');
    err.status = 400;
    return next(err);
  }
});

// @desc Auth a User
// @route POST /api/users/login
// @access Public
export const loggerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    const err = new Error('Invalid credentials');
    err.status = 400;
    return next(err);
  }
});

// @desc Get User Data
// @route GET /api/users/me
// @access Private
export const getUser = asyncHandler(async (req, res, next) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
