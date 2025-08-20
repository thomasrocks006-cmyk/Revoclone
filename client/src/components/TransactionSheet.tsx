import React from 'react';
import type { Transaction } from '@/types/transaction';
import TransactionIcon from '@/components/TransactionIcon';

export default function TransactionSheet({ tx, onClose }: { tx: Transaction; onClose: () => void }) {
  if (!tx) return null;

  const amount = parseFloat(tx.amount || '0');
  const isNeg = amount < 0;
  const symbol = tx.currency === 'EUR' ? '€' : tx.currency === 'USD' ? '$' : '$';
  const amountText = `${isNeg ? '-' : '+'}${symbol}${Math.abs(amount).toFixed(2)}`;

  const time24 = (iso: string) => new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateLong = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

  return (
    <div className="fixed inset-0 z-50" aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black" onClick={onClose} />
      <div className="absolute inset-0 flex items-end">
        <div className="w-full max-w-[430px] mx-auto bg-[#1C1C1E] rounded-t-3xl text-white h-[95vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} style={{ boxShadow: '0 -10px 40px rgba(0,0,0,1)' }}>
          <div className="pt-3 pb-2 flex justify-center sticky top-0 bg-[#1C1C1E] z-10">
            <div className="w-12 h-1.5 rounded-full bg-white/30" />
          </div>

          <div className="px-6 pt-4 pb-6 relative">
            <button onClick={onClose} className="absolute left-4 top-4 w-8 h-8 grid place-items-center rounded-full text-white hover:bg-white/10" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div className="absolute right-6 top-4">
              <div className="w-12 h-12">
                <TransactionIcon transaction={tx} size="lg" />
              </div>
            </div>

            <div className="text-[34px] font-extrabold leading-none pr-20 mb-2 text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {amountText}
            </div>

            <div className="mb-1">
              <span className="text-[#60A5FA] text-[18px]">{tx.merchant}</span>
            </div>

            <div className="text-white/60 mb-4 text-[15px]">{dateLong(tx.date)}, {time24(tx.date)}</div>

            <button className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 h-12 hover:bg-white/15 transition-colors" aria-label="Split bill">
              <svg width="20" height="20" viewBox="0 0 24 24" className="text-white/80">
                <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[16px] text-white">Split bill</span>
            </button>
          </div>

          <div className="px-6 mb-6">
            <div className="rounded-2xl overflow-hidden bg-[#3A5998] h-40 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A7C99] to-[#2D4A6B]"></div>
              <div className="absolute bottom-3 left-3 text-white text-[12px] font-medium">{tx.location?.address || 'Unknown location'}</div>
              <div className="absolute bottom-3 right-3 text-white/70 text-[10px]">Legal</div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 rounded-lg px-3 py-1">
                <span className="text-white text-[11px] font-medium">🍎 Maps</span>
              </div>
            </div>
          </div>

          <div className="px-6 space-y-4 pb-20">
            <Block>
              <Row label="Status" value={tx.status || 'Completed'} />
              <Row label="Card" value="Mastercard ••4103" valueClass="text-[#60A5FA]" icon="card" />
              <Row label="Statement" value="Download" valueClass="text-[#60A5FA]" icon="download" />
            </Block>

            <Block>
              <Row label="Exclude from analytics" customRight={<Toggle />} />
              <Row label="Category" value="Restaurants" valueClass="text-[#60A5FA]" icon="fork" />
              <Row label="Adjust for analytics" value="$2.50" valueClass="text-[#60A5FA]" icon="bars" />
            </Block>

            <Block>
              <Row label={`Spent at ${tx.merchant}`} value="$80.26" />
              <Row label="Number of transactions" value="9" />
              <Row label="See all" chevron />
            </Block>

            <Block>
              <Row label="Receipt" value="Upload" valueClass="text-[#60A5FA]" icon="camera" />
            </Block>

            <Block>
              <Row label="Note" value="Add note" valueClass="text-[#60A5FA]" icon="plus" />
            </Block>

            <Block>
              <Row label="Get help" chevron />
            </Block>
          </div>
        </div>
      </div>
    </div>
  );
}

function Block({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-[#2C2C2E] px-5 py-4 space-y-4">{children}</div>;
}

function Row({ label, value, valueClass, chevron, icon, customRight }: { label: string; value?: string; valueClass?: string; chevron?: boolean; icon?: 'card' | 'download' | 'fork' | 'bars' | 'camera' | 'plus'; customRight?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {icon && <RowIcon kind={icon} />}
        <div className="text-white/70 text-[16px]">{label}</div>
      </div>
      {customRight ? (
        customRight
      ) : (
        <div className="flex items-center gap-2">
          {value && <div className={`text-white text-[16px] ${valueClass ?? ''}`}>{value}</div>}
          {chevron && (
            <svg width="18" height="18" viewBox="0 0 24 24" className="text-white/40">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          )}
        </div>
      )}
    </div>
  );
}

function RowIcon({ kind }: { kind: string }) {
  const paths: Record<string, React.ReactNode> = {
    card: <rect x="3" y="6" width="18" height="12" rx="2" />,
    download: (
      <>
        <path d="M12 3v10" />
        <path d="M8 9l4 4 4-4" />
        <path d="M5 21h14" />
      </>
    ),
    fork: (
      <>
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2" />
        <path d="M15 5v4a2 2 0 0 0 2 2h4" />
      </>
    ),
    bars: (
      <>
        <rect x="3" y="6" width="18" height="3" rx="1" />
        <rect x="3" y="11" width="18" height="3" rx="1" />
        <rect x="3" y="16" width="18" height="3" rx="1" />
      </>
    ),
    camera: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M7 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
  };

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="text-white/50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {paths[kind] ?? null}
    </svg>
  );
}

function Toggle() {
  return (
    <button type="button" className="relative inline-flex h-8 w-14 items-center rounded-full bg-[#3A3A3C] transition-colors" onClick={(e) => e.preventDefault()}>
      <span className="inline-block h-7 w-7 transform rounded-full bg-white translate-x-0.5 transition-transform will-change-transform shadow-sm" />
    </button>
  );
}

