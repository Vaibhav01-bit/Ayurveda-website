import { motion } from 'framer-motion';

export default function Loader({ isVisible }) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-parchment flex items-center justify-center"
    >
      <div className="w-24 h-24 relative">
        <svg viewBox="0 0 100 100" className="animate-spin-slow">
          <circle cx="50" cy="50" r="40" stroke="#C4622D" strokeWidth="2" fill="none" strokeDasharray="251" strokeDashoffset="0">
            <animate attributeName="stroke-dashoffset" values="251;0" duration="2s" ease="ease-in-out" />
          </circle>
          <path d="M50 20 L50 80 M20 50 L80 50 M28 28 L72 72 M28 72 L72 28" stroke="#3B5E3A" strokeWidth="1" />
        </svg>
      </div>
    </motion.div>
  );
}
