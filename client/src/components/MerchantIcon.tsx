import { Github, Apple } from "lucide-react";

interface MerchantIconProps {
  merchant: string;
  iconColor?: string;
  className?: string;
}

export default function MerchantIcon({ merchant, iconColor, className = "" }: MerchantIconProps) {
  const getIconClass = (merchant: string) => {
    const merchantLower = merchant.toLowerCase();
    
    if (merchantLower.includes("github")) return "icon-github";
    if (merchantLower.includes("apple")) return "icon-apple";
    if (merchantLower.includes("mcdonald")) return "icon-mcdonalds";
    if (merchantLower.includes("lime")) return "icon-lime";
    if (merchantLower.includes("thomas")) return "icon-thomas";
    if (merchantLower.includes("rtf")) return "icon-rtf";
    if (merchantLower.includes("pains")) return "icon-pains";
    if (merchantLower.includes("omio")) return "icon-omio";
    if (merchantLower.includes("alimentation")) return "icon-alimentation";
    if (merchantLower.includes("jay")) return "icon-jay";
    if (merchantLower.includes("pharmacie")) return "icon-pharmacie";
    if (merchantLower.includes("marche")) return "icon-marche";
    if (merchantLower.includes("burger")) return "icon-burger";
    if (merchantLower.includes("olvadis")) return "icon-olvadis";
    if (merchantLower.includes("yesim")) return "icon-yesim";
    
    return "icon-thomas"; // default
  };

  const renderIcon = () => {
    const merchantLower = merchant.toLowerCase();
    
    if (merchantLower.includes("github")) {
      return <Github className="w-5 h-5" />;
    }
    
    if (merchantLower.includes("apple")) {
      return <Apple className="w-5 h-5" />;
    }
    
    if (merchantLower.includes("mcdonald")) {
      return "M";
    }
    
    if (merchantLower.includes("thomas")) {
      return "TF";
    }
    
    // Get first letter of merchant name
    return merchant.charAt(0).toUpperCase();
  };

  return (
    <div 
      className={`merchant-icon ${getIconClass(merchant)} ${className}`}
      data-testid={`merchant-icon-${merchant.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {renderIcon()}
    </div>
  );
}
