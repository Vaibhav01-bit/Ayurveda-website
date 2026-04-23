import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function Newsletter() {
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  // Simple petal particle generation
  const petals = Array.from({ length: 12 });

  return (
    <section ref={containerRef} className="py-20 lg:py-32 px-6 sm:px-8 lg:px-12 bg-forest/5 relative overflow-hidden">
      {/* Parallax Botanical Background Placeholder */}
      <motion.div 
        style={{ y }}
        className="absolute -right-20 -top-20 w-72 lg:w-96 h-72 lg:h-96 opacity-10 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#3B5E3A" d="M45.7,-76.1C58.9,-69.3,69.2,-56.3,77.5,-42.2C85.8,-28.1,92.1,-13,91.2,1.8C90.3,16.6,82.2,31.1,72.4,43.2C62.6,55.3,51.1,65,37.8,72.4C24.5,79.8,9.4,84.9,-4.8,88.4C-19.1,91.9,-32.5,93.8,-44.6,89.5C-56.7,85.2,-67.5,74.7,-76.6,62.4C-85.7,50.1,-93.1,36,-95.7,21.1C-98.3,6.2,-96.1,-9.5,-90.4,-23.7C-84.7,-37.9,-75.5,-50.6,-63.5,-59.6C-51.5,-68.6,-36.7,-73.9,-22.4,-77.4C-8.1,-80.9,5.7,-82.6,20.2,-81.4C34.7,-80.2,45.7,-76.1,45.7,-76.1Z" transform="translate(100 100)" />
        </svg>
      </motion.div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-forest-deep mb-4"
        >
          Join Our Journey
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-forest/60 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Subscribe to receive ancient wisdom, wellness tips, and exclusive offers delivered to your inbox.
        </motion.p>
        
        <div className="relative inline-block w-full max-w-lg">
          <motion.form 
            animate={{ scale: isFocused ? 1.01 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full relative z-10" 
            onSubmit={handleSubmit}
          >
            <div className="w-full relative">
               <Input 
                 type="email" 
                 placeholder="Your email address" 
                 className="w-full h-12 lg:h-14 bg-white shadow-earth-sm transition-all duration-300 focus:shadow-earth border-parchment/30 focus:border-primary-green text-sm sm:text-base px-6 rounded-xl sm:rounded-2xl" 
                 required 
                 onFocus={() => setIsFocused(true)}
                 onBlur={() => setIsFocused(false)}
               />
               <motion.div 
                 initial={false}
                 animate={{ opacity: isFocused ? 0.5 : 0, scale: isFocused ? 1 : 0.8 }}
                 className="absolute inset-0 -z-10 bg-turmeric-gold/20 blur-2xl rounded-full"
               />
            </div>
            <Button type="submit" className="w-full sm:w-auto h-12 lg:h-14 px-8 lg:px-10 shrink-0 relative overflow-hidden font-title tracking-[0.1em] text-xs lg:text-sm uppercase shadow-earth-sm hover:shadow-earth transition-all duration-300">
              <span className="relative z-10">{isSubmitted ? 'Subscribed!' : 'Subscribe'}</span>
            </Button>
          </motion.form>

          {/* Petal Burst Effect */}
          <AnimatePresence>
            {isSubmitted && petals.map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0, x: "50%", y: "50%" }}
                animate={{ 
                  opacity: 0, 
                  scale: Math.random() * 1 + 0.5,
                  x: `calc(50% + ${(Math.random() - 0.5) * 300}px)`,
                  y: `calc(50% + ${(Math.random() - 0.5) * 300}px)`,
                  rotate: Math.random() * 360
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 w-4 h-4 bg-saffron/80 rounded-tl-full rounded-br-full pointer-events-none z-20"
                style={{ originX: 0.5, originY: 0.5 }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
