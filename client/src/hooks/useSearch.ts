import { useMemo, useState } from 'react';
import type { Transaction } from '@/types/transaction';
import { useDebounce } from '@/hooks/useDebounce';

export const useSearch = (transactions: Transaction[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredTransactions = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return transactions;
    const term = debouncedSearchTerm.toLowerCase();
    return transactions.filter((t) =>
      t.merchant.toLowerCase().includes(term) ||
      (t.description || '').toLowerCase().includes(term) ||
      t.amount.includes(term)
    );
  }, [transactions, debouncedSearchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredTransactions,
    hasActiveSearch: !!debouncedSearchTerm.trim(),
  };
};

