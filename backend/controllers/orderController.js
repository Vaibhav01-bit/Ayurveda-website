import Order from '../models/Order.js';
import crypto from 'crypto';
import logger from '../utils/logger.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res, next) => {
  try {
    const { products, shippingAddress, totalAmount, paymentId, orderId } = req.body;

    if (products && products.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      const order = new Order({
        userId: req.user._id,
        products,
        shippingAddress,
        totalAmount,
        paymentResult: {
          id: paymentId,
          order_id: orderId,
          status: 'pending',
        }
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/orders/verify
// @access  Private
export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const order = await Order.findById(orderId);

      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: razorpay_payment_id,
          status: 'completed',
          update_time: Date.now().toString(),
          email_address: req.user.email,
        };

        const updatedOrder = await order.save();
        logger.paymentEvent('PAYMENT_VERIFIED_SUCCESS', { orderId, paymentId: razorpay_payment_id });
        res.json(updatedOrder);
      } else {
        res.status(404);
        throw new Error('Order not found');
      }
    } else {
      logger.security('INVALID_PAYMENT_SIGNATURE', { 
        userId: req.user._id, 
        orderId, 
        paymentId: razorpay_payment_id 
      });
      res.status(400);
      throw new Error('Invalid payment signature');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'name email').populate('products.productId', 'name image price');

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders
// @access  Private
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
