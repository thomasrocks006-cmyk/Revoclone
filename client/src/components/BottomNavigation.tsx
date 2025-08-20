import React from "react";
import { Link, useLocation } from "wouter";
import { TrendingUp, ArrowLeftRight, Bitcoin, ShoppingBag } from "lucide-react";

/** Colors tuned to your screenshots */
const ACTIVE = "#ffffff";
const INACTIVE = "#D6D8DFB3";      // ~70% alpha grey
const BORDER = "rgba(255,255,255,0.10)";

/** One item: icon + label */
function NavItem({
  href,
  active,
  children,
  label,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <Link href={href}>
      <div
        className="
          group flex flex-col items-center justify-center
          gap-1 flex-1 py-1
          active:scale-95 transition-transform
        "
        style={{ WebkitTapHighlightColor: "transparent" }}
        aria-current={active ? "page" : undefined}
      >
        <div className="h-7 flex items-center">{children}</div>
        <span className={`text-[14px] leading-none tracking-[0.2px] ${active ? "text-white font-medium" : "text-[#D6D8DF]/70"}`}>
          {label}
        </span>
      </div>
    </Link>
  );
}

/** MaskIcon: renders a monochrome PNG/WebP as a tintable silhouette */
function MaskIcon({
  src,
  size = 28,
  color = "currentColor",
  className = "",
}: {
  src: string;
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-block",
        backgroundColor: color,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

/** Bottom bar (edge-to-edge, safe-area aware, translucent + blur) */
export default function BottomNavigation() {
  const [location] = useLocation();
  const isActive = (p: string) => location === p;

  return (
    <nav
      role="navigation"
      data-testid="bottom-navigation"
      className="
        fixed inset-x-0 bottom-0 z-50
        w-full
        [height:calc(64px+env(safe-area-inset-bottom))]
        pb-[max(10px,env(safe-area-inset-bottom))]
        flex items-center justify-between
        border-t
        backdrop-blur-md
      "
      style={{
        // semi-opaque + soft vignette so content subtly influences the tone (like iOS)
        background:
          `linear-gradient(0deg, rgba(16,18,24,0.90), rgba(16,18,24,0.90)),
           radial-gradient(120% 140% at 0% 0%, rgba(62,69,92,0.18) 0%, rgba(0,0,0,0) 55%)`,
        borderColor: BORDER,
        WebkitTransform: "translateZ(0)",
      }}
    >
      {/* Home (using fallback icon for now) */}
      <NavItem href="/" active={isActive("/") } label="Home">
        <div
          className="w-7 h-7 flex items-center justify-center rounded-full text-lg font-bold"
          style={{ 
            color: isActive("/") ? ACTIVE : INACTIVE,
            backgroundColor: "transparent"
          }}
        >
          R
        </div>
      </NavItem>

      <NavItem href="/invest" active={isActive("/invest")} label="Invest">
        <TrendingUp
          size={28}
          strokeWidth={2.2}
          className={isActive("/invest") ? "text-white" : "text-[#D6D8DF]/70 group-hover:text-[#E4E6EB]"}
        />
      </NavItem>

      <NavItem href="/payments" active={isActive("/payments")} label="Payments">
        <ArrowLeftRight
          size={28}
          strokeWidth={2.2}
          className={isActive("/payments") ? "text-white" : "text-[#D6D8DF]/70 group-hover:text-[#E4E6EB]"}
        />
      </NavItem>

      <NavItem href="/crypto" active={isActive("/crypto")} label="Crypto">
        <Bitcoin
          size={28}
          strokeWidth={2.2}
          className={isActive("/crypto") ? "text-white" : "text-[#D6D8DF]/70 group-hover:text-[#E4E6EB]"}
        />
      </NavItem>

      <NavItem href="/lifestyle" active={isActive("/lifestyle")} label="Lifestyle">
        <ShoppingBag
          size={28}
          strokeWidth={2.2}
          className={isActive("/lifestyle") ? "text-white" : "text-[#D6D8DF]/70 group-hover:text-[#E4E6EB]"}
        />
      </NavItem>

      {/* Optional visual iOS home-indicator */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[calc(env(safe-area-inset-bottom)+6px)] h-[4px] w-28 rounded-full bg-white/90 opacity-90" />
    </nav>
  );
}
