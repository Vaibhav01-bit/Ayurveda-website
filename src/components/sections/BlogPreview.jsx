import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Leaf, BookOpen, Flame, Wind, Droplets, Sparkles, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Articles Data ─────────────────────────────────────────────────────────────
const ARTICLES = [
  {
    id: 'understanding-doshas',
    title: 'Understanding the 3 Doshas: Vata, Pitta & Kapha',
    excerpt: 'Discover your unique mind-body constitution. Ayurveda teaches that every person is a blend of three fundamental energies — and health is achieved by keeping them in perfect balance.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=900&auto=format&fit=crop',
    category: 'Ayurveda 101',
    categoryColor: 'bg-sky-50 text-sky-700 border-sky-200',
    categoryIcon: Wind,
    readTime: '5 min read',
    date: 'Oct 12, 2023',
    author: 'Dr. Meera Patel',
    authorImg: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=100&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'ayurvedic-morning-routine',
    title: 'The Ancient Morning Ritual That Changes Everything',
    excerpt: 'Dinacharya — the Ayurvedic daily routine — starts before sunrise. Oil pulling, tongue scraping, and self-massage: why these 5 practices rewire your entire nervous system.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=700&auto=format&fit=crop',
    category: 'Lifestyle',
    categoryColor: 'bg-amber-50 text-amber-700 border-amber-200',
    categoryIcon: Sparkles,
    readTime: '7 min read',
    date: 'Nov 03, 2023',
    author: 'Dr. Ananya Sharma',
    authorImg: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=100&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'gut-health-agni',
    title: 'Heal Your Gut (Agni) with Kitchen Spices',
    excerpt: 'Digestion is the root of all health in Ayurveda. Learn how cumin, coriander, and fennel — the CCF trinity — can transform your gut microbiome without a single supplement.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=700&auto=format&fit=crop',
    category: 'Diet & Nutrition',
    categoryColor: 'bg-green-50 text-green-700 border-green-200',
    categoryIcon: Leaf,
    readTime: '6 min read',
    date: 'Sep 28, 2023',
    author: 'Dr. Rajiv Menon',
    authorImg: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=100&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'pitta-cooling',
    title: 'How to Cool a Pitta Fire Before It Burns You Out',
    excerpt: 'Skin rashes, anger, acid reflux, and perfectionism — all signs of excess Pitta. These 8 Ayurvedic practices will bring your inner fire back to a steady, productive flame.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=700&auto=format&fit=crop',
    category: 'Dosha Balance',
    categoryColor: 'bg-rose-50 text-rose-700 border-rose-200',
    categoryIcon: Flame,
    readTime: '8 min read',
    date: 'Dec 01, 2023',
    author: 'Dr. Meera Patel',
    authorImg: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=100&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'ashwagandha-guide',
    title: 'Ashwagandha: The Complete Vaidya\'s Guide',
    excerpt: 'Not all Ashwagandha is created equal. Learn why KSM-66 vs Sensoril matters, the correct dose for your Dosha, and the one time of day you should never take it.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=700&auto=format&fit=crop',
    category: 'Herbs & Remedies',
    categoryColor: 'bg-orange-50 text-orange-700 border-orange-200',
    categoryIcon: Droplets,
    readTime: '10 min read',
    date: 'Jan 15, 2024',
    author: 'Dr. Karthik Iyer',
    authorImg: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=100&auto=format&fit=crop',
    featured: false,
  },
];

const FILTER_TAGS = ['All', 'Ayurveda 101', 'Lifestyle', 'Diet & Nutrition', 'Dosha Balance', 'Herbs & Remedies'];

// ─── Featured Card ─────────────────────────────────────────────────────────────
function FeaturedCard({ article }) {
  const IconComp = article.categoryIcon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65 }}
      className="lg:col-span-7 group"
    >
      <Link to={`/blog/${article.id}`} className="block relative rounded-3xl overflow-hidden shadow-earth mb-6 h-[360px] lg:h-[440px]">
        {/* Image */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />

        {/* Category */}
        <div className="absolute top-5 left-5">
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${article.categoryColor} backdrop-blur-sm`}>
            <IconComp size={10} /> {article.category}
          </span>
        </div>

        {/* Featured badge */}
        <div className="absolute top-5 right-5">
          <span className="text-[9px] font-bold uppercase tracking-widest bg-saffron text-white px-3 py-1.5 rounded-full">
            Featured
          </span>
        </div>

        {/* Bottom overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-3 mb-3">
            <img src={article.authorImg} alt={article.author} className="w-8 h-8 rounded-full object-cover border-2 border-white/40" />
            <span className="text-white/70 text-xs">{article.author}</span>
            <span className="text-white/30">·</span>
            <span className="text-white/50 text-xs flex items-center gap-1"><Clock size={10} /> {article.readTime}</span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-white leading-snug group-hover:text-parchment transition-colors">
            {article.title}
          </h3>
        </div>
      </Link>

      {/* Excerpt below image */}
      <p className="text-charcoal/65 text-base leading-relaxed mb-5 pr-4">{article.excerpt}</p>
      <Link
        to={`/blog/${article.id}`}
        className="inline-flex items-center gap-2 text-saffron font-title text-xs tracking-widest uppercase hover:gap-4 transition-all duration-300"
      >
        Read Article <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}

// ─── Small Article Card ────────────────────────────────────────────────────────
function ArticleCard({ article, index }) {
  const IconComp = article.categoryIcon;
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 + index * 0.12, duration: 0.5 }}
      className="group flex gap-4 items-start"
    >
      {/* Thumbnail */}
      <Link
        to={`/blog/${article.id}`}
        className="relative shrink-0 w-28 h-24 rounded-2xl overflow-hidden shadow-sm border border-parchment/50"
      >
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-300" />
      </Link>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-2 ${article.categoryColor}`}>
          <IconComp size={8} /> {article.category}
        </span>
        <Link to={`/blog/${article.id}`}>
          <h3 className="font-title text-sm font-bold text-forest-deep leading-snug group-hover:text-saffron transition-colors duration-300 line-clamp-2 mb-1.5">
            {article.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 text-[10px] text-charcoal/40">
          <Clock size={10} />{article.readTime}
          <span>·</span>
          <span>{article.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────
export default function BlogPreview() {
  const [activeTag, setActiveTag] = useState('All');

  const featured = ARTICLES[0];
  const secondary = activeTag === 'All'
    ? ARTICLES.slice(1)
    : ARTICLES.slice(1).filter(a => a.category === activeTag);

  return (
    <section className="py-24 bg-white relative overflow-hidden">

      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-turmeric/4 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-forest/4 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 pb-8 border-b border-parchment/60">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-accent text-saffron tracking-[0.3em] text-xs uppercase mb-3 flex items-center gap-2"
            >
              <BookOpen size={12} /> Journal
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-6xl text-forest-deep mb-3"
            >
              Ayurvedic Wisdom
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-charcoal/60 text-lg leading-relaxed"
            >
              Expert-curated articles from our Vaidyas — deepen your understanding of ancient science.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <Link
              to="/blog"
              className="hidden md:inline-flex items-center gap-2 text-xs font-title tracking-widest uppercase text-forest/70 hover:text-forest hover:gap-4 transition-all duration-300 mt-4 md:mt-0"
            >
              Explore All Articles <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Filter Tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTER_TAGS.map(tag => (
            <motion.button
              key={tag}
              onClick={() => setActiveTag(tag)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold font-caption tracking-wide uppercase transition-all duration-300 border
                ${activeTag === tag
                  ? 'bg-forest text-parchment border-forest shadow-leaf'
                  : 'bg-white border-parchment text-charcoal/60 hover:border-forest/30 hover:text-forest'
                }`}
            >
              {tag !== 'All' && <Tag size={9} />} {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

          {/* Featured — left 7 cols */}
          <FeaturedCard article={featured} />

          {/* Side articles — right 5 cols */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTag}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                {secondary.length > 0 ? secondary.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} />
                )) : (
                  <p className="text-charcoal/40 text-sm italic pt-4">No articles in this category yet.</p>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Newsletter mini CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 bg-parchment/50 border border-parchment rounded-2xl p-6"
            >
              <p className="font-display text-lg text-forest-deep mb-1">Weekly Wisdom</p>
              <p className="text-xs text-charcoal/55 mb-4 leading-relaxed">
                One Ayurvedic insight every Sunday morning. No spam — ever.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 text-sm px-4 py-2.5 rounded-full border border-parchment focus:outline-none focus:border-forest/40 bg-white placeholder-charcoal/30"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-forest text-parchment px-5 py-2.5 rounded-full text-xs font-title tracking-wider whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Topics strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 pt-8 border-t border-parchment/60 flex flex-wrap items-center gap-3"
        >
          <span className="text-xs text-charcoal/40 font-caption uppercase tracking-wider">Popular topics:</span>
          {['Vata Imbalance', 'Sleep & Stress', 'Gut Health', 'Skin Glow', 'Immunity Boost', 'Women\'s Health', 'Detox'].map(topic => (
            <Link
              key={topic}
              to="/blog"
              className="text-xs text-charcoal/55 border border-parchment rounded-full px-3 py-1 hover:border-forest/40 hover:text-forest transition-colors"
            >
              {topic}
            </Link>
          ))}
        </motion.div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center md:hidden">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-forest text-parchment px-8 py-3 rounded-full font-title text-xs tracking-widest uppercase shadow-leaf"
          >
            All Articles <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
