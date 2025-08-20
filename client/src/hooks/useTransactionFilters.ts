import { useEffect, useMemo, useState } from 'react';
import type { Transaction } from '@/types/transaction';
import { getEffectiveCategory } from '@/lib/analytics';

export type TransactionFilters = {
  dateFrom?: string;
  dateTo?: string;
  selectedCategories: Set<string>;
};

export const useTransactionFilters = (transactions: Transaction[]) => {
  const [dateFrom, setDateFrom] = useState<string | undefined>(undefined);
  const [dateTo, setDateTo] = useState<string | undefined>(undefined);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());

  const allCategories = useMemo(() => {
    const set = new Set<string>();
    for (const t of transactions) {
      const c = getEffectiveCategory(t);
      if (c) set.add(c);
    }
    return Array.from(set).sort();
  }, [transactions]);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const d = new Date(t.date).getTime();
      if (dateFrom && d < new Date(dateFrom).getTime()) return false;
      if (dateTo) {
        const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        if (d > end.getTime()) return false;
      }
      if (selectedCategories.size > 0) {
        const c = getEffectiveCategory(t);
        if (!selectedCategories.has(c)) return false;
      }
      return true;
    });
  }, [transactions, dateFrom, dateTo, selectedCategories]);

  const toggleCategory = (c: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  const clearFilters = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setSelectedCategories(new Set());
  };

  // Initialize from URL
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const f = p.get('from') || undefined;
    const t = p.get('to') || undefined;
    const cats = (p.get('cats') || '').split(',').filter(Boolean);
    if (f) setDateFrom(f);
    if (t) setDateTo(t);
    if (cats.length) setSelectedCategories(new Set(cats));
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      const data = { dateFrom, dateTo, selectedCategories: Array.from(selectedCategories) };
      localStorage.setItem('tx:filters', JSON.stringify(data));
    } catch {}
  }, [dateFrom, dateTo, selectedCategories]);

  // Restore last-used if URL doesn’t specify
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get('from') || p.get('to') || p.get('cats')) return;
    try {
      const raw = localStorage.getItem('tx:filters');
      if (raw) {
        const parsed = JSON.parse(raw) as { dateFrom?: string; dateTo?: string; selectedCategories?: string[] };
        if (parsed.dateFrom) setDateFrom(parsed.dateFrom);
        if (parsed.dateTo) setDateTo(parsed.dateTo);
        if (parsed.selectedCategories?.length) setSelectedCategories(new Set(parsed.selectedCategories));
      }
    } catch {}
  }, []);

  return {
    dateFrom,
    dateTo,
    setDateFrom,
    setDateTo,
    selectedCategories,
    toggleCategory,
    clearFilters,
    allCategories,
    filtered,
  };
};

// infer moved to lib/analytics

