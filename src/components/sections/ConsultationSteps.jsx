import { motion } from 'framer-motion';
import { Search, ListChecks, CalendarCheck, Leaf, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    id: 1,
    title: 'Choose Concern',
    desc: 'Select from 20+ health concerns mapped to Ayurvedic root causes.',
    icon: Search,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    id: 2,
    title: 'Symptom Check',
    desc: 'A precise 2-minute assessment to understand your unique Dosha imbalance.',
    icon: ListChecks,
    color: 'text-forest',
    bg: 'bg-green-50',
  },
  {
    id: 3,
    title: 'Book Vaidya',
    desc: 'Choose an expert specialist for a video, phone, or chat consultation.',
    icon: CalendarCheck,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    id: 4,
    title: 'Start Healing',
    desc: 'Receive your personalized care plan including herbs and diet correction.',
    icon: Leaf,
    color: 'text-saffron',
    bg: 'bg-orange-50',
  },
];

export default function ConsultationSteps() {
  return (
    <section className="py-24 bg-parchment/40 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -right-20 top-20 opacity-[0.03] pointer-events-none">
        <Leaf size={300} strokeWidth={0.5} className="text-forest rotate-45" />
      </div>
      <div className="absolute -left-20 bottom-20 opacity-[0.03] pointer-events-none">
        <Leaf size={250} strokeWidth={0.5} className="text-forest -rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 bg-forest-deep/5 rounded-full mb-6"
          >
            <Sparkles size={12} className="text-saffron" />
            <span className="font-caption text-[10px] uppercase tracking-[0.2em] text-forest-deep/60 font-bold">
              Your Guided Journey
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl md:text-5xl lg:text-7xl text-forest-deep mb-8 tracking-tight"
          >
            Path to Wellness
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-charcoal/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            A personalized 4-step approach to restore your natural balance and vitality.
          </motion.p>
        </div>

        <div className="relative">
          {/* Progress Line Connection (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              className="w-full h-full border-t-2 border-dashed border-sand-brown/30 origin-left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 relative z-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className={`group relative p-8 rounded-[2.5rem] bg-white transition-all duration-500 shadow-sm hover:shadow-glow-soft border-2 ${step.id === 1 ? 'border-turmeric-gold/40 shadow-earth-sm' : 'border-sand-brown/5 hover:border-sand-brown/20'
                  }`}
              >
                {/* Recommended Badge */}
                {step.id === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-turmeric-gold text-forest-deep text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm z-20">
                    Recommended Path
                  </div>
                )}

                {/* Step Number Overlay */}
                <div className="absolute top-8 right-10 font-title text-5xl text-forest-deep/5 group-hover:text-forest-deep/10 transition-colors duration-500 pointer-events-none">
                  0{step.id}
                </div>

                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center mb-8 shadow-sm group-hover:shadow-md transition-shadow duration-500`}
                >
                  <step.icon size={30} className={`${step.color} transition-transform duration-500 group-hover:scale-110`} />
                </motion.div>

                <h3 className="font-display text-2xl text-forest-deep mb-4 leading-tight">
                  {step.title}
                </h3>

                <p className="text-charcoal/60 text-sm leading-relaxed mb-8 min-h-[4.5rem]">
                  {step.desc}
                </p>

                <Link
                  to={step.id === 3 ? "/doctors" : "/consultation"}
                  className={`inline-flex items-center gap-3 py-3 px-6 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 group/btn ${step.id === 1
                      ? 'bg-turmeric-gold text-forest-deep hover:bg-forest-deep hover:text-parchment'
                      : 'bg-parchment text-forest-deep hover:bg-saffron hover:text-white'
                    }`}
                >
                  <span>{step.id === 1 ? "Start Step" : "Continue Journey"}</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/consultation"
            className="inline-flex items-center space-x-4 px-12 py-5 bg-forest-deep text-parchment rounded-full font-title text-sm tracking-[0.25em] uppercase hover:bg-saffron-fire hover:shadow-glow transition-all duration-500 group"
          >
            <span>Begin Free Consultation</span>
            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[10px] text-charcoal/40 font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><Sparkles size={12} className="text-turmeric-gold" /> Personalized Care</span>
            <span className="flex items-center gap-2"><Sparkles size={12} className="text-turmeric-gold" /> Expert Vaidyas</span>
            <span className="flex items-center gap-2"><Sparkles size={12} className="text-turmeric-gold" /> Holistic Healing</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


