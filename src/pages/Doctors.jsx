import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Star, Clock, Award, Filter } from 'lucide-react';
import api from '../utils/api';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpec, setFilterSpec] = useState('All');

  const specializations = ['All', 'Skin & Hair', 'Gut Health', 'Stress & Sleep', 'Joints & Bones'];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get('/doctors');
        setDoctors(data);
      } catch (err) {
        setError('Failed to load doctors');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec = filterSpec === 'All' || doc.specialization.includes(filterSpec);
    return matchesSearch && matchesSpec;
  });

  return (
    <div className="pt-24 pb-20 bg-parchment/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display text-forest-deep mb-4">Our Ayurvedic Experts</h1>
          <p className="text-lg text-forest/80 max-w-2xl mx-auto">
            Consult with certified Vaidyas who specialize in root-cause healing.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-forest/50" size={20} />
            <input 
              type="text" 
              placeholder="Search doctors by name or specialty..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-primary-green outline-none"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {specializations.map(spec => (
              <button
                key={spec}
                onClick={() => setFilterSpec(spec)}
                className={`whitespace-nowrap px-4 py-2 rounded-full border transition-colors ${
                  filterSpec === spec 
                    ? 'bg-primary-green text-white border-primary-green' 
                    : 'bg-white text-forest border-gray-200 hover:border-primary-green'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div></div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No doctors found matching your criteria.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-leaf transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full flex items-center shadow-sm">
                    <Star className="text-turmeric-gold fill-turmeric-gold mr-1" size={12} />
                    <span className="text-xs font-bold text-forest-deep">{doctor.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-title text-forest-deep mb-1">{doctor.name}</h3>
                  <p className="text-sm text-primary-green font-medium mb-3">{doctor.specialization}</p>
                  
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center text-forest/70 text-xs">
                      <Award size={14} className="mr-2" />
                      <span>{doctor.experience} Exp</span>
                    </div>
                    {doctor.availability && doctor.availability.length > 0 && (
                      <div className="flex items-center text-forest/70 text-xs">
                        <Clock size={14} className="mr-2" />
                        <span className="text-green-600 font-medium">
                          {doctor.availability[0]?.day} - {doctor.availability[0]?.slots[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  <Link 
                    to={`/doctors/${doctor._id}`}
                    className="block w-full text-center py-2.5 bg-forest-deep text-white rounded-full text-sm font-medium hover:bg-primary-green transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
