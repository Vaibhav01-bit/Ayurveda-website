import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ message, isVisible, onClose }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-forest text-parchment px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 z-50 border border-saffron/20"
        >
          <span className="font-body">{message}</span>
          <button onClick={onClose} className="text-saffron hover:text-turmeric transition-colors">
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
