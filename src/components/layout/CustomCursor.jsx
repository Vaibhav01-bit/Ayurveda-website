import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add smoothing to the cursor movement
  const springConfig = { damping: 25, stiffness: 250 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e) => {
      mouseX.set(e.clientX - 12);
      mouseY.set(e.clientY - 12);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 border-2 border-saffron rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    />
  );
}
