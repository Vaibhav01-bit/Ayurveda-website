import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDir = path.join(__dirname, '..', 'logs');

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  let log = `[${timestamp}] [${level.toUpperCase()}]: ${stack || message}`;
  if (Object.keys(meta).length > 0) {
    log += ` | META: ${JSON.stringify(meta)}`;
  }
  return log;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    // Always log errors to file
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 5 * 1024 * 1024, // 5 MB
      maxFiles: 10,
    }),
    // Combined log for all levels
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      maxsize: 10 * 1024 * 1024, // 10 MB
      maxFiles: 10,
    }),
    // Security-specific log
    new winston.transports.File({
      filename: path.join(logDir, 'security.log'),
      level: 'warn',
      maxsize: 10 * 1024 * 1024, // 10 MB
      maxFiles: 20,
    }),
  ],
});

// In development, also log to console with color
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'HH:mm:ss' }),
        logFormat
      ),
    })
  );
}

// Security event helpers
logger.security = (event, data = {}) => {
  logger.warn(`[SECURITY] ${event}`, data);
};

logger.authEvent = (event, data = {}) => {
  logger.warn(`[AUTH] ${event}`, data);
};

logger.paymentEvent = (event, data = {}) => {
  logger.warn(`[PAYMENT] ${event}`, data);
};

export default logger;
