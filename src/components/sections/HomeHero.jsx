import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const SLIDES = [
  {
    id: 'doctor',
    tag: 'स्वस्थस्य स्वास्थ्य रक्षणं',
    title: 'Consult Expert Ayurvedic Doctors',
    description: 'Get personalized treatment based on your unique body type (Prakriti) and root cause analysis.',
    primaryCta: 'Book Free Consultation',
    primaryLink: '/consultation',
    secondaryCta: 'Start Assessment',
    secondaryLink: '/quiz',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1200&auto=format&fit=crop', // Ayurvedic doctor/clinic placeholder
    badges: ['10+ years experience', 'Trusted by 1L+ patients'],
    visualType: 'doctor'
  },
  {
    id: 'product',
    tag: 'Doctor Recommended',
    title: 'Relief from Joint Pain & Stiffness',
    description: '100% Ayurvedic formula for long-term healing, crafted from pure Himalayan herbs.',
    primaryCta: 'Shop Now',
    primaryLink: '/products',
    secondaryCta: 'Learn More',
    secondaryLink: '/products',
    image: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?q=70&w=1000&auto=format&fit=crop', // Essential oil/bottle placeholder
    badges: ['100% Natural Solutions', 'GMP Certified'],
    visualType: 'product'
  },
  {
    id: 'condition',
    tag: 'Root Cause Healing',
    title: 'Heal Your Heart Naturally',
    description: 'Support cardiovascular health with authentic Ayurveda. Balance your doshas for a stronger heart.',
    primaryCta: 'Explore Remedies',
    primaryLink: '/products',
    secondaryCta: 'Book Consultation',
    secondaryLink: '/consultation',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=70&w=1000&auto=format&fit=crop', // Human/Heart holistic placeholder
    badges: ['Certified Ayurvedic Doctors'],
    visualType: 'condition'
  },
  {
    id: 'lifestyle',
    tag: 'Holistic Wellness',
    title: 'Balance Your Mind & Body',
    description: 'Integrate Ayurveda, lifestyle changes, and proper diet guidance into your daily routine.',
    primaryCta: 'Take Dosha Quiz',
    primaryLink: '/quiz',
    secondaryCta: 'Read Our Blog',
    secondaryLink: '/blog',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=70&w=1000&auto=format&fit=crop', // Yoga/Nature placeholder
    badges: ['Mind-Body Harmony'],
    visualType: 'lifestyle'
  }
];

export default function HomeHero() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 400 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const leafTopLeftX = useTransform(smoothX, [0, 1], [0, -30]);
  const leafTopLeftY = useTransform(smoothY, [0, 1], [0, -30]);
  const leafBottomRightX = useTransform(smoothX, [0, 1], [0, 20]);
  const leafBottomRightY = useTransform(smoothY, [0, 1], [0, 20]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle Mouse Move for Parallax
  const handleMouseMove = (e) => {
    if (isMobile || !containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  // Auto-play Slider
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  const slide = SLIDES[currentSlide];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10 bg-midnight-herb"
    >
      {/* 1. Base Photographic Layer (Dark Forest/Nature) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=60&w=1600&auto=format&fit=crop')` }}
      ></div>

      {/* 2. Deep Herbal Green Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1E3A1E]/80 via-[#0D1F0D]/95 to-[#0D1F0D]"></div>

      {/* 3. Soft Central Golden Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-turmeric-gold/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Floating Dust Particles - Reduced for performance */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-1 h-1 bg-turmeric-gold rounded-full blur-[1px] opacity-20 pointer-events-none"
          initial={{
            x: Math.random() * 1000,
            y: Math.random() * 800,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: [null, -150],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Herbal Silhouettes */}
      <motion.div
        style={!isMobile ? { x: leafTopLeftX, y: leafTopLeftY } : {}}
        className="absolute -top-10 -left-20 md:-top-20 md:-left-10 z-0 opacity-[0.06] text-[#051105] pointer-events-none"
      >
        <svg width="400" height="500" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="transform rotate-12">
          <path d="M10,90 Q30,50 90,10 Q80,20 85,30 Q60,35 70,50 Q45,55 50,70 Q30,70 10,90 Z" />
          <path d="M40,70 Q60,40 95,20 Q80,30 80,40 Q50,45 60,60" />
          <path d="M20,80 Q40,60 70,30 Q60,40 60,50" />
        </svg>
      </motion.div>

      <motion.div
        style={!isMobile ? { x: leafBottomRightX, y: leafBottomRightY } : {}}
        className="absolute -bottom-20 -right-20 md:-bottom-10 md:-right-10 z-0 opacity-[0.06] text-[#051105] pointer-events-none"
      >
        <svg width="450" height="400" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-12">
          <path d="M90,90 Q50,70 10,20 Q30,10 40,30 Q60,30 70,50 Q90,60 90,90 Z" />
          <path d="M70,80 Q40,50 20,20 Q30,20 40,40" />
        </svg>
      </motion.div>

      {/* Carousel Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-center gap-12 lg:gap-24"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x;
              if (swipe < -50) nextSlide();
              else if (swipe > 50) prevSlide();
            }}
          >

            {/* Left Content */}
            <div className="w-full md:w-1/2 flex flex-col text-center md:text-left mt-4 sm:mt-8 md:mt-0 order-2 md:order-1 px-2 sm:px-0">
              <span className="font-sanskrit text-turmeric-gold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 tracking-[0.2em] opacity-90 drop-shadow-sm">
                {slide.tag}
              </span>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl text-cream-white mb-4 sm:mb-6 tracking-tight leading-[1.2] sm:leading-[1.1] [text-shadow:0_0_30px_rgba(245,236,215,0.1)]">
                {slide.title}
              </h1>

              <p className="font-body text-sm sm:text-lg md:text-xl text-parchment/80 mb-8 sm:mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
                {slide.description}
              </p>

              {/* Trust Badges */}
              {slide.badges && (
                <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10">
                  {slide.badges.map((badge, idx) => (
                    <span key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-parchment/70 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-turmeric-gold" />
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                <button
                  onClick={() => navigate(slide.primaryLink)}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-accent tracking-widest text-[10px] sm:text-sm uppercase bg-gradient-to-r from-saffron-fire to-turmeric-gold text-white hover:shadow-glow transition-all duration-500 hover:scale-105"
                >
                  {slide.primaryCta}
                </button>
                <button
                  onClick={() => navigate(slide.secondaryLink)}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-accent tracking-widest text-[10px] sm:text-sm uppercase border border-turmeric-gold/50 text-turmeric-gold bg-transparent hover:bg-turmeric-gold/10 transition-all duration-500 hover:scale-105"
                >
                  {slide.secondaryCta}
                </button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-2 perspective-1000 mt-10 md:mt-0">
              <motion.div
                initial={{ scale: 0.9, rotateY: 5 }}
                animate={{
                  scale: 1,
                  rotateY: [-2, 2, -2],
                  y: [0, -10, 0]
                }}
                transition={{
                  scale: { duration: 0.8 },
                  rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="relative w-full max-w-[320px] sm:max-w-[500px] aspect-square rounded-[30px] sm:rounded-[40px] overflow-hidden shadow-ancient-dark"
              >
                {/* Image Overlay/Glow based on type */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0D1F0D] via-transparent to-transparent opacity-80"></div>
                {slide.visualType === 'condition' && (
                  <motion.div
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 z-20 opacity-30 bg-[linear-gradient(45deg,transparent_45%,#E9A84C_50%,transparent_55%)] bg-[length:200%_200%]"
                  ></motion.div>
                )}

                <img
                  src={slide.image}
                  alt={slide.title}
                  loading={currentSlide === 0 ? "eager" : "lazy"}
                  fetchpriority={currentSlide === 0 ? "high" : "low"}
                  className="w-full h-full object-cover object-center transform scale-110"
                />

                {/* Decorative border */}
                <div className="absolute inset-4 z-30 border border-turmeric-gold/20 rounded-[32px] pointer-events-none"></div>
              </motion.div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 flex flex-col sm:flex-row justify-between items-center px-6 md:px-12 max-w-7xl mx-auto pointer-events-none gap-6 sm:gap-0">

        <div className="flex gap-4 pointer-events-auto order-2 sm:order-1">
          <button
            onClick={prevSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-sand-brown/30 flex items-center justify-center text-parchment hover:bg-turmeric-gold hover:text-midnight-herb transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-sand-brown/30 flex items-center justify-center text-parchment hover:bg-turmeric-gold hover:text-midnight-herb transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="flex gap-2 sm:gap-3 pointer-events-auto order-1 sm:order-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="relative w-12 sm:w-16 h-1 rounded-full overflow-hidden bg-sand-brown/10 sm:bg-sand-brown/20"
              aria-label={`Go to slide ${idx + 1}`}
            >
              {currentSlide === idx && (
                <motion.div
                  layoutId="activeSlideIndicator"
                  className="absolute inset-0 bg-turmeric-gold"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
