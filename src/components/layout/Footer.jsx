import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Newsletter logic
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#1E3A1E] to-[#0D1F0D] text-parchment pt-24 pb-8 overflow-hidden mt-20">

      {/* Texture & Mandala Watermark */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      ></div>
      <div
        className="absolute -right-64 -top-64 w-[800px] h-[800px] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 A50 50 0 1 1 49.9 0 Z' fill='none' stroke='%23F5ECD7' stroke-width='0.5'/%3E%3Cpath d='M50 10 A40 40 0 1 1 49.9 10 Z' fill='none' stroke='%23F5ECD7' stroke-width='0.5'/%3E%3Cpath d='M50 20 A30 30 0 1 1 49.9 20 Z' fill='none' stroke='%23F5ECD7' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >

        {/* Newsletter Section */}
        <div className="bg-white/5 backdrop-blur-md border border-sand-brown/20 rounded-2xl p-8 md:p-12 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-ancient-dark">
          <div className="md:w-1/2">
            <h3 className="font-display text-3xl md:text-4xl text-turmeric-gold mb-3">Stay in Balance</h3>
            <p className="font-body text-parchment/80">Join our sanctuary. Receive ancient wisdom, wellness tips, and exclusive remedies directly to your inbox.</p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full md:w-1/2 flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              required
              className="bg-parchment/10 border-sand-brown/30 text-parchment placeholder:text-parchment/50 focus:ring-turmeric-gold flex-grow"
            />
            <Button type="submit" variant="primary" className="whitespace-nowrap">Subscribe</Button>
          </form>
        </div>

        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="font-accent text-3xl text-turmeric-gold font-bold tracking-widest mb-4">VAIDYA</Link>
            <p className="font-display text-lg text-parchment/90 italic mb-4">"Ancient healing for modern life"</p>
            <p className="font-body text-sm text-parchment/70 leading-relaxed">
              Rooted in 5,000 years of Vedic wisdom, we bring you authentic remedies and holistic guidance to restore your natural harmony.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-display text-xl text-saffron-fire mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-saffron-fire hidden md:block"></span> Quick Links
            </h4>
            <ul className="space-y-4 font-body text-parchment/80">
              {['Home', 'Consultation', 'Products', 'Doctors', 'Blog'].map((link) => (
                <li key={link}>
                  <Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="group relative inline-block transition-colors duration-300 hover:text-turmeric-gold">
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-turmeric-gold transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-display text-xl text-saffron-fire mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-saffron-fire hidden md:block"></span> Services
            </h4>
            <ul className="space-y-4 font-body text-parchment/80">
              {['Skin Care', 'Hair Care', 'Digestion', 'Stress Relief', 'Immunity Boost'].map((service) => (
                <li key={service}>
                  <Link to="/products" className="group relative inline-block transition-colors duration-300 hover:text-turmeric-gold">
                    {service}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-turmeric-gold transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-display text-xl text-saffron-fire mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-saffron-fire hidden md:block"></span> Connect
            </h4>
            <ul className="space-y-4 font-body text-parchment/80 mb-8">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-turmeric-gold" />
                <span>+91 800 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-turmeric-gold" />
                <span>namaste@vaidya.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-turmeric-gold" />
                <span>Kerala, India</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[Instagram, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-parchment/5 border border-sand-brown/20 flex items-center justify-center text-parchment hover:bg-turmeric-gold hover:text-midnight-herb hover:border-turmeric-gold transition-all duration-300 hover:scale-110 hover:shadow-glow">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
              <a href="#" className="w-10 h-10 rounded-full bg-parchment/5 border border-sand-brown/20 flex items-center justify-center text-parchment hover:bg-turmeric-gold hover:text-midnight-herb hover:border-turmeric-gold transition-all duration-300 hover:scale-110 hover:shadow-glow">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Vine Divider */}
        <div className="w-full h-4 mb-8 opacity-20 flex justify-center overflow-hidden" aria-hidden="true">
          <svg viewBox="0 0 800 20" className="w-full h-full text-sand-brown" fill="none" stroke="currentColor">
            <path d="M0,10 Q20,0 40,10 T80,10 T120,10 T160,10 T200,10 T240,10 T280,10 T320,10 T360,10 T400,10 T440,10 T480,10 T520,10 T560,10 T600,10 T640,10 T680,10 T720,10 T760,10 T800,10" strokeWidth="2" />
          </svg>
        </div>

        {/* Trust Elements & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-parchment/50 font-body text-xs sm:text-sm">
          <div className="flex gap-4 mb-4 md:mb-0">
            <span className="flex items-center gap-1 border border-sand-brown/20 px-3 py-1 rounded-full"><span className="text-turmeric-gold">✓</span> AYUSH Certified</span>
            <span className="flex items-center gap-1 border border-sand-brown/20 px-3 py-1 rounded-full"><span className="text-turmeric-gold">✓</span> GMP Certified</span>
          </div>
          <div className="text-center md:text-right">
            <p className="mb-1 text-parchment/70 font-medium">Trusted by 1M+ patients worldwide</p>
            <p>© {new Date().getFullYear()} Vaidya Wellness. Ancient knowledge, lovingly preserved.</p>
          </div>
        </div>

      </motion.div>
    </footer>
  );
}
