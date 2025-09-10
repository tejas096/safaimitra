import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EcoCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "hover" | "gradient";
  onClick?: () => void;
}

const EcoCard = ({ children, className, variant = "default", onClick }: EcoCardProps) => {
  const baseClasses = "eco-card p-6";
  
  const variants = {
    default: "",
    hover: "hover-lift cursor-pointer",
    gradient: "eco-gradient-light border-primary/20",
  };

  return (
    <div className={cn(baseClasses, variants[variant], className)} onClick={onClick}>
      {children}
    </div>
  );
};

export default EcoCard;