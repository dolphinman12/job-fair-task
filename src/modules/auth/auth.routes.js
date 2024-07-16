// auth.routes.js
import express from 'express';
import { registerUser, authUser } from './authController.js';

const authRoutes = express.Router();

// Register a new user
authRoutes.post('/register', registerUser);

// Authenticate user
authRoutes.post('/login', authUser);

export default authRoutes;
