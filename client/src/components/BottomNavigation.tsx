// components/BottomNavigation.tsx
import { useLocation, Link } from "wouter";
import { ArrowLeftRight } from "lucide-react";
import React from "react";

/** Revolut-style "R" icon (inline SVG, inherits currentColor) */
function RevolutRIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className={`block ${className ?? ""}`}
      {...props}
    >
      <path d="M6 4h7.5c2.9 0 5 2 5 5 0 2.1-1.1 3.6-2.8 4.3l2.9 6.7h-3.4l-2.6-6H9.5v6H6V4Zm7.1 6c1.1 0 1.9-.7 1.9-1.7S14.2 6.5 13.1 6.5H9.5V10h3.6Z" />
    </svg>
  );
}

/** Custom Invest icon with bar chart and trend line */
function InvestIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      className={`block ${className ?? ""}`}
      {...props}
    >
      <rect x="3" y="12" width="4" height="8" fill="currentColor" opacity="0.8"/>
      <rect x="10" y="8" width="4" height="12" fill="currentColor" opacity="0.8"/>
      <rect x="17" y="14" width="4" height="6" fill="currentColor" opacity="0.8"/>
      <path d="M3 10 Q 7 6, 12 8 T 21 5" stroke="currentColor" fill="none" strokeWidth="1.5"/>
    </svg>
  );
}

export default function BottomNavigation() {
  const [location] = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: RevolutRIcon, isComponent: true },
    { path: "/invest", label: "Invest", icon: InvestIcon, isComponent: true },
    { path: "/transactions", label: "Payments", icon: ArrowLeftRight, isComponent: true },
    { path: "/crypto", label: "Crypto", icon: "₿", isComponent: false },
    { path: "/lifestyle", label: "Lifestyle", icon: "⚏", isComponent: false },
  ];

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        flex items-center justify-between
        px-6
        [height:calc(64px+env(safe-area-inset-bottom))]
        pb-[max(12px,env(safe-area-inset-bottom))]
        backdrop-blur-md
        border-t border-white/10
      "
      style={{
        background: 'linear-gradient(145deg, rgba(37, 37, 56, 0.85) 0%, rgba(26, 26, 46, 0.85) 100%)',
        boxShadow: '0 -15px 35px rgba(0, 0, 0, 0.5)',
      }}
      data-testid="bottom-navigation"
      role="navigation"
    >
      {navItems.map((item) => {
        const isActive = location === item.path;
        
        return (
          <Link
            key={item.path}
            href={item.path}
            aria-current={isActive ? "page" : undefined}
            className={`
              group flex flex-col items-center justify-center
              gap-1
              min-w-[56px]
              py-1
              relative
              transition-all duration-300
              ${isActive ? "text-white" : "text-[#7d849b] hover:text-white"}
            `}
            data-testid={`nav-${item.label.toLowerCase()}`}
          >
            <div className={`
              w-7 h-7 flex items-center justify-center
              text-2xl font-medium
              transition-all duration-300
              group-hover:scale-110
              ${isActive ? "[filter:drop-shadow(0_0_6px_rgba(255,255,255,0.3))]" : "group-hover:[filter:drop-shadow(0_0_8px_rgba(99,102,241,0.5))]"}
            `}>
              {item.isComponent ? (
                <item.icon className="w-7 h-7" />
              ) : (
                item.icon
              )}
            </div>
            <span
              className={`
                text-[13px] leading-none
                ${isActive ? "font-medium" : ""}
              `}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
