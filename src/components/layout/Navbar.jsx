import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Treatments', path: '/treatments' },
  { name: 'Shop', path: '/products' },
  { name: 'Quiz', path: '/dosha-quiz' },
  { name: 'Blog', path: '/blog' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed w-full top-0 z-[60] transition-all duration-500 ${scrolled
          ? 'bg-parchment/90 backdrop-blur-md py-3 shadow-ancient border-b border-sand-brown/10'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="group flex items-center space-x-2">
              <span className={`font-title text-2xl md:text-3xl font-bold tracking-[0.2em] relative transition-colors duration-500 ${scrolled || !isHomePage ? 'text-forest-deep' : 'text-parchment'
                }`}>
                VAIDYA
                <span className={`absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full ${scrolled || !isHomePage ? 'bg-saffron-fire' : 'bg-turmeric-gold'
                  }`} />
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`relative font-caption text-sm uppercase tracking-widest transition-colors duration-300 ${scrolled || !isHomePage
                      ? (location.pathname === link.path ? 'text-saffron-fire' : 'text-forest-deep/80 hover:text-saffron-fire')
                      : (location.pathname === link.path ? 'text-turmeric-gold' : 'text-parchment/80 hover:text-turmeric-gold')
                    }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.span
                      layoutId="navUnderline"
                      className={`absolute -bottom-1 left-0 w-full h-[1px] ${scrolled || !isHomePage ? 'bg-saffron-fire' : 'bg-turmeric-gold'
                        }`}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/consultation"
                className={`px-6 py-2.5 font-caption text-xs uppercase tracking-[0.15em] transition-all duration-500 shadow-ancient rounded-sm ${scrolled || !isHomePage
                    ? 'bg-forest-deep text-parchment hover:bg-saffron-fire hover:shadow-glow'
                    : 'bg-turmeric-gold text-forest-deep hover:bg-parchment hover:shadow-glow'
                  }`}
              >
                Consult Now
              </Link>
            </motion.div>

            <div className={`flex items-center space-x-4 transition-colors duration-500 ${scrolled || !isHomePage ? 'text-forest-deep/70' : 'text-parchment/80'
              }`}>
              <Link to="/products" className="hover:text-saffron-fire transition-colors duration-300">
                <ShoppingBag className="w-5 h-5" />
              </Link>
              <Link to={user ? "/profile" : "/login"} className="hover:text-saffron-fire transition-colors duration-300">
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 focus:outline-none transition-colors duration-500 ${scrolled || !isHomePage ? 'text-forest-deep' : 'text-parchment'
                }`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>



      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-charcoal/60 backdrop-blur-md z-[70] md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-cream-white z-[80] shadow-2xl md:hidden p-8 flex flex-col"
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-forest-deep"
                  aria-label="Close Menu"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="flex flex-col space-y-8 overflow-y-auto no-scrollbar">
                <div className="flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="font-title text-3xl text-forest-deep hover:text-saffron-fire transition-colors border-b border-sand-brown/10 pb-4"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-4 pt-4">
                  <Link to="/login" className="font-caption text-base uppercase tracking-widest text-forest-deep/70">Login</Link>
                  <Link to="/register" className="font-caption text-base uppercase tracking-widest text-forest-deep/70">Create Account</Link>
                </div>
              </div>

              <div className="mt-auto pt-10">
                <Link to="/consultation" className="block w-full py-5 bg-forest-deep text-parchment text-center font-caption text-sm uppercase tracking-[0.2em] hover:bg-saffron-fire transition-all rounded-sm shadow-ancient">
                  Book Consultation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
