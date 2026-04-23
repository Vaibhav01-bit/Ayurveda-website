import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StepProblem from '../components/consultation/StepProblem';
import StepSymptoms from '../components/consultation/StepSymptoms';
import StepDoctorTime from '../components/consultation/StepDoctorTime';
import StepConfirmation from '../components/consultation/StepConfirmation';
import { Leaf, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Problem',       icon: '🌿', desc: 'Primary concern' },
  { id: 2, title: 'Symptoms',      icon: '📋', desc: 'Rate severity'   },
  { id: 3, title: 'Doctor & Time', icon: '🩺', desc: 'Pick a Vaidya'   },
  { id: 4, title: 'Confirm',       icon: '✅', desc: 'Your details'    },
];

export default function Consultation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Pre-fill from Treatment page deep-link (?problem=Stress+%26+Sleep&treatment=Shirodhara)
  const prefilledProblem = searchParams.get('problem') || '';

  const [currentStep, setCurrentStep] = useState(prefilledProblem ? 2 : 1);
  const [data, setData] = useState({
    problem: prefilledProblem,
    symptoms: {},
    additionalDetails: '',
    doctorId: null,
    doctorName: '',
    consultationType: 'video',
    date: '',
    timeSlot: null,
    patientDetails: { name: '', phone: '', email: '', age: '' },
  });

  const updateData = (patch) => setData(prev => ({ ...prev, ...patch }));
  const next = () => setCurrentStep(s => Math.min(s + 1, STEPS.length));
  const prev = () => setCurrentStep(s => Math.max(s - 1, 1));
  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-cream-white relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-saffron/4 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4 z-0" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-forest/4 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/4 z-0" />

      <div className="relative z-10 pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <p className="font-accent text-saffron tracking-[0.3em] text-xs uppercase mb-2 flex items-center justify-center gap-2">
              <Leaf size={12} /> Free First Consultation
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-forest-deep">Book Your Vaidya</h1>
          </motion.div>

          {/* Step Tracker */}
          <div className="mb-10 px-2">
            <div className="relative flex items-center justify-between">
              {/* Track line */}
              <div className="absolute left-0 right-0 top-5 h-0.5 bg-parchment z-0" />
              <motion.div
                className="absolute left-0 top-5 h-0.5 bg-forest z-0 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{ width: '100%' }}
              />

              {STEPS.map((step) => {
                const done = currentStep > step.id;
                const active = currentStep === step.id;
                return (
                  <div key={step.id} className="relative flex flex-col items-center z-10">
                    <motion.div
                      animate={{
                        scale: active ? 1.15 : 1,
                        backgroundColor: done ? '#3B5E3A' : active ? '#1E3A1E' : '#F5ECD7',
                        borderColor: done || active ? 'transparent' : '#C8A97E',
                      }}
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-sm mb-2 transition-colors"
                    >
                      {done
                        ? <CheckCircle2 size={18} className="text-parchment" />
                        : <span className={`text-base ${active ? 'text-parchment' : 'text-charcoal/50'}`}>{step.icon}</span>
                      }
                    </motion.div>
                    <span className={`text-[10px] font-caption font-bold tracking-wide text-center leading-tight ${active ? 'text-forest' : done ? 'text-forest/70' : 'text-charcoal/35'}`}>
                      {step.title}
                    </span>
                    <span className="hidden md:block text-[9px] text-charcoal/35 mt-0.5">{step.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Card */}
          <div className="bg-white rounded-3xl shadow-earth border border-parchment/30 overflow-hidden">
            <AnimatePresence mode="wait">
              {currentStep === 1 && <StepProblem    key="s1" data={data} updateData={updateData} onNext={next} />}
              {currentStep === 2 && <StepSymptoms   key="s2" data={data} updateData={updateData} onNext={next} onPrev={prev} />}
              {currentStep === 3 && <StepDoctorTime key="s3" data={data} updateData={updateData} onNext={next} onPrev={prev} />}
              {currentStep === 4 && <StepConfirmation key="s4" data={data} updateData={updateData} onPrev={prev} onComplete={() => navigate('/')} />}
            </AnimatePresence>
          </div>

          {/* Trust Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-charcoal/50"
          >
            {['🔒 100% Confidential', '🏅 Certified Vaidyas', '📹 Secure Video Call', '💚 Free First Session'].map(t => (
              <span key={t}>{t}</span>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
