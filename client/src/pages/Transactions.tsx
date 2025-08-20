import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { Transaction } from "@/types/transaction";
import { useTransactions } from "@/hooks/useTransactions";
import { useTransactionGroups } from "@/hooks/useTransactionGroups";
import { useSearch } from "@/hooks/useSearch";
import { useEffect } from "react";
import { useTransactionFilters } from "@/hooks/useTransactionFilters";
import FiltersBar from "@/components/FiltersBar";
import { useScrollLock } from "@/hooks/useScrollLock";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import TransactionIcon from "@/components/TransactionIcon";
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import HighlightText from "@/components/HighlightText";
import SearchBar from "@/components/SearchBar";
import TransactionSheet from "@/components/TransactionSheet";
import { TransactionSkeleton, ErrorMessage, EmptyState } from "@/components/LoadingStates";
import MonthlySummary from "@/components/MonthlySummary";
import PrintExport from "@/components/PrintExport";

export default function Transactions() {
  const [openTx, setOpenTx] = useState<Transaction | null>(null);
  const { transactions, loading, error } = useTransactions();
  const { searchTerm, setSearchTerm, filteredTransactions, hasActiveSearch } = useSearch(transactions);
  const filters = useTransactionFilters(filteredTransactions);
  const groups = useTransactionGroups(filters.filtered);

  useScrollLock(!!openTx);

  // Prefill search from ?q=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) setSearchTerm(q);
  }, [setSearchTerm]);

  // Sync URL with search and filters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (hasActiveSearch && searchTerm) params.set('q', searchTerm);
    else params.delete('q');
    if (filters.dateFrom) params.set('from', filters.dateFrom);
    else params.delete('from');
    if (filters.dateTo) params.set('to', filters.dateTo);
    else params.delete('to');
    const cats = Array.from(filters.selectedCategories);
    if (cats.length) params.set('cats', cats.join(','));
    else params.delete('cats');
    const newUrl = `${window.location.pathname}?${params.toString()}`.replace(/\?$/, '');
    window.history.replaceState(null, '', newUrl);
  }, [hasActiveSearch, searchTerm, filters.dateFrom, filters.dateTo, filters.selectedCategories]);

  // Pagination by group (days)
  const [visibleGroupCount, setVisibleGroupCount] = useState(6);
  useEffect(() => {
    setVisibleGroupCount(6);
  }, [filters.filtered.length, searchTerm]);
  const visibleGroups = useMemo(() => groups.slice(0, visibleGroupCount), [groups, visibleGroupCount]);

  // Export CSV for current filtered transactions
  const onExportCsv = () => {
    const rows = filters.filtered;
    const headers = ['id','date','merchant','amount','currency','status','description','secondary','category'];
    const csv = [headers.join(',')]
      .concat(rows.map(t => [t.id, t.date, t.merchant, t.amount, t.currency || 'AUD', t.status || '', t.description || '', t.secondary || '', t.category || '']
        .map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions_export.csv';
    link.click();
  };

  const formatAmount = (amount: string, currency: string = 'AUD') => {
    const value = parseFloat(amount);
    const symbol = currency === "AUD" ? "$" : currency === "EUR" ? "€" : currency === "USD" ? "$" : "";
    return `${value >= 0 ? "+" : ""}${symbol}${Math.abs(value).toFixed(2)}`;
  };

  if (loading) return <TransactionSkeleton />;
  if (error) return <ErrorMessage error={error} onRetry={() => window.location.reload()} />;
  if (transactions.length === 0) return <EmptyState />;

  // Keyboard navigation: focus list and open selected on Enter
  const listRef = useRef<HTMLDivElement | null>(null);
  const flatItems = useMemo(() => visibleGroups.flatMap(g => g.items), [visibleGroups]);
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  useEffect(() => { setFocusIndex(-1); }, [searchTerm, filters.filtered.length]);
  const onKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocusIndex(i => Math.min(i + 1, flatItems.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setFocusIndex(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && focusIndex >= 0) { setOpenTx(flatItems[focusIndex]); }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white" data-testid="transactions-screen">
        <div className="w-full max-w-[390px] mx-auto px-[18px] pb-24" style={{ paddingTop: "max(env(safe-area-inset-top), 10px)" }}>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 text-white -ml-2 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1 text-center text-2xl font-bold -ml-8">Transactions</div>
            <div className="w-10" />
          </div>

          <div className="mt-3">
            <SearchBar value={searchTerm} onChange={setSearchTerm} hasActiveSearch={hasActiveSearch} />
          </div>

          <FiltersBar
            dateFrom={filters.dateFrom}
            dateTo={filters.dateTo}
            setDateFrom={filters.setDateFrom}
            setDateTo={filters.setDateTo}
            categories={filters.allCategories}
            selectedCategories={filters.selectedCategories}
            toggleCategory={filters.toggleCategory}
            clearFilters={filters.clearFilters}
          />

          <div className="mt-3 flex justify-end gap-2">
            <button onClick={onExportCsv} className="h-9 rounded-full px-3 bg-white/10 hover:bg-white/15 text-sm">Export CSV</button>
            <PrintExport />
          </div>

          <div className="mt-3 flex items-center justify-center gap-8 text-[15px]">
            <span className="text-[#9AA3B2]">November 2023</span>
            <span className="text-[#9AA3B2]">June</span>
            <span className="px-4 h-8 rounded-full grid place-items-center" style={{ background: "#232730" }}>July</span>
            <span className="text-[#9AA3B2]">August</span>
          </div>

          <MonthlySummary transactions={filters.filtered} />

          <div ref={listRef} className="mt-5 space-y-8" tabIndex={0} onKeyDown={onKeyDownList}>
            {visibleGroups.map(({ key, label, items, total }) => (
              <section key={key}>
                <div className="flex items-baseline justify-between px-1 mb-2">
                  <div className="text-[17px] font-semibold">{label}</div>
                  <div className="text-[15px] text-white" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {formatAmount(total.toString())}
                  </div>
                </div>

                <div className="rounded-3xl p-3" style={{ background: "#181A1F", boxShadow: "inset 0 1px 0 rgba(255,255,255,.06)" }}>
                  <div style={{ height: Math.min(56 * items.length, 56 * 8) }}>
                    <AutoSizer>
                      {({ height, width }) => (
                        <List height={height} width={width} itemSize={56} itemCount={items.length} itemData={{ items, setOpenTx, formatAmount }}>
                          {VirtualRow as any}
                        </List>
                      )}
                    </AutoSizer>
                  </div>
                </div>
              </section>
            ))}
            {visibleGroupCount < groups.length && (
              <div className="flex justify-center">
                <button onClick={() => setVisibleGroupCount(c => c + 6)} className="h-10 rounded-lg px-4 bg-white/10 hover:bg-white/15">Load more</button>
              </div>
            )}
          </div>
        </div>

        {openTx && <TransactionSheet tx={openTx} onClose={() => setOpenTx(null)} />}
      </div>
    </ErrorBoundary>
  );
}

const TransactionRow = React.memo(({ transaction, onClick, formatAmount }: { transaction: Transaction; onClick: () => void; formatAmount: (amount: string, currency?: string) => string; }) => {
  const amount = parseFloat(transaction.amount);
  const isReverted = transaction.status === "reverted";
  const isCV = transaction.status === "card_verification";

  const primaryColor = isReverted ? "rgba(255,255,255,.7)" : amount > 0 ? "#22C55E" : amount < 0 ? "#EF4444" : "#FFFFFF";
  const primaryText = formatAmount(transaction.amount, transaction.currency);

  const timeText = new Date(transaction.date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  const subs: string[] = [timeText];

  if (transaction.status === "reverted") subs.push("Reverted");
  if (transaction.status === "card_verification") subs.push("Card verification");
  if (transaction.status === "delayed_transaction") subs.push("Delayed transaction");

  return (
    <div className="flex items-center rounded-xl hover:bg-white/5 active:bg-white/10 transition px-3 py-3 cursor-pointer" onClick={onClick} role="button" tabIndex={0} aria-label={`Open details for ${transaction.merchant}`} onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <div className="mr-3">
        <TransactionIcon transaction={transaction} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[16px] font-semibold leading-tight truncate">
          <HighlightText text={transaction.merchant} term={searchTerm} />
        </div>
        <div className="text-[13px] text-white/60">
          {subs.join(" · ")}
          {transaction.description && <div className="text-[13px] text-white/60"><HighlightText text={transaction.description} term={searchTerm} /></div>}
        </div>
      </div>

      <div className="ml-3 text-right">
        {!isCV && (
          <div className="text-[16px]" style={{ color: primaryColor, textDecoration: isReverted ? "line-through" : "none", fontVariantNumeric: "tabular-nums" }}>
            {primaryText}
          </div>
        )}
        {transaction.secondary && <div className="text-[12px] text-[#6B7280]">{transaction.secondary}</div>}
      </div>
    </div>
  );
});

function VirtualRow({ index, style, data }: ListChildComponentProps<{ items: Transaction[]; setOpenTx: (t: Transaction) => void; formatAmount: (a: string, c?: string) => string }>) {
  const t = data.items[index];
  return (
    <div style={style}>
      <TransactionRow transaction={t} onClick={() => data.setOpenTx(t)} formatAmount={data.formatAmount} />
    </div>
  );
}

