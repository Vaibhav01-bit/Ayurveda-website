import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingBag, Leaf, Star, Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

// ─── Mock Product Data ──────────────────────────────────────────────────────────
const MOCK_PRODUCTS = [
  {
    _id: '1',
    name: 'Ashwagandha Supreme',
    price: 34,
    originalPrice: 42,
    category: 'Stress Relief',
    tags: ['Vata', 'Adaptogen', 'Sleep'],
    image: 'https://images.unsplash.com/photo-1611078449942-8b4ef2132712?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 312,
    badge: 'Best Seller',
    description: 'A potent adaptogen that supports stress relief, mental clarity, and sustained energy. KSM-66® certified root extract.',
    dosha: 'Vata Balancing',
  },
  {
    _id: '2',
    name: 'Triphala Digestive',
    price: 28,
    originalPrice: null,
    category: 'Digestive',
    tags: ['Kapha', 'Vata', 'Pitta', 'Detox'],
    image: 'https://images.unsplash.com/photo-1627467959547-215b5a59f47c?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 198,
    badge: 'Tridoshic',
    description: 'The ancient trifecta of Amalaki, Bibhitaki, and Haritaki. Supports digestion, detoxification, and gut balance.',
    dosha: 'Tridoshic',
  },
  {
    _id: '3',
    name: 'Brahmi Mind Elixir',
    price: 38,
    originalPrice: 48,
    category: 'Immunity',
    tags: ['Pitta', 'Cognitive', 'Focus'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    reviews: 145,
    badge: 'New',
    description: 'Ancient nootropic herb for memory, focus, and cognitive clarity. Cold-extracted from wild-grown Bacopa monnieri.',
    dosha: 'Pitta Cooling',
  },
  {
    _id: '4',
    name: 'Shatavari Vital',
    price: 36,
    originalPrice: null,
    category: 'Immunity',
    tags: ['Vata', 'Pitta', 'Vitality', 'Women'],
    image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 224,
    badge: 'Premium',
    description: 'The queen of Ayurvedic herbs, supporting hormonal balance, vitality, and immunity for all constitutions.',
    dosha: 'Vata & Pitta',
  },
  {
    _id: '5',
    name: 'Turmeric Gold Blend',
    price: 26,
    originalPrice: 32,
    category: 'Immunity',
    tags: ['Kapha', 'Pitta', 'Anti-inflammatory'],
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 389,
    badge: 'Best Seller',
    description: 'High-curcumin turmeric with black pepper extract and ginger. The ancient golden formula for whole-body wellness.',
    dosha: 'Kapha Balancing',
  },
  {
    _id: '6',
    name: 'Neem Skin Purifier',
    price: 22,
    originalPrice: null,
    category: 'Pitta',
    tags: ['Pitta', 'Skin', 'Detox'],
    image: 'https://images.unsplash.com/photo-1612540139150-f1c4b4e0b97c?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    reviews: 178,
    badge: null,
    description: 'Neem leaf extract for blood purification, skin health, and natural detox. Sustainably harvested from organic farms.',
    dosha: 'Pitta Cooling',
  },
  {
    _id: '7',
    name: 'Chyawanprash Classic',
    price: 44,
    originalPrice: 58,
    category: 'Immunity',
    tags: ['Kapha', 'Vata', 'Immunity', 'Seasonal'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
    rating: 5.0,
    reviews: 421,
    badge: 'Ancient Formula',
    description: "India's oldest wellness formulation. A rich herbal jam with Amalaki at its core, plus 49 additional herbs.",
    dosha: 'Tridoshic',
  },
  {
    _id: '8',
    name: 'Guggulu Joint Care',
    price: 32,
    originalPrice: null,
    category: 'Kapha',
    tags: ['Kapha', 'Vata', 'Joint', 'Mobility'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    reviews: 156,
    badge: null,
    description: 'Purified Guggulu resin with Boswellia and Shallaki for joint comfort, mobility, and inflammation support.',
    dosha: 'Kapha & Vata',
  },
  {
    _id: '9',
    name: 'Moringa Vitality Plus',
    price: 30,
    originalPrice: 36,
    category: 'Immunity',
    tags: ['Vata', 'Pitta', 'Kapha', 'Energy', 'Nutrition'],
    image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 287,
    badge: 'Tridoshic',
    description: "The 'miracle tree' leaf powder. Dense in nutrients, antioxidants, and natural energy-boosting compounds.",
    dosha: 'Tridoshic',
  },
];

const FILTERS = ['All', 'Vata', 'Pitta', 'Kapha', 'Immunity', 'Stress Relief', 'Digestive'];
const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating' },
];

const BADGE_COLORS = {
  'Best Seller': 'bg-saffron text-white',
  'New': 'bg-forest text-parchment',
  'Tridoshic': 'bg-emerald-600 text-white',
  'Premium': 'bg-amber-700 text-white',
  'Ancient Formula': 'bg-charcoal text-parchment',
};

// ─── Product Card ───────────────────────────────────────────────────────────────
function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ id: product._id, ...product });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group flex flex-col h-full bg-white rounded-3xl shadow-sm hover:shadow-earth border border-parchment/40 overflow-hidden transition-shadow duration-500"
    >
      {/* Image */}
      <Link to={`/products/${product._id}`} className="block relative overflow-hidden aspect-[4/3] bg-parchment/20">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm ${BADGE_COLORS[product.badge] || 'bg-white text-forest'}`}>
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-500 text-white uppercase tracking-wider shadow-sm">
              -{discount}%
            </span>
          )}
        </div>

        {/* Quick View hint */}
        <div className="absolute inset-x-0 bottom-0 py-2 bg-forest/80 backdrop-blur-sm text-parchment text-xs font-caption tracking-wider text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          View Details
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12}
              className={i < Math.floor(product.rating) ? 'text-turmeric fill-turmeric' : 'text-charcoal/20 fill-charcoal/10'}
            />
          ))}
          <span className="text-xs text-charcoal/50 ml-1">({product.reviews})</span>
        </div>

        {/* Category tag */}
        <span className="text-[10px] font-bold uppercase tracking-widest text-forest/60 mb-1">{product.category}</span>

        <Link to={`/products/${product._id}`}>
          <h3 className="font-display text-xl text-forest-deep mb-2 leading-tight group-hover:text-primary-green transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

        <p className="text-charcoal/60 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-parchment/40">
          <div className="flex items-end gap-2">
            <span className="font-bold text-2xl text-forest-deep">₹{product.price * 83}</span>
            {product.originalPrice && (
              <span className="text-sm text-charcoal/40 line-through mb-0.5">₹{product.originalPrice * 83}</span>
            )}
          </div>

          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.9 }}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
              ${added
                ? 'bg-forest text-parchment scale-110'
                : 'bg-cream-white border border-parchment text-primary-green hover:bg-primary-green hover:text-white hover:border-primary-green hover:shadow-md'
              }`}
            title="Add to Cart"
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-sm">✓</motion.span>
              ) : (
                <motion.span key="bag" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <ShoppingBag size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────────
export default function Products() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [search, setSearch] = useState('');
  const [showSort, setShowSort] = useState(false);

  const filteredProducts = useMemo(() => {
    let list = MOCK_PRODUCTS;

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Filter
    if (activeFilter !== 'All') {
      list = list.filter(p => p.category === activeFilter || p.tags.includes(activeFilter));
    }

    // Sort
    switch (sortBy) {
      case 'price_asc': return [...list].sort((a, b) => a.price - b.price);
      case 'price_desc': return [...list].sort((a, b) => b.price - a.price);
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating);
      default: return list;
    }
  }, [activeFilter, sortBy, search]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-cream-white pb-24 pt-24 md:pt-32">
      {/* Ambient Background */}
      <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-primary-green/4 rounded-bl-[200px] filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-80 bg-turmeric/5 rounded-tr-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-accent text-saffron tracking-[0.3em] text-xs uppercase mb-4 flex items-center justify-center gap-2"
          >
            <Leaf size={14} strokeWidth={2} /> The Apothecary
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-5 font-display text-4xl text-forest-deep sm:text-5xl md:text-7xl"
          >
            Our Remedies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-forest/65 max-w-xl mx-auto leading-relaxed"
          >
            Pure, potent, and authentically prepared. Formulated by expert Vaidyas using ethically sourced herbs.
          </motion.p>
        </div>

        {/* Search + Sort Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-7 flex flex-col gap-3 sm:flex-row"
        >
          {/* Search */}
          <div className="relative flex-grow">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input
              type="text"
              placeholder="Search remedies, herbs, or benefits..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white border border-parchment/60 text-charcoal/80 placeholder-charcoal/35 focus:outline-none focus:border-forest/40 focus:ring-2 focus:ring-forest/10 transition text-sm"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal">
                <X size={15} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex w-full items-center justify-between gap-2 whitespace-nowrap rounded-2xl border border-parchment/60 bg-white px-5 py-3 text-sm text-charcoal/70 transition hover:border-forest/40 sm:w-auto sm:justify-start"
            >
              <SlidersHorizontal size={15} />
              {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
              <ChevronDown size={14} className={`transition-transform ${showSort ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showSort && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-parchment bg-white shadow-earth sm:left-auto sm:right-0 sm:min-w-[190px]"
                >
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                      className={`w-full px-5 py-3 text-left text-sm transition-colors ${sortBy === opt.value ? 'bg-forest text-parchment' : 'text-charcoal/70 hover:bg-parchment/40'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <div className="mobile-scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-full px-5 py-2 font-caption text-xs font-semibold tracking-wide transition-all duration-300 ${
                  activeFilter === filter
                    ? 'scale-105 bg-forest text-cream-white shadow-md'
                    : 'border border-parchment bg-white text-forest/70 hover:border-forest/40 hover:text-forest'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <span className="mt-3 block text-xs text-charcoal/40 sm:mt-0 sm:text-right">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
          </span>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <Leaf className="w-16 h-16 mx-auto text-forest/20 mb-5" />
              <h3 className="font-display text-2xl text-forest-deep mb-2">No remedies found</h3>
              <p className="text-charcoal/50 mb-6">Try adjusting your filters or search term.</p>
              <button onClick={() => { setActiveFilter('All'); setSearch(''); }} className="text-sm text-saffron hover:underline">
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter + sortBy + search}
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20 grid grid-cols-1 gap-4 border-t border-parchment pt-14 text-center sm:grid-cols-2 md:grid-cols-4 md:gap-6"
        >
          {[
            { icon: '🌿', title: '100% Natural', sub: 'Zero synthetics, ever' },
            { icon: '🧪', title: 'Lab Tested', sub: 'Third-party verified' },
            { icon: '🌏', title: 'Ethically Sourced', sub: 'From organic farms' },
            { icon: '📦', title: 'Free Shipping', sub: 'On orders above ₹999' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center rounded-2xl border border-parchment/60 bg-white/60 p-5 md:border-0 md:bg-transparent md:p-0">
              <span className="text-3xl mb-2">{item.icon}</span>
              <p className="font-display text-base text-forest">{item.title}</p>
              <p className="text-xs text-charcoal/50 mt-0.5">{item.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
