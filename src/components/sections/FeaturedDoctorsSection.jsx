import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Award, ArrowRight, Leaf, MessageCircle, Video, Phone, CheckCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Doctor Data ───────────────────────────────────────────────────────────────
const DOCTORS = [
  {
    _id: 'd1',
    name: 'Dr. Meera Patel',
    title: 'BAMS, MD (Ayurveda)',
    specialization: 'Stress & Sleep Disorders',
    expertise: ['Burnout Recovery', 'Anxiety', 'Insomnia', 'Panchakarma'],
    problems: ['Stress & Sleep', 'Mental Health'],
    experience: '14 Years',
    rating: 4.9,
    reviews: 1284,
    consultations: '3,200+',
    languages: ['English', 'Hindi', 'Gujarati'],
    nextSlot: 'Today, 4:00 PM',
    available: true,
    modes: ['video', 'phone', 'chat'],
    badge: 'Top Rated',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    accentColor: 'from-violet-500/20 to-indigo-500/10',
    tagColor: 'bg-violet-50 text-violet-700 border-violet-200',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=600&h=700&auto=format&fit=crop',
  },
  {
    _id: 'd2',
    name: 'Dr. Rajiv Menon',
    title: 'BAMS, PG Dip. (Panchakarma)',
    specialization: 'Gut Health & Digestion',
    expertise: ['IBS', 'Liver Detox', 'Weight Balance', 'Triphala Therapy'],
    problems: ['Digestive Issues', 'Weight & Metabolism'],
    experience: '18 Years',
    rating: 4.8,
    reviews: 976,
    consultations: '4,100+',
    languages: ['English', 'Malayalam', 'Tamil'],
    nextSlot: 'Today, 6:30 PM',
    available: true,
    modes: ['video', 'phone'],
    badge: 'Panchakarma Expert',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentColor: 'from-emerald-500/20 to-teal-500/10',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&h=700&auto=format&fit=crop',
  },
  {
    _id: 'd3',
    name: 'Dr. Ananya Sharma',
    title: 'BAMS, MS (Shalakya)',
    specialization: 'Skin, Hair & Hormones',
    expertise: ['PCOS', 'Acne', 'Hair Fall', 'Neem Nasya'],
    problems: ["Skin & Hair", "Women's Health"],
    experience: '11 Years',
    rating: 4.9,
    reviews: 1820,
    consultations: '2,800+',
    languages: ['English', 'Hindi', 'Punjabi'],
    nextSlot: 'Tomorrow, 10:00 AM',
    available: false,
    modes: ['video', 'chat'],
    badge: 'Women\'s Specialist',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    accentColor: 'from-rose-500/20 to-pink-500/10',
    tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&h=700&auto=format&fit=crop',
  },
  {
    _id: 'd4',
    name: 'Dr. Karthik Iyer',
    title: 'BAMS, MD (Kayachikitsa)',
    specialization: 'Joint Pain & Arthritis',
    expertise: ['Kati Basti', 'Rheumatoid', 'Guggulu Therapy', 'Sports Injury'],
    problems: ['Joint & Bone', 'Chronic Pain'],
    experience: '16 Years',
    rating: 4.7,
    reviews: 734,
    consultations: '1,900+',
    languages: ['English', 'Kannada', 'Tamil'],
    nextSlot: 'Today, 7:00 PM',
    available: true,
    modes: ['video', 'phone'],
    badge: 'Ortho Specialist',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    accentColor: 'from-sky-500/20 to-blue-500/10',
    tagColor: 'bg-sky-50 text-sky-700 border-sky-200',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&h=700&auto=format&fit=crop',
  },
];

const STATS = [
  { label: 'Certified Vaidyas', value: '40+', icon: Award },
  { label: 'Consultations Done', value: '50,000+', icon: Users },
  { label: 'Avg. Rating', value: '4.9 ★', icon: Star },
  { label: 'Countries Served', value: '28', icon: Leaf },
];

const MODE_ICONS = { video: Video, phone: Phone, chat: MessageCircle };
const MODE_LABELS = { video: 'Video', phone: 'Phone', chat: 'Chat' };

// ─── Doctor Card ───────────────────────────────────────────────────────────────
function DoctorCard({ doctor, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-parchment/60 shadow-sm hover:shadow-earth transition-all duration-500 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        {/* Gradient accent layer */}
        <div className={`absolute inset-0 bg-gradient-to-br ${doctor.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`} />

        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Rating badge */}
        <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
          <Star size={12} className="text-turmeric fill-turmeric" />
          <span className="text-xs font-bold text-forest-deep">{doctor.rating}</span>
          <span className="text-[9px] text-charcoal/40">({doctor.reviews.toLocaleString()})</span>
        </div>

        {/* Specialty badge — top left */}
        <div className="absolute top-4 left-4 z-20">
          <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${doctor.badgeColor}`}>
            {doctor.badge}
          </span>
        </div>

        {/* Availability pill — bottom */}
        <div className="absolute bottom-4 left-4 z-20">
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full flex items-center gap-1.5 ${doctor.available ? 'bg-emerald-500 text-white' : 'bg-charcoal/50 text-white'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${doctor.available ? 'bg-white animate-pulse' : 'bg-white/50'}`} />
            {doctor.available ? `Next: ${doctor.nextSlot}` : `Next: ${doctor.nextSlot}`}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Name + title */}
        <div className="mb-3">
          <h3 className="font-title font-bold text-lg text-forest-deep leading-tight">{doctor.name}</h3>
          <p className="text-[10px] text-charcoal/40 font-caption tracking-wide mt-0.5">{doctor.title}</p>
          <p className="text-sm text-saffron font-medium mt-1">{doctor.specialization}</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-y border-parchment/60">
          <div className="text-center">
            <p className="font-display text-base text-forest-deep">{doctor.experience}</p>
            <p className="text-[9px] text-charcoal/40 uppercase tracking-wider">Exp.</p>
          </div>
          <div className="text-center border-x border-parchment/60">
            <p className="font-display text-base text-forest-deep">{doctor.consultations}</p>
            <p className="text-[9px] text-charcoal/40 uppercase tracking-wider">Consults</p>
          </div>
          <div className="text-center">
            <p className="font-display text-base text-forest-deep">{doctor.reviews.toLocaleString()}</p>
            <p className="text-[9px] text-charcoal/40 uppercase tracking-wider">Reviews</p>
          </div>
        </div>

        {/* Expertise chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {doctor.expertise.slice(0, 3).map(e => (
            <span key={e} className={`text-[9px] font-bold px-2.5 py-1 rounded-full border ${doctor.tagColor}`}>
              {e}
            </span>
          ))}
          {doctor.expertise.length > 3 && (
            <span className="text-[9px] text-charcoal/40 px-2.5 py-1 rounded-full border border-parchment">
              +{doctor.expertise.length - 3}
            </span>
          )}
        </div>

        {/* Consultation modes */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[9px] text-charcoal/40 uppercase tracking-wider">Via:</span>
          {doctor.modes.map(mode => {
            const Icon = MODE_ICONS[mode];
            return (
              <span key={mode} className="flex items-center gap-1 text-[9px] text-charcoal/60 bg-parchment/60 border border-parchment px-2 py-1 rounded-full">
                <Icon size={9} /> {MODE_LABELS[mode]}
              </span>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-auto flex gap-2">
          <Link
            to={`/consultation?doctor=${doctor._id}`}
            className="flex-1 text-center py-2.5 bg-forest text-parchment rounded-full text-xs font-title tracking-wider hover:bg-saffron transition-colors duration-300"
          >
            Book Consult
          </Link>
          <Link
            to={`/doctors/${doctor._id}`}
            className="px-4 py-2.5 border border-parchment text-charcoal/60 rounded-full text-xs hover:border-forest/40 hover:text-forest transition-colors duration-300"
          >
            Profile
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────
export default function FeaturedDoctorsSection() {
  return (
    <section className="py-24 bg-cream-white relative overflow-hidden">

      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-forest/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-turmeric/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 pb-8 border-b border-parchment/60">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-accent text-saffron tracking-[0.3em] text-xs uppercase mb-3 flex items-center gap-2"
            >
              <Leaf size={12} /> Certified Vaidyas
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-6xl text-forest-deep mb-3"
            >
              Consult Expert Vaidyas
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-charcoal/60 text-lg leading-relaxed"
            >
              Personalized root-cause Ayurvedic care — not symptom suppression. Speak with a certified Vaidya in minutes.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <Link
              to="/consultation"
              className="hidden md:inline-flex items-center gap-2 text-xs font-title tracking-widest uppercase text-forest/70 hover:text-forest hover:gap-4 transition-all duration-300 mt-4 md:mt-0"
            >
              View All Doctors <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Trust stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i }}
                className="bg-white border border-parchment/50 rounded-2xl p-4 flex items-center gap-3 shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-forest/5 border border-forest/10 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-forest" />
                </div>
                <div>
                  <p className="font-display text-xl text-forest-deep leading-none">{stat.value}</p>
                  <p className="text-[10px] text-charcoal/45 mt-0.5">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {DOCTORS.map((doctor, index) => (
            <DoctorCard key={doctor._id} doctor={doctor} index={index} />
          ))}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-forest rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="font-display text-3xl text-parchment mb-2">Not sure which specialist to choose?</p>
            <p className="text-parchment/60 text-sm flex items-center gap-2">
              <CheckCircle size={14} className="text-turmeric" />
              Answer 5 quick questions — we'll match you with the right Vaidya in seconds.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              to="/consultation"
              className="bg-turmeric text-white px-7 py-3 rounded-full font-title text-xs tracking-widest uppercase hover:bg-saffron transition-colors shadow-glow whitespace-nowrap"
            >
              Find My Doctor
            </Link>
            <Link
              to="/quiz"
              className="bg-transparent text-parchment/70 border border-parchment/30 px-6 py-3 rounded-full font-title text-xs tracking-widest uppercase hover:border-parchment/60 transition-colors whitespace-nowrap"
            >
              Take Dosha Quiz
            </Link>
          </div>
        </motion.div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/consultation"
            className="inline-flex items-center gap-2 bg-forest text-parchment px-8 py-3 rounded-full font-title text-xs tracking-widest uppercase shadow-leaf"
          >
            View All Doctors <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
