import { cn } from '../../utils/cn';

export default function Badge({ children, className, ...props }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-turmeric/20 text-saffron", className)} {...props}>
      {children}
    </span>
  );
}
