import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronLeft, Calendar, Clock, User, Video, Phone, MessageCircle, Leaf, Sparkles } from 'lucide-react';

const TYPE_ICONS = { video: Video, phone: Phone, chat: MessageCircle };

export default function StepConfirmation({ data, updateData, onPrev, onComplete }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);
  const [errors, setErrors] = useState({});

  const TypeIcon = TYPE_ICONS[data.consultationType] || Video;

  const validate = () => {
    const e = {};
    if (!data.patientDetails.name.trim()) e.name = 'Name is required';
    if (!data.patientDetails.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\+?[\d\s\-()]{7,}$/.test(data.patientDetails.phone)) e.phone = 'Enter a valid number';
    if (data.patientDetails.email && !/\S+@\S+\.\S+/.test(data.patientDetails.email)) e.email = 'Enter a valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleBook = () => {
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBooked(true);
    }, 2000);
  };

  const setField = (field, value) => {
    updateData({ patientDetails: { ...data.patientDetails, [field]: value } });
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const formattedDate = data.date
    ? new Date(data.date + 'T12:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  // ── Booked Success Screen ──────────────────────────────────────────────────
  if (booked) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        className="p-10 md:p-14 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-forest rounded-full flex items-center justify-center mx-auto mb-6 shadow-deep"
        >
          <CheckCircle2 size={44} className="text-parchment" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="font-display text-4xl text-forest-deep mb-3">You're Booked!</h2>
          <p className="text-charcoal/70 mb-8 max-w-sm mx-auto">
            Your consultation with <strong className="text-forest">{data.doctorName}</strong> is confirmed for <strong>{formattedDate}</strong> at <strong>{data.timeSlot}</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
            {[
              { icon: '📧', text: 'Confirmation email sent' },
              { icon: '📱', text: 'SMS reminder set' },
              { icon: '🩺', text: 'Vaidya has been notified' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-parchment/50 rounded-2xl p-4 text-sm text-charcoal/70"
              >
                <span className="text-2xl block mb-1">{item.icon}</span>
                {item.text}
              </motion.div>
            ))}
          </div>
          <motion.button
            onClick={onComplete}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-forest text-parchment px-10 py-3.5 rounded-full font-title text-sm tracking-widest shadow-leaf"
          >
            GO TO HOMEPAGE
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  // ── Confirmation Form ──────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className="p-8 md:p-10"
    >
      {/* Header */}
      <div className="mb-8">
        <p className="font-accent text-saffron text-xs tracking-widest uppercase mb-2">Step 4 of 4</p>
        <h2 className="font-display text-3xl md:text-4xl text-forest-deep mb-2">Confirm Your Booking</h2>
        <p className="text-charcoal/60">Review your details and complete your free consultation booking.</p>
      </div>

      {/* Booking Summary Card */}
      <div className="bg-gradient-to-br from-forest to-forest/80 text-parchment rounded-2xl p-6 mb-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-parchment/5 rounded-bl-full pointer-events-none" />
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={14} className="text-saffron" />
          <span className="font-accent text-saffron text-xs tracking-widest uppercase">Your Consultation Summary</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <InfoRow icon={Leaf} label="Concern" value={data.problem} />
          <InfoRow icon={User} label="Vaidya" value={data.doctorName || data.doctorId?.replace('dr-', 'Dr. ')} />
          <InfoRow icon={TypeIcon} label="Mode" value={data.consultationType ? data.consultationType.charAt(0).toUpperCase() + data.consultationType.slice(1) + ' Call' : ''} />
          <InfoRow icon={Calendar} label="Date" value={formattedDate} />
          <InfoRow icon={Clock} label="Time" value={data.timeSlot} />
          <InfoRow icon={Sparkles} label="Fee" value="FREE (First session)" highlight />
        </div>
      </div>

      {/* Patient Details Form */}
      <div className="mb-6">
        <h3 className="font-display text-lg text-forest-deep mb-4">Your Contact Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name *" error={errors.name}>
            <input
              type="text"
              placeholder="e.g. Priya Sharma"
              value={data.patientDetails.name}
              onChange={e => setField('name', e.target.value)}
              className={inputCls(errors.name)}
            />
          </Field>
          <Field label="Phone Number *" error={errors.phone}>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={data.patientDetails.phone}
              onChange={e => setField('phone', e.target.value)}
              className={inputCls(errors.phone)}
            />
          </Field>
          <Field label="Email" error={errors.email}>
            <input
              type="email"
              placeholder="priya@email.com"
              value={data.patientDetails.email || ''}
              onChange={e => setField('email', e.target.value)}
              className={inputCls(errors.email)}
            />
          </Field>
          <Field label="Age">
            <input
              type="number"
              placeholder="e.g. 28"
              min="1" max="120"
              value={data.patientDetails.age || ''}
              onChange={e => setField('age', e.target.value)}
              className={inputCls(false)}
            />
          </Field>
        </div>
      </div>

      {/* Consent note */}
      <p className="text-xs text-charcoal/40 mb-7 flex gap-2">
        <span>🔒</span>
        Your information is encrypted and only shared with your assigned Vaidya. We never sell your data.
      </p>

      {/* Footer Nav */}
      <div className="flex justify-between pt-6 border-t border-parchment/50">
        <button onClick={onPrev} className="flex items-center gap-1.5 text-sm text-charcoal/50 hover:text-forest transition-colors">
          <ChevronLeft size={16} /> Back
        </button>
        <motion.button
          onClick={handleBook}
          disabled={isSubmitting}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-8 py-3 rounded-full font-title text-sm tracking-widest bg-forest text-parchment shadow-leaf hover:bg-forest/90 transition-colors disabled:opacity-60 min-w-[180px] justify-center"
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4 text-parchment" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                BOOKING...
              </motion.span>
            ) : (
              <motion.span key="book" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                <CheckCircle2 size={15} /> CONFIRM BOOKING
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function InfoRow({ icon: Icon, label, value, highlight }) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={14} className="text-parchment/50 mt-0.5 shrink-0" />
      <div>
        <p className="text-parchment/50 text-[10px] uppercase tracking-wider">{label}</p>
        <p className={`font-medium text-sm ${highlight ? 'text-saffron' : 'text-parchment'}`}>{value || '—'}</p>
      </div>
    </div>
  );
}

function Field({ label, children, error }) {
  return (
    <div>
      <label className="block text-xs font-medium text-charcoal/60 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

const inputCls = (error) =>
  `w-full px-4 py-3 rounded-2xl border text-sm text-charcoal/80 placeholder-charcoal/30 focus:outline-none focus:ring-2 transition bg-white
  ${error ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-parchment focus:border-forest/40 focus:ring-forest/10'}`;
