import Cart from '../models/Cart.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId', 'name price image stock');
    if (!cart) {
      return res.json({ userId: req.user._id, items: [] });
    }
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

// @desc    Add or update cart items
// @route   POST /api/cart
// @access  Private
export const updateCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    } else {
      if (quantity > 0) {
        cart.items.push({ productId, quantity });
      }
    }

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
};
