import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './src/modules/auth/auth.routes.js';
import categoryRoutes from './src/modules/categories/categories.routes.js';
import taskRoutes from './src/modules/tasks/task.routes.js';
import { globalError } from './src/middleware/catchError.js';
import { AppError } from './src/utils/appError.js';


dotenv.config();

connectDB();

const app = express();

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

app.use(globalError);

app.use("*", (req, res, next) => {
  next(new AppError(`page not found ${req.originalUrl}`, 404));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
