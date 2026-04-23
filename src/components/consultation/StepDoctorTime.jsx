import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Award, Video, Phone, MessageCircle, ChevronLeft, ArrowRight, Clock } from 'lucide-react';

const DOCTORS = [
  {
    id: 'dr-ananya',
    name: 'Dr. Ananya Sharma',
    credentials: 'B.A.M.S, MD (Ayurveda)',
    specialization: 'Skin & Hair · Women\'s Health',
    experience: '15 Years',
    rating: 4.9,
    reviews: 420,
    languages: ['English', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop',
    tag: 'Top Rated',
    problems: ['Skin & Hair', "Women's Health"],
  },
  {
    id: 'dr-rajiv',
    name: 'Dr. Rajiv Menon',
    credentials: 'B.A.M.S, PG Dip. Panchakarma',
    specialization: 'Digestion · Detox · Joints',
    experience: '12 Years',
    rating: 4.8,
    reviews: 316,
    languages: ['English', 'Tamil', 'Malayalam'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop',
    tag: 'Expert',
    problems: ['Digestion & Gut', 'Joints & Bones', 'Weight Management', 'Immunity'],
  },
  {
    id: 'dr-meera',
    name: 'Dr. Meera Patel',
    credentials: 'B.A.M.S, MD (Kaya Chikitsa)',
    specialization: 'Stress · Sleep · Mental Wellness',
    experience: '10 Years',
    rating: 5.0,
    reviews: 289,
    languages: ['English', 'Hindi', 'Gujarati'],
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=400&auto=format&fit=crop',
    tag: 'Highest Rated',
    problems: ['Stress & Sleep', 'Respiratory'],
  },
  {
    id: 'dr-priya',
    name: 'Dr. Priya Nair',
    credentials: 'B.A.M.S, MS (Shalya Tantra)',
    specialization: "Women's Health · Fertility · PCOS",
    experience: '11 Years',
    rating: 4.9,
    reviews: 341,
    languages: ['English', 'Malayalam', 'Tamil'],
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop',
    tag: 'Specialist',
    problems: ["Women's Health", 'Skin & Hair'],
  },
  {
    id: 'dr-karthik',
    name: 'Dr. Karthik Iyer',
    credentials: 'B.A.M.S, PG Dip. Nidana',
    specialization: 'Joints · Bone Health · Panchakarma',
    experience: '9 Years',
    rating: 4.7,
    reviews: 198,
    languages: ['English', 'Kannada', 'Tamil'],
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop',
    tag: 'Expert',
    problems: ['Joints & Bones', 'Weight Management'],
  },
  {
    id: 'dr-sunita',
    name: 'Dr. Sunita Verma',
    credentials: 'B.A.M.S, MD (Swasthavritta)',
    specialization: 'Immunity · Respiratory · Lifestyle',
    experience: '13 Years',
    rating: 4.8,
    reviews: 276,
    languages: ['English', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=400&auto=format&fit=crop',
    tag: 'Senior Vaidya',
    problems: ['Immunity', 'Respiratory', 'Weight Management'],
  },
];

const CONSULT_TYPES = [
  { id: 'video', label: 'Video Call',   icon: Video,         desc: '45-min live session' },
  { id: 'phone', label: 'Phone Call',   icon: Phone,         desc: '30-min voice call'   },
  { id: 'chat',  label: 'Chat',         icon: MessageCircle, desc: 'Async text consult'  },
];

// Generate next 5 days
const DATES = Array.from({ length: 5 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i + 1);
  return {
    value: d.toISOString().split('T')[0],
    label: d.toLocaleDateString('en-IN', { weekday: 'short' }),
    day: d.getDate(),
    month: d.toLocaleDateString('en-IN', { month: 'short' }),
  };
});

const TIME_SLOTS = ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'];

// ─── Filter helper ─────────────────────────────────────────────────────────────
function getDoctorsForProblem(problem) {
  if (!problem) return DOCTORS;
  const matched = DOCTORS.filter(d => d.problems.includes(problem));
  return matched.length > 0 ? matched : DOCTORS;
}

// ─── Grid col class based on count ────────────────────────────────────────────
function gridCols(count) {
  if (count === 1) return 'grid-cols-1 max-w-xs mx-auto';
  if (count === 2) return 'grid-cols-1 sm:grid-cols-2';
  return 'grid-cols-1 md:grid-cols-3';
}

export default function StepDoctorTime({ data, updateData, onNext, onPrev }) {
  const visibleDoctors = getDoctorsForProblem(data.problem);
  const selectedDoc = DOCTORS.find(d => d.id === data.doctorId);

  // If previously selected doctor is no longer in the filtered list, clear them
  const doctorInList = visibleDoctors.some(d => d.id === data.doctorId);
  if (data.doctorId && !doctorInList) {
    updateData({ doctorId: null, doctorName: '', timeSlot: null });
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className="p-8 md:p-10"
    >
      {/* Header */}
      <div className="mb-6">
        <p className="font-accent text-saffron text-xs tracking-widest uppercase mb-2">Step 3 of 4</p>
        <h2 className="font-display text-3xl md:text-4xl text-forest-deep mb-2">Choose Your Vaidya</h2>
        <p className="text-charcoal/60">Select a certified Ayurvedic doctor, your preferred consultation mode, and time.</p>
      </div>

      {/* Specialist filter badge */}
      {data.problem && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-forest/8 border border-forest/20 text-forest text-xs font-medium px-4 py-2 rounded-full mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-saffron inline-block" />
          Showing Vaidyas specialising in <strong className="ml-1">{data.problem}</strong>
          <span className="ml-1 text-charcoal/40">({visibleDoctors.length} available)</span>
        </motion.div>
      )}

      {/* Doctor Cards */}
      <div className={`grid gap-4 mb-8 ${gridCols(visibleDoctors.length)}`}>
        {visibleDoctors.map((doc, i) => {
          const selected = data.doctorId === doc.id;
          return (
            <motion.button
              key={doc.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateData({ doctorId: doc.id, doctorName: doc.name, timeSlot: null, date: data.date })}
              className={`relative text-left rounded-2xl border-2 overflow-hidden transition-all duration-300
                ${selected ? 'border-forest shadow-leaf' : 'border-parchment hover:border-forest/30'}`}
            >
              {/* Doctor Image */}
              <div className="relative h-36 overflow-hidden">
                <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                {/* Tag */}
                <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-saffron text-white uppercase tracking-wide">
                  {doc.tag}
                </span>
                {/* Rating */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/90 rounded-full px-2 py-0.5">
                  <Star size={10} className="text-turmeric fill-turmeric" />
                  <span className="text-[10px] font-bold text-charcoal">{doc.rating}</span>
                </div>
                {selected && (
                  <motion.div
                    layoutId="doc-selected"
                    className="absolute inset-0 bg-forest/20 border-b-4 border-forest"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </div>

              <div className="p-3">
                <p className="font-title font-bold text-forest-deep text-sm">{doc.name}</p>
                <p className="text-[10px] text-charcoal/50 mb-1">{doc.credentials}</p>
                <p className="text-[11px] text-forest font-medium mb-2 leading-snug">{doc.specialization}</p>
                <div className="flex items-center gap-3 text-[10px] text-charcoal/50">
                  <span className="flex items-center gap-1"><Award size={10} /> {doc.experience}</span>
                  <span className="flex items-center gap-1"><Star size={10} className="text-turmeric" /> {doc.reviews} reviews</span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            {/* Consultation Type */}
            <h3 className="font-display text-lg text-forest-deep mb-3">Consultation Mode</h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {CONSULT_TYPES.map(type => {
                const active = data.consultationType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => updateData({ consultationType: type.id })}
                    className={`p-3 rounded-2xl border-2 text-center transition-all
                      ${active ? 'border-forest bg-forest/5 text-forest' : 'border-parchment text-charcoal/60 hover:border-forest/30'}`}
                  >
                    <type.icon size={20} className="mx-auto mb-1.5" />
                    <p className="text-xs font-bold">{type.label}</p>
                    <p className="text-[10px] text-charcoal/40 mt-0.5">{type.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Date Picker */}
            <h3 className="font-display text-lg text-forest-deep mb-3">Select Date</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
              {DATES.map(date => {
                const active = data.date === date.value;
                return (
                  <button
                    key={date.value}
                    onClick={() => updateData({ date: date.value, timeSlot: null })}
                    className={`shrink-0 w-16 py-3 rounded-2xl border-2 text-center transition-all
                      ${active ? 'border-forest bg-forest text-parchment' : 'border-parchment text-charcoal/70 hover:border-forest/40'}`}
                  >
                    <p className="text-[10px] font-bold uppercase">{date.label}</p>
                    <p className="text-xl font-display leading-none my-1">{date.day}</p>
                    <p className="text-[10px]">{date.month}</p>
                  </button>
                );
              })}
            </div>

            {/* Time Slots */}
            <AnimatePresence>
              {data.date && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h3 className="font-display text-lg text-forest-deep mb-3 flex items-center gap-2">
                    <Clock size={16} /> Available Slots
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
                    {TIME_SLOTS.map(slot => {
                      const active = data.timeSlot === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => updateData({ timeSlot: slot })}
                          className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all
                            ${active ? 'bg-forest border-forest text-parchment shadow-sm' : 'bg-white border-parchment text-charcoal/60 hover:border-forest/40'}`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Selection Summary */}
            {data.doctorId && data.date && data.timeSlot && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-forest/5 border border-forest/20 rounded-2xl text-sm text-forest mb-4"
              >
                📅 <strong>{selectedDoc.name}</strong> · {data.consultationType} · {new Date(data.date + 'T12:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })} at <strong>{data.timeSlot}</strong>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Nav */}
      <div className="flex justify-between pt-6 border-t border-parchment/50">
        <button onClick={onPrev} className="flex items-center gap-1.5 text-sm text-charcoal/50 hover:text-forest transition-colors">
          <ChevronLeft size={16} /> Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!data.doctorId || !data.timeSlot || !data.date}
          whileHover={data.doctorId && data.timeSlot ? { scale: 1.04 } : {}}
          whileTap={data.doctorId && data.timeSlot ? { scale: 0.97 } : {}}
          className={`flex items-center gap-2 px-8 py-3 rounded-full font-title text-sm tracking-widest transition-all duration-300
            ${data.doctorId && data.timeSlot && data.date
              ? 'bg-forest text-parchment shadow-leaf hover:bg-forest/90'
              : 'bg-charcoal/10 text-charcoal/30 cursor-not-allowed'
            }`}
        >
          CONTINUE <ArrowRight size={15} />
        </motion.button>
      </div>
    </motion.div>
  );
}
