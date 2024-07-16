import User from '../../../config/models/user.js';
import bcrypt from 'bcryptjs';
import basicAuth from 'basic-auth';
import { catchError } from '../../middleware/catchError.js';
import { AppError } from '../../utils/appError.js';

export const registerUser =catchError(async (req, res, next) => {
  const { name, email, password } = req.body;
   
    let user = await User.findOne({ email });
    if (user) {
      return next(new AppError("User already exists",400))
    }
    user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  
});

export const authUser =catchError(async (req, res, next) => {
  const credentials = basicAuth(req);
  if (!credentials || !credentials.name || !credentials.pass) {
    return res.status(400).json({ message: 'Missing credentials' });
  }
   
    const user = await User.findOne({ email: credentials.name });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(credentials.pass, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Authenticated successfully' });
  
});
