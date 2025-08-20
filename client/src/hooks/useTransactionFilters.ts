import { useMemo, useState } from 'react';
import type { Transaction } from '@/types/transaction';

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
      const c = (t.category || inferCategoryFromMerchant(t.merchant));
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
        const c = (t.category || inferCategoryFromMerchant(t.merchant));
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

function inferCategoryFromMerchant(merchant: string): string {
  const m = merchant.toLowerCase();
  if (/(mcdonald|burger|cafe|bar|restaurant|pizza|dishoom|nando|chez|trattoria|gelato|caffe|cafe|pub)/.test(m)) return 'Restaurants';
  if (/(uber|taxi|train|tfl|heathrow|express|bus|sncf|tram|ferry)/.test(m)) return 'Transport';
  if (/(hotel|resort|airbnb|hostel)/.test(m)) return 'Accommodation';
  if (/(market|grocer|waitrose|marks|spencer|selfridges|galeries)/.test(m)) return 'Shopping';
  if (/(museum|tickets|tour|storehouse|abbey|beach|club)/.test(m)) return 'Entertainment';
  return 'Uncategorized';
}

