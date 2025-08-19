import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";
import "../styles/cards-orbit.css";

/**
 * Type describing a single card tile.
 */
export interface CardData {
  id: string;
  label: string;
  secondary?: string; // Last 4 digits or action text
  gradientKey: keyof typeof CARD_GRADIENTS;
  href?: string;          // If provided, tile is a Link
  showAlertDot?: boolean; // Yellow exclamation bubble
  showMastercard?: boolean;
  ring?: boolean;         // Show animated orbit ring
}

/** Centralized gradients */
export const CARD_GRADIENTS = {
  original:
    "linear-gradient(135deg, #FF8A00 0%, #8B4A9C 35%, #4A5B8C 70%, #2B3A67 100%)",
  disposable: "linear-gradient(135deg, #FF6B9D 0%, #FF8E8E 100%)",
  teal: "linear-gradient(135deg,#16C5D9 0%, #0079C4 100%)",
  violet: "linear-gradient(135deg,#7A5CF5 0%, #5136C9 100%)",
};

/** Default cards */
const defaultCards: CardData[] = [
  {
    id: "original",
    label: "Original",
    secondary: "··4103",
    gradientKey: "original",
    href: "/cards/original",
    showAlertDot: true,
    showMastercard: true,
    ring: true,
  },
  {
    id: "disposable",
    label: "Disposable",
    secondary: "Generate",
    gradientKey: "disposable",
    showMastercard: true,
  },
  {
    id: "get-card",
    label: "Get card",
    secondary: "",
    gradientKey: "teal",
  },
];

export interface RevolutCardsWidgetProps {
  cards?: CardData[];
  className?: string;
}

/**
 * RevolutCardsWidget: dynamic cards + optional animated orbit ring.
 * Header row remains inside the widget per request.
 */
const RevolutCardsWidget: React.FC<RevolutCardsWidgetProps> = ({
  cards = defaultCards,
  className = "",
}) => {
  return (
    <section className={`px-4 mt-6 ${className}`}>
      <div className="flex items-center justify-between text-white/80">
        <div className="text-[15px]">Cards</div>
        <ChevronRight className="w-4 h-4 text-white/55" />
      </div>

      <div className="mt-2 rounded-[22px] bg-[#0F1224]/95 backdrop-blur-md p-4">
        <div className="grid grid-cols-3 gap-4">
          {cards.map(card => {
            if (card.id === "get-card") {
              return (
                <div key={card.id}>
                  <div className="h-24 rounded-xl bg-white/10 grid place-items-center border border-white/10">
                    <span className="text-3xl font-light">+</span>
                  </div>
                  <div className="mt-2 text-center text-[13px]">{card.label}</div>
                </div>
              );
            }

            const inner = (
              <div
                className={[
                  "relative h-24 rounded-xl p-2 overflow-hidden transition-shadow",
                  "shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_4px_18px_-4px_rgba(0,0,0,0.55)]",
                  card.ring ? "card-orbit" : "",
                ].join(" ")}
                style={{ background: CARD_GRADIENTS[card.gradientKey] }}
              >
                {card.showAlertDot && (
                  <div className="absolute -right-1 -top-1 w-[18px] h-[18px] rounded-full bg-yellow-400 grid place-items-center text-black text-[12px] font-bold">!</div>
                )}
                <div className="absolute top-2 left-2 text-[13px] font-semibold tracking-wide">R</div>
                {card.showMastercard && (
                  <div className="absolute bottom-2 right-2 flex items-center">
                    <span className="w-4 h-4 rounded-full bg-red-600 inline-block" />
                    <span className="w-4 h-4 rounded-full bg-amber-500 -ml-1.5 inline-block" />
                  </div>
                )}
                {card.secondary && (
                  <div className="absolute bottom-2 left-2 text-[11px] tracking-wider">{card.secondary}</div>
                )}
              </div>
            );

            const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
              card.href ? (
                <Link
                  href={card.href}
                  className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 rounded-xl"
                >
                  {children}
                </Link>
              ) : (
                <div className="block">{children}</div>
              );

            return (
              <div key={card.id}>
                <Wrapper>{inner}</Wrapper>
                <div className="mt-2 text-center">
                  <div className="text-[13px]">{card.label}</div>
                  {card.secondary && (
                    <div className="text-[11px] text-white/60">{card.secondary}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RevolutCardsWidget;