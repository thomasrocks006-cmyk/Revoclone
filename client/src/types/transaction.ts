import { ReactNode } from 'react';

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: string;
  status: 'completed' | 'reverted' | 'failed' | 'insufficient_balance' | 'card_verification' | 'delayed_transaction' | '';
  description: string;
  secondary: string;
  location?: {
    lat: number;
    lon: number;
    address: string;
  };
  originalAmount?: string;
  originalCurrency?: string;
  currency?: string;
  iconColor?: string;
}

export interface TransactionGroup {
  key: string;
  label: string;
  items: Transaction[];
  total: number;
}

export interface MerchantIconConfig {
  bgColor: string;
  icon: ReactNode;
  statusOverlay?: ReactNode;
}

