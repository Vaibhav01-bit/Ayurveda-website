import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

function GlobePlaceholder() {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} scale={2.5}>
      <meshBasicMaterial color="#E9A84C" wireframe opacity={0.3} transparent />
    </Sphere>
  );
}

export default function IngredientSpotlight() {
  return (
    <section className="py-16 lg:py-24 px-6 sm:px-8 lg:px-12 bg-charcoal text-parchment overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="w-full lg:w-1/2 z-10 text-center lg:text-left">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-turmeric-gold mb-6">Ingredient Spotlight</h2>
          <p className="font-body text-parchment/70 mb-8 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            Our herbs are sourced from their native regions across the globe to ensure the highest potency and purity — preserved using ancient wisdom.
          </p>
          <ul className="space-y-4 font-accent text-sm sm:text-base inline-block text-left">
            <li className="flex items-center gap-4 group cursor-default">
              <span className="w-2.5 h-2.5 rounded-full bg-turmeric shadow-glow-soft group-hover:scale-125 transition-transform"></span> 
              <span className="group-hover:text-turmeric transition-colors">Ashwagandha from Rajasthan</span>
            </li>
            <li className="flex items-center gap-4 group cursor-default">
              <span className="w-2.5 h-2.5 rounded-full bg-turmeric shadow-glow-soft group-hover:scale-125 transition-transform"></span> 
              <span className="group-hover:text-turmeric transition-colors">Turmeric from Kerala</span>
            </li>
            <li className="flex items-center gap-4 group cursor-default">
              <span className="w-2.5 h-2.5 rounded-full bg-turmeric shadow-glow-soft group-hover:scale-125 transition-transform"></span> 
              <span className="group-hover:text-turmeric transition-colors">Brahmi from the Himalayas</span>
            </li>
          </ul>
        </div>
        <div className="w-full lg:w-1/2 h-[320px] sm:h-[400px] lg:h-[500px] relative rounded-full flex items-center justify-center">
          {/* React Three Fiber Placeholder */}
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <GlobePlaceholder />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <p className="font-display text-sm sm:text-base text-turmeric-gold/40 bg-charcoal/50 px-6 py-2 rounded-full backdrop-blur-sm border border-white/5 uppercase tracking-widest">[ Interactive Globe ]</p>
          </div>
        </div>
      </div>
    </section>
  );
}
