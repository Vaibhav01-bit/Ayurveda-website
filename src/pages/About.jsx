import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Droplet, Sun, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const vineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const timelineEvents = [
    { year: '5000 BCE', title: 'The Origins of Healing', desc: 'Ancient Vedic texts first described the medicinal power of herbs and the holistic approach to human wellness.' },
    { year: '1500 BCE', title: 'The Charaka Samhita', desc: 'The foundation of Ayurvedic science was meticulously documented, establishing principles still used today.' },
    { year: '800 CE', title: 'Global Expansion', desc: 'Ayurveda influenced healing traditions across continents, traveling along the Silk Road to the Middle East and beyond.' },
    { year: '1900s', title: 'Scientific Integration', desc: 'Ayurveda began merging with modern research, finding a balance between ancient wisdom and clinical validation.' },
    { year: 'Present', title: 'Vaidya Wellness', desc: 'Bringing timeless wisdom into the digital age, making pure, potent Ayurvedic care accessible to everyone.' }
  ];

  return (
    <div className="pt-20 overflow-hidden bg-parchment relative">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 px-4 text-center max-w-4xl mx-auto z-10">
        {/* Subtle decorative elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-10 left-10 text-forest"
        >
          <Leaf size={120} strokeWidth={0.5} />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl text-forest mb-6 relative z-10"
        >
          Our Story
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="text-xl md:text-2xl text-charcoal/70 font-title max-w-2xl mx-auto leading-relaxed relative z-10"
        >
          Rooted in 5000 years of tradition, reimagined for modern healing
        </motion.p>
      </section>

      {/* 2. The Legacy Timeline */}
      <section className="py-24 px-4 relative z-10 bg-cream-white/50" ref={timelineRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl text-forest">The Evolution of Ayurveda</h2>
            <div className="w-24 h-1 bg-saffron/30 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* The Vine (Vertical Line) */}
            <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-forest/10 -translate-x-1/2 rounded-full hidden md:block"></div>
            <motion.div 
              className="absolute left-[50%] top-0 w-1 bg-forest -translate-x-1/2 rounded-full hidden md:block origin-top"
              style={{ height: vineHeight }}
            ></motion.div>

            {/* Mobile Line */}
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-forest/10 rounded-full md:hidden"></div>
            <motion.div 
              className="absolute left-6 top-0 w-1 bg-forest rounded-full md:hidden origin-top"
              style={{ height: vineHeight }}
            ></motion.div>

            {timelineEvents.map((event, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-16 last:mb-0`}>
                  {/* Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 bg-parchment border-2 border-forest rounded-full flex items-center justify-center z-20 shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:bg-forest group-hover:text-parchment text-forest">
                    <Leaf size={18} />
                  </div>

                  {/* Spacer for desktop */}
                  <div className="hidden md:block w-1/2 px-12"></div>

                  {/* Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full md:w-1/2 pl-20 pr-4 md:px-12"
                  >
                    <div className="bg-white p-8 rounded-2xl shadow-earth border border-parchment relative overflow-hidden group-hover:-translate-y-2 transition-transform duration-500">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/5 rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-110"></div>
                      <h3 className="font-accent text-saffron font-bold tracking-wider mb-2">{event.year}</h3>
                      <h4 className="font-display text-2xl text-forest mb-3">{event.title}</h4>
                      <p className="text-charcoal/75 leading-relaxed">{event.desc}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Philosophy / Mission */}
      <section className="py-24 px-4 bg-forest text-parchment relative z-10 overflow-hidden">
        {/* Decorative background mandala/pattern */}
        <div className="absolute -right-[20%] -top-[20%] w-[60%] pt-[60%] rounded-full border-[1px] border-parchment/10 opacity-50 pointer-events-none"></div>
        <div className="absolute -left-[10%] -bottom-[10%] w-[40%] pt-[40%] rounded-full border-[1px] border-parchment/10 opacity-50 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-deep relative">
              <img src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop" alt="Ayurvedic herbs and mortar" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-forest/20 mix-blend-overlay"></div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="font-display text-4xl lg:text-5xl mb-8">Our Philosophy</h2>
            <p className="text-xl leading-relaxed text-parchment/90 mb-6">
              Ayurveda is not just medicine — <span className="text-white font-semibold relative inline-block">
                it is a way of life
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-saffron/60 -z-10 rounded-sm"></span>
              </span>.
            </p>
            <p className="text-lg leading-relaxed text-parchment/80">
              We focus on treating the <span className="text-saffron font-medium">root cause</span>, not just symptoms. By understanding your unique constitution (Dosha), we create a harmonious environment where your body can heal itself naturally, restoring balance to mind, body, and spirit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. Founders Section */}
      <section className="py-24 px-4 bg-cream-white relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-display text-4xl text-forest mb-4">Meet the Founders</h2>
          <p className="text-charcoal/60 mb-16 max-w-2xl mx-auto">The visionaries bridging ancient practices with modern accessibility.</p>
          
          <div className="flex flex-col md:flex-row gap-16 justify-center">
            {[
              {
                name: "Dr. Ananya Sharma",
                role: "Chief Ayurvedic Officer",
                bio: "B.A.M.S, MD (Ayurveda). Over 15 years of clinical practice in holistic wellness.",
                quote: "My mission is to make Ayurveda accessible and understandable for everyone in today's fast-paced world.",
                img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop"
              },
              {
                name: "Rajeev Menon",
                role: "Co-Founder & CEO",
                bio: "Tech entrepreneur with a lifelong passion for traditional Indian medicine and sustainability.",
                quote: "We are building a bridge between 5000-year-old wisdom and modern digital convenience.",
                img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop"
              }
            ].map((founder, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group relative w-full md:w-[400px] bg-white rounded-[2rem] p-8 shadow-earth hover:shadow-glow transition-all duration-500 hover:-translate-y-2 border border-parchment"
              >
                {/* Botanical Border Wrapper */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  {/* Decorative dashed border rotating on hover */}
                  <div className="absolute inset-[-10px] rounded-full border border-dashed border-forest/30 group-hover:rotate-180 transition-transform duration-1000 ease-in-out"></div>
                  {/* Small leaf accents */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-forest/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Leaf size={16} />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-forest/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rotate-180">
                    <Leaf size={16} />
                  </div>
                  
                  <img src={founder.img} alt={founder.name} className="w-full h-full object-cover rounded-full shadow-inner" />
                </div>
                
                <h3 className="font-display text-2xl text-forest mb-1">{founder.name}</h3>
                <p className="font-accent text-saffron text-sm tracking-wide mb-4">{founder.role}</p>
                <p className="text-charcoal/60 text-sm mb-6 pb-6 border-b border-parchment">{founder.bio}</p>
                
                <div className="relative">
                  <span className="absolute -top-4 -left-2 text-4xl text-forest/10 font-display">"</span>
                  <p className="font-display text-lg text-charcoal/80 italic leading-snug px-4">
                    {founder.quote}
                  </p>
                  <span className="absolute -bottom-6 -right-2 text-4xl text-forest/10 font-display">"</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Values Section */}
      <section className="py-24 px-4 bg-parchment relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-forest">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Purity", icon: Droplet, text: "100% natural formulations with no synthetic additives, ethically sourced." },
              { title: "Authenticity", icon: Sun, text: "Deeply rooted in ancient Ayurvedic texts, maintaining traditional efficacy." },
              { title: "Harmony", icon: Leaf, text: "Balancing body, mind, and lifestyle for complete holistic health and wellness." }
            ].map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-cream-white p-10 rounded-2xl shadow-sm border border-sand-brown/20 hover:shadow-earth hover:border-sand-brown/40 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-forest/5 rounded-full flex items-center justify-center mb-6 text-forest group-hover:scale-110 group-hover:bg-forest/10 transition-transform">
                  <val.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl text-forest mb-4">{val.title}</h3>
                <p className="text-charcoal/70 leading-relaxed">{val.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Trust + CTA Section */}
      <section className="py-32 px-4 relative z-10">
        {/* Background image for CTA */}
        <div className="absolute inset-0 -z-10">
          <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2000&auto=format&fit=crop" alt="Calm nature background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-parchment via-parchment/80 to-parchment"></div>
        </div>

        <div className="max-w-3xl mx-auto text-center bg-white/60 backdrop-blur-md p-12 md:p-16 rounded-3xl shadow-earth border border-white/50">
          <h2 className="font-display text-4xl md:text-5xl text-forest mb-6">Begin Your Healing Journey</h2>
          <p className="text-lg text-charcoal/80 mb-10">
            Join thousands who trust Ayurveda for lasting wellness and natural vitality.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <div className="flex items-center text-forest font-medium">
              <CheckCircle2 className="w-5 h-5 mr-2 text-saffron" />
              Certified Ayurvedic Doctors
            </div>
            <div className="flex items-center text-forest font-medium">
              <CheckCircle2 className="w-5 h-5 mr-2 text-saffron" />
              100% Natural Solutions
            </div>
          </div>
          
          <Link to="/consultation">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-forest text-parchment px-8 py-4 rounded-full font-title text-sm tracking-widest hover:bg-forest/90 transition-colors shadow-lg shadow-forest/20 flex items-center mx-auto"
            >
              BOOK FREE CONSULTATION
              <ArrowRight className="ml-2 w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
