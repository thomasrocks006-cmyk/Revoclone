import { useEffect, useMemo, useState } from 'react';
import type { Transaction } from '@/types/transaction';
import existingTransactions from '@/data/transactions.json';

function buildTransactionKey(t: Transaction): string {
  return `${new Date(t.date).toISOString()}|${t.merchant}|${Number(t.amount).toFixed(2)}`;
}

function ensureUniqueTransactions(list: Transaction[]): Transaction[] {
  const seen = new Set<string>();
  const out: Transaction[] = [];
  for (const t of list) {
    const k = buildTransactionKey(t);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(t);
    }
  }
  return out;
}

export const useTransactions = () => {
  const [newTransactions, setNewTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const response = await fetch('/revolut_transactions_2025-06-27_to_07-26.json');
        if (!response.ok) throw new Error('Failed to fetch transactions');
        const data = (await response.json()) as Transaction[];
        if (isMounted) setNewTransactions(data);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadTransactions();
    return () => {
      isMounted = false;
    };
  }, []);

  const allTransactions = useMemo(
    () => ensureUniqueTransactions([...(existingTransactions as Transaction[]), ...newTransactions]),
    [newTransactions]
  );

  return { transactions: allTransactions, loading, error };
};

