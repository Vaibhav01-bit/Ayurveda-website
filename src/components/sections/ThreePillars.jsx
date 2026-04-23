import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card from '../ui/Card';

gsap.registerPlugin(ScrollTrigger);

export default function ThreePillars() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const pillars = [
    { name: 'Vata', description: 'Air & Space. Represents movement, creativity, and vitality.', color: 'bg-saffron-fire/5' },
    { name: 'Pitta', description: 'Fire & Water. Represents digestion, metabolism, and energy.', color: 'bg-turmeric-gold/5' },
    { name: 'Kapha', description: 'Earth & Water. Represents structure, stability, and immunity.', color: 'bg-forest-deep/5' }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const scrollContainer = scrollContainerRef.current;
      const amountToScroll = scrollContainer.scrollWidth - window.innerWidth;

      gsap.to(scrollContainer, {
        x: () => -amountToScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: `+=${amountToScroll}`,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-parchment overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 relative">
        <h2 className="font-display text-5xl text-forest-deep text-center">The Three Pillars</h2>
        <div className="w-24 h-px bg-copper-rust/30 mx-auto mt-6"></div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex flex-nowrap w-max gap-8 px-8 md:px-[20vw]"
      >
        {pillars.map((pillar) => (
          <Card key={pillar.name} className={`text-center min-w-[320px] max-w-[420px] shrink-0 ${pillar.color}`}>
            <div className="w-20 h-20 mx-auto bg-parchment rounded-full flex items-center justify-center shadow-md mb-8 border border-copper-rust/10">
              <span className="font-title text-3xl text-saffron-fire">{pillar.name[0]}</span>
            </div>
            <h3 className="font-subheading text-3xl text-forest-deep mb-4">{pillar.name}</h3>
            <p className="font-body text-midnight-herb/70 leading-relaxed">{pillar.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
