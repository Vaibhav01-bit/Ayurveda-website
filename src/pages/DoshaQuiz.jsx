import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Flame, Droplets, ChevronLeft, RotateCcw, ArrowRight, Leaf, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Data ─────────────────────────────────────────────────────────────────────

const questions = [
  {
    id: 1,
    category: "Body & Build",
    icon: "🌿",
    question: "How would you describe your natural body frame?",
    options: [
      { text: "Thin and lean — I find it hard to gain weight", value: "vata", emoji: "🍃" },
      { text: "Medium and athletic — I gain or lose weight easily", value: "pitta", emoji: "🔥" },
      { text: "Broad and sturdy — I gain weight and hold it", value: "kapha", emoji: "💧" },
    ],
  },
  {
    id: 2,
    category: "Skin & Texture",
    icon: "✨",
    question: "What best describes your skin?",
    options: [
      { text: "Dry, rough, or flaky — especially in cold weather", value: "vata", emoji: "🍃" },
      { text: "Warm, oily, or prone to redness and breakouts", value: "pitta", emoji: "🔥" },
      { text: "Thick, smooth, and moist — rarely dry", value: "kapha", emoji: "💧" },
    ],
  },
  {
    id: 3,
    category: "Digestion",
    icon: "🌾",
    question: "How would you describe your digestion?",
    options: [
      { text: "Irregular — prone to bloating, gas, or constipation", value: "vata", emoji: "🍃" },
      { text: "Strong and sharp — I get acidity if I miss meals", value: "pitta", emoji: "🔥" },
      { text: "Slow and steady — I rarely feel hungry and gain weight easily", value: "kapha", emoji: "💧" },
    ],
  },
  {
    id: 4,
    category: "Mind & Energy",
    icon: "🧠",
    question: "How would you describe your energy and mental patterns?",
    options: [
      { text: "Bursts of energy followed by fatigue — mind races at night", value: "vata", emoji: "🍃" },
      { text: "Focused and driven — I push hard until I burn out", value: "pitta", emoji: "🔥" },
      { text: "Calm and steady — I take time to start but have great endurance", value: "kapha", emoji: "💧" },
    ],
  },
  {
    id: 5,
    category: "Stress Response",
    icon: "🌊",
    question: "When under stress, you typically feel:",
    options: [
      { text: "Anxious, scattered, or overwhelmed with racing thoughts", value: "vata", emoji: "🍃" },
      { text: "Irritable, intense, or impatient with others", value: "pitta", emoji: "🔥" },
      { text: "Withdrawn, sluggish, or emotionally heavy", value: "kapha", emoji: "💧" },
    ],
  },
  {
    id: 6,
    category: "Sleep & Rest",
    icon: "🌙",
    question: "How is your sleep?",
    options: [
      { text: "Light and disrupted — I wake easily and often", value: "vata", emoji: "🍃" },
      { text: "Moderate — I sleep well but wake if stressed", value: "pitta", emoji: "🔥" },
      { text: "Deep and long — I love sleeping and feel groggy on waking", value: "kapha", emoji: "💧" },
    ],
  },
  {
    id: 7,
    category: "Climate Preference",
    icon: "☀️",
    question: "Which climate makes you feel best?",
    options: [
      { text: "Warm and humid — cold and dry climates drain me", value: "vata", emoji: "🍃" },
      { text: "Cool and open — I overheat quickly", value: "pitta", emoji: "🔥" },
      { text: "Warm and dry — damp cold weather slows me down", value: "kapha", emoji: "💧" },
    ],
  },
];

const doshaProfiles = {
  vata: {
    name: "Vata",
    sanskrit: "वात",
    element: "Air & Space",
    tagline: "Creative, Dynamic & Free-Spirited",
    color: "from-slate-400 to-sky-400",
    bgLight: "bg-sky-50",
    border: "border-sky-200",
    accent: "text-sky-600",
    icon: Wind,
    iconColor: "text-sky-500",
    description:
      "You are predominantly Vata — the force of movement, creativity, and change. Your mind is quick and imaginative, but you can sometimes feel scattered or anxious. Grounding practices, warm nourishment, and a consistent routine are your greatest allies.",
    qualities: ["Creative & Artistic", "Quick Thinking", "Naturally Slim", "Adaptable"],
    imbalances: ["Anxiety & Worry", "Dry Skin & Hair", "Irregular Digestion", "Insomnia"],
    foods: ["Warm & Cooked Meals", "Ghee & Sesame Oil", "Sweet Root Vegetables", "Spiced Herbal Teas"],
    herbs: ["Ashwagandha", "Shatavari", "Brahmi", "Triphala"],
    practices: ["Abhyanga (Oil Massage)", "Yoga Nidra", "Warm Baths", "Gentle Morning Routine"],
    color_raw: "#38bdf8",
  },
  pitta: {
    name: "Pitta",
    sanskrit: "पित्त",
    element: "Fire & Water",
    tagline: "Focused, Passionate & Driven",
    color: "from-amber-400 to-orange-500",
    bgLight: "bg-amber-50",
    border: "border-amber-200",
    accent: "text-amber-600",
    icon: Flame,
    iconColor: "text-amber-500",
    description:
      "You are predominantly Pitta — the force of transformation, intelligence, and purpose. You are sharp, goal-oriented, and have a strong metabolism. When balanced, you lead with clarity. When imbalanced, you can become irritable or over-critical. Cooling and calming practices restore your fire.",
    qualities: ["Sharp Intellect", "Strong Leadership", "Excellent Metabolism", "Goal-Oriented"],
    imbalances: ["Anger & Irritability", "Skin Inflammation", "Acid Reflux", "Perfectionism"],
    foods: ["Cooling Foods & Salads", "Coconut & Coriander", "Sweet Fruits", "Mint Herbal Teas"],
    herbs: ["Amalaki", "Neem", "Guduchi", "Rose Petals"],
    practices: ["Moonlit Walks", "Cooling Pranayama", "Creative Arts", "Meditation"],
    color_raw: "#f59e0b",
  },
  kapha: {
    name: "Kapha",
    sanskrit: "कफ",
    element: "Earth & Water",
    tagline: "Nurturing, Stable & Compassionate",
    color: "from-emerald-400 to-teal-500",
    bgLight: "bg-emerald-50",
    border: "border-emerald-200",
    accent: "text-emerald-600",
    icon: Droplets,
    iconColor: "text-emerald-500",
    description:
      "You are predominantly Kapha — the force of stability, nourishment, and love. You have deep loyalty, natural endurance, and a calm presence that others find deeply comforting. When balanced, you are the foundation everyone leans on. Stimulation, warmth, and movement keep your energy flowing.",
    qualities: ["Deeply Compassionate", "Excellent Endurance", "Calm Presence", "Strong Immunity"],
    imbalances: ["Weight Gain", "Sluggish Digestion", "Emotional Heaviness", "Oversleeping"],
    foods: ["Light & Spiced Meals", "Bitter Greens", "Ginger & Black Pepper", "Warm Herbal Teas"],
    herbs: ["Trikatu", "Guggulu", "Tulsi", "Cinnamon"],
    practices: ["Vigorous Exercise", "Dry Brushing", "Cold Showers", "Sunrise Routine"],
    color_raw: "#10b981",
  },
};

// ─── Sub-Components ────────────────────────────────────────────────────────────

function QuizIntro({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="text-center max-w-2xl mx-auto"
    >
      {/* Ornamental Sanskrit label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-accent text-saffron tracking-[0.3em] text-xs uppercase mb-6"
      >
        ॐ Discover Your Prakriti
      </motion.p>

      <h1 className="font-display text-5xl md:text-6xl text-forest mb-6 leading-tight">
        What Is Your<br />
        <span className="italic text-saffron">Ayurvedic Dosha?</span>
      </h1>

      <p className="text-lg text-charcoal/70 leading-relaxed mb-10 max-w-xl mx-auto">
        In Ayurveda, your unique mind-body constitution is called your <strong className="text-forest">Prakriti</strong>. 
        Knowing your Dosha unlocks the precise herbs, diet, and lifestyle for your optimal health.
      </p>

      {/* Dosha Preview Trio */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { name: "Vata", sub: "Air & Space", icon: Wind, color: "bg-sky-100 text-sky-600 border-sky-200" },
          { name: "Pitta", sub: "Fire & Water", icon: Flame, color: "bg-amber-100 text-amber-600 border-amber-200" },
          { name: "Kapha", sub: "Earth & Water", icon: Droplets, color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
        ].map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.15 }}
            className={`p-4 rounded-2xl border ${d.color} bg-opacity-50`}
          >
            <d.icon size={28} className="mx-auto mb-2" strokeWidth={1.5} />
            <p className="font-display text-lg">{d.name}</p>
            <p className="text-xs opacity-70 mt-0.5">{d.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="bg-forest text-parchment px-10 py-4 rounded-full font-title text-sm tracking-widest shadow-lg shadow-forest/20 flex items-center gap-2"
        >
          BEGIN THE QUIZ <ArrowRight size={16} />
        </motion.button>
        <p className="text-charcoal/50 text-sm">7 questions · ~2 minutes</p>
      </div>
    </motion.div>
  );
}

function QuizQuestion({ question, questionIndex, total, onAnswer, onBack }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (value) => {
    setSelected(value);
    setTimeout(() => onAnswer(value), 400);
  };

  const progress = ((questionIndex) / total) * 100;

  return (
    <motion.div
      key={questionIndex}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ type: "spring", stiffness: 250, damping: 28 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-charcoal/50 mb-2 font-caption tracking-wider">
          <span>{question.category}</span>
          <span>{questionIndex + 1} / {total}</span>
        </div>
        <div className="h-1.5 bg-charcoal/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-forest to-saffron rounded-full"
            initial={{ width: `${progress}%` }}
            animate={{ width: `${((questionIndex + 1) / total) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl shadow-earth border border-parchment overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-forest to-forest/80 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 text-[120px] flex items-center justify-center select-none pointer-events-none">
            {question.icon}
          </div>
          <p className="font-accent text-saffron text-xs tracking-widest uppercase mb-3 relative z-10">
            Question {questionIndex + 1}
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-parchment leading-snug relative z-10">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="p-6 space-y-3">
          {question.options.map((option, idx) => (
            <motion.button
              key={idx}
              onClick={() => handleSelect(option.value)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              disabled={selected !== null}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-4 group
                ${selected === option.value
                  ? 'bg-forest border-forest text-parchment scale-[1.02] shadow-leaf'
                  : selected !== null
                  ? 'opacity-40 border-charcoal/10 bg-charcoal/5'
                  : 'border-parchment bg-parchment/40 hover:border-forest/40 hover:bg-forest/5 hover:scale-[1.01]'
                }`}
            >
              <span className="text-2xl shrink-0 transition-transform group-hover:scale-110">{option.emoji}</span>
              <span className="font-body text-base leading-snug">{option.text}</span>
              {selected === option.value && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto shrink-0 w-6 h-6 bg-saffron rounded-full flex items-center justify-center text-white text-xs font-bold"
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Back button */}
      {questionIndex > 0 && (
        <button
          onClick={onBack}
          className="mt-5 flex items-center gap-1.5 text-sm text-charcoal/50 hover:text-forest transition-colors mx-auto"
        >
          <ChevronLeft size={16} /> Go back
        </button>
      )}
    </motion.div>
  );
}

function ResultCard({ dosha, onRetake }) {
  const profile = doshaProfiles[dosha];
  const DoshaIcon = profile.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Result Hero */}
      <div className={`rounded-3xl overflow-hidden shadow-deep mb-8`}>
        <div className={`bg-gradient-to-br ${profile.color} p-12 text-white text-center relative overflow-hidden`}>
          {/* Background glow */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <DoshaIcon size={300} strokeWidth={0.3} />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/70 text-sm tracking-[0.3em] uppercase font-accent mb-2"
          >
            Your Primary Dosha
          </motion.p>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <h1 className="font-display text-7xl md:text-8xl mb-1">{profile.name}</h1>
            <p className="font-sanskrit text-3xl text-white/60 mb-4">{profile.sanskrit}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Sparkles size={14} />
              <span className="text-sm font-title tracking-wide">{profile.element}</span>
            </div>
            <p className="mt-4 text-lg text-white/90 font-display italic">{profile.tagline}</p>
          </motion.div>
        </div>

        {/* Description */}
        <div className={`${profile.bgLight} px-8 py-8 border-t-0`}>
          <p className="text-charcoal/80 leading-relaxed text-center max-w-xl mx-auto">
            {profile.description}
          </p>
        </div>
      </div>

      {/* Detail Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {/* Qualities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`bg-white rounded-2xl p-6 border ${profile.border} shadow-sm`}
        >
          <h3 className={`font-display text-xl ${profile.accent} mb-4 flex items-center gap-2`}>
            <Leaf size={18} strokeWidth={1.5} /> Your Natural Gifts
          </h3>
          <ul className="space-y-2">
            {profile.qualities.map((q, i) => (
              <li key={i} className="flex items-center gap-2 text-charcoal/70 text-sm">
                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${profile.color} shrink-0`}></span>
                {q}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Imbalances */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 border border-parchment shadow-sm"
        >
          <h3 className="font-display text-xl text-charcoal/70 mb-4 flex items-center gap-2">
            <Wind size={18} strokeWidth={1.5} /> Watch Out For
          </h3>
          <ul className="space-y-2">
            {profile.imbalances.map((q, i) => (
              <li key={i} className="flex items-center gap-2 text-charcoal/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-charcoal/20 shrink-0"></span>
                {q}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Herbs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className={`bg-white rounded-2xl p-6 border ${profile.border} shadow-sm`}
        >
          <h3 className={`font-display text-xl ${profile.accent} mb-4`}>🌿 Recommended Herbs</h3>
          <div className="flex flex-wrap gap-2">
            {profile.herbs.map((h, i) => (
              <span key={i} className={`px-3 py-1 rounded-full text-xs font-caption ${profile.bgLight} ${profile.accent} border ${profile.border}`}>
                {h}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Practices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-6 border border-parchment shadow-sm"
        >
          <h3 className="font-display text-xl text-charcoal/80 mb-4">🕉️ Daily Practices</h3>
          <ul className="space-y-2">
            {profile.practices.map((p, i) => (
              <li key={i} className="flex items-center gap-2 text-charcoal/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0"></span>
                {p}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Foods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className={`bg-white rounded-2xl p-6 border ${profile.border} shadow-sm mb-8`}
      >
        <h3 className={`font-display text-xl ${profile.accent} mb-4`}>🍽️ Nourishing Foods for You</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {profile.foods.map((f, i) => (
            <div key={i} className={`p-3 rounded-xl text-center text-sm text-charcoal/80 ${profile.bgLight} border ${profile.border}`}>
              {f}
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link to="/consultation">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-forest text-parchment px-8 py-4 rounded-full font-title text-sm tracking-widest shadow-lg shadow-forest/20 flex items-center gap-2"
          >
            GET MY {dosha.toUpperCase()} PLAN <ArrowRight size={16} />
          </motion.button>
        </Link>
        <button
          onClick={onRetake}
          className="flex items-center gap-2 text-charcoal/60 hover:text-forest transition-colors text-sm font-caption tracking-wide"
        >
          <RotateCcw size={15} /> Retake Quiz
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

const PHASE = { INTRO: 'intro', QUIZ: 'quiz', RESULT: 'result' };

export default function DoshaQuiz() {
  const [phase, setPhase] = useState(PHASE.INTRO);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setPhase(PHASE.RESULT);
    }
  };

  const handleBack = () => {
    setAnswers(answers.slice(0, -1));
    setStep(step - 1);
  };

  const handleRetake = () => {
    setAnswers([]);
    setStep(0);
    setPhase(PHASE.INTRO);
  };

  const calculateResult = () => {
    const counts = answers.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  };

  return (
    <div className="min-h-screen bg-parchment relative overflow-hidden">
      {/* Ambient background gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-saffron/5 blur-3xl -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-forest/5 blur-3xl translate-y-1/3 -translate-x-1/3"></div>
      </div>

      <div className="relative z-10 pt-28 pb-20 px-4 min-h-screen flex items-start justify-center">
        <AnimatePresence mode="wait">
          {phase === PHASE.INTRO && (
            <motion.div key="intro" className="w-full">
              <QuizIntro onStart={() => setPhase(PHASE.QUIZ)} />
            </motion.div>
          )}

          {phase === PHASE.QUIZ && (
            <motion.div key={`q-${step}`} className="w-full flex justify-center">
              <QuizQuestion
                question={questions[step]}
                questionIndex={step}
                total={questions.length}
                onAnswer={handleAnswer}
                onBack={handleBack}
              />
            </motion.div>
          )}

          {phase === PHASE.RESULT && (
            <motion.div key="result" className="w-full flex justify-center">
              <ResultCard dosha={calculateResult()} onRetake={handleRetake} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
