import express from 'express';
import colors from 'colors';
import goalsRoute from './routes/goalsRoute.js';
import connectDB from './database/mongoDB.js';
import errorHandler from './middleware/errorMiddleware.js';
import loggerHandler from './middleware/loggerMiddleware.js';
import notFoundHandler from './middleware/notFoundMiddleware.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors';

const PORT = process.env.PORT_BACKEND || 8080;

const app = express();

// Cors polity
const corsOptions = {
  origin: 'http://localhost:4173',
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

// Error Middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`Server is running in localhost:${PORT}`['cyan']['underline'])
);
