// components/BottomNavigation.tsx
import { useLocation, Link } from "wouter";
import { TrendingUp, ArrowLeftRight, Bitcoin, Heart } from "lucide-react";
import React from "react";

/** Revolut-style "R" icon (inline SVG, inherits currentColor) */
function RevolutRIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"         // 24x24 grid to match lucide icons
      aria-hidden="true"
      fill="currentColor"         // picks up Tailwind text color (active/inactive)
      className={`block ${className ?? ""}`} // 'block' removes baseline gap
      {...props}
    >
      <path d="M6 4h7.5c2.9 0 5 2 5 5 0 2.1-1.1 3.6-2.8 4.3l2.9 6.7h-3.4l-2.6-6H9.5v6H6V4Zm7.1 6c1.1 0 1.9-.7 1.9-1.7S14.2 6.5 13.1 6.5H9.5V10h3.6Z" />
    </svg>
  );
}

export default function BottomNavigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: RevolutRIcon },
    { path: "/invest", label: "Invest", icon: TrendingUp },
    { path: "/transactions", label: "Payments", icon: ArrowLeftRight },
    { path: "/crypto", label: "Crypto", icon: Bitcoin },
    { path: "/lifestyle", label: "Lifestyle", icon: Heart },
  ];

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        flex items-center justify-between
        px-6
        [height:calc(64px+env(safe-area-inset-bottom))]
        pb-[max(12px,env(safe-area-inset-bottom))]
        bg-[radial-gradient(120%_120%_at_0%_0%,rgba(65,72,96,0.20),rgba(18,20,27,0.92))]
        backdrop-blur-md
        border-t border-white/10
      "
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
              group flex flex-col items-center justify-center
              gap-1
              min-w-[56px]
              py-1
              active:scale-95 transition-transform
            "
            data-testid={`nav-${item.label.toLowerCase()}`}
          >
            <Icon
              className={`
                w-7 h-7
                ${isActive ? "text-white" : "text-[#D6D8DF]/70 group-hover:text-[#E4E6EB]"}
              `}
            />
            <span
              className={`
                text-[13px] leading-none
                ${isActive ? "text-white font-medium" : "text-[#D6D8DF]/70"}
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
