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
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { type User, type Transaction } from "@shared/schema";

/** Currency formatter (AUD, 2dp) */
const AUD = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white/80">Loading…</div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-red-300">Failed to load user.</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white"
      data-testid="home-screen"
    >
      {/* Header */}
      <div className="px-4 py-4 mb-6">
        <div className="flex items-center justify-between mb-6">
          {/* Avatar */}
          <div
            className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center"
            aria-label="Profile"
          >
            <span className="text-white font-bold text-sm">
              {(user?.name ?? "TF").split(" ").map(s => s[0]).join("").slice(0, 2).toUpperCase()}
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 mx-4">
            <button
              className="w-full bg-gray-800/50 rounded-full px-4 py-2 flex items-center text-left"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <span className="text-gray-400">Search</span>
            </button>
          </div>

          {/* Icons */}
          <div className="flex gap-2">
            <Button
              aria-label="Analytics"
              variant="ghost"
              size="icon"
              className="w-10 h-10 bg-gray-800/50 rounded-full"
            >
              <BarChart3 className="w-5 h-5 text-white" />
            </Button>
            <Button
              aria-label="Menu"
              variant="ghost"
              size="icon"
              className="w-10 h-10 bg-gray-800/50 rounded-full"
            >
              <Menu className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>

        {/* Account Balance */}
        <div className="text-center mb-8">
          <p className="text-white/80 text-sm mb-2" data-testid="text-account-type">
            Personal • AUD
          </p>
          <h1
            className="text-white text-5xl font-light mb-4 tabular-nums"
            data-testid="text-balance"
            title={AUD.format(2.19)}
          >
            {AUD.format(2.19)}
          </h1>
          <Button
            className="bg-white/20 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-white/30"
            data-testid="button-accounts"
          >
            Accounts
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center">
          {[
            { key: "add", label: "Add money", icon: <Plus className="w-6 h-6 text-white" /> },
            { key: "payid", label: "PayID", icon: <span className="text-white font-bold text-xs">iD</span> },
            { key: "move", label: "Move", icon: <ArrowUpDown className="w-6 h-6 text-white" /> },
            { key: "more", label: "More", icon: <MoreHorizontal className="w-6 h-6 text-white" /> },
          ].map(a => (
            <div key={a.key} className="flex flex-col items-center gap-2">
              <Button
                className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center"
                aria-label={a.label}
              >
                {a.icon}
              </Button>
              <span className="text-xs text-white/80">{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Friends Banner */}
      <div className="mx-4 mb-6">
        <div className="bg-black/30 rounded-xl p-4 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-white font-medium mb-1">Invite friends, earn $100</h3>
            <p className="text-white/70 text-sm">
              Earn $100 for each friend you invite by 19 August. T&amp;Cs apply
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-4xl">🎁</div>
            <Button aria-label="Dismiss banner" variant="ghost" size="icon">
              <X className="w-5 h-5 text-white/70" />
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mx-4 mb-6">
        <div className="space-y-3">
          {transactionsLoading && (
            <>
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </>
          )}

          {!transactionsLoading && !txError && recentTransactions.length > 0 && (
            recentTransactions.map((t, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    <div className="text-white text-lg">⚫</div>
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {"merchant" in t ? (t as any).merchant ?? "Payment" : "Payment"}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {formatDate((t as any).createdAt ?? Date.now())}
                      {("status" in t && (t as any).status) ? ` · ${(t as any).status}` : ""}
                    </div>
                  </div>
                </div>
                <div className={`tabular-nums ${((t as any).amount ?? 0) < 0 ? "text-red-300" : "text-white"}`}>
                  {AUD.format(Number((t as any).amount ?? 0))}
                </div>
              </div>
            ))
          )}

          {/* Fallback demo rows if API returns nothing */}
          {!transactionsLoading && !txError && recentTransactions.length === 0 && (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    <div className="text-white text-lg">⚫</div>
                  </div>
                  <div>
                    <div className="text-white font-medium">GitHub</div>
                    <div className="text-gray-400 text-sm">17 Aug, 04:25 · Reverted</div>
                  </div>
                </div>
                <div className="text-white tabular-nums">{AUD.format(1.55)}</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">TF</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Thomas Francis</div>
                    <div className="text-gray-400 text-sm">15 Aug, 18:06</div>
                    <div className="text-gray-400 text-sm">Sent from Revolut</div>
                  </div>
                </div>
                <div className="text-white tabular-nums">-{AUD.format(18).replace("-", "")}</div>
              </div>
            </>
          )}
        </div>

        <Link href="/payments">
          <Button className="w-full mt-4 bg-transparent text-white hover:bg-white/10 text-center py-3">
            See all
          </Button>
        </Link>
      </div>

      {/* Cards */}
      <div className="mx-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium">Cards</h3>
          <ChevronRight className="w-5 h-5 text-white/70" />
        </div>

        <div className="flex gap-3">
          <Link href="/cards/original" className="flex-1">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-3 h-20 relative">
              <div className="text-white text-xs mb-1">R</div>
              <div className="absolute bottom-2 left-3 text-white text-xs">••4103</div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">!</span>
              </div>
            </div>
            <div className="text-center mt-2">
              <div className="text-white text-sm">Original</div>
              <div className="text-gray-400 text-xs">••4103</div>
            </div>
          </Link>

          <div className="flex-1">
            <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-lg p-3 h-20 relative">
              <div className="text-white text-xs mb-1">R</div>
            </div>
            <div className="text-center mt-2">
              <div className="text-white text-sm">Disposable</div>
              <div className="text-gray-400 text-xs">Generate</div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-gray-700 rounded-lg p-3 h-20 flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div className="text-center mt-2">
              <div className="text-white text-sm">Get card</div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Wealth */}
      <div className="mx-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium">Total wealth</h3>
          <ChevronRight className="w-5 h-5 text-white/70" />
        </div>
        <div className="text-white text-2xl font-light mb-4 tabular-nums">{AUD.format(4.28)}</div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">$</span>
              </div>
              <span className="text-white">Cash</span>
            </div>
            <span className="text-white tabular-nums">{AUD.format(2.19)}</span>
          </div>

          <Link href="/crypto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">₿</span>
                </div>
                <span className="text-white">Crypto</span>
              </div>
              <span className="text-white tabular-nums">{AUD.format(2.09)}</span>
            </div>
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">$</span>
              </div>
              <div>
                <div className="text-white">Loan</div>
                <div className="text-gray-400 text-sm">Get a low-rate loan up to $50,000</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/70" />
          </div>

          <Link href="/invest">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white">Invest</div>
                  <div className="text-gray-400 text-sm">Invest for as little as $1</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/70" />
            </div>
          </Link>
        </div>
      </div>

      {/* Spent This Month */}
      <div className="mx-4 mb-6">
        <div className="bg-black/30 rounded-xl p-4">
          <h3 className="text-white font-medium mb-1">Spent this month</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-white text-2xl font-light tabular-nums">{AUD.format(24)}</span>
            <span className="text-green-400 text-sm">▼ {AUD.format(1051)}</span>
            <span className="text-gray-400 text-sm ml-auto tabular-nums">{AUD.format(144)}</span>
          </div>

          {/* Mini Chart */}
          <div className="h-16 relative">
            <svg className="w-full h-full" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M0,50 L50,50 L100,50 L120,45 L140,40 L160,35 L180,30 L200,35 L220,40 L240,45 L260,50 L300,45"
                stroke="#22c55e"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M0,50 L50,50 L100,50 L120,45 L140,40 L160,35 L180,30 L200,35 L220,40 L240,45 L260,50 L300,45 L300,60 L0,60 Z"
                fill="url(#gradient)"
                fillOpacity="0.2"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Chart labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400">
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
      </div>

      {/* Watchlist */}
      <div className="mx-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium">Watchlist</h3>
          <ChevronRight className="w-5 h-5 text-white/70" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">Au</span>
              </div>
              <div>
                <div className="text-white">Gold</div>
                <div className="text-gray-400 text-sm">XAU to AUD</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white tabular-nums">$5,137.5257</div>
              <div className="text-red-400 text-sm">▼ 0.04%</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🇪🇺</span>
              </div>
              <div>
                <div className="text-white">Euro</div>
                <div className="text-gray-400 text-sm">EUR to AUD</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white tabular-nums">$1.7961</div>
              <div className="text-red-400 text-sm">▼ 0.12%</div>
            </div>
          </div>
        </div>

        <Button className="w-full mt-4 bg-transparent text-white hover:bg-white/10 text-center py-3">
          See all
        </Button>
      </div>

      {/* Add Widgets */}
      <div className="mx-4 mb-24">
        <Button className="w-full bg-gray-800/50 text-white rounded-full py-3 flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Add widgets
        </Button>
      </div>
    </div>
  );
}
