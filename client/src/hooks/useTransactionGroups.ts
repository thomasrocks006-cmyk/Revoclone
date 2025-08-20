import { useMemo } from 'react';
import type { Transaction, TransactionGroup } from '@/types/transaction';
import { isTransactionExcluded } from '@/lib/analytics';

export const useTransactionGroups = (transactions: Transaction[]): TransactionGroup[] => {
  return useMemo(() => {
    const sorted = [...transactions].sort((a, b) => +new Date(b.date) - +new Date(a.date));

    const map = new Map<string, Transaction[]>();
    for (const t of sorted) {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    }

    return Array.from(map.entries())
      .sort((a, b) => (a[0] > b[0] ? -1 : 1))
      .map(([key, items]) => ({
        key,
        label: new Date(items[0].date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long' }),
        items,
        total: calculateDayTotal(items),
      }));
  }, [transactions]);
};

function calculateDayTotal(items: Transaction[]): number {
  return items.reduce((sum, t) => {
    if (isTransactionExcluded(t.id)) return sum;
    if (t.status === 'reverted' || t.status === 'card_verification') return sum;
    return sum + parseFloat(t.amount);
  }, 0);
}

