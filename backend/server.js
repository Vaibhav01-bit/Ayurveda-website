import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import logger from './utils/logger.js';

import { 
  globalLimiter, 
  requestLogger, 
  noSQLSanitize, 
  xssProtection, 
  additionalSecurityHeaders 
} from './middleware/securityMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

connectDB();

const app = express();

// Security Middleware
app.use(helmet()); // Basic security headers
app.use(additionalSecurityHeaders); // Extra security headers
app.use(requestLogger); // Log all requests and suspicious patterns
app.use(globalLimiter); // Rate limiting

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Payload size limits & Parsing
app.use(express.json({ limit: '10kb' })); // Limit JSON body size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser()); // Parse cookies

// Data Sanitization
app.use(noSQLSanitize); // Prevent NoSQL injection
app.use(xssProtection); // Prevent XSS

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/consultation', consultationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.send('API is running securely...');
});

// Production-safe Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Log error
  logger.error(`${err.message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip
  });

  res.status(statusCode).json({
    message: err.message,
    // Hide stack trace in production
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
