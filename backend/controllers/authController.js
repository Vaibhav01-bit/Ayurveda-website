import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken, setTokenCookies } from '../utils/generateToken.js';
import logger from '../utils/logger.js';
import jwt from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    if (user) {
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      // Save refresh token to DB
      user.refreshToken = refreshToken;
      await user.save();

      setTokenCookies(res, accessToken, refreshToken);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    // Check if account is locked
    if (user.lockUntil && user.lockUntil > Date.now()) {
      logger.authEvent('LOGIN_ATTEMPT_ON_LOCKED_ACCOUNT', { email });
      res.status(403);
      throw new Error('Account is temporarily locked due to too many failed attempts. Try again later.');
    }

    if (await user.matchPassword(password)) {
      // Reset failed attempts on successful login
      user.loginAttempts = 0;
      user.lockUntil = undefined;

      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      // Save refresh token to DB
      user.refreshToken = refreshToken;
      await user.save();

      setTokenCookies(res, accessToken, refreshToken);

      logger.authEvent('SUCCESSFUL_LOGIN', { email, userId: user._id });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      // Increment failed attempts
      user.loginAttempts += 1;
      
      // Lock account after 5 attempts
      if (user.loginAttempts >= 5) {
        user.lockUntil = Date.now() + 30 * 60 * 1000; // 30 minutes
        logger.security('ACCOUNT_LOCKED', { email, attempts: user.loginAttempts });
      }
      
      await user.save();
      
      logger.authEvent('FAILED_LOGIN_ATTEMPT', { email, attempts: user.loginAttempts });
      
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Log out user / clear cookies
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.refreshToken = undefined;
      await user.save();
    }

    res.cookie('accessToken', '', { httpOnly: true, expires: new Date(0) });
    res.cookie('refreshToken', '', { httpOnly: true, expires: new Date(0) });

    logger.authEvent('LOGOUT', { userId: req.user._id });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
export const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401);
      throw new Error('Refresh token not found');
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh_secret_123');
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      res.status(401);
      throw new Error('Invalid refresh token');
    }

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    await user.save();

    setTokenCookies(res, newAccessToken, newRefreshToken);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(401);
    next(new Error('Refresh token failed'));
  }
};
