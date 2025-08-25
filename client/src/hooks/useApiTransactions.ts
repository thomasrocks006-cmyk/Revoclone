import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { User, Transaction as ServerTransaction } from '@shared/schema';
import type { Transaction as ClientTransaction } from '@/types/transaction';

/**
 * Maps server transaction status with description-based overrides for UI badges
 */
function mapTransactionStatus(serverStatus: string, description?: string | null): ClientTransaction['status'] {
  if (!description) return serverStatus as ClientTransaction['status'];
  
  const desc = description.toLowerCase();
  
  // Description-based status mapping for UI badges
  if (desc.includes('card verification')) return 'card_verification';
  if (desc.includes('insufficient')) return 'insufficient_balance'; 
  if (desc.includes('delayed')) return 'delayed_transaction';
  
  // Use server status as-is for standard cases
  return serverStatus as ClientTransaction['status'];
}

/**
 * Maps server transaction (@shared/schema) to client UI transaction interface
 */
function mapServerToClientTransaction(serverTx: ServerTransaction): ClientTransaction {
  // Handle date field - server sends it as ISO string via JSON
  const date = serverTx.date 
    ? (typeof serverTx.date === 'string' ? serverTx.date : serverTx.date.toISOString())
    : new Date().toISOString();
  
  return {
    id: serverTx.id,
    date,
    merchant: serverTx.merchant,
    amount: serverTx.amount,
    currency: serverTx.currency,
    status: mapTransactionStatus(serverTx.status, serverTx.description),
    description: serverTx.description ?? '',
    secondary: '', // Default empty string as per existing hook
    originalAmount: serverTx.originalAmount ?? undefined,
    originalCurrency: serverTx.originalCurrency ?? undefined,
    iconColor: serverTx.iconColor ?? undefined,
    // location: undefined - server doesn't provide geo data, UI handles optional
  };
}

/**
 * React Query hook to fetch transactions from the API
 * Maps server transaction schema to client UI format
 * Follows same pattern as Home.tsx (fetch user first, then transactions)
 */
export const useApiTransactions = () => {
  // Fetch user first (same pattern as Home.tsx)
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery<User>({ 
    queryKey: ['/api/user'] 
  });

  // Fetch transactions when user is loaded
  const {
    data: serverTransactions,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useQuery<ServerTransaction[]>({
    queryKey: ['/api/transactions', user?.id],
    enabled: !!user?.id,
    staleTime: 30_000,
  });

  // Map server transactions to client format
  const transactions = useMemo(
    () => serverTransactions?.map(mapServerToClientTransaction) ?? [],
    [serverTransactions]
  );

  const loading = userLoading || transactionsLoading;
  const error = userError || transactionsError;

  return {
    transactions,
    loading,
    error: error ? (error instanceof Error ? error.message : 'Unknown error') : null,
  };
};