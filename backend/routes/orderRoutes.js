import express from 'express';
import { addOrderItems, getOrderById, getMyOrders, verifyPayment } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { paymentLimiter } from '../middleware/securityMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, addOrderItems)
  .get(protect, getMyOrders);

router.route('/verify').post(protect, paymentLimiter, verifyPayment);

router.route('/:id')
  .get(protect, getOrderById);

export default router;
