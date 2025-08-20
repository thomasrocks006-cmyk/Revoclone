import { type Transaction } from "@shared/schema";
import MerchantIcon from "./MerchantIcon";
import { AlertCircle } from "lucide-react";

interface TransactionCardProps {
  transaction: Transaction;
  className?: string;
}

export default function TransactionCard({ transaction, className = "" }: TransactionCardProps) {
  const isPositive = parseFloat(transaction.amount) > 0;
  const hasOriginalCurrency = transaction.originalAmount && transaction.originalCurrency;
  
  const formatAmount = (amount: string, currency: string) => {
    const value = parseFloat(amount);
    const symbol = currency === "AUD" ? "$" : currency === "EUR" ? "€" : currency === "USD" ? "$" : "";
    return `${value >= 0 ? "+" : ""}${symbol}${Math.abs(value).toFixed(2)}`;
  };

  const getStatusColor = () => {
    if (transaction.status === "failed") return "text-red-400";
    if (transaction.status === "reverted") return "text-yellow-400";
    return "text-white";
  };

  return (
    <div className={`transaction-card rounded-xl p-4 ${className}`} data-testid={`transaction-${transaction.id}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MerchantIcon 
            merchant={transaction.merchant} 
            iconColor={transaction.iconColor ?? undefined}
          />
          <div>
            <p className="text-white font-medium" data-testid="transaction-merchant">
              {transaction.merchant}
            </p>
            <p className="text-gray-400 text-sm" data-testid="transaction-description">
              {transaction.description}
            </p>
            {hasOriginalCurrency && (
              <p className="text-gray-500 text-xs" data-testid="transaction-original-amount">
                {formatAmount(transaction.originalAmount!, transaction.originalCurrency!)}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {transaction.status === "failed" && (
            <AlertCircle className="w-4 h-4 text-red-500" data-testid="transaction-failed-icon" />
          )}
          <p className={`font-medium ${getStatusColor()}`} data-testid="transaction-amount">
            {formatAmount(transaction.amount, transaction.currency)}
          </p>
        </div>
      </div>
    </div>
  );
}
