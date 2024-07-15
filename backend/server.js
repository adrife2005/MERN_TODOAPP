import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import colors from 'colors';
import goalsRoute from './routes/goalsRoute.js';
import connectDB from './database/mongoDB.js';
import errorHandler from './middleware/errorMiddleware.js';
import loggerHandler from './middleware/loggerMiddleware.js';
import notFoundHandler from './middleware/notFoundMiddleware.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors';

const PORT = process.env.PORT_BACKEND || 8080;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Cors polity
const corsOptions = {
  origin: process.env.URL,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Database
connectDB();

// Logger Middleware
app.use(loggerHandler);

// Middleware to pass json and urlenconded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for the routes
app.use('/api/goals', goalsRoute);
app.use('/api/users', userRoute);

// The index page
app.get('/', (req, res) => {
  res.send('This is the backend for my to_do_app');
});

// Error Middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`Server is running in localhost:${PORT}`['cyan']['underline'])
);
