import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft } from 'lucide-react';

const SEVERITY = [
  { label: 'None',     color: 'bg-charcoal/10 text-charcoal/50',  ring: 'ring-charcoal/20' },
  { label: 'Mild',     color: 'bg-sky-100 text-sky-700',           ring: 'ring-sky-300'      },
  { label: 'Moderate', color: 'bg-amber-100 text-amber-700',       ring: 'ring-amber-300'    },
  { label: 'Severe',   color: 'bg-red-100 text-red-700',           ring: 'ring-red-300'      },
];

const SYMPTOM_GROUPS = {
  'Skin & Hair':        ['Dry / Flaky Skin', 'Acne & Breakouts', 'Hair Fall', 'Dull Complexion', 'Scalp Itchiness'],
  'Digestion & Gut':    ['Bloating / Gas', 'Acidity / Heartburn', 'Irregular Bowels', 'Nausea', 'Low Appetite'],
  'Stress & Sleep':     ['Anxiety / Worry', 'Insomnia', 'Brain Fog', 'Mood Swings', 'Low Motivation'],
  'Weight Management':  ['Unexplained Weight Gain', 'Slow Metabolism', 'Sugar Cravings', 'Low Energy', 'Bloating'],
  "Joints & Bones":     ['Joint Pain', 'Morning Stiffness', 'Swelling', 'Reduced Mobility', 'Backache'],
  "Women's Health":     ['Irregular Periods', 'PCOS Symptoms', 'Hormonal Acne', 'Mood Swings', 'Fatigue'],
  'Respiratory':        ['Frequent Cold', 'Allergies', 'Chest Tightness', 'Sinus Congestion', 'Breathlessness'],
  'Immunity':           ['Frequent Illness', 'Slow Recovery', 'Low Energy', 'Weak Digestion', 'Fatigue'],
};

const FALLBACK = ['Fatigue / Low Energy', 'Dry Skin', 'Bloating', 'Anxiety', 'Joint Pain', 'Insomnia'];

export default function StepSymptoms({ data, updateData, onNext, onPrev }) {
  const symptoms = SYMPTOM_GROUPS[data.problem] || FALLBACK;

  const setSeverity = (symptom, level) =>
    updateData({ symptoms: { ...data.symptoms, [symptom]: level } });

  const answered = Object.keys(data.symptoms).length;

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
        <p className="font-accent text-saffron text-xs tracking-widest uppercase mb-2">Step 2 of 4</p>
        <h2 className="font-display text-3xl md:text-4xl text-forest-deep mb-2">
          {data.problem ? `Your ${data.problem} Symptoms` : 'Rate Your Symptoms'}
        </h2>
        <p className="text-charcoal/60">Tap the severity that best describes each symptom. This helps your Vaidya prepare.</p>
      </div>

      {/* Severity Legend */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SEVERITY.map(s => (
          <span key={s.label} className={`text-xs font-bold px-3 py-1 rounded-full ${s.color}`}>{s.label}</span>
        ))}
      </div>

      {/* Symptom Cards */}
      <div className="space-y-3 mb-6">
        {symptoms.map((symptom, i) => {
          const current = data.symptoms[symptom];
          return (
            <motion.div
              key={symptom}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
              className="bg-parchment/30 rounded-2xl border border-parchment p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="font-medium text-forest-deep text-sm">{symptom}</p>
                <div className="flex gap-2">
                  {SEVERITY.map(s => (
                    <button
                      key={s.label}
                      onClick={() => setSeverity(symptom, s.label)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border
                        ${current === s.label
                          ? `${s.color} ring-2 ${s.ring} scale-105 shadow-sm border-transparent`
                          : 'bg-white border-parchment text-charcoal/50 hover:border-forest/30'
                        }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Micro progress bar */}
              <AnimatePresence>
                {current && current !== 'None' && (
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    className="mt-2 h-0.5 rounded-full origin-left bg-gradient-to-r from-sky-300 via-amber-300 to-red-400"
                    style={{
                      width: current === 'Mild' ? '33%' : current === 'Moderate' ? '66%' : '100%',
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-forest-deep mb-2">
          Additional Notes <span className="text-charcoal/40 font-normal">(optional)</span>
        </label>
        <textarea
          value={data.additionalDetails || ''}
          onChange={(e) => updateData({ additionalDetails: e.target.value })}
          placeholder="Describe when symptoms started, known triggers, or anything else relevant..."
          className="w-full h-28 px-4 py-3 border border-parchment rounded-2xl text-sm text-charcoal/80 bg-white focus:outline-none focus:border-forest/40 focus:ring-2 focus:ring-forest/10 resize-none placeholder-charcoal/30 transition"
        />
      </div>

      {/* Progress hint */}
      <p className="text-xs text-charcoal/40 mb-6">
        {answered} of {symptoms.length} symptoms rated
        {answered > 0 && <span className="text-forest ml-1">— keep going!</span>}
      </p>

      {/* Footer Nav */}
      <div className="flex justify-between pt-6 border-t border-parchment/50">
        <button onClick={onPrev} className="flex items-center gap-1.5 text-sm text-charcoal/50 hover:text-forest transition-colors">
          <ChevronLeft size={16} /> Back
        </button>
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-8 py-3 rounded-full font-title text-sm tracking-widest bg-forest text-parchment shadow-leaf hover:bg-forest/90 transition-colors"
        >
          CONTINUE <ArrowRight size={15} />
        </motion.button>
      </div>
    </motion.div>
  );
}
