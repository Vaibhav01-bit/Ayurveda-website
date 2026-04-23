import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Award, MapPin, GraduationCap, ArrowLeft, Calendar } from 'lucide-react';
import api from '../utils/api';

export default function DoctorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await api.get(`/doctors/${id}`);
        setDoctor(data);
      } catch (err) {
        setError('Doctor not found');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleBook = () => {
    if (selectedSlot) {
      // Pass the doctor ID to the consultation wizard
      navigate(`/consultation?doctor=${doctor._id}&slot=${selectedSlot}`);
    }
  };

  if (loading) {
    return <div className="pt-24 pb-20 bg-white min-h-screen flex justify-center"><div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (error || !doctor) {
    return (
      <div className="pt-24 pb-20 bg-white min-h-screen text-center">
        <h2 className="text-2xl text-red-500 mb-4">{error}</h2>
        <Link to="/doctors" className="text-primary-green underline">Return to Doctors</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/doctors" className="inline-flex items-center text-forest/60 hover:text-primary-green mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Doctors
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Image and Booking */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-earth">
              <img src={doctor.image} alt={doctor.name} className="w-full h-auto object-cover aspect-square" />
            </div>

            <div className="bg-parchment/30 rounded-2xl p-6 border border-parchment">
              <h3 className="font-title text-xl text-forest-deep mb-4 flex items-center">
                <Calendar className="mr-2 text-primary-green" size={20} /> Book Consultation
              </h3>
              
              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium text-forest/70">Available Slots</p>
                <div className="grid grid-cols-2 gap-2">
                  {doctor.availability && doctor.availability.length > 0 && doctor.availability[0].slots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 text-sm rounded-lg border transition-all ${
                        selectedSlot === slot
                          ? 'bg-primary-green text-white border-primary-green shadow-sm'
                          : 'bg-white text-forest border-gray-200 hover:border-primary-green'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleBook}
                disabled={!selectedSlot}
                className={`w-full py-3 rounded-full font-medium transition-colors ${
                  selectedSlot
                    ? 'bg-forest-deep text-white hover:bg-primary-green shadow-md'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Proceed to Book
              </button>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-2">
            <div className="border-b border-parchment pb-8 mb-8">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-4xl font-display text-forest-deep">{doctor.name}</h1>
                <div className="bg-turmeric-gold/10 px-3 py-1 rounded-full flex items-center text-turmeric-gold">
                  <Star className="fill-turmeric-gold mr-1" size={16} />
                  <span className="font-bold">{doctor.rating}</span>
                </div>
              </div>
              <p className="text-xl text-primary-green font-medium mb-6">{doctor.specialization}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-forest/70">
                <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <Award size={16} className="mr-2 text-primary-green" /> {doctor.experience} Exp
                </div>
                {doctor.languages && (
                  <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <GraduationCap size={16} className="mr-2 text-primary-green" /> {doctor.languages.join(', ')}
                  </div>
                )}
                <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <MapPin size={16} className="mr-2 text-primary-green" /> Online Video Consultation
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-2xl font-display text-forest-deep mb-3">About the Doctor</h3>
                <p className="text-forest/80 leading-relaxed font-body whitespace-pre-line">
                  {doctor.bio}
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-display text-forest-deep mb-3">Consultation Fee</h3>
                <p className="text-forest/80 leading-relaxed font-body font-medium">
                  ${doctor.consultationFee} per session
                </p>
              </section>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
