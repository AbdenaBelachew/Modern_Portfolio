import { ArrowRight } from 'lucide-react';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'secondary';
  arrow?: boolean;
};

const styles = {
  primary: 'bg-accent text-on-accent border-accent hover:brightness-110 shadow-card hover:shadow-lift',
  secondary: 'border-line-strong text-ink hover:border-ink bg-transparent',
};

// Anchor styled as a button; the arrow nudges right on hover.
export default function Button({ variant = 'primary', arrow = true, className = '', children, ...rest }: Props) {
  return (
    <a
      className={`group inline-flex items-center gap-2.5 rounded-md border px-5 py-3 text-sm font-medium transition-all duration-300 ease-out hover:-translate-y-px active:translate-y-0 ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
      {arrow && (
        <ArrowRight size={15} aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
      )}
    </a>
  );
}
