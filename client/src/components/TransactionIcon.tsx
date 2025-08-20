import React from 'react';
import { Transaction } from '@/types/transaction';
import { MERCHANT_ICONS, getDefaultIcon } from '@/data/merchantIcons';

interface Props {
  transaction: Transaction;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const TransactionIcon: React.FC<Props> = React.memo(({ transaction, size = 'md' }) => {
  const { merchant, status } = transaction;
  const config = MERCHANT_ICONS[merchant] || getDefaultIcon();

  const statusOverlay = getStatusOverlay(status);

  return (
    <div className={`relative ${sizeClasses[size]} ${config.bgColor} rounded-full flex items-center justify-center`}>
      {config.icon}
      {config.statusOverlay}
      {statusOverlay}
    </div>
  );
});

function getStatusOverlay(status: string): React.ReactNode {
  if (status === 'reverted') {
    return (
      <div className="absolute -bottom-1 -right-1 bg-yellow-300 text-black rounded-full w-4 h-4 text-[10px] grid place-items-center font-bold">
        ↩
      </div>
    );
  }
  if (status === 'failed' || status === 'insufficient_balance') {
    return (
      <div className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] grid place-items-center font-bold">
        !
      </div>
    );
  }
  if (status === 'card_verification') {
    return (
      <div className="absolute -bottom-1 -right-1 bg-white text-black rounded-full w-4 h-4 text-[9px] grid place-items-center font-bold">
        CV
      </div>
    );
  }
  if (status === 'delayed_transaction') {
    return (
      <div className="absolute -bottom-1 -right-1 bg-orange-500 text-white rounded-full w-4 h-4 text-[9px] grid place-items-center font-bold">
        …
      </div>
    );
  }
  return null;
}

export default TransactionIcon;

