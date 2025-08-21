import { useLocation, Link } from "wouter";
import {
  TrendingUp,
  ArrowLeftRight,
  Bitcoin,
  Heart
} from "lucide-react";

function RevolutRIcon(props: React.SVGProps<SVGSVGElement>) {
  // Simple mono "R" mark approximation
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        d="M13.8 5.5c4.5 0 7.7 2.7 7.7 6.6 0 2.3-1.1 4.1-3 5.1l3.5 4.8c.3.5.1 1.0-.5 1.0h-3.5c-.4 0-.7-.2-.9-.5l-3-4.3h-2.2v4.3c0 .4-.3.7-.7.7H7.4c-.4 0-.7-.3-.7-.7V6.2c0-.4.3-.7.7-.7h6.4Zm-.6 3.7H11v5h2.2c2 0 3.2-1 3.2-2.5 0-1.6-1.2-2.5-3.2-2.5Z"
        fill="currentColor"
      />
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
      {navItems.map(item => {
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
