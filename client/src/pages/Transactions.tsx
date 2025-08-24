import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { Transaction } from "@/types/transaction";
import { useTransactions } from "@/hooks/useTransactions";
import { useTransactionGroups } from "@/hooks/useTransactionGroups";
import { useSearch } from "@/hooks/useSearch";
import { useScrollLock } from "@/hooks/useScrollLock";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import TransactionIcon from "@/components/TransactionIcon";
import SearchBar from "@/components/SearchBar";
import TransactionSheet from "@/components/TransactionSheet";
import { TransactionSkeleton, ErrorMessage, EmptyState } from "@/components/LoadingStates";

// Static FX rates: 1 AUD => 0.55 EUR, 1 AUD => 0.48 GBP
// Therefore: 1 EUR => 1/0.55 AUD, 1 GBP => 1/0.48 AUD
const FX_TO_AUD: Record<string, number> = {
  AUD: 1,
  EUR: 1 / 0.55,
  GBP: 1 / 0.48,
  USD: 1, // leave untouched if USD appears; adjust if needed later
};

export default function Transactions() {
  const [openTx, setOpenTx] = useState<Transaction | null>(null);
  const { transactions, loading, error } = useTransactions();
  const { searchTerm, setSearchTerm, filteredTransactions, hasActiveSearch } = useSearch(transactions);
  const groups = useTransactionGroups(filteredTransactions);

  useScrollLock(!!openTx);

  const formatAmount = (amount: string, currency: string = 'AUD') => {
    const value = parseFloat(amount);
    const symbol =
      currency === "AUD" ? "$" :
      currency === "EUR" ? "€" :
      currency === "USD" ? "$" :
      currency === "GBP" ? "£" : "";
    return `${value >= 0 ? "+" : ""}${symbol}${Math.abs(value).toFixed(2)}`;
  };

  if (loading) return <TransactionSkeleton />;
  if (error) return <ErrorMessage error={error} onRetry={() => window.location.reload()} />;
  if (transactions.length === 0) return <EmptyState />;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white" data-testid="transactions-screen">
        {/* Removed max-width constraint and reduced padding for fuller screen usage */}
        <div className="w-full px-3 pb-24" style={{ paddingTop: "max(env(safe-area-inset-top), 20px)" }}>
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <button className="w-10 h-10 text-white flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1 text-center text-2xl font-bold -ml-10">Transactions</div>
            <div className="w-10" />
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <SearchBar value={searchTerm} onChange={setSearchTerm} hasActiveSearch={hasActiveSearch} />
          </div>

          {/* Month selector */}
          <div className="mb-5 flex items-center justify-center gap-6 text-[15px]">
            <span className="text-gray-500">November 2023</span>
            <span className="text-gray-500">June</span>
            <span className="px-4 h-8 rounded-full grid place-items-center bg-gray-800">July</span>
            <span className="text-gray-500">August</span>
          </div>

          {/* Transaction Groups */}
          <div className="space-y-6">
            {groups.map(({ key, label, items, total }) => (
              <section key={key}>
                {/* Group header with date and total */}
                <div className="flex items-baseline justify-between px-2 mb-3">
                  <div className="text-[17px] font-semibold">{label}</div>
                  <div className="text-[15px] text-white" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {formatAmount(total.toString())}
                  </div>
                </div>

                {/* Transaction card - darker background and less rounded */}
                <div className="rounded-2xl p-2" style={{ background: "#0A0B0D" }}>
                  <div className="space-y-0.5">
                    {items.map((transaction) => (
                      <TransactionRow 
                        key={transaction.id} 
                        transaction={transaction} 
                        onClick={() => setOpenTx(transaction)} 
                        formatAmount={formatAmount} 
                      />
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

        {openTx && <TransactionSheet tx={openTx} onClose={() => setOpenTx(null)} />}
      </div>
    </ErrorBoundary>
  );
}

const TransactionRow = React.memo(({ 
  transaction, 
  onClick, 
  formatAmount 
}: { 
  transaction: Transaction; 
  onClick: () => void; 
  formatAmount: (amount: string, currency?: string) => string; 
}) => {
  const amount = parseFloat(transaction.amount);
  const isReverted = transaction.status === "reverted";
  const isCV = transaction.status === "card_verification";

  const primaryColor = isReverted ? "rgba(255,255,255,.7)" : amount > 0 ? "#22C55E" : amount < 0 ? "#FFFFFF" : "#FFFFFF";
  // Prefer original local charge if provided; otherwise use transaction currency/amount
  const localAmountStr = transaction.originalAmount ?? transaction.amount;
  const localCurrency = transaction.originalCurrency ?? transaction.currency ?? 'AUD';
  const primaryText = formatAmount(localAmountStr, localCurrency);

  // Compute AUD equivalent when transaction currency is EUR or GBP (or keep same for AUD)
  const audEquivalent = (() => {
    const cur = localCurrency as string;
    const fx = FX_TO_AUD[cur] ?? 1;
    const converted = parseFloat(localAmountStr) * fx;
    return formatAmount(converted.toString(), "AUD");
  })();

  const timeText = new Date(transaction.date).toLocaleTimeString("en-GB", { 
    hour: "2-digit", 
    minute: "2-digit", 
    hour12: false 
  });
  
  const subs: string[] = [timeText];
  if (transaction.status === "reverted") subs.push("Reverted");
  if (transaction.status === "card_verification") subs.push("Card verification");
  if (transaction.status === "delayed_transaction") subs.push("Delayed transaction");

  return (
    <div 
      className="flex items-center rounded-xl hover:bg-white/5 active:bg-white/10 transition px-3 py-3 cursor-pointer" 
      onClick={onClick} 
      role="button" 
      tabIndex={0} 
      aria-label={`Open details for ${transaction.merchant}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="mr-3">
        <TransactionIcon transaction={transaction} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[16px] font-medium leading-tight truncate text-white">
          {transaction.merchant}
        </div>
        <div className="text-[13px] text-gray-500">
          {subs.join(" · ")}
        </div>
      </div>

      <div className="ml-3 text-right">
        {!isCV && (
          <>
            <div 
              className="text-[16px] font-medium" 
              style={{ 
                color: primaryColor, 
                textDecoration: isReverted ? "line-through" : "none", 
                fontVariantNumeric: "tabular-nums" 
              }}
            >
              {primaryText}
            </div>
            {/* AUD equivalent under the local currency */}
            {localCurrency !== 'AUD' && (
              <div className="text-[12px] text-gray-400" style={{ fontVariantNumeric: "tabular-nums" }}>
                {audEquivalent}
              </div>
            )}
          </>
        )}
        {transaction.secondary && (
          <div className="text-[12px] text-gray-500">{transaction.secondary}</div>
        )}
      </div>
    </div>
  );
});
