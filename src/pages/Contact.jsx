import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cylinder, OrbitControls } from '@react-three/drei';
import Button from '../components/ui/Button';
import ConsultationWizard from '../components/ui/ConsultationWizard';

function MortarPlaceholder() {
  const meshRef = useRef(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={meshRef} position={[0, -1, 0]}>
      {/* Mortar Base */}
      <Cylinder args={[1.5, 1.2, 2, 32]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#8B5A2B" roughness={0.8} />
      </Cylinder>
      {/* Pestle */}
      <Cylinder args={[0.3, 0.4, 3, 32]} position={[0.5, 2.5, 0]} rotation={[0, 0, Math.PI / 6]}>
         <meshStandardMaterial color="#5C4033" roughness={0.9} />
      </Cylinder>
    </group>
  );
}


export default function Contact() {
  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl md:text-7xl text-forest mb-6"
        >
          Contact Us
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl text-charcoal/70"
        >
          We are here to guide you on your wellness journey.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Side: 3D Animation Placeholder */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-forest/5 rounded-3xl relative overflow-hidden min-h-[400px]"
        >
          <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <MortarPlaceholder />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
          <div className="absolute inset-x-0 bottom-8 text-center pointer-events-none">
             <p className="font-display text-2xl text-forest/50 mb-2 backdrop-blur-sm inline-block px-4 py-1 rounded-full">[ Mortar & Pestle Placeholder ]</p>
          </div>
        </motion.div>

        {/* Right Side: Wizard */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ConsultationWizard />
          <div className="mt-8 pt-8 flex flex-col gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
               <Button variant="outline" className="w-full bg-white">Chat on WhatsApp</Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
               <Button variant="outline" className="w-full bg-white">Email Support</Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
