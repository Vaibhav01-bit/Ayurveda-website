import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Star, Leaf, ChevronLeft, CheckCircle2, Package, Truck, RefreshCw, Shield } from 'lucide-react';

// ─── Shared Mock Data (mirrors Products.jsx) ──────────────────────────────────
const PRODUCTS = {
  '1': {
    name: 'Ashwagandha Supreme', price: 34, originalPrice: 42, dosha: 'Vata Balancing',
    category: 'Stress Relief', rating: 4.9, reviews: 312, badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1611078449942-8b4ef2132712?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1611078449942-8b4ef2132712?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1627467959547-215b5a59f47c?q=80&w=600&auto=format&fit=crop',
    ],
    description: 'A potent adaptogen that supports stress relief, mental clarity, and sustained energy. KSM-66® certified — the world\'s most bioavailable root extract.',
    benefits: ['Reduces cortisol & chronic stress', 'Supports deep, restorative sleep', 'Enhances strength and stamina', 'Boosts cognitive function'],
    ingredients: [
      { name: 'Ashwagandha Root (KSM-66®)', purpose: '500mg | Primary adaptogen' },
      { name: 'Black Pepper Extract (BioPerine®)', purpose: '5mg | Enhances absorption' },
      { name: 'Plant-based Veggie Capsule', purpose: 'HPMC | 100% vegan' },
    ],
    usage: 'Take 2 capsules daily with warm milk or water, preferably after dinner. For best results, continue for 60–90 days.',
    certifications: ['USDA Organic', 'Non-GMO', 'GMP Certified', 'Third-Party Tested'],
    inStock: true,
  },
  '2': {
    name: 'Triphala Digestive', price: 28, originalPrice: null, dosha: 'Tridoshic',
    category: 'Digestive', rating: 4.8, reviews: 198, badge: 'Tridoshic',
    image: 'https://images.unsplash.com/photo-1627467959547-215b5a59f47c?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1627467959547-215b5a59f47c?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?q=80&w=600&auto=format&fit=crop',
    ],
    description: 'The ancient trifecta of Amalaki, Bibhitaki, and Haritaki. Supports digestion, detoxification, and complete gut balance for all Dosha types.',
    benefits: ['Promotes healthy digestion', 'Gentle daily detoxification', 'Supports regular bowel movement', 'Rich in antioxidants'],
    ingredients: [
      { name: 'Amalaki (Indian Gooseberry)', purpose: '167mg | Vitamin C powerhouse' },
      { name: 'Bibhitaki', purpose: '167mg | Detox & respiratory' },
      { name: 'Haritaki', purpose: '166mg | Digestive tonic' },
    ],
    usage: 'Take 2 tablets at bedtime with warm water. Best taken consistently for 8+ weeks for visible results.',
    certifications: ['Organic India Certified', 'Non-GMO', 'Ayush Approved'],
    inStock: true,
  },
};

const DEFAULT_PRODUCT = {
  name: 'Ayurvedic Remedy', price: 30, originalPrice: null, dosha: 'Tridoshic',
  category: 'Wellness', rating: 4.8, reviews: 150, badge: null,
  image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=80&w=1200&auto=format&fit=crop',
  gallery: ['https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=80&w=600&auto=format&fit=crop'],
  description: 'A traditional Ayurvedic formulation crafted with pure, ethically sourced herbs for holistic wellness.',
  benefits: ['Supports overall wellness', 'Pure herbal formulation', 'No synthetic additives'],
  ingredients: [{ name: 'Proprietary Herbal Blend', purpose: 'Traditional formulation' }],
  usage: 'Follow the directions on the label or consult your Ayurvedic practitioner.',
  certifications: ['GMP Certified', 'Third-Party Tested'],
  inStock: true,
};

const TABS = ['Benefits', 'Ingredients', 'How to Use', 'Certifications'];

const RELATED = ['1', '2'].map(id => PRODUCTS[id]);

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = PRODUCTS[id] || { ...DEFAULT_PRODUCT, name: `Ayurvedic Remedy #${id}` };

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Benefits');
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart({ id, ...product, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-cream-white pt-28 pb-24 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 right-0 w-1/2 h-96 bg-saffron/4 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-charcoal/50 mb-10"
        >
          <Link to="/products" className="flex items-center gap-1.5 hover:text-forest transition-colors">
            <ChevronLeft size={15} /> Shop
          </Link>
          <span>/</span>
          <span className="text-charcoal/70">{product.name}</span>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">

          {/* Left: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-square bg-parchment/30 mb-4 shadow-earth">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={product.gallery?.[activeImage] || product.image}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              {discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.gallery?.length > 1 && (
              <div className="flex gap-3">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === i ? 'border-forest scale-105 shadow-md' : 'border-parchment hover:border-forest/40'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-start"
          >
            {/* Dosha Tag + Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-forest/10 text-forest text-xs font-bold rounded-full border border-forest/20">
                <Leaf size={12} /> {product.dosha}
              </span>
              {product.badge && (
                <span className="px-3 py-1.5 bg-saffron text-white text-xs font-bold rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl md:text-5xl text-forest-deep mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16}
                    className={i < Math.floor(product.rating) ? 'text-turmeric fill-turmeric' : 'text-charcoal/20'}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-charcoal/70">{product.rating}</span>
              <span className="text-sm text-charcoal/40">({product.reviews} reviews)</span>
            </div>

            <p className="text-charcoal/70 leading-relaxed mb-6 text-base">{product.description}</p>

            {/* Price */}
            <div className="flex items-end gap-3 mb-7">
              <span className="font-bold text-4xl text-forest-deep">₹{product.price * 83}</span>
              {product.originalPrice && (
                <span className="text-xl text-charcoal/40 line-through mb-1">₹{product.originalPrice * 83}</span>
              )}
              {discount && (
                <span className="text-green-600 font-semibold text-sm mb-1">Save {discount}%</span>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-forest/20 rounded-full bg-white overflow-hidden shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center text-forest text-lg hover:bg-forest/5 transition-colors"
                >–</button>
                <span className="w-10 text-center font-bold text-forest">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 flex items-center justify-center text-forest text-lg hover:bg-forest/5 transition-colors"
                >+</button>
              </div>

              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex-grow h-12 rounded-full font-title text-sm tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-md
                  ${added ? 'bg-green-600 text-white' : 'bg-forest text-parchment hover:bg-forest/90 shadow-forest/20'}`}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span key="added" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <CheckCircle2 size={16} /> ADDED TO BAG
                    </motion.span>
                  ) : (
                    <motion.span key="add" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <ShoppingBag size={16} /> ADD TO BAG
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Delivery Promises */}
            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { icon: Truck, text: 'Free delivery above ₹999' },
                { icon: Package, text: 'Ships in 2–4 business days' },
                { icon: RefreshCw, text: '30-day easy returns' },
                { icon: Shield, text: '100% authentic guarantee' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-charcoal/60">
                  <Icon size={13} className="text-forest shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            {/* Certifications inline */}
            <div className="flex flex-wrap gap-2">
              {product.certifications?.map((cert, i) => (
                <span key={i} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-parchment border border-sand-brown/30 text-charcoal/60 uppercase tracking-wider">
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Detail Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-sm border border-parchment/40 overflow-hidden mb-16"
        >
          {/* Tab Headers */}
          <div className="flex border-b border-parchment/60 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-caption font-semibold tracking-wider whitespace-nowrap transition-all duration-200 border-b-2 ${
                  activeTab === tab
                    ? 'border-forest text-forest'
                    : 'border-transparent text-charcoal/50 hover:text-forest'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-8"
            >
              {activeTab === 'Benefits' && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.benefits?.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-forest mt-0.5 shrink-0" />
                      <span className="text-charcoal/80">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'Ingredients' && (
                <div className="space-y-4">
                  {product.ingredients?.map((ing, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-parchment/30 border border-parchment/60">
                      <Leaf size={18} className="text-forest mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-forest-deep">{ing.name}</p>
                        <p className="text-sm text-charcoal/60 mt-0.5">{ing.purpose}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'How to Use' && (
                <div className="max-w-xl">
                  <p className="text-charcoal/80 leading-relaxed text-base">{product.usage}</p>
                  <div className="mt-6 p-4 bg-saffron/10 border border-saffron/30 rounded-2xl">
                    <p className="text-sm text-charcoal/70">
                      <strong className="text-forest">Tip:</strong> For best results, combine with a Dosha-appropriate diet and daily routine. Book a free consultation with our Vaidyas.
                    </p>
                  </div>
                </div>
              )}
              {activeTab === 'Certifications' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {product.certifications?.map((cert, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-parchment/30 border border-parchment text-center">
                      <Shield size={24} className="text-forest mx-auto mb-2" />
                      <p className="text-xs font-bold text-charcoal/70">{cert}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Related Products */}
        <div>
          <h2 className="font-display text-3xl text-forest mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RELATED.filter(p => p.name !== product.name).slice(0, 3).map((rp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/products/${Object.keys(PRODUCTS).find(k => PRODUCTS[k].name === rp.name) || '1'}`}
                  className="flex gap-4 bg-white rounded-2xl p-4 border border-parchment/40 hover:shadow-earth transition-shadow group"
                >
                  <img src={rp.image} alt={rp.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                  <div className="flex flex-col justify-center">
                    <p className="font-display text-base text-forest-deep group-hover:text-primary-green transition-colors">{rp.name}</p>
                    <div className="flex items-center gap-1 my-1">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} size={10} className={si < Math.floor(rp.rating) ? 'text-turmeric fill-turmeric' : 'text-charcoal/20'} />
                      ))}
                    </div>
                    <p className="text-sm font-bold text-forest">₹{rp.price * 83}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
