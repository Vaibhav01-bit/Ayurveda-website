import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Star, Leaf, ChevronDown, ChevronUp, X } from 'lucide-react';

// ─── Treatment Data ────────────────────────────────────────────────────────────
const TREATMENTS = [
  {
    id: 'panchakarma',
    name: 'Panchakarma',
    sanskrit: 'पञ्चकर्म',
    tagline: 'The Ultimate Detox & Rejuvenation',
    description:
      'Panchakarma is Ayurveda\'s most comprehensive purification therapy — a five-fold process that eliminates accumulated toxins (Ama) from the body\'s deepest tissues. It resets your entire system and restores vibrant health.',
    duration: '7–21 Days',
    rating: 4.9,
    sessions: '1,200+',
    problem: 'Immunity',
    benefits: ['Full-body detoxification', 'Reverses chronic disease', 'Deep cellular cleansing', 'Restores Dosha balance', 'Boosts immunity & vitality'],
    steps: ['Purvakarma (Preparation)', 'Vamana (Emesis)', 'Virechana (Purgation)', 'Basti (Enema)', 'Nasya (Nasal therapy)'],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1600&auto=format&fit=crop',
    color: 'from-forest/80 to-forest/95',
    accent: 'text-turmeric',
  },
  {
    id: 'abhyanga',
    name: 'Abhyanga',
    sanskrit: 'अभ्यंग',
    tagline: 'Synchronized Medicated Oil Massage',
    description:
      'Abhyanga is a deeply nourishing full-body oil massage using warm, herb-infused oils tailored to your Dosha. The rhythmic strokes calm the nervous system, improve lymphatic circulation, and nourish the skin from within.',
    duration: '60–90 Min',
    rating: 4.8,
    sessions: '3,400+',
    problem: 'Stress & Sleep',
    benefits: ['Relieves stress & anxiety', 'Improves circulation', 'Nourishes skin & joints', 'Promotes deep sleep', 'Calms the nervous system'],
    steps: ['Dosha assessment', 'Warm oil preparation', 'Full-body massage', 'Steam therapy (optional)', 'Rest & integration'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&auto=format&fit=crop',
    color: 'from-amber-900/80 to-amber-900/95',
    accent: 'text-amber-300',
  },
  {
    id: 'shirodhara',
    name: 'Shirodhara',
    sanskrit: 'शिरोधारा',
    tagline: 'The Third Eye Oil Flow Therapy',
    description:
      'Shirodhara involves a continuous, meditative stream of warm medicated oil poured gently over the forehead — targeting the Ajna (third eye) marma point. It induces a deeply relaxed, trance-like state, balancing Vata in the mind.',
    duration: '45–60 Min',
    rating: 5.0,
    sessions: '2,100+',
    problem: 'Stress & Sleep',
    benefits: ['Eliminates mental fatigue', 'Treats insomnia & anxiety', 'Improves concentration', 'Balances hormones', 'Deeply meditative effect'],
    steps: ['Head & neck Abhyanga', 'Warm oil selection', 'Shirodhara stream therapy', 'Scalp massage', 'Silent rest'],
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1600&auto=format&fit=crop',
    color: 'from-slate-800/80 to-slate-900/95',
    accent: 'text-sky-300',
  },
  {
    id: 'nasya',
    name: 'Nasya Karma',
    sanskrit: 'नस्य कर्म',
    tagline: 'Nasal Cleansing for Mental Clarity',
    description:
      'Nasya is the administration of medicated oils and herbal preparations through the nasal passage — the direct gateway to the brain. It clears accumulated Kapha from the head, neck, and sinuses, sharpening the senses and mind.',
    duration: '30–45 Min',
    rating: 4.7,
    sessions: '890+',
    problem: 'Respiratory',
    benefits: ['Clears sinus congestion', 'Improves memory & focus', 'Relieves headaches', 'Strengthens voice', 'Balances Kapha in the head'],
    steps: ['Facial steam', 'Marma point massage', 'Oil administration', 'Gargling with herbal water', 'Rest & observation'],
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1600&auto=format&fit=crop',
    color: 'from-teal-900/80 to-teal-900/95',
    accent: 'text-teal-300',
  },
  {
    id: 'kati-basti',
    name: 'Kati Basti',
    sanskrit: 'कटि बस्ति',
    tagline: 'Targeted Lower Back Relief',
    description:
      'Kati Basti is a specialized treatment for lower back pain where a dam of black gram dough is placed on the lumbar region, filled with warm medicated oil. The oil deeply penetrates the muscles, nerves, and joints, providing profound relief.',
    duration: '45–60 Min',
    rating: 4.9,
    sessions: '1,600+',
    problem: 'Joints & Bones',
    benefits: ['Relieves chronic back pain', 'Reduces disc inflammation', 'Strengthens spinal muscles', 'Improves posture', 'Treats sciatica & spondylosis'],
    steps: ['Postural assessment', 'Localized Abhyanga', 'Dough dam preparation', 'Warm oil retention', 'Gentle mobilization'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&auto=format&fit=crop',
    color: 'from-stone-800/80 to-stone-900/95',
    accent: 'text-orange-300',
  },
];

// ─── Booking CTA Modal ─────────────────────────────────────────────────────────
function BookingModal({ treatment, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-deep w-full max-w-md overflow-hidden"
        >
          {/* Top gradient band */}
          <div className={`bg-gradient-to-r ${treatment.color} p-6 relative`}>
            <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
              <X size={20} />
            </button>
            <p className="font-accent text-white/60 text-xs tracking-widest uppercase mb-1">{treatment.sanskrit}</p>
            <h3 className="font-display text-3xl text-white">{treatment.name}</h3>
            <p className={`text-sm mt-1 ${treatment.accent}`}>{treatment.tagline}</p>
          </div>

          <div className="p-6">
            {/* Quick facts */}
            <div className="flex gap-4 mb-5 pb-5 border-b border-parchment">
              <div className="text-center flex-1">
                <p className="text-xs text-charcoal/40 uppercase tracking-wide mb-0.5">Duration</p>
                <p className="font-bold text-forest text-sm">{treatment.duration}</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-xs text-charcoal/40 uppercase tracking-wide mb-0.5">Rating</p>
                <p className="font-bold text-forest text-sm flex items-center justify-center gap-1">
                  <Star size={12} className="text-turmeric fill-turmeric" />{treatment.rating}
                </p>
              </div>
              <div className="text-center flex-1">
                <p className="text-xs text-charcoal/40 uppercase tracking-wide mb-0.5">Sessions</p>
                <p className="font-bold text-forest text-sm">{treatment.sessions}</p>
              </div>
            </div>

            <p className="text-sm text-charcoal/70 leading-relaxed mb-5">
              Your consultation will be pre-filled with{' '}
              <strong className="text-forest">{treatment.name}</strong> as your primary concern.
              Our Vaidya will guide you through whether this treatment is right for your constitution.
            </p>

            <p className="text-xs text-charcoal/40 mb-5 flex items-center gap-1.5">
              <Leaf size={12} className="text-forest" />
              First consultation is always free · No commitment required
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onConfirm}
              className="w-full bg-forest text-parchment py-4 rounded-2xl font-title text-sm tracking-widest flex items-center justify-center gap-2 shadow-leaf hover:bg-forest/90 transition-colors"
            >
              BOOK FREE CONSULTATION <ArrowRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Treatment Card ────────────────────────────────────────────────────────────
function TreatmentSection({ treatment, index, onBook }) {
  const [expanded, setExpanded] = useState(false);
  const isReversed = index % 2 !== 0;

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Fullscreen background */}
      <div className="absolute inset-0 z-0">
        <img
          src={treatment.image}
          alt={treatment.name}
          className="w-full h-full object-cover"
        />
        {/* Directional overlay */}
        <div className={`absolute inset-0 bg-gradient-to-${isReversed ? 'l' : 'r'} ${treatment.color}`} />
        <div className="absolute inset-0 bg-charcoal/20" />
      </div>

      {/* Content */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex ${isReversed ? 'justify-end' : 'justify-start'}`}>
        <motion.div
          initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-lg w-full"
        >
          {/* Sanskrit + index */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`font-accent text-xs tracking-widest uppercase ${treatment.accent} opacity-80`}>
              0{index + 1} / 0{TREATMENTS.length}
            </span>
            <span className="h-px w-8 bg-white/30" />
            <span className="font-sanskrit text-white/50 text-base">{treatment.sanskrit}</span>
          </div>

          <h2 className="font-display text-5xl md:text-6xl text-white mb-2">{treatment.name}</h2>
          <p className={`font-accent text-sm tracking-wide mb-5 ${treatment.accent}`}>{treatment.tagline}</p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full">
              <Clock size={12} /> {treatment.duration}
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full">
              <Star size={12} className="text-turmeric" /> {treatment.rating} · {treatment.sessions} sessions
            </span>
          </div>

          <p className="text-white/80 text-base leading-relaxed mb-6">{treatment.description}</p>

          {/* Expandable Benefits */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-3"
          >
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            {expanded ? 'Hide' : 'See'} benefits & process
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden mb-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider ${treatment.accent} mb-2`}>Benefits</p>
                    <ul className="space-y-1.5">
                      {treatment.benefits.map(b => (
                        <li key={b} className="flex items-start gap-2 text-white/75 text-xs">
                          <span className={`mt-0.5 w-1 h-1 rounded-full shrink-0 bg-current ${treatment.accent}`} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider ${treatment.accent} mb-2`}>Process</p>
                    <ol className="space-y-1.5">
                      {treatment.steps.map((s, i) => (
                        <li key={s} className="flex items-start gap-2 text-white/75 text-xs">
                          <span className="shrink-0 font-bold text-white/40">{String(i + 1).padStart(2, '0')}</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onBook(treatment)}
            className="flex items-center gap-2 bg-parchment text-forest-deep px-8 py-3.5 rounded-full font-title text-sm tracking-widest shadow-earth hover:bg-white transition-colors"
          >
            BOOK CONSULTATION <ArrowRight size={15} />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll hint on first section */}
      {index === 0 && (
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40 text-xs flex flex-col items-center gap-1"
        >
          <span>Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      )}
    </section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Treatments() {
  const navigate = useNavigate();
  const [modalTreatment, setModalTreatment] = useState(null);

  const handleBook = (treatment) => setModalTreatment(treatment);

  const handleConfirm = () => {
    if (!modalTreatment) return;
    // Navigate to consultation page with the treatment's problem pre-filled as a query param
    navigate(`/consultation?problem=${encodeURIComponent(modalTreatment.problem)}&treatment=${encodeURIComponent(modalTreatment.name)}`);
    setModalTreatment(null);
  };

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 text-center bg-parchment overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-accent text-saffron tracking-[0.3em] text-xs uppercase mb-4 flex items-center justify-center gap-2"
        >
          <Leaf size={12} /> Authentic Therapies
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl md:text-7xl text-forest mb-5"
        >
          Healing Therapies
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-charcoal/65 max-w-xl mx-auto leading-relaxed mb-10"
        >
          Each treatment is administered by certified Vaidyas using authentic formulations passed down through generations.
        </motion.p>

        {/* Treatment Nav Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {TREATMENTS.map(t => (
            <a key={t.id} href={`#${t.id}`}
              className="px-4 py-2 rounded-full text-xs font-caption font-semibold border border-parchment bg-white text-charcoal/60 hover:border-forest/40 hover:text-forest transition-all"
            >
              {t.name}
            </a>
          ))}
        </motion.div>
      </section>

      {/* Treatment Sections */}
      {TREATMENTS.map((treatment, index) => (
        <div id={treatment.id} key={treatment.id}>
          <TreatmentSection treatment={treatment} index={index} onBook={handleBook} />
        </div>
      ))}

      {/* Bottom CTA Strip */}
      <section className="py-20 px-4 bg-forest text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto relative z-10"
        >
          <h2 className="font-display text-4xl md:text-5xl text-parchment mb-4">
            Not Sure Which Therapy?
          </h2>
          <p className="text-parchment/70 mb-8 text-lg leading-relaxed">
            Our Vaidyas will assess your Prakriti and recommend the most effective treatment plan for your unique constitution.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/consultation')}
            className="bg-parchment text-forest-deep px-10 py-4 rounded-full font-title text-sm tracking-widest shadow-earth flex items-center gap-2 mx-auto hover:bg-white transition-colors"
          >
            GET A FREE ASSESSMENT <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </section>

      {/* Booking Modal */}
      {modalTreatment && (
        <BookingModal
          treatment={modalTreatment}
          onClose={() => setModalTreatment(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
