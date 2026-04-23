import { cn } from '../../utils/cn';
import { forwardRef } from 'react';

const Input = forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-md border border-sand-brown/30 bg-parchment/50 dark:bg-midnight-herb dark:border-sand-brown/20 dark:text-parchment px-4 py-2 text-sm placeholder:text-forest-deep/40 dark:placeholder:text-parchment/40 focus:outline-none focus:ring-1 focus:ring-turmeric-gold focus:border-turmeric-gold focus:shadow-glow transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"
export default Input;
