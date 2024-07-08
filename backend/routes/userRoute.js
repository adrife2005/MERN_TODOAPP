import express from 'express';
import {
  registerUser,
  loggerUser,
  getUser,
} from '../controller/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);

router.post('/login', loggerUser);

router.get('/me', protect, getUser);

export default router;
