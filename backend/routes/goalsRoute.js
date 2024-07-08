import express from 'express';
import {
  deleteGoal,
  getGoal,
  postGoal,
  putGoal,
} from '../controller/goalsController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getGoal);

router.post('/', protect, postGoal);

router.put('/:id', protect, putGoal);

router.delete('/:id', protect, deleteGoal);

export default router;
