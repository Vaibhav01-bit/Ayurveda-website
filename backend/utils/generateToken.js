import jwt from 'jsonwebtoken';

/**
 * Generate a short-lived access token
 */
export const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET || 'access_secret_123', {
    expiresIn: '15m', // 15 minutes
  });
};

/**
 * Generate a long-lived refresh token
 */
export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || 'refresh_secret_123', {
    expiresIn: '7d', // 7 days
  });
};

/**
 * Set secure HTTP-only cookies
 */
export const setTokenCookies = (res, accessToken, refreshToken) => {
  const isProduction = process.env.NODE_ENV === 'production';

  // Access token cookie
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
    maxAge: 15 * 60 * 1000, // 15 mins
  });

  // Refresh token cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

export default generateToken;
