import { cn } from '../../utils/cn';

export default function Button({ children, className, variant = 'primary', ...props }) {
  const baseStyles = "px-8 py-3 rounded-full font-title tracking-widest uppercase text-xs sm:text-sm transition-all duration-700 relative overflow-hidden group hover:scale-[1.03] flex items-center justify-center";
  
  const variants = {
    primary: "bg-gradient-to-r from-saffron-fire to-turmeric-gold text-white shadow-earth hover:shadow-glow border border-transparent",
    secondary: "bg-parchment text-forest-deep shadow-sm hover:shadow-earth border border-sand-brown/30 dark:bg-midnight-herb dark:text-parchment dark:border-sand-brown/10",
    outline: "border border-forest-deep/50 text-forest-deep hover:bg-forest-deep hover:text-parchment dark:border-parchment/50 dark:text-parchment dark:hover:bg-parchment dark:hover:text-midnight-herb",
    ghost: "text-forest-deep hover:bg-forest-deep/5 dark:text-parchment dark:hover:bg-parchment/10"
  };

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      <span className="relative z-10 font-bold">{children}</span>
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
    </button>
  );
}
