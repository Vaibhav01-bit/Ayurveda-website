import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const PROBLEMS = [
  { label: 'Skin & Hair',        icon: '✨', desc: 'Acne, dryness, hair fall'      },
  { label: 'Digestion & Gut',    icon: '🌾', desc: 'Bloating, IBS, acidity'        },
  { label: 'Stress & Sleep',     icon: '🌙', desc: 'Anxiety, insomnia, fatigue'    },
  { label: 'Weight Management',  icon: '⚖️', desc: 'Metabolism, obesity, cravings' },
  { label: 'Joints & Bones',     icon: '🦴', desc: 'Arthritis, stiffness, pain'    },
  { label: "Women's Health",     icon: '🌸', desc: 'PCOS, hormones, fertility'     },
  { label: 'Respiratory',        icon: '🌬️', desc: 'Asthma, allergies, sinusitis'  },
  { label: 'Immunity',           icon: '🛡️', desc: 'Frequent illness, low vitality' },
];

export default function StepProblem({ data, updateData, onNext }) {
  const [hovered, setHovered] = useState(null);

  const select = (label) => updateData({ problem: label });

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
  };

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
        <p className="font-accent text-saffron text-xs tracking-widest uppercase mb-2">Step 1 of 4</p>
        <h2 className="font-display text-3xl md:text-4xl text-forest-deep mb-2">What brings you here?</h2>
        <p className="text-charcoal/60">Select your primary health concern so we can match you with the right Vaidya.</p>
      </div>

      {/* Problem Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {PROBLEMS.map((prob, i) => {
          const selected = data.problem === prob.label;
          return (
            <motion.button
              key={prob.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => select(prob.label)}
              onMouseEnter={() => setHovered(prob.label)}
              onMouseLeave={() => setHovered(null)}
              className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-300 overflow-hidden
                ${selected
                  ? 'border-forest bg-forest text-parchment shadow-leaf'
                  : 'border-parchment bg-parchment/30 hover:border-forest/40 hover:bg-forest/5 text-forest'
                }`}
            >
              {/* Glow on selected */}
              {selected && (
                <motion.div
                  layoutId="problem-glow"
                  className="absolute inset-0 bg-forest/20 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
              <span className="text-2xl block mb-2 relative z-10">{prob.icon}</span>
              <p className={`font-title font-bold text-sm mb-0.5 relative z-10 ${selected ? 'text-parchment' : 'text-forest-deep'}`}>
                {prob.label}
              </p>
              <p className={`text-[10px] leading-snug relative z-10 ${selected ? 'text-parchment/70' : 'text-charcoal/50'}`}>
                {prob.desc}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Selected feedback */}
      <AnimatedSelection label={data.problem} />

      {/* Footer Nav */}
      <div className="flex justify-end pt-6 border-t border-parchment/50">
        <motion.button
          onClick={onNext}
          disabled={!data.problem}
          whileHover={data.problem ? { scale: 1.04 } : {}}
          whileTap={data.problem ? { scale: 0.97 } : {}}
          className={`flex items-center gap-2 px-8 py-3 rounded-full font-title text-sm tracking-widest transition-all duration-300
            ${data.problem
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

function AnimatedSelection({ label }) {
  return (
    <div className="h-8 mb-2">
      {label ? (
        <motion.p
          key={label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-forest font-medium flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-saffron inline-block" />
          Selected: <strong>{label}</strong>
        </motion.p>
      ) : (
        <p className="text-xs text-charcoal/35 italic">No concern selected yet</p>
      )}
    </div>
  );
}
