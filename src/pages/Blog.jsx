import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, BookOpen, Calendar } from 'lucide-react';

const allPosts = [
  { 
    slug: 'understanding-doshas', 
    title: 'Understanding the 3 Doshas: Vata, Pitta, Kapha', 
    excerpt: 'Discover your unique mind-body type. Ayurveda teaches that health is achieved by balancing these three fundamental energies based on your constitution.',
    category: 'Ayurveda 101', 
    readTime: '5 min read', 
    date: 'Oct 12, 2023',
    image: 'https://images.unsplash.com/photo-1515377659622-4cc715690b9b?w=1200&auto=format&fit=crop',
    featured: true
  },
  { 
    slug: 'ayurvedic-skincare', 
    title: 'The Ultimate Ayurvedic Skincare Routine', 
    excerpt: 'Natural remedies for glowing skin without harsh chemicals. Learn about Ubtan and Kumkumadi.',
    category: 'Beauty', 
    readTime: '4 min read', 
    date: 'Oct 05, 2023',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop',
    featured: false
  },
  { 
    slug: 'gut-health', 
    title: 'Heal Your Gut (Agni) with Kitchen Spices', 
    excerpt: 'Why digestion is the root of all health in Ayurveda, and how to fix it using cumin, coriander, and fennel.',
    category: 'Diet', 
    readTime: '6 min read', 
    date: 'Sep 28, 2023',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop',
    featured: false
  },
  { 
    slug: 'benefits-of-ashwagandha', 
    title: 'The Science and Magic of Ashwagandha', 
    excerpt: 'How this ancient adaptogen helps your body manage stress, boost brain function, and lower blood sugar.',
    category: 'Herbs', 
    readTime: '8 min read', 
    date: 'Sep 15, 2023',
    image: 'https://images.unsplash.com/photo-1611078449942-8b4ef2132712?w=800&auto=format&fit=crop',
    featured: false
  },
  { 
    slug: 'morning-routine', 
    title: 'Dinacharya: An Ayurvedic Morning Routine for Balance', 
    excerpt: 'Start your day in alignment with nature\'s rhythms. Tongue scraping, oil pulling, and warm water practices.',
    category: 'Lifestyle', 
    readTime: '7 min read', 
    date: 'Sep 02, 2023',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop',
    featured: false
  },
  { 
    slug: 'abhyanga-massage', 
    title: 'Abhyanga: The Art of Ayurvedic Self-Massage', 
    excerpt: 'Nourish your tissues and calm your nervous system with this daily warm oil massage practice.',
    category: 'Lifestyle', 
    readTime: '5 min read', 
    date: 'Aug 20, 2023',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop',
    featured: false
  }
];

const categories = ['All', 'Ayurveda 101', 'Lifestyle', 'Diet', 'Herbs', 'Beauty'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = allPosts.filter(post => 
    activeCategory === 'All' || post.category === activeCategory
  );

  const featuredPost = activeCategory === 'All' ? filteredPosts.find(p => p.featured) : filteredPosts[0];
  const remainingPosts = featuredPost ? filteredPosts.filter(p => p.slug !== featuredPost.slug) : filteredPosts;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="pt-32 pb-24 bg-cream-white min-h-screen relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-turmeric-gold/5 rounded-bl-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-96 bg-primary-green/5 rounded-tr-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center text-primary-green font-caption font-bold tracking-widest uppercase text-xs mb-4"
          >
            <BookOpen size={16} className="mr-2" /> Vaidya Publications
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl text-forest-deep mb-6"
          >
            The Journal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-forest/70 max-w-2xl mx-auto font-body"
          >
            Insights, wisdom, and practices for a balanced life, rooted in 5,000 years of Ayurvedic science.
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 md:gap-4 justify-center mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full border-2 transition-all duration-300 font-medium text-sm ${
                activeCategory === category
                  ? 'bg-forest-deep text-cream-white border-forest-deep shadow-md'
                  : 'bg-white/60 backdrop-blur-sm text-forest/70 border-parchment hover:border-primary-green hover:text-primary-green'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="space-y-16"
          >
            
            {/* Featured Post */}
            {featuredPost && (
              <motion.div variants={itemVariants} className="group cursor-pointer">
                <Link to={`/blog/${featuredPost.slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white rounded-[2rem] p-4 lg:p-6 shadow-earth border border-parchment/50 hover:shadow-glow transition-all duration-500">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[4/3]">
                    <div className="absolute inset-0 bg-forest-deep/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
                    />
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary-green uppercase tracking-wider shadow-sm">
                      {featuredPost.category}
                    </div>
                  </div>
                  <div className="p-4 lg:pr-8">
                    <div className="flex items-center text-sm text-forest/50 mb-4 space-x-4 font-medium">
                      <span className="flex items-center"><Calendar size={14} className="mr-1.5" /> {featuredPost.date}</span>
                      <span className="flex items-center"><Clock size={14} className="mr-1.5" /> {featuredPost.readTime}</span>
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-display text-forest-deep mb-4 leading-tight group-hover:text-primary-green transition-colors duration-300">
                      {featuredPost.title}
                    </h2>
                    <p className="text-forest/80 mb-8 text-lg font-body leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <span className="inline-flex items-center text-turmeric-gold font-bold tracking-wide uppercase text-sm group-hover:translate-x-2 transition-transform duration-300">
                      Read Full Article <ArrowRight className="ml-2" size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Grid Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingPosts.map((post) => (
                <motion.div variants={itemVariants} key={post.slug} className="group cursor-pointer">
                  <Link to={`/blog/${post.slug}`} className="block bg-white rounded-3xl h-full shadow-sm hover:shadow-earth border border-parchment/30 overflow-hidden transition-all duration-500 hover:-translate-y-1">
                    <div className="h-56 overflow-hidden relative border-b border-parchment/30">
                      <div className="absolute inset-0 bg-forest-deep/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ease-out" 
                      />
                      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary-green uppercase tracking-wider">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center text-xs text-forest/50 mb-3 space-x-3 font-medium">
                        <span>{post.date}</span>
                        <span className="flex items-center"><Clock size={12} className="mr-1" /> {post.readTime}</span>
                      </div>
                      <h3 className="font-display text-2xl text-forest-deep mb-3 leading-snug group-hover:text-primary-green transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-forest/70 text-sm font-body line-clamp-3 mb-6">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center text-forest-deep font-medium text-sm group-hover:text-turmeric-gold transition-colors duration-300">
                        Read More <ArrowRight className="ml-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={16} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <motion.div variants={itemVariants} className="text-center py-20">
                <BookOpen className="w-16 h-16 mx-auto text-parchment mb-4" />
                <h3 className="text-2xl font-display text-forest-deep mb-2">No articles found</h3>
                <p className="text-forest/60">We couldn't find any articles in this category.</p>
              </motion.div>
            )}
            
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
