import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Award, HeartPulse } from 'lucide-react';

const stats = [
  { id: 1, value: '500k+', label: 'Patients Healed', icon: HeartPulse },
  { id: 2, value: '150+', label: 'Verified Doctors', icon: Users },
  { id: 3, value: '25+', label: 'Years of Trust', icon: ShieldCheck },
  { id: 4, value: '100%', label: 'Natural Ingredients', icon: Award },
];

export default function TrustSection() {
  return (
    <section className="py-16 lg:py-24 bg-forest-deep text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display text-parchment mb-4 leading-tight"
          >
            Rooted in Authenticity
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-parchment/70 max-w-2xl mx-auto font-body leading-relaxed"
          >
            We adhere to the strictest Ayurvedic protocols, ensuring every consultation and product meets clinical standards and ancient traditions.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 lg:gap-12 text-center">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 flex items-center justify-center mb-5 text-turmeric-gold backdrop-blur-sm border border-white/5 group-hover:bg-white/20 transition-all duration-300">
                  <Icon size={28} className="sm:w-8 sm:h-8" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-parchment mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs lg:text-sm font-bold text-parchment/50 uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 lg:mt-24 flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        >
          {/* Mock Certifications */}
          <div className="flex items-center text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase border border-white/20 px-4 py-2 rounded-lg"><ShieldCheck size={16} className="mr-2 text-turmeric-gold" /> GMP Certified</div>
          <div className="flex items-center text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase border border-white/20 px-4 py-2 rounded-lg"><Award size={16} className="mr-2 text-turmeric-gold" /> Ayush Ministry</div>
          <div className="flex items-center text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase border border-white/20 px-4 py-2 rounded-lg"><Users size={16} className="mr-2 text-turmeric-gold" /> ISO 9001:2015</div>
        </motion.div>
      </div>
    </section>
  );
}
