import { useLocation } from "wouter";
import { Home, TrendingUp, CreditCard, DollarSign, Heart } from "lucide-react";
import { Link } from "wouter";

export default function BottomNavigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/invest", label: "Invest", icon: TrendingUp },
    { path: "/transactions", label: "Payments", icon: DollarSign },
    { path: "/crypto", label: "Crypto", icon: CreditCard },
    { path: "/lifestyle", label: "Lifestyle", icon: Heart },
  ];

  return (
    <div className="bottom-nav-height bg-card border-t border-border fixed bottom-0 left-0 right-0 flex items-center justify-around safe-area-bottom" data-testid="bottom-navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location === item.path;
        
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`nav-item ${isActive ? "active" : ""}`}
            data-testid={`nav-${item.label.toLowerCase()}`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
