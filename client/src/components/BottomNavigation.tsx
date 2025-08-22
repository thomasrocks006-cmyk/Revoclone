// components/BottomNavigation.tsx
import { useLocation, Link } from "wouter";
import { ArrowLeftRight, Bitcoin, Heart } from "lucide-react";
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
    { path: "/", label: "Home", icon: RevolutRIcon },
    { path: "/invest", label: "Invest", icon: InvestIcon },
    { path: "/transactions", label: "Payments", icon: ArrowLeftRight },
    { path: "/crypto", label: "Crypto", icon: Bitcoin },
    { path: "/lifestyle", label: "Lifestyle", icon: Heart },
  ];

  return (
    <>
      {/* Global styles for the gradient circle glow effect */}
      <style>{`
        .nav-glow-item {
          position: relative;
        }
        
        .nav-glow-item::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0;
          height: 0;
          border-radius: 50%;
          background: radial-gradient(
            circle, 
            rgba(99, 102, 241, 0.3) 0%, 
            rgba(236, 72, 153, 0.3) 100%
          );
          transition: all 0.3s ease;
          z-index: -1;
          pointer-events: none;
        }
        
        .nav-glow-item:hover::before {
          width: 60px;
          height: 60px;
        }
        
        .nav-glow-item:hover .nav-icon {
          transform: scale(1.1);
        }
        
        .nav-glow-item .nav-icon {
          transition: transform 0.3s ease;
        }
      `}</style>
      
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
          background: 'linear-gradient(145deg, #252538 0%, #1a1a2e 100%)',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
        }}
        data-testid="bottom-navigation"
        role="navigation"
      >
        {navItems.map((item) => {
          const Icon = item.icon as any;
          const isActive = location === item.path;
          
          return (
            <Link
              key={item.path}
              href={item.path}
              aria-current={isActive ? "page" : undefined}
              className="
                nav-glow-item
                group flex flex-col items-center justify-center
                gap-1
                min-w-[56px]
                py-1
                relative
              "
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <Icon
                className={`
                  nav-icon
                  w-7 h-7
                  ${isActive ? "text-white" : "text-[#7d849b] group-hover:text-white"}
                `}
              />
              <span
                className={`
                  text-[13px] leading-none transition-colors duration-300
                  ${isActive ? "text-white font-medium" : "text-[#7d849b] group-hover:text-white"}
                `}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
