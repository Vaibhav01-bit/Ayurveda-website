import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';

// @desc    Create Razorpay order
// @route   POST /api/payment/create-order
// @access  Private
export const createOrder = async (req, res, next) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await instance.orders.create(options);

    if (!order) {
      res.status(500);
      throw new Error('Some error occurred while creating order');
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Verify Razorpay payment
// @route   POST /api/payment/verify
// @access  Private
export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is verified
      const order = await Order.findById(orderId);
      
      if (order) {
        order.paymentStatus = 'paid';
        order.razorpayOrderId = razorpay_order_id;
        order.razorpayPaymentId = razorpay_payment_id;
        
        await order.save();
        res.json({ message: 'Payment verified successfully' });
      } else {
        res.status(404);
        throw new Error('Order not found');
      }
    } else {
      res.status(400);
      throw new Error('Invalid signature sent!');
    }
  } catch (error) {
    next(error);
  }
};
