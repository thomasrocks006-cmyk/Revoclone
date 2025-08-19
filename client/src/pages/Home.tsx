import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Search,
  BarChart3,
  Menu,
  Plus,
  ArrowLeftRight,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { type User, type Transaction } from "@shared/schema";

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
  return (
    <div className={`animate-pulse rounded-md bg-white/10 ${className}`} />
  );
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
    () => transactions?.slice(0, 2) ?? [],
    [transactions]
  );

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#0B0D18] flex items-center justify-center text-white/80">
        Loading…
      </div>
    );
  }
  if (userError) {
    return (
      <div className="min-h-screen bg-[#0B0D18] flex items-center justify-center text-red-300">
        Failed to load user.
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

  // Demo balance (your real value likely comes from API)
  const balance = 2.19;
  const [whole, cents] = balance.toFixed(2).split(".");

  return (
    // IMPORTANT: constrain width to iPhone content so paddings match Revolut
    // On iPhone this is full width; on desktop it centers at ~390px
    <div className="min-h-screen bg-[#070D18] text-white">
      <div className="w-full max-w-[390px] mx-auto pb-[92px]">
        {/* ---- HEADER GRADIENT ---- */}
        <div
          className="relative"
          style={{
            // Shorter than before so the transactions card is fully visible at top
            height: 420,
            paddingTop:
              "max(env(safe-area-inset-top, 0px), 10px)", // respect iOS safe area
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg,#63AAFF 0%,#4A90FF 14%,#357BFF 30%,#255DE6 48%,#1944B8 62%,#112E7E 76%,#0B1E50 86%,#081534 93%,#070F22 97%,#070D18 100%)",
            }}
          />

          {/* Top row */}
          <div className="relative z-10 px-[18px]">
            <div className="flex items-center gap-2">
              {/* Avatar + dot */}
              <div className="relative w-9 h-9 rounded-full bg-[#F59E0B] grid place-items-center shadow-sm shrink-0">
                <span className="text-[12px] font-semibold tracking-tight">
                  {initials}
                </span>
                <span className="absolute -top-[3px] -right-[3px] w-2 h-2 bg-red-500 rounded-full" />
              </div>

              {/* Search bar (shorter like Revolut) */}
              <button
                className="flex-1 h-[40px] rounded-[22px] bg-white/18 backdrop-blur-[3px] flex items-center pl-4 pr-3 border border-white/15 text-left"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px] text-white/80 mr-2" />
                <span className="text-white/75 text-[13px] leading-none">
                  Search
                </span>
              </button>

              {/* Right icons */}
              <div className="flex items-center gap-2.5 ml-1">
                <div className="w-9 h-9 rounded-full bg-white/12 grid place-items-center border border-white/10">
                  <BarChart3 className="w-[18px] h-[18px]" />
                </div>
                <div className="w-9 h-9 rounded-full bg-white/12 grid place-items-center border border-white/10">
                  <Menu className="w-[18px] h-[18px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Balance block */}
          <div className="relative z-10 pt-10 flex flex-col items-center select-none">
            <div className="text-white/70 text-[12px] mb-3">Personal · AUD</div>

            {/* iOS-like typesetting: $ + big whole + small decimals, tight */}
            <div
              className="text-white leading-none font-medium"
              title={AUD.format(balance)}
            >
              <span className="text-[28px] relative -top-[10px] mr-[2px]">
                $
              </span>
              <span className="text-[56px] tabular-nums">{whole}</span>
              <span className="align-text-top text-[22px] ml-[2px] tabular-nums">
                .{cents}
              </span>
            </div>

            <Button className="mt-4 h-[36px] px-6 rounded-full bg-[#5864A5]/60 border border-white/15 shadow-md text-white/90 text-[14px]">
              Accounts
            </Button>

            {/* Pager dots */}
            <div className="pt-4">
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-white/40 inline-block" />
                <span className="w-1 h-1 rounded-full bg-white inline-block" />
              </div>
            </div>
          </div>
        </div>

        {/* ---- QUICK ACTIONS ---- */}
        <div className="px-[18px] pt-3">
          <div className="grid grid-cols-4 gap-6 text-center">
            {[
              { key: "add", label: "Add money", icon: <Plus className="w-5 h-5" /> },
              { key: "payid", label: "PayID", icon: <span className="text-[12px] font-black">iD</span> },
              { key: "move", label: "Move", icon: <ArrowLeftRight className="w-5 h-5" /> },
              { key: "more", label: "More", icon: <MoreHorizontal className="w-5 h-5" /> },
            ].map((a) => (
              <div key={a.key} className="flex flex-col items-center">
                <div className="w-[52px] h-[52px] rounded-full bg-white/15 grid place-items-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  {a.icon}
                </div>
                <div className="mt-2 text-[12px] text-white/80 leading-none">
                  {a.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- RECENT TRANSACTIONS CARD ---- */}
        <section className="px-[18px] mt-5">
          <div className="rounded-[22px] bg-[#0F1224]/95 backdrop-blur-md p-4 shadow-[0_12px_28px_rgba(0,0,0,0.45)]">
            {/* Loading */}
            {transactionsLoading && (
              <>
                <Skeleton className="h-12 mb-3" />
                <Skeleton className="h-12" />
              </>
            )}

            {/* Loaded */}
            {!transactionsLoading && !txError && recentTransactions.length > 0 &&
              recentTransactions.map((t, idx) => {
                const name =
                  "merchant" in t ? ((t as any).merchant ?? "Payment") : "Payment";
                const sub = [
                  formatDate((t as any).createdAt ?? Date.now()),
                  "status" in t && (t as any).status ? (t as any).status : "",
                ]
                  .filter(Boolean)
                  .join(" · ");
                const amountNum = Number((t as any).amount ?? 0);
                const negative = amountNum < 0;

                return (
                  <div key={idx} className={`flex items-center ${idx === 0 ? "" : "mt-6"}`}>
                    <AvatarGlyph initials="GH" />
                    <div className="ml-3 flex-1">
                      <div className="text-[16px] font-semibold leading-tight">{name}</div>
                      <div className="text-[13px] text-white/65">{sub}</div>
                    </div>
                    <div className="text-[15px] tabular-nums text-right min-w-[76px] pr-1">
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
              })}

            {/* Fallback demo rows */}
            {!transactionsLoading && !txError && recentTransactions.length === 0 && (
              <>
                <div className="flex items-center">
                  <AvatarGlyph initials="GH" />
                  <div className="ml-3 flex-1">
                    <div className="text-[16px] font-semibold leading-tight">GitHub</div>
                    <div className="text-[13px] text-white/65">17 Aug, 04:25 · Reverted</div>
                  </div>
                  <div className="text-[15px] tabular-nums text-right min-w-[76px] pr-1">
                    <span className="text-white/95">
                      {AUD.format(1.55).replace("A$", "$")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center mt-6">
                  <AvatarGlyph initials="TF" color="#F59E0B" />
                  <div className="ml-3 flex-1">
                    <div className="text-[16px] font-semibold leading-tight">Thomas Francis</div>
                    <div className="text-[13px] text-white/65 whitespace-pre-line">
                      {"15 Aug, 18:06\nSent from Revolut"}
                    </div>
                  </div>
                  <div className="text-[15px] tabular-nums text-right min-w-[76px] pr-1">
                    <span className="text-[#ff6b6b]">
                      -{AUD.format(18).replace("A$", "$")}
                    </span>
                  </div>
                </div>
              </>
            )}

            <Link href="/payments">
              <Button className="mt-6 w-full h-10 rounded-lg text-[15px] text-white/90 bg-transparent hover:bg-white/10 transition">
                See all
              </Button>
            </Link>
          </div>

          {/* Extra space under card so it's still visible at very top with space below */}
          <div className="h-3" />
        </section>

        {/* ---- (Optional) sections below kept, but spacing tuned to reference ---- */}
        <SectionHeader title="Cards" />
        <section className="px-[18px] mt-2">
          <div className="rounded-[22px] bg-[#0F1224]/95 backdrop-blur-md p-4">
            <div className="grid grid-cols-3 gap-4">
              <Link href="/cards/original" className="block">
                <div
                  className="relative h-24 rounded-xl p-2"
                  style={{
                    background:
                      "linear-gradient(150deg,#5E4EE6 0%, #2458E7 100%)",
                  }}
                >
                  <div className="absolute -right-1 -top-1 w-[18px] h-[18px] rounded-full bg-yellow-400 grid place-items-center text-black text-[12px] font-bold">
                    !
                  </div>
                  <div className="absolute bottom-2 left-2 text-[11px]">··4103</div>
                  <div className="absolute top-2 left-2 text-[12px] font-medium">R</div>
                </div>
                <div className="mt-2 text-center">
                  <div className="text-[13px]">Original</div>
                  <div className="text-[11px] text-white/60">··4103</div>
                </div>
              </Link>

              <div>
                <div
                  className="h-24 rounded-xl p-2"
                  style={{
                    background:
                      "linear-gradient(150deg,#FF6EA0 0%, #E64864 100%)",
                  }}
                >
                  <div className="text-[12px] font-medium">R</div>
                </div>
                <div className="mt-2 text-center">
                  <div className="text-[13px]">Disposable</div>
                  <div className="text-[11px] text-white/60">Generate</div>
                </div>
              </div>

              <div>
                <div className="h-24 rounded-xl bg-white/10 grid place-items-center">
                  <Plus className="w-6 h-6" />
                </div>
                <div className="mt-2 text-center text-[13px]">Get card</div>
              </div>
            </div>
          </div>
        </section>

        <SectionHeader title="Total wealth" />
        <section className="px-[18px] mt-2">
          <div className="rounded-[22px] bg-[#0F1224]/95 backdrop-blur-md p-4">
            <div className="text-[34px] font-semibold tabular-nums">
              {AUD.format(4.29).replace("A$", "$")}
            </div>
            <div className="mt-4 space-y-4">
              <Row iconBg="#6C8CFF" left="Cash" right={AUD.format(2.19).replace("A$", "$")} />
              <Row iconBg="#A070FF" left="Crypto" right={AUD.format(2.10).replace("A$", "$")} iconText="₿" />
              <RowChevron iconBg="#D8E958" title="Loan" subtitle="Get a low-rate loan up to $50,000" />
              <RowChevron
                iconBg="#56B4FF"
                title="Invest"
                subtitle="Invest for as little as $1"
                icon={<BarChart3 className="w-4 h-4" />}
              />
            </div>
          </div>
        </section>

        <section className="px-[18px] mt-6 mb-24">
          <div className="rounded-[22px] bg-[#0F1224]/95 backdrop-blur-md p-4">
            <h3 className="text-white font-medium mb-1">Spent this month</h3>
            <div className="flex items-end gap-2">
              <div className="text-[26px] font-semibold tabular-nums">$24</div>
              <div className="text-emerald-400 text-[14px]">▼ $1,051</div>
              <div className="ml-auto text-[14px] text-white/70 tabular-nums">$144</div>
            </div>
            <div className="mt-3 h-[88px] relative">
              <svg viewBox="0 0 300 80" className="absolute inset-0 w-full h-full" aria-hidden="true">
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
                <span>1</span><span>6</span><span>11</span><span>16</span><span>21</span><span>26</span><span>31</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- tiny presentational helpers ---------- */

function AvatarGlyph({
  initials = "",
  color = "#000000",
}: {
  initials?: string;
  color?: string;
}) {
  return (
    <div className="relative w-[36px] h-[36px] rounded-full grid place-items-center"
         style={{ background: color === "#000000" ? "#000" : color }}>
      {color === "#000000" ? (
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
      ) : (
        <span className="text-[11px] font-semibold">{initials}</span>
      )}
      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#10182A] rounded-full grid place-items-center">
        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor" aria-hidden>
          <path d="M7 12h10M12 7l5 5-5 5" />
        </svg>
      </span>
    </div>
  );
}

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
        <div className="w-8 h-8 rounded-full grid place-items-center" style={{ background: iconBg }}>
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
        <div className="w-8 h-8 rounded-full grid place-items-center" style={{ background: iconBg }}>
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

function SectionHeader({ title }: { title: string }) {
  return (
    <section className="px-[18px] mt-6">
      <div className="flex items-center justify-between text-white/80">
        <div className="text-[15px]">{title}</div>
        <ChevronRight className="w-4 h-4 text-white/55" />
      </div>
    </section>
  );
}

// sanity check
if (typeof window !== "undefined") {
  const demo = "15 Aug, 18:06\nSent from Revolut";
  console.debug("Sanity: demo newline ok =", demo.includes("\n"));
}
