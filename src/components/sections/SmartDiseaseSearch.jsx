import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Activity, Moon, Sun, Wind, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'All', icon: Sparkles },
  { name: 'Skin', icon: Sun },
  { name: 'Hair', icon: Wind },
  { name: 'Digestion', icon: Activity },
  { name: 'Sleep', icon: Moon },
  { name: 'Stress', icon: Heart }
];

const suggestions = [
  { title: 'Diabetes Management', desc: 'Ayurvedic approach to blood sugar' },
  { title: 'Hair Fall Treatment', desc: 'Root cause analysis & oil therapy' },
  { title: 'Stress Relief', desc: 'Ashwagandha & meditation routines' },
  { title: 'Acne & Pigmentation', desc: 'Blood purification herbs' },
  { title: 'Gut Health', desc: 'Triphala & Agni balancing' },
  { title: 'Sleep Apnea', desc: 'Vata pacifying treatments' }
];

export default function SmartDiseaseSearch() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/consultation?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const filteredSuggestions = suggestions.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream-white via-parchment to-white py-20 md:py-24">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-turmeric-gold/5 rounded-l-full filter blur-3xl pointer-events-none transform translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-primary-green/5 rounded-r-full filter blur-3xl pointer-events-none transform -translate-x-1/4"></div>

      {/* Floating Elements for Premium Feel */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] opacity-20 hidden md:block"
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#2C5234" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <span className="inline-block py-2 px-4 rounded-full bg-primary-green/10 text-primary-green font-caption font-bold tracking-[0.2em] uppercase text-[10px] mb-8 sm:mb-10">
            Intelligent Diagnosis
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-forest-deep mb-8 leading-[1.2] sm:leading-tight">
            What are you looking to <span className="text-primary-green relative whitespace-nowrap">
              heal?
              <svg className="absolute w-full h-3 -bottom-3 left-0 text-turmeric-gold/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mb-12 max-w-2xl font-body text-sm sm:text-base md:text-xl text-forest/70 leading-relaxed">
            Search our ancient knowledge base for treatments tailored specifically to your unique Ayurvedic constitution.
          </p>

          {/* Search Bar Container */}
          <form onSubmit={handleSearch} className="relative w-full max-w-3xl mx-auto mb-12 lg:mb-16 z-40">
            <motion.div
              animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative flex items-center bg-white shadow-earth-sm rounded-2xl sm:rounded-[2rem] transition-all duration-300 ${isFocused ? 'ring-2 ring-primary-green/20 border-primary-green/40' : 'border-parchment/50'
                } border-2 overflow-hidden`}
            >
              <div className="pl-4 sm:pl-6 text-primary-green shrink-0">
                <Search size={20} className="sm:w-6 sm:h-6" />
              </div>
              <input
                type="text"
                placeholder="Search diseases, symptoms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                className="w-full py-4 sm:py-5 lg:py-6 pl-3 sm:pl-4 pr-24 sm:pr-36 bg-transparent text-forest-deep outline-none font-body text-sm sm:text-lg lg:text-xl placeholder:text-forest/40"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-forest-deep text-cream-white px-4 sm:px-8 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl font-title text-[9px] sm:text-xs tracking-widest uppercase hover:bg-primary-green hover:shadow-lg transition-all duration-300"
              >
                Discover
              </button>
            </motion.div>

            {/* Dropdown Suggestions */}
            <AnimatePresence>
              {isFocused && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-[110%] left-0 w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-parchment/50 overflow-hidden z-50 text-left"
                >
                  {filteredSuggestions.length > 0 ? (
                    <ul className="divide-y divide-parchment/30">
                      {filteredSuggestions.map((suggestion, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery(suggestion.title);
                              navigate(`/consultation?q=${encodeURIComponent(suggestion.title)}`);
                            }}
                            className="w-full text-left px-6 py-4 hover:bg-turmeric-gold/5 flex items-center justify-between group transition-colors"
                          >
                            <div>
                              <span className="block font-medium text-forest-deep text-lg">{suggestion.title}</span>
                              <span className="block text-sm text-forest/60 mt-1">{suggestion.desc}</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-parchment flex items-center justify-center group-hover:bg-primary-green group-hover:text-white transition-colors">
                              <ChevronRight size={18} />
                            </div>
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-6 py-8 text-center text-forest/60">
                      <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p>No exact matches found. Try exploring our categories below.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Categories with horizontal scroll and fade effect */}
          <div className="relative z-30 -mx-4 sm:mx-0 group">
            {/* Left fade indicator for mobile scroll */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-cream-white to-transparent z-40 pointer-events-none md:hidden" />
            
            <div className="no-scrollbar flex gap-2.5 overflow-x-auto px-6 pb-6 sm:px-0 sm:flex-wrap sm:justify-center sm:gap-4 sm:overflow-visible">
              {categories.map(({ name, icon: Icon }) => (
                <motion.button
                  key={name}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(name)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 sm:px-6 py-2.5 sm:py-3.5 transition-all duration-300 ${
                    activeCategory === name
                      ? 'bg-forest-deep text-cream-white border-forest-deep shadow-lg shadow-forest-deep/20'
                      : 'bg-white/60 backdrop-blur-sm text-forest border-2 border-parchment/50 hover:border-primary-green hover:bg-white'
                  } border-2`}
                >
                  <Icon 
                    size={activeCategory === name ? 16 : 18} 
                    className={`${activeCategory === name ? 'text-turmeric-gold' : 'text-primary-green'} transition-colors duration-300`} 
                  />
                  <span className={`font-title text-[10px] sm:text-xs tracking-widest uppercase ${activeCategory === name ? 'font-bold' : 'font-medium'}`}>
                    {name}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Right fade indicator for mobile scroll */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-cream-white to-transparent z-40 pointer-events-none md:hidden" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
