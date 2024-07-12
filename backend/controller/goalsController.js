import asyncHandler from 'express-async-handler';
import Goal from '../models/goalsModel.js';
import User from '../models/userModel.js';

// @desc Get Goals
// @route GET /api/goals
// @access Public
export const getGoal = asyncHandler(async (req, res, next) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

// @desc Post Goals
// @route POST /api/goals
// @access Public
export const postGoal = asyncHandler(async (req, res, next) => {
  if (!req.body.text) {
    const err = new Error('You should enter a text on the field');
    err.status = 400;
    return next(err);
  }

  const newGoal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(newGoal);
});

// @desc Put Goals
// @route PUT /api/goals/:id
// @access Public
export const putGoal = asyncHandler(async (req, res, next) => {
  const checkIfExistGoal = await Goal.findById(req.params.id);

  if (!checkIfExistGoal) {
    const err = new Error('Goal not found');
    err.status = 400;
    return next(err);
  }

  if (!req.user.id) {
    const err = new Error('User not found');
    err.status = 401;
    return next(err);
  }

  if (checkIfExistGoal.user.toString() !== req.user.id) {
    const err = new Error('User no authorized');
    err.status = 401;
    return next(err);
  }

  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateGoal);
});

// @desc Delete Goals
// @route DELETE /api/goals/:id
// @access Public
export const deleteGoal = asyncHandler(async (req, res, next) => {
  const checkIfExistId = await Goal.findById(req.params.id);

  if (!checkIfExistId) {
    const err = new Error('Goal not found');
    err.status = 400;
    return next(err);
  }

  if (!req.user.id) {
    const err = new Error('User not found');
    err.status = 401;
    return next(err);
  }

  if (checkIfExistId.user.toString() !== req.user.id) {
    const err = new Error('User no authorized');
    err.status = 401;
    return next(err);
  }

  await checkIfExistId.deleteOne();

  res.status(200).json({ id: req.params.id });
});
