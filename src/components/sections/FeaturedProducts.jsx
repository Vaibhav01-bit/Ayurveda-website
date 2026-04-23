import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Star, Leaf, ArrowRight, Check, Sparkles } from 'lucide-react';

// ─── Rich Mock Products ────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    _id: 'p1',
    name: 'Ashwagandha KSM-66',
    subtitle: 'Adaptogen Extract · 60 Capsules',
    category: 'Adaptogen',
    categoryColor: 'bg-amber-50 text-amber-700 border-amber-200',
    price: 34,
    originalPrice: 42,
    rating: 4.9,
    reviews: 1284,
    dosha: 'Vata · Kapha',
    badge: 'Bestseller',
    badgeColor: 'bg-saffron text-white',
    description: 'Full-spectrum root extract with 5% withanolides. Clinically shown to reduce cortisol and rebuild resilience against chronic stress.',
    benefits: ['Reduces cortisol', 'Builds stamina', 'Deep sleep support'],
    image: 'https://images.unsplash.com/photo-1611073615830-9b44b0b0b0b0?q=80&w=600&auto=format&fit=crop',
    altImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=600&auto=format&fit=crop',
    colour: 'from-amber-800/80 to-amber-600/40',
    accent: '#E9A84C',
  },
  {
    _id: 'p2',
    name: 'Brahmi Mind Oil',
    subtitle: 'Scalp & Cognition · 100ml',
    category: 'Nootropic',
    categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    price: 28,
    originalPrice: null,
    rating: 4.8,
    reviews: 876,
    dosha: 'Vata · Pitta',
    badge: "Editor's Pick",
    badgeColor: 'bg-forest text-parchment',
    description: 'Cold-pressed sesame oil infused with Brahmi, Bhringraj, and Amla. Calms the nervous system, promotes focus, and reduces hair fall.',
    benefits: ['Sharpens memory', 'Reduces hair fall', 'Calms anxiety'],
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop',
    altImage: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&auto=format&fit=crop',
    colour: 'from-emerald-800/80 to-emerald-600/40',
    accent: '#3B5E3A',
  },
  {
    _id: 'p3',
    name: 'Triphala Gut Reset',
    subtitle: 'Digestive Tonic · 90 Tablets',
    category: 'Digestive',
    categoryColor: 'bg-green-50 text-green-700 border-green-200',
    price: 22,
    originalPrice: 28,
    rating: 4.9,
    reviews: 2140,
    dosha: 'Vata · Pitta · Kapha',
    badge: 'All Doshas',
    badgeColor: 'bg-turmeric text-white',
    description: 'A trinity of Amalaki, Bibhitaki & Haritaki. Gently cleanses the colon, supports digestion, and rejuvenates every organ system.',
    benefits: ['Gut microbiome balance', 'Gentle detox', 'All-dosha formula'],
    image: 'https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=600&auto=format&fit=crop',
    altImage: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?q=80&w=600&auto=format&fit=crop',
    colour: 'from-green-900/80 to-green-700/40',
    accent: '#22c55e',
  },
  {
    _id: 'p4',
    name: 'Shatavari Vitality',
    subtitle: "Women's Tonic · 60 Capsules",
    category: "Women's Health",
    categoryColor: 'bg-rose-50 text-rose-700 border-rose-200',
    price: 32,
    originalPrice: null,
    rating: 4.9,
    reviews: 943,
    dosha: 'Vata · Pitta',
    badge: 'New Formula',
    badgeColor: 'bg-rose-500 text-white',
    description: 'The premier Rasayana for feminine vitality. Balances hormones, eases PMS, supports fertility, and nourishes reproductive tissues.',
    benefits: ['Hormonal balance', 'Fertility support', 'Reduces PMS'],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop',
    altImage: 'https://images.unsplash.com/photo-1598449426314-8b02525e8733?q=80&w=600&auto=format&fit=crop',
    colour: 'from-rose-900/80 to-rose-700/40',
    accent: '#f43f5e',
  },
  {
    _id: 'p5',
    name: 'Neem Skin Purifier',
    subtitle: 'Blood & Skin · 60 Capsules',
    category: 'Purifier',
    categoryColor: 'bg-lime-50 text-lime-700 border-lime-200',
    price: 19,
    originalPrice: 24,
    rating: 4.7,
    reviews: 731,
    dosha: 'Pitta · Kapha',
    badge: 'Skin Specialist',
    badgeColor: 'bg-lime-600 text-white',
    description: 'Standardised Neem leaf extract — the ultimate blood purifier. Fights acne from within, protects the liver, and boosts immunity.',
    benefits: ['Clears acne', 'Blood purifier', 'Immune support'],
    image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=80&w=600&auto=format&fit=crop',
    altImage: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600&auto=format&fit=crop',
    colour: 'from-lime-900/80 to-lime-700/40',
    accent: '#84cc16',
  },
  {
    _id: 'p6',
    name: 'Chyawanprash Gold',
    subtitle: 'Immunity Jam · 500g',
    category: 'Immunity',
    categoryColor: 'bg-orange-50 text-orange-700 border-orange-200',
    price: 45,
    originalPrice: 55,
    rating: 5.0,
    reviews: 3201,
    dosha: 'Vata · Pitta · Kapha',
    badge: '5000-yr Recipe',
    badgeColor: 'bg-saffron text-white',
    description: 'The original Ayurvedic superfood with 43 herbs led by Amla. Strengthens immunity, improves lung health, and restores vital energy.',
    benefits: ['43 herb formula', 'Lung & immunity boost', 'Energy restoration'],
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=600&auto=format&fit=crop',
    altImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop',
    colour: 'from-orange-900/80 to-orange-700/40',
    accent: '#f97316',
  },
];

const FILTERS = ['All', 'Adaptogen', 'Digestive', "Women's Health", 'Nootropic', 'Purifier', 'Immunity'];

// ─── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product, index }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.altImage || product.image);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart({ id: product._id, ...product });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-parchment/60 shadow-sm hover:shadow-earth transition-all duration-500 flex flex-col"
    >
      {/* Image area */}
      <Link to={`/products/${product._id}`} className="block relative h-56 overflow-hidden">
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${product.colour} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`} />

        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgSrc(product.image)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Top badges row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
          <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${product.badgeColor}`}>
            {product.badge}
          </span>
          {discount && (
            <span className="text-[9px] font-bold bg-white text-saffron border border-saffron/30 px-2.5 py-1 rounded-full">
              -{discount}% OFF
            </span>
          )}
        </div>

        {/* Category pill — bottom */}
        <div className="absolute bottom-3 left-3 z-20">
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${product.categoryColor} backdrop-blur-sm`}>
            {product.category}
          </span>
        </div>
      </Link>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Rating row */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11}
                className={i < Math.floor(product.rating) ? 'text-turmeric fill-turmeric' : 'text-charcoal/20'}
              />
            ))}
          </div>
          <span className="text-[10px] text-charcoal/45">{product.rating} · {product.reviews.toLocaleString()} reviews</span>
        </div>

        {/* Name + subtitle */}
        <Link to={`/products/${product._id}`}>
          <h3 className="font-display text-xl text-forest-deep group-hover:text-saffron transition-colors duration-300 leading-snug mb-0.5">
            {product.name}
          </h3>
        </Link>
        <p className="text-[11px] text-charcoal/40 font-caption mb-3 tracking-wide">{product.subtitle}</p>

        {/* Description */}
        <p className="text-charcoal/65 text-xs leading-relaxed line-clamp-2 mb-4">{product.description}</p>

        {/* Benefits pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {product.benefits.map(b => (
            <span key={b} className="text-[9px] text-forest/70 bg-forest/5 border border-forest/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Leaf size={8} /> {b}
            </span>
          ))}
        </div>

        {/* Dosha */}
        <p className="text-[10px] text-charcoal/35 font-caption mb-4">Dosha: {product.dosha}</p>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-parchment/60">
          <div>
            <p className="font-display text-2xl text-forest-deep leading-none">${product.price}</p>
            {product.originalPrice && (
              <p className="text-xs text-charcoal/35 line-through mt-0.5">${product.originalPrice}</p>
            )}
          </div>

          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold font-caption tracking-wider uppercase transition-all duration-300
              ${added
                ? 'bg-emerald-500 text-white border-emerald-500'
                : 'bg-forest text-parchment hover:bg-saffron hover:text-white'
              }`}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span key="check" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
                  <Check size={12} /> Added
                </motion.span>
              ) : (
                <motion.span key="cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5">
                  <ShoppingBag size={12} /> Add
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────
export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <section className="py-24 relative overflow-hidden bg-parchment/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="mb-5 flex flex-col items-start justify-between gap-4 border-b border-copper-rust/15 pb-6 sm:flex-row sm:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-accent text-saffron tracking-[0.3em] text-xs uppercase mb-2 flex items-center gap-2"
            >
              <Sparkles size={11} /> Curated Healing Remedies
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl text-forest-deep sm:text-5xl md:text-6xl"
            >
              Nature's Pharmacy
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/products"
              className="hidden sm:flex items-center gap-2 text-xs font-title tracking-widest uppercase text-forest/70 hover:text-forest hover:gap-3 transition-all duration-300 mt-4 sm:mt-0"
            >
              Full Catalog <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-10"
        >
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {FILTERS.map(f => (
              <motion.button
                key={f}
                onClick={() => setActiveFilter(f)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold font-caption uppercase tracking-wide transition-all duration-300
                  ${activeFilter === f
                    ? 'border-forest bg-forest text-parchment shadow-leaf'
                    : 'border-parchment bg-white text-charcoal/60 hover:border-forest/30 hover:text-forest'
                  }`}
              >
                {f}
              </motion.button>
            ))}
          </div>
          <span className="mt-3 block text-xs text-charcoal/35 sm:mt-0 sm:text-right">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Trust / sourcing strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-3 border-t border-copper-rust/10 pt-8 sm:grid-cols-2 md:grid-cols-4 md:gap-4"
        >
          {[
            { icon: '🌿', label: 'Wildcrafted Herbs', sub: 'Native-region sourcing' },
            { icon: '🧪', label: 'Lab Tested', sub: '400+ contaminant checks' },
            { icon: '🚚', label: 'Free Shipping', sub: 'Orders above ₹999' },
            { icon: '🔄', label: '30-Day Returns', sub: 'No questions asked' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-2xl border border-copper-rust/10 bg-white/60 p-4 md:border-0 md:bg-transparent md:p-0"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-xs font-bold text-forest-deep">{item.label}</p>
                <p className="text-[10px] text-charcoal/45 mt-0.5">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-forest text-parchment px-8 py-3 rounded-full font-title text-xs tracking-widest uppercase shadow-leaf"
          >
            View All Products <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
