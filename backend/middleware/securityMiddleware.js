import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import logger from '../utils/logger.js';

// ─────────────────────────────────────────────────
// RATE LIMITERS
// ─────────────────────────────────────────────────

/**
 * Global API rate limiter – 100 requests per 15 minutes per IP
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.security('RATE_LIMIT_EXCEEDED', {
      ip: req.ip,
      path: req.path,
      method: req.method,
    });
    res.status(429).json({
      success: false,
      message: 'Too many requests from this IP, please try again after 15 minutes.',
    });
  },
});

/**
 * Strict auth limiter – 10 attempts per 15 minutes per IP
 * Applied to /api/auth/login and /api/auth/register
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  handler: (req, res) => {
    logger.authEvent('AUTH_RATE_LIMIT_EXCEEDED', {
      ip: req.ip,
      email: req.body?.email,
    });
    res.status(429).json({
      success: false,
      message: 'Too many login attempts from this IP. Please try again in 15 minutes.',
    });
  },
});

/**
 * Payment limiter – 20 attempts per hour per IP
 */
export const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.paymentEvent('PAYMENT_RATE_LIMIT_EXCEEDED', { ip: req.ip });
    res.status(429).json({
      success: false,
      message: 'Too many payment requests. Please try again later.',
    });
  },
});

/**
 * Contact/form limiter – 5 per hour per IP
 */
export const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.security('FORM_SPAM_DETECTED', { ip: req.ip, path: req.path });
    res.status(429).json({
      success: false,
      message: 'Too many form submissions. Please try again later.',
    });
  },
});

// ─────────────────────────────────────────────────
// DATA SANITIZATION
// ─────────────────────────────────────────────────

/**
 * NoSQL Injection Protection – strips $ and . from user input
 */
export const noSQLSanitize = mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    logger.security('NOSQL_INJECTION_ATTEMPT', {
      ip: req.ip,
      key,
      path: req.path,
    });
  },
});

/**
 * XSS Protection – cleans HTML from req.body, req.query, req.params
 */
export const xssProtection = xss();

// ─────────────────────────────────────────────────
// REQUEST INSPECTION MIDDLEWARE
// ─────────────────────────────────────────────────

/**
 * Logs all incoming requests (IP, method, path).
 * Flags suspicious patterns.
 */
export const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Flag suspicious query patterns
  const suspiciousPatterns = /<script|javascript:|eval\(|union select|drop table|insert into|delete from/i;
  const rawInput = JSON.stringify({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (suspiciousPatterns.test(rawInput)) {
    logger.security('SUSPICIOUS_PAYLOAD_DETECTED', {
      ip: req.ip,
      method: req.method,
      path: req.path,
      payload: rawInput.substring(0, 500),
    });
  }

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logLevel = res.statusCode >= 400 ? 'warn' : 'info';
    logger[logLevel](`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });
  });

  next();
};

/**
 * Honeypot middleware – reject requests that fill hidden fields
 * Include a `_hp` hidden input in forms and reject if it's filled
 */
export const honeypotCheck = (req, res, next) => {
  if (req.body && req.body._hp && req.body._hp !== '') {
    logger.security('HONEYPOT_TRIGGERED', {
      ip: req.ip,
      path: req.path,
      honeypotValue: req.body._hp,
    });
    // Return a fake success to confuse bots
    return res.status(200).json({ success: true, message: 'Form submitted successfully.' });
  }
  next();
};

/**
 * Security headers that Helmet misses
 */
export const additionalSecurityHeaders = (req, res, next) => {
  // Remove powered-by
  res.removeHeader('X-Powered-By');
  // Prevent MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Permissions policy
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
};
