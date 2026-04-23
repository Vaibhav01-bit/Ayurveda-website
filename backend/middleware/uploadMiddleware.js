import multer from 'multer';
import path from 'path';
import logger from '../utils/logger.js';

// Define allowed file types
const ALLOWED_TYPES = /jpeg|jpg|png|pdf|doc|docx/;

/**
 * Filter for file uploads – validates MIME type and extension
 */
const fileFilter = (req, file, cb) => {
  // Check extension
  const extname = ALLOWED_TYPES.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = ALLOWED_TYPES.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    logger.security('INVALID_FILE_UPLOAD_ATTEMPT', {
      ip: req.ip,
      fileName: file.originalname,
      mimeType: file.mimetype,
    });
    cb(new Error('Error: Only images (jpeg, jpg, png) and documents (pdf, doc, docx) are allowed!'));
  }
};

/**
 * Configure Multer storage (Memory storage for Cloudinary)
 */
const storage = multer.memoryStorage();

/**
 * Upload middleware with size limits (5MB)
 */
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

/**
 * Error handler for multer errors
 */
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size is too large. Max limit is 5MB.' });
    }
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};
