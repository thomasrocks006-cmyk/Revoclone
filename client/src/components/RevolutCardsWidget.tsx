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
  // Last 4 or other secondary line (e.g., "Generate")
  secondary?: string;
  gradientKey: keyof typeof CARD_GRADIENTS;
  href?: string;          // If provided, tile becomes a Link
  showAlertDot?: boolean; // Yellow exclamation bubble
  showMastercard?: boolean;
  ring?: boolean;         // Whether to show animated orbit ring
}

/**
 * Centralized gradients & styling tokens for cards.
 * Keep keys stable; used as gradientKey on CardData.
 */
export const CARD_GRADIENTS = {
  original:
    "linear-gradient(135deg, #FF8A00 0%, #8B4A9C 35%, #4A5B8C 70%, #2B3A67 100%)",
  disposable: "linear-gradient(135deg, #FF6B9D 0%, #FF8E8E 100%)",
  // Additional placeholders if you add more cards later:
  teal: "linear-gradient(135deg,#16C5D9 0%, #0079C4 100%)",
  violet: "linear-gradient(135deg,#7A5CF5 0%, #5136C9 100%)",
};

/**
 * Default cards (you can override by passing props).
 */
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
    gradientKey: "teal", // Not shown (placeholder, tile uses neutral style)
  },
];

export interface RevolutCardsWidgetProps {
  cards?: CardData[];
  className?: string;
}

/**
 * RevolutCardsWidget - Matches version 22 design exactly
 */
const RevolutCardsWidget: React.FC<RevolutCardsWidgetProps> = ({
  cards = defaultCards,
  className = "",
}) => {
  return (
    <section className={`px-4 mt-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between text-white/80 mb-2">
        <div className="text-[15px]">Cards</div>
        <ChevronRight className="w-4 h-4 text-white/55" />
      </div>

      {/* Cards Container - matching version 22 design */}
      <div className="rounded-[22px] bg-[#0F1224]/95 backdrop-blur-md p-6">
        <div className="flex justify-between items-start space-x-4">
          {cards.map((card) => {
            if (card.id === "get-card") {
              return (
                <div key={card.id} className="flex flex-col items-center flex-1">
                  <div className="relative w-40 h-25 rounded-xl overflow-hidden mb-3 bg-gray-700 border-2 border-dashed border-gray-600 flex items-center justify-center">
                    <div className="text-white text-3xl font-light">+</div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-white text-base font-medium">{card.label}</h3>
                  </div>
                </div>
              );
            }

            const CardContent = (
              <div
                className={[
                  "relative w-40 h-25 rounded-xl overflow-hidden mb-3 transition-shadow",
                  "shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_4px_18px_-4px_rgba(0,0,0,0.55)]",
                  card.ring ? "card-orbit" : "",
                ].join(" ")}
                style={{
                  background: CARD_GRADIENTS[card.gradientKey],
                  height: '100px', // Fixed height to match version 22
                }}
              >
                {/* Optional attention dot */}
                {card.showAlertDot && (
                  <div className="absolute -right-1 -top-1 w-[18px] h-[18px] rounded-full bg-yellow-400 grid place-items-center text-black text-[12px] font-bold">
                    !
                  </div>
                )}

                {/* Revolut R */}
                <div className="absolute top-2 right-4">
                  <div className="text-white text-lg font-bold opacity-80">R</div>
                </div>

                {/* Mastercard logo */}
                {card.showMastercard && (
                  <div className="absolute bottom-3 right-4">
                    <div className="flex">
                      <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                      <div className="w-4 h-4 bg-amber-600 rounded-full -ml-1.5"></div>
                    </div>
                  </div>
                )}
              </div>
            );

            const Wrapper: React.FC<{ children: React.ReactNode }> = ({
              children,
            }) =>
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
              <div key={card.id} className="flex flex-col items-center flex-1">
                <Wrapper>{CardContent}</Wrapper>
                <div className="text-center">
                  <h3 className="text-white text-base font-medium mb-1">{card.label}</h3>
                  {card.secondary && (
                    <p className="text-gray-400 text-xs">{card.secondary}</p>
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
