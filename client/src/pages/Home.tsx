import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Search,
  BarChart3,
  Menu,
  Plus,
  ArrowUpDown,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { type User, type Transaction } from "@shared/schema";
import RevolutCardsWidget, { CardData } from "@/components/RevolutCardsWidget";

/** Currency formatter (AUD, 2dp) */
const AUD = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Friendly date */
function formatDate(d?: string | number | Date) {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleString("en-AU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Very small skeleton block */
function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-white/10 ${className}`} />;
}

export default function Home() {
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useQuery<User>({ queryKey: ["/api/user"] });

  const {
    data: transactions,
    isLoading: transactionsLoading,
    isError: txError,
  } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions", user?.id],
    enabled: !!user?.id,
    staleTime: 30_000,
  });

  const recentTransactions = useMemo(
    () => (transactions?.slice(0, 2) ?? []),
    [transactions]
  );

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#0B0D18] flex items-center justify-center">
        <div className="text-white/80">Loading…</div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="min-h-screen bg-[#0B0D18] flex items-center justify-center">
        <div className="text-red-300">Failed to load user.</div>
      </div>
    );
  }

  // Derive initials for avatar
  const initials =
    (user?.name ?? "TF")
      .split(" ")
      .map((s) => s[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "TF";

  // Balance rendering like iOS: big whole part + tight decimals
  const balance = 2.19;
  const [whole, cents] = balance.toFixed(2).split(".");

  // Cards configuration - Mobile optimized to match target screenshot
  const cards: CardData[] = [
    {
      id: "original",
      label: "Original",
      secondary: "··4103",
      gradientKey: "original",
      href: "/cards/original",
      showAlertDot: true, // Re-enabled to match the target screenshot
      showMastercard: true,
      ring: true, // Keep the orbit animation
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

  return (
    <div
      className="min-h-screen text-white"
      data-testid="home-screen"
    >
      {/* Multi-stop deep blue gradient header */}
      <div
        className="relative"
        style={{ height: 460 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #63AAFF 0%, #4A90FF 14%, #357BFF 30%, #255DE6 48%, #1944B8 62%, #112E7E 76%, #0B1E50 86%, #081534 93%, #070F22 97%, #070D18 100%)",
          }}
        />
        <div className="relative z-10 px-3 pt-3">
          <div className="flex items-center gap-2">
            <div className="relative w-9 h-9 rounded-full bg-[#F59E0B] grid place-items-center shadow-sm">
              <span className="text-[12px] font-semibold tracking-tight">
                {initials}
              </span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </div>

            <div className="flex-1">
              <button
                className="w-full h-[40px] rounded-[22px] bg-white/18 backdrop-blur-[3px] flex items-center px-4 border border-white/15 text-left"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px] text-white/80 mr-2" />
                <span className="text-white/75 text-[13px] leading-none">
                  Search
                </span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/12 grid place-items-center border border-white/10">
                <BarChart3 className="w-[18px] h-[18px]" />
              </div>
              <div className="w-9 h-9 rounded-full bg-white/12 grid place-items-center border border-white/10">
                <Menu className="w-[18px] h-[18px]" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-12 pb-2 flex flex-col items-center select-none">
          <div
            className="text-white/65 text-[12px] mb-3"
            data-testid="text-account-type"
          >
            Personal · AUD
          </div>
          <div
            className="text-white leading-none font-medium"
            data-testid="text-balance"
            title={AUD.format(balance)}
          >
            <span className="text-[56px] tabular-nums">{whole}</span>
            <span className="align-text-top text-[22px] ml-[2px] tabular-nums">
              .{cents}
            </span>
          </div>
          <Button className="mt-4 h-[36px] px-6 rounded-full bg-[#5864A5]/60 border border-white/15 shadow-md text-white/90 text-[14px]">
            Accounts
          </Button>
        </div>

        <div className="relative z-10 py-3 flex items-center justify-center">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
            <span className="w-1 h-1 rounded-full bg-white inline-block" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 pt-2">
        <div className="grid grid-cols-4 gap-8 text-center">
          {[
            { key: "add", label: "Add money", icon: <Plus className="w-[20px] h-[20px]" /> },
            { key: "payid", label: "PayID", icon: <span className="text-[12px] font-black">iD</span> },
            { key: "move", label: "Move", icon: <ArrowUpDown className="w-[20px] h-[20px]" /> },
            { key: "more", label: "More", icon: <MoreHorizontal className="w-[20px] h-[20px]" /> },
          ].map((a) => (
            <div key={a.key} className="flex flex-col items-center">
              <div className="w-[52px] h-[52px] rounded-full bg-white/15 grid place-items-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                {a.icon}
              </div>
              <div className="mt-2 text-[12px] text-white/80 leading-none">{a.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <section className="px-4 mt-7">
        <div className="rounded-[22px] bg-[#0F1224]/95 backdrop-blur-md p-4 shadow-[0_12px_28px_rgba(0,0,0,0.45)]">
          {transactionsLoading && (
            <>
              <Skeleton className="h-12 mb-3" />
              <Skeleton className="h-12" />
            </>
          )}

          {!transactionsLoading && !txError && recentTransactions.length > 0 && (
            recentTransactions.map((t, idx) => {
              const name =
                "merchant" in t ? ((t as any).merchant ?? "Payment") : "Payment";
              const sub = [
                formatDate((t as any).createdAt ?? Date.now()),
                ("status" in t && (t as any).status) ? (t as any).status : "",
              ]
                .filter(Boolean)
                .join(" · ");
              const amountNum = Number((t as any).amount ?? 0);
              const negative = amountNum < 0;

              return (
                <div key={idx} className={`flex items-center ${idx === 0 ? "" : "mt-6"}`}>
                  <div className="relative w-[36px] h-[36px] rounded-full bg-black grid place-items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#10182A] rounded-full grid place-items-center">
                      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                        <path d="M7 12h10M12 7l5 5-5 5" />
                      </svg>
                    </span>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="text-[16px] font-semibold leading-tight">{name}</div>
                    <div className="text-[13px] text-white/65">{sub}</div>
                  </div>
                  <div className="text-[15px] tabular-nums text-right min-w-[76px] pr-2">
                    {negative ? (
                      <span className="text-[#ff6b6b]">
                        -{AUD.format(Math.abs(amountNum)).replace("A$", "$")}
                      </span>
                    ) : (
                      <span className="text-white/95">
                        {AUD.format(amountNum).replace("A$", "$")}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {!transactionsLoading && !txError && recentTransactions.length === 0 && (
            <>
              <div className="flex items-center">
                <div className="relative w-[36px] h-[36px] rounded-full bg-black grid place-items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#10182A] rounded-full grid place-items-center">
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                      <path d="M7 12h10M12 7l5 5-5 5" />
                    </svg>
                  </span>
                  </div>
                <div className="ml-3 flex-1">
                  <div className="text-[16px] font-semibold leading-tight">
                    GitHub
                  </div>
                  <div className="text-[13px] text-white/65">
                    17 Aug, 04:25 · Reverted
                  </div>
                </div>
                <div className="text-[15px] tabular-nums text-right min-w-[76px] pr-2">
                  <span className="text-white/95">
                    {AUD.format(1.55).replace("A$", "$")}
                  </span>
                </div>
              </div>

              <div className="flex items-center mt-6">
                <div className="relative w-[36px] h-[36px] rounded-full bg-[#F59E0B] grid place-items-center">
                  <span className="text-[11px] font-semibold">TF</span>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#10182A] rounded-full grid place-items-center">
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                      <path d="M7 12h10M12 7l5 5-5 5" />
                    </svg>
                  </span>
                </div>
                <div className="ml-3 flex-1">
                  <div className="text-[16px] font-semibold leading-tight">
                    Thomas Francis
                  </div>
                  <div className="text-[13px] text-white/65 whitespace-pre-line">
                    {"15 Aug, 18:06\nSent from Revolut"}
                  </div>
                </div>
                <div className="text-[15px] tabular-nums text-right min-w-[76px] pr-2">
                  <span className="text-[#ff6b6b]">
                    -{AUD.format(18).replace("A$", "$")}
                  </span>
                </div>
              </div>
            </>
          )}

          <Link href="/transactions">
            <Button className="mt-6 w-full h-10 rounded-lg text-[15px] text-white/90 bg-transparent hover:bg-white/10 transition">
              See all
            </Button>
          </Link>
        </div>
      </section>

      {/* Cards Widget - Now matches our version 22 design */}
      <RevolutCardsWidget cards={cards} />

      {/* Total Wealth */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between text-white/80">
          <div className="text-[15px]">Total wealth</div>
          <ChevronRight className="w-4 h-4 text-white/55" />
        </div>
      </section>
      <section className="px-4 mt-2">
        <div className="rounded-[22px] bg-[#0F1224]/95 backdrop-blur-md p-4">
          <div className="text-[34px] font-semibold tabular-nums">
            {AUD.format(4.29).replace("A$", "$")}
          </div>
          <div className="mt-4 space-y-4">
            <Row iconBg="#6C8CFF" left="Cash" right={AUD.format(2.19).replace("A$", "$")} />
            <Row
              iconBg="#A070FF"
              left="Crypto"
              right={AUD.format(2.10).replace("A$", "$")}
              iconText="₿"
            />
            <RowChevron
              iconBg="#D8E958"
              title="Loan"
              subtitle="Get a low-rate loan up to $50,000"
            />
            <RowChevron
              iconBg="#56B4FF"
              title="Invest"
              subtitle="Invest for as little as $1"
              icon={<BarChart3 className="w-4 h-4" />}
            />
          </div>
        </div>
      </section>

      {/* Spent This Month */}
      <section className="px-4 mt-6">
        <div className="rounded-[22px] bg-[#0F1224]/95 backdrop-blur-md p-4">
          <h3 className="text-white font-medium mb-1">Spent this month</h3>
          <div className="flex items-end gap-2">
            <div className="text-[26px] font-semibold tabular-nums">$24</div>
            <div className="text-emerald-400 text-[14px]">▼ $1,051</div>
            <div className="ml-auto text-[14px] text-white/70 tabular-nums">$144</div>
          </div>
            <div className="mt-3 h-[88px] relative">
              <svg
                viewBox="0 0 300 80"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity=".35" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,70 L100,70 L150,70 L160,65 L220,65 L240,55 L260,45 L300,35"
                  stroke="#22c55e"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M0,70 L100,70 L150,70 L160,65 L220,65 L240,55 L260,45 L300,35 L300,80 L0,80 Z"
                  fill="url(#grad)"
                />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 px-1 flex justify-between text-[11px] text-white/50">
                <span>1</span>
                <span>6</span>
                <span>11</span>
                <span>16</span>
                <span>21</span>
                <span>26</span>
                <span>31</span>
              </div>
            </div>
        </div>
      </section>

      {/* Watchlist */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between text-white/80">
          <div className="text-[15px]">Watchlist</div>
          <ChevronRight className="w-4 h-4 text-white/55" />
        </div>
      </section>
      <section className="px-4 mt-2 mb-24">
        <div className="rounded-[22px] bg-[#0F1224]/95 backdrop-blur-md p-4">
          <WatchRow
            dotClass="bg-[#EADFC7]"
            label="Gold"
            sub="XAU to AUD"
            price="$5,135.7332"
            pct="▼ 0.07%"
          />
          <div className="h-4" />
          <WatchRow
            dotClass="bg-[#1E4FFF]"
            label="Euro"
            sub="EUR to AUD"
            price="$1.7950"
            pct="▼ 0.18%"
            flag
          />
          <Button className="mt-2 w-full h-10 rounded-lg text-[15px] text-white/90 bg-transparent hover:bg-white/10 transition">
            See all
          </Button>
        </div>
      </section>
    </div>
  );
}

/* ---------- small presentational helpers ---------- */

function Row({
  iconBg,
  left,
  right,
  iconText,
}: {
  iconBg: string;
  left: string;
  right: string;
  iconText?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full grid place-items-center"
          style={{ background: iconBg }}
        >
          {iconText ? (
            <span className="text-white text-sm font-bold">{iconText}</span>
          ) : (
            <span className="text-white text-sm">$</span>
          )}
        </div>
        <div className="text-[16px]">{left}</div>
      </div>
      <div className="text-[16px] tabular-nums">{right}</div>
    </div>
  );
}

function RowChevron({
  iconBg,
  title,
  subtitle,
  icon,
}: {
  iconBg: string;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full grid place-items-center"
          style={{ background: iconBg }}
        >
          {icon ?? <span className="text-white text-sm">$</span>}
        </div>
        <div>
          <div className="text-[16px]">{title}</div>
          <div className="text-[13px] text-white/60">{subtitle}</div>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-white/60" />
    </div>
  );
}

function WatchRow({
  dotClass,
  label,
  sub,
  price,
  pct,
  flag,
}: {
  dotClass: string;
  label: string;
  sub: string;
  price: string;
  pct: string;
  flag?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
            className={`w-8 h-8 rounded-full grid place-items-center ${dotClass}`}
        >
          {flag ? (
            <span className="text-[12px]">🇪🇺</span>
          ) : (
            <span className="text-[12px] font-semibold">Au</span>
          )}
        </div>
        <div>
          <div className="text-[16px]">{label}</div>
          <div className="text-[13px] text-white/60">{sub}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-[16px] tabular-nums">{price}</div>
        <div className="text-[13px] text-red-400">{pct}</div>
      </div>
    </div>
  );
}
