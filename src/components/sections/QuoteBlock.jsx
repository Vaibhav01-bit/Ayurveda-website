import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function QuoteBlock() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="py-24 lg:py-40 px-6 sm:px-8 lg:px-12 relative bg-midnight-herb text-parchment text-center overflow-hidden">
      {/* Background with Parallax and Ken Burns effect */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"
      />
      
      {/* Large subtle quote mark in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none z-0">
        <span className="font-title text-[200px] sm:text-[300px] lg:text-[400px] leading-none text-cream-white select-none">"</span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="font-subheading text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-relaxed mb-8 px-4"
        >
          "Ayurveda is not just a system of medicine, it is a way of life — a journey back to your own nature."
        </motion.h2>
        
        {/* Animated Underline */}
        <div className="flex justify-center">
          <svg width="120" height="10" viewBox="0 0 200 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-[200px]">
            <motion.path 
              d="M5 5Q50 10 100 5T195 5" 
              stroke="#D4AF37" 
              strokeWidth="2" 
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              viewport={{ once: true }}
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
