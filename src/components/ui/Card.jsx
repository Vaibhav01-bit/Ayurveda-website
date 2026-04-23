import { cn } from '../../utils/cn';

export default function Card({ children, className, noPadding = false, ...props }) {
  return (
    <div 
      className={cn(
        "group relative bg-[#F5ECD7] dark:bg-[#162016] border border-[#C8A97E]/40 dark:border-[#3B5E3A]/40 shadow-ancient dark:shadow-ancient-dark rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-[6px] hover:shadow-glow hover:border-turmeric-gold/60 dark:hover:border-turmeric-gold/40", 
        className
      )} 
      {...props}
    >
      {/* Texture Layer - Subtle grain */}
      <div 
        className="absolute inset-0 opacity-[0.15] dark:opacity-10 pointer-events-none mix-blend-multiply dark:mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Botanical Overlay - Bottom Right */}
      <div 
        className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.04] dark:opacity-[0.03] pointer-events-none transition-transform duration-700 group-hover:-translate-y-2 group-hover:-translate-x-2"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83v58.34h-58.34l.83-.83L54.628 0zM27.5 15.5c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12-12-5.373-12-12zm-15 15c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12-12-5.373-12-12zm-15 15c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12-12-5.373-12-12z' fill='%231E3A1E' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '100% 100%'
        }}
      ></div>

      {/* Decorative Border Accent - Top Left Corner */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-[1.5px] border-l-[1.5px] border-turmeric-gold/40 rounded-tl-2xl m-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Decorative Border Accent - Bottom Right Corner */}
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[1.5px] border-r-[1.5px] border-turmeric-gold/40 rounded-br-2xl m-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Content Layer */}
      <div className={cn("relative z-10 w-full h-full", !noPadding && "p-6 sm:p-8")}>
        {children}
      </div>
    </div>
  );
}
