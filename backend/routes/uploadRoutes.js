import express from 'express';
import { upload, handleUploadError } from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';
import cloudinary from '../config/cloudinary.js';
import logger from '../utils/logger.js';

const router = express.Router();

// @desc    Upload file to Cloudinary
// @route   POST /api/upload
// @access  Private
router.post('/', protect, upload.single('file'), handleUploadError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Convert buffer to base64 for Cloudinary
    const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(base64File, {
      folder: 'vaidya_uploads',
      resource_type: 'auto',
    });

    logger.info('FILE_UPLOAD_SUCCESS', { userId: req.user._id, url: result.secure_url });

    res.status(200).json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    logger.error('FILE_UPLOAD_ERROR', { userId: req.user._id, error: error.message });
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

export default router;
