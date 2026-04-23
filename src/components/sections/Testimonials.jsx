import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Play, Leaf } from 'lucide-react';

// ─── Story Data ────────────────────────────────────────────────────────────────
const STORIES = [
  {
    id: 1,
    name: 'Priya Menon',
    age: 32,
    location: 'Bengaluru, India',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&h=600&auto=format&fit=crop',
    dosha: 'Vata',
    doshaColor: 'text-sky-600 bg-sky-50 border-sky-200',
    condition: 'Chronic Digestive Issues',
    duration: '4 months',
    treatment: 'Triphala + Abhyanga',
    rating: 5,
    headline: '"I finally found my gut health after 6 years of suffering."',
    story:
      'I had been dealing with chronic bloating, IBS, and fatigue for over 6 years. After just 4 months of personalized guidance from Dr. Rajiv, combining Triphala and weekly Abhyanga, my digestion completely transformed. I feel lighter, energetic, and finally at peace in my own body.',
    beforeAfter: { before: 'Daily bloating, no energy', after: 'Effortless digestion, vibrant' },
    tags: ['Digestion', 'Energy', 'Lifestyle'],
    featured: true,
  },
  {
    id: 2,
    name: 'Arjun Shah',
    age: 41,
    location: 'Mumbai, India',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&h=600&auto=format&fit=crop',
    dosha: 'Pitta',
    doshaColor: 'text-amber-600 bg-amber-50 border-amber-200',
    condition: 'Stress & Burnout',
    duration: '6 weeks',
    treatment: 'Ashwagandha + Shirodhara',
    rating: 5,
    headline: '"One Shirodhara session did what years of therapy couldn\'t."',
    story:
      'Running a startup left me chronically burnt out, irritable, and unable to sleep. Dr. Meera prescribed Ashwagandha and a course of Shirodhara. Six weeks later, my cortisol is down, my sleep is deep, and I\'ve rediscovered my calm. This was life-changing.',
    beforeAfter: { before: 'Burnout, sleepless nights', after: 'Clear mind, restful sleep' },
    tags: ['Stress', 'Sleep', 'Mental Clarity'],
    featured: false,
  },
  {
    id: 3,
    name: 'Sarah Lindström',
    age: 28,
    location: 'Stockholm, Sweden',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop',
    dosha: 'Kapha',
    doshaColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    condition: 'Hormonal Acne & Hair Fall',
    duration: '3 months',
    treatment: 'Shatavari + Neem Nasya',
    rating: 5,
    headline: '"My skin cleared up in 6 weeks — without a single chemical."',
    story:
      'I had hormonal acne and significant hair fall. Every dermatologist gave me antibiotics. Dr. Ananya identified a Kapha imbalance and prescribed Shatavari and Neem Nasya therapy. Within 6 weeks, my skin started clearing. At 3 months, it was the best it had ever been.',
    beforeAfter: { before: 'Hormonal acne, hair fall', after: 'Clear skin, healthy hair' },
    tags: ['Skin & Hair', 'Hormones', 'Natural'],
    featured: false,
  },
  {
    id: 4,
    name: 'Ramesh Iyer',
    age: 56,
    location: 'Chennai, India',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&h=600&auto=format&fit=crop',
    dosha: 'Vata',
    doshaColor: 'text-sky-600 bg-sky-50 border-sky-200',
    condition: 'Knee Arthritis & Back Pain',
    duration: '8 weeks',
    treatment: 'Kati Basti + Guggulu',
    rating: 5,
    headline: '"I walked without pain for the first time in 4 years."',
    story:
      'Severe knee arthritis had forced me to retire early from my walks — something I loved. After 8 weeks of Kati Basti sessions and Guggulu supplementation from Dr. Karthik, the inflammation reduced dramatically. I completed a 5km walk last Sunday. I cried.',
    beforeAfter: { before: 'Couldn\'t walk 100m without pain', after: 'Completed 5km walk' },
    tags: ['Joints', 'Mobility', 'Inflammation'],
    featured: false,
  },
  {
    id: 5,
    name: 'Lakshmi Pillai',
    age: 35,
    location: 'Kochi, India',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&h=600&auto=format&fit=crop',
    dosha: 'Pitta',
    doshaColor: 'text-amber-600 bg-amber-50 border-amber-200',
    condition: 'PCOS & Irregular Cycles',
    duration: '5 months',
    treatment: 'Shatavari + Panchakarma',
    rating: 5,
    headline: '"Regular cycles for the first time in a decade."',
    story:
      'I had PCOS for over 10 years, with no relief from conventional medicine. Dr. Priya created a personalized protocol of Shatavari, Panchakarma cleansing, and diet correction. In 5 months my cycles normalized, my weight stabilized, and my energy returned. Ayurveda gave me my body back.',
    beforeAfter: { before: 'Irregular cycles, PCOS, fatigue', after: 'Balanced hormones, regular cycles' },
    tags: ["Women's Health", 'PCOS', 'Hormones'],
    featured: false,
  },
];

const DOSHA_STATS = [
  { label: 'Lives Transformed', value: '12,000+', icon: '🌿' },
  { label: 'Avg. Recovery Time', value: '8 Weeks', icon: '⏱️' },
  { label: 'Patient Satisfaction', value: '98.4%', icon: '⭐' },
  { label: 'Countries Served', value: '34', icon: '🌍' },
];

// ─── Star Rating ───────────────────────────────────────────────────────────────
function StarRow({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} size={13} className="text-turmeric fill-turmeric" />
      ))}
    </div>
  );
}

// ─── Featured Story (large card) ──────────────────────────────────────────────
function FeaturedCard({ story }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative bg-white rounded-3xl shadow-earth border border-parchment/40 overflow-hidden grid grid-cols-1 lg:grid-cols-5 mb-10"
    >
      {/* Left: Image panel */}
      <div className="lg:col-span-2 relative min-h-[280px] lg:min-h-full overflow-hidden">
        <img
          src={story.avatar}
          alt={story.name}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-charcoal/70 via-charcoal/20 to-transparent" />

        {/* Name overlay */}
        <div className="absolute bottom-5 left-5 right-5">
          <p className="font-display text-2xl text-white">{story.name}</p>
          <p className="text-white/60 text-sm">{story.age} · {story.location}</p>
        </div>

        {/* Dosha badge */}
        <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full border ${story.doshaColor}`}>
          {story.dosha} Dominant
        </span>
      </div>

      {/* Right: Story content */}
      <div className="lg:col-span-3 p-8 md:p-10 flex flex-col justify-between">
        <div>
          {/* Rating + condition */}
          <div className="flex items-center justify-between mb-4">
            <StarRow />
            <span className="text-xs text-charcoal/50 border border-parchment px-3 py-1 rounded-full">
              {story.condition}
            </span>
          </div>

          {/* Big quote */}
          <div className="relative mb-6">
            <Quote size={40} className="text-forest/8 absolute -top-2 -left-2" />
            <h3 className="font-display text-2xl md:text-3xl text-forest-deep leading-snug pl-2">
              {story.headline}
            </h3>
          </div>

          <p className="text-charcoal/70 leading-relaxed mb-6 text-base">{story.story}</p>

          {/* Treatment pill */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs bg-forest/5 border border-forest/15 text-forest px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Leaf size={11} /> {story.treatment}
            </span>
            <span className="text-xs bg-parchment border border-sand-brown/20 text-charcoal/60 px-3 py-1.5 rounded-full">
              {story.duration} program
            </span>
            {story.tags.map(tag => (
              <span key={tag} className="text-xs text-charcoal/40 border border-parchment px-3 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Before / After */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-red-400 mb-1">Before</p>
            <p className="text-sm text-charcoal/70">{story.beforeAfter.before}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mb-1">After</p>
            <p className="text-sm text-charcoal/70">{story.beforeAfter.after}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Small Story Card ──────────────────────────────────────────────────────────
function StoryCard({ story, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`text-left w-full rounded-2xl border-2 overflow-hidden transition-all duration-300
        ${isActive ? 'border-forest shadow-leaf' : 'border-parchment hover:border-forest/30 bg-white'}`}
    >
      <div className="flex gap-3 p-4">
        <div className="relative shrink-0">
          <img
            src={story.avatar}
            alt={story.name}
            className="w-16 h-16 rounded-full object-cover object-center ring-2 ring-parchment"
          />
          {isActive && (
            <motion.div
              layoutId="active-dot"
              className="absolute -top-1 -right-1 w-4 h-4 bg-forest rounded-full border-2 border-white"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <p className="font-title font-bold text-sm text-forest-deep truncate">{story.name}</p>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 ml-2 ${story.doshaColor}`}>
              {story.dosha}
            </span>
          </div>
          <p className="text-xs text-charcoal/50 mb-1.5">{story.condition}</p>
          <StarRow />
        </div>
      </div>
      {isActive && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-4">
            <p className="text-xs text-charcoal/60 leading-relaxed line-clamp-2">{story.story}</p>
          </div>
        </motion.div>
      )}
    </motion.button>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  // Autoplay carousel
  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setActiveIdx(i => (i + 1) % STORIES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoplay]);

  const activeStory = STORIES[activeIdx];

  const prev = () => { setAutoplay(false); setActiveIdx(i => (i - 1 + STORIES.length) % STORIES.length); };
  const next = () => { setAutoplay(false); setActiveIdx(i => (i + 1) % STORIES.length); };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-cream-white">
      {/* Parallax parchment strip */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-0 right-0 h-[50%] bg-gradient-to-b from-parchment/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-parchment/40 to-transparent" />
      </motion.div>

      {/* Subtle botanical decor */}
      <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
        <Leaf size={200} strokeWidth={0.5} className="text-forest" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-5 pointer-events-none rotate-180">
        <Leaf size={150} strokeWidth={0.5} className="text-forest" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-accent text-turmeric tracking-[0.3em] text-[10px] sm:text-xs uppercase mb-3 flex items-center justify-center gap-2"
          >
            <Leaf size={12} /> Real Results · Real People
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-forest-deep mb-4"
          >
            Healing Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-forest/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed px-4"
          >
            Every journey is unique. These are the lives Ayurveda has quietly transformed — one patient at a time.
          </motion.p>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 lg:mb-14 px-2 sm:px-0"
        >
          {DOSHA_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="bg-white rounded-2xl border border-parchment/40 p-4 sm:p-5 text-center shadow-earth-sm hover:shadow-earth transition-shadow duration-300"
            >
              <span className="text-xl sm:text-2xl block mb-1">{stat.icon}</span>
              <p className="font-display text-xl sm:text-2xl text-forest-deep">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-charcoal/50 mt-0.5 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Story Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* Left: Story List (Vertical Carousel on Desktop, Bottom on Mobile) */}
          <div className="lg:col-span-1 flex flex-col gap-3 order-2 lg:order-1 max-h-[400px] lg:max-h-none overflow-y-auto pr-1 no-scrollbar">
            {STORIES.map((story, i) => (
              <StoryCard
                key={story.id}
                story={story}
                isActive={i === activeIdx}
                onClick={() => { setAutoplay(false); setActiveIdx(i); }}
              />
            ))}
          </div>

          {/* Right: Active Story Detail */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="bg-white rounded-[2rem] shadow-earth border border-parchment/40 overflow-hidden h-full flex flex-col"
              >
                {/* Image hero */}
                <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden bg-parchment">
                  <img
                    src={activeStory.avatar}
                    alt={activeStory.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

                  {/* Overlaid name */}
                  <div className="absolute bottom-5 left-6 right-6">
                    <span className={`text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full border mb-2 inline-block shadow-sm ${activeStory.doshaColor}`}>
                      {activeStory.dosha} · {activeStory.condition}
                    </span>
                    <p className="font-display text-2xl sm:text-3xl text-white mb-1">{activeStory.name}</p>
                    <p className="text-white/60 text-xs sm:text-sm tracking-wide">{activeStory.age} · {activeStory.location}</p>
                  </div>

                  {/* Nav arrows */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={prev} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all border border-white/20">
                      <ChevronLeft size={18} />
                    </button>
                    <button onClick={next} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all border border-white/20">
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-5 left-6">
                    <StarRow />
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8 lg:p-10 flex-1 flex flex-col">
                  {/* Big headline */}
                  <div className="relative mb-6">
                    <Quote size={32} className="text-forest/5 absolute -top-2 -left-2 shrink-0" />
                    <h3 className="font-display text-xl sm:text-2xl text-forest-deep leading-snug pl-2">
                      {activeStory.headline}
                    </h3>
                  </div>

                  <p className="text-charcoal/70 leading-relaxed mb-8 text-base lg:text-lg italic font-body">
                    "{activeStory.story}"
                  </p>

                  <div className="mt-auto">
                    {/* Treatment + Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      <span className="text-[10px] sm:text-xs bg-forest/5 border border-forest/15 text-forest px-3.5 py-1.5 rounded-full flex items-center gap-1.5 font-bold">
                        <Leaf size={11} /> {activeStory.treatment}
                      </span>
                      <span className="text-[10px] sm:text-xs bg-parchment border border-sand-brown/20 text-charcoal/60 px-3.5 py-1.5 rounded-full font-medium">
                        {activeStory.duration} program
                      </span>
                      {activeStory.tags.map(tag => (
                        <span key={tag} className="text-[10px] sm:text-xs text-charcoal/40 border border-parchment px-3.5 py-1.5 rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Before / After */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-red-50/50 border border-red-100/50 rounded-2xl p-4">
                        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-red-400 mb-1.5">Initial State</p>
                        <p className="text-xs sm:text-sm text-charcoal/80 font-medium">{activeStory.beforeAfter.before}</p>
                      </div>
                      <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-4">
                        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-500 mb-1.5">Outcome</p>
                        <p className="text-xs sm:text-sm text-charcoal/80 font-medium">{activeStory.beforeAfter.after}</p>
                      </div>
                    </div>

                    {/* Progress dots */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex gap-2.5">
                        {STORIES.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => { setAutoplay(false); setActiveIdx(i); }}
                            className={`rounded-full transition-all duration-500 ${i === activeIdx ? 'w-8 h-1.5 bg-forest' : 'w-1.5 h-1.5 bg-charcoal/10 hover:bg-charcoal/30'}`}
                          />
                        ))}
                      </div>
                      {/* Autoplay toggle */}
                      <button
                        onClick={() => setAutoplay(p => !p)}
                        className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-300 ${autoplay ? 'border-forest/20 text-forest bg-forest/5' : 'border-parchment text-charcoal/30'}`}
                      >
                        <Play size={10} className={autoplay ? 'fill-forest' : ''} />
                        {autoplay ? 'Live' : 'Pause'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 text-center"
        >
          <blockquote className="font-display text-2xl md:text-3xl text-forest/70 italic max-w-2xl mx-auto leading-relaxed">
            "The greatest medicine of all is teaching people how not to need it."
          </blockquote>
          <p className="text-charcoal/40 text-sm mt-3 font-caption tracking-wider">— Hippocrates</p>
        </motion.div>

      </div>
    </section>
  );
}
