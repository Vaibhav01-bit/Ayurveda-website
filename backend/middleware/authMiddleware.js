import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import logger from '../utils/logger.js';

const protect = async (req, res, next) => {
  let token;

  // Read token from cookie
  token = req.cookies.accessToken;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'access_secret_123');

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('User not found');
      }

      next();
    } catch (error) {
      logger.authEvent('TOKEN_VERIFICATION_FAILED', { ip: req.ip, error: error.message });
      res.status(401);
      next(new Error('Not authorized, token failed'));
    }
  }

  if (!token) {
    res.status(401);
    next(new Error('Not authorized, no token'));
  }
};

const admin = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'super_admin')) {
    next();
  } else {
    logger.security('UNAUTHORIZED_ADMIN_ACCESS_ATTEMPT', { userId: req.user?._id, role: req.user?.role });
    res.status(403);
    next(new Error('Not authorized as an admin'));
  }
};

const superAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'super_admin') {
    next();
  } else {
    logger.security('UNAUTHORIZED_SUPER_ADMIN_ACCESS_ATTEMPT', { userId: req.user?._id, role: req.user?.role });
    res.status(403);
    next(new Error('Not authorized as a super admin'));
  }
};

const doctor = (req, res, next) => {
  if (req.user && (req.user.role === 'doctor' || req.user.role === 'admin' || req.user.role === 'super_admin')) {
    next();
  } else {
    logger.security('UNAUTHORIZED_DOCTOR_ACCESS_ATTEMPT', { userId: req.user?._id, role: req.user?.role });
    res.status(403);
    next(new Error('Not authorized as a doctor'));
  }
};

export { protect, admin, superAdmin, doctor };
