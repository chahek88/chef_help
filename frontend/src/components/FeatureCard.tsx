import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  delay?: number;
  gradient: "sage" | "warm" | "olive";
}

const gradientClasses = {
  sage: "from-primary to-olive",
  warm: "from-terracotta to-amber-600",
  olive: "from-olive to-primary",
};

export function FeatureCard({ title, description, icon: Icon, to, delay = 0, gradient }: FeatureCardProps) {
  return (
    <Link
      to={to}
      className="group block animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="card-hover relative overflow-hidden rounded-2xl bg-card p-8 h-full border border-border/50">
        {/* Decorative gradient blob */}
        <div 
          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${gradientClasses[gradient]} opacity-10 blur-3xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-150`}
        />
        
        {/* Icon container */}
        <div className={`relative z-10 w-16 h-16 rounded-xl bg-gradient-to-br ${gradientClasses[gradient]} flex items-center justify-center mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-8 h-8 text-primary-foreground" strokeWidth={1.5} />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <h3 className="font-display text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Arrow indicator */}
        <div className="relative z-10 mt-6 flex items-center text-primary font-medium opacity-0 translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          <span className="mr-2">Explore</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
