import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, Calendar, Clock } from 'lucide-react';
import Button from './Button';
import api from '../../utils/api';

export default function ConsultationWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    problem: '',
    symptoms: '',
    date: '',
    time: ''
  });

  const updateData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  const submitForm = async () => {
    setSubmitting(true);
    setError('');
    try {
      // Need a doctorId. In a real app, this would be selected in a step, or auto-assigned.
      // We will fetch the first doctor to assign for demo purposes.
      const { data: doctors } = await api.get('/doctors');
      const assignedDoctorId = doctors.length > 0 ? doctors[0]._id : '60d0fe4f5311236168a109ca'; // Fallback dummy ID if DB is empty
      
      await api.post('/consultation', {
        doctorId: assignedDoctorId,
        ...formData
      });
      nextStep(); // Move to confirmation
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  const problems = [
    { id: 'skin', label: 'Skin Health' },
    { id: 'hair', label: 'Hair Care' },
    { id: 'digestion', label: 'Digestion' },
    { id: 'immunity', label: 'Immunity' },
    { id: 'stress', label: 'Stress & Sleep' },
    { id: 'other', label: 'Other' }
  ];

  const timeSlots = ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'];

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-parchment/50 relative overflow-hidden min-h-[450px] flex flex-col">
      {/* Progress Bar */}
      {step < 4 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-forest/10">
          <motion.div
            className="h-full bg-forest"
            initial={{ width: `${((step - 1) / 3) * 100}%` }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}

      <div className="flex-grow relative mt-4">
        <AnimatePresence mode="wait">
          {/* STEP 1: Select Problem */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              <h2 className="font-display text-3xl text-forest mb-2">What brings you here?</h2>
              <p className="text-charcoal/60 mb-6 font-body text-sm">Select your primary concern.</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {problems.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => updateData('problem', p.id)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                      formData.problem === p.id 
                        ? 'border-forest bg-forest/5 text-forest' 
                        : 'border-forest/20 text-charcoal/70 hover:border-forest/50'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Symptoms */}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              <h2 className="font-display text-3xl text-forest mb-2">Tell us more</h2>
              <p className="text-charcoal/60 mb-6 font-body text-sm">Briefly describe your symptoms and how long you've had them.</p>
              <textarea
                value={formData.symptoms}
                onChange={(e) => updateData('symptoms', e.target.value)}
                placeholder="e.g., I have been experiencing severe bloating after meals for the past 2 months..."
                className="flex-grow w-full rounded-xl border border-forest/30 bg-transparent p-4 text-sm focus:outline-none focus:ring-2 focus:ring-forest min-h-[160px] resize-none"
              />
            </motion.div>
          )}

          {/* STEP 3: Book Slot */}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              <h2 className="font-display text-3xl text-forest mb-2">Choose a Slot</h2>
              <p className="text-charcoal/60 mb-6 font-body text-sm">Select a convenient time for your consultation.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-forest mb-2">
                    <Calendar className="w-4 h-4 mr-2" /> Date
                  </label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => updateData('date', e.target.value)}
                    className="w-full h-12 rounded-xl border border-forest/30 bg-transparent px-4 text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-forest mb-2">
                    <Clock className="w-4 h-4 mr-2" /> Time
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => updateData('time', time)}
                        className={`p-2 rounded-xl border text-sm font-medium transition-all ${
                          formData.time === time 
                            ? 'border-forest bg-forest/5 text-forest' 
                            : 'border-forest/20 text-charcoal/70 hover:border-forest/50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Confirmation */}
          {step === 4 && (
            <motion.div
              key="step4"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col items-center justify-center text-center"
            >
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="text-forest mb-6"
              >
                <CheckCircle className="w-20 h-20" />
              </motion.div>
              <h2 className="font-display text-3xl text-forest mb-2">Consultation Booked!</h2>
              <p className="text-charcoal/70 font-body">
                We've received your request. A confirmation email will be sent to you shortly with the meeting link.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      {step < 4 && (
        <div className="mt-8 pt-4 border-t border-forest/10 flex justify-between items-center shrink-0">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center text-sm font-medium transition-opacity ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-charcoal/60 hover:text-forest'}`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </button>
          
          <Button 
            onClick={step === 3 ? submitForm : nextStep}
            disabled={
              submitting ||
              (step === 1 && !formData.problem) || 
              (step === 2 && formData.symptoms.trim().length < 5) || 
              (step === 3 && (!formData.date || !formData.time))
            }
            className="flex items-center"
          >
            {step === 3 ? (submitting ? 'Booking...' : 'Confirm Booking') : 'Next'} <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
