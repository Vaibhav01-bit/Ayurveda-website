import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import Button from './Button';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-parchment shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-forest/10">
              <h2 className="font-display text-3xl text-forest">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-forest hover:text-saffron transition-colors text-2xl">✕</button>
            </div>
            
            <div className="flex-grow p-6 overflow-y-auto">
              {cartItems.length === 0 ? (
                <p className="text-center text-charcoal/60 mt-10">Your cart is empty.</p>
              ) : (
                <ul className="space-y-6">
                  {cartItems.map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b border-forest/10 pb-4">
                      <div>
                        <h4 className="font-display text-xl">{item.name}</h4>
                        <p className="text-saffron font-bold">${item.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-sm text-charcoal/50 hover:text-red-500">Remove</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-forest/10 bg-white/50">
                <Button className="w-full">Checkout</Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
