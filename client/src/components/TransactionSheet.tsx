import React, { useEffect, useRef, useState } from 'react';
import { CreditCard, Download, Utensils, BarChart3, Camera, Plus, Info } from 'lucide-react';
import type { Transaction } from '@/types/transaction';
import TransactionIcon from '@/components/TransactionIcon';

function BlueButton({ icon, text }: { icon: string; text: string }) {
  return (
      <a href="#" className="inline-flex items-center gap-1 text-[#60A5FA] text-[16px] hover:underline leading-none">
        <RowIcon kind={icon} blue size={18} className="align-middle" />
      <span>{text}</span>
    </a>
  );
}

// Static FX rates per requirements
// 1 AUD = 0.55 EUR, 1 AUD = 0.48 GBP
const FX_AUD_TO_LOCAL: Record<string, number> = {
  AUD: 1,
  EUR: 0.55,
  GBP: 0.48,
  USD: 1,
};

const localSymbol = (code?: string) => (code === 'EUR' ? '€' : code === 'GBP' ? '£' : '$');
const formatAbs = (n: number, symbol: string) => `${symbol}${Math.abs(n).toFixed(2)}`;

export default function TransactionSheet({ tx, onClose }: { tx: Transaction; onClose: () => void }) {
  if (!tx) return null;

  // Prefer original local charge if provided
  const localAmountRaw = parseFloat(tx.originalAmount ?? tx.amount ?? '0');
  const localCurrency = (tx.originalCurrency ?? tx.currency ?? 'AUD') as keyof typeof FX_AUD_TO_LOCAL;
  const localSym = localSymbol(localCurrency);

  // Convert local to AUD using provided fixed rates
  const audPerLocal = FX_AUD_TO_LOCAL[localCurrency] === 0 ? 0 : 1 / (FX_AUD_TO_LOCAL[localCurrency] || 1);
  const amountAud = localCurrency === 'AUD' ? localAmountRaw : localAmountRaw * audPerLocal;
  const isNeg = amountAud < 0;
  const amountText = `${isNeg ? '-' : '+'}$${Math.abs(amountAud).toFixed(2)}`;

  // Weekend fee logic: 1% fee on weekends (Saturday/Sunday), displayed in AUD
  const isWeekend = (() => {
    const d = new Date(tx.date);
    const day = d.getDay();
    return day === 0 || day === 6;
  })();
  const weekendFeeAud = isWeekend ? Math.abs(amountAud) * 0.01 : 0;
  const totalAudAbsWithFee = Math.abs(amountAud) + (isWeekend ? weekendFeeAud : 0);

  const time24 = (iso: string) => new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateLong = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

  // Sticky header fade-in state
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [titleOpacity, setTitleOpacity] = useState(0);
  const [showFeeSheet, setShowFeeSheet] = useState(false);
  const [feeAnim, setFeeAnim] = useState(false);
  const headerFadeStart = 20; // px
  const headerFadeEnd = 80; // px

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const y = el.scrollTop;
    const t = Math.min(1, Math.max(0, (y - headerFadeStart) / (headerFadeEnd - headerFadeStart)));
    setTitleOpacity(t);
  };

  useEffect(() => {
    handleScroll();
  }, []);

  // Animate fee sheet on mount
  useEffect(() => {
    if (showFeeSheet) {
      const t = setTimeout(() => setFeeAnim(true), 0);
      return () => clearTimeout(t);
    } else {
      setFeeAnim(false);
    }
  }, [showFeeSheet]);

  return (
    <>
    <div className="fixed inset-0 z-50" aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black" onClick={onClose} />
      <div className="absolute inset-0 flex items-end">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="w-full max-w-[430px] mx-auto bg-[#1C1C1E] rounded-t-3xl text-white h-[95vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
          style={{ boxShadow: '0 -10px 40px rgba(0,0,0,1)' }}
        >
          {/* Sticky translucent header bar with Close and fading merchant name */}
          <div className="sticky top-0 z-30">
            <div className="h-12 flex items-center px-2 bg-[#1C1C1E]/60 backdrop-blur-md border-b border-white/5">
              <button
                onClick={onClose}
                className="w-10 h-10 grid place-items-center text-white/90 hover:text-white focus:outline-none"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <div className="flex-1 text-center select-none">
                <div
                  className="text-[17px] font-semibold text-white"
                  style={{ opacity: titleOpacity, transition: 'opacity 200ms ease' }}
                >
                  {tx.merchant}
                </div>
              </div>
              <div className="w-10" />
            </div>
          </div>

          {/* Header content area */}
          <div className="px-6 pt-6 pb-6 relative">
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

          {/* Location card */}
          <div className="px-4 mb-6">
            <LocationCard tx={tx} />
          </div>

          {/* Detail blocks (aligned to map card width) */}
          <div className="px-4 space-y-4 pb-20">
            <Block>
              {(() => {
                const raw = (tx.status || 'completed').toString();
                const map: Record<string, string> = {
                  card_verification: 'Card verification',
                  delayed_transaction: 'Delayed transaction',
                };
                const displayStatus = map[raw] ?? (raw.charAt(0).toUpperCase() + raw.slice(1));
                return <Row label="Status" value={displayStatus} />;
              })()}
              <Row label="Card" customRight={<a href="#" className="text-[#60A5FA] text-[16px] hover:underline">Mastercard ••4103</a>} />
              <Row label="Statement" customRight={<a href="#" className="text-[#60A5FA] text-[16px] hover:underline">Download</a>} />
            </Block>

            {(localCurrency !== 'AUD' && (localCurrency === 'EUR' || localCurrency === 'GBP')) && (
              <Block>
                <Row label="Merchant's charge" value={formatAbs(localAmountRaw, localSym)} />
                <Row label="Exchange rate" value={`$1 = ${localSym}${(FX_AUD_TO_LOCAL[localCurrency] ?? 1).toFixed(4)}`} />
                <Row label="Exchanged amount" value={formatAbs(amountAud, '$')} />
                <Row
                  label="Fees"
                  customRight={
                    isWeekend ? (
                      <button
                        type="button"
                        onClick={() => setShowFeeSheet(true)}
                        className="inline-flex items-center gap-1.5 text-[#60A5FA] hover:underline"
                      >
                        <Info size={16} />
                        <span className="text-[16px]">{formatAbs(weekendFeeAud, '$')}</span>
                      </button>
                    ) : (
                      <div className="text-white text-[16px]">No fee</div>
                    )
                  }
                />
                <Row label="Your total" value={formatAbs(totalAudAbsWithFee, '$')} />
              </Block>
            )}

            {/* Fees block for weekend transactions without FX section */}
            {!(localCurrency !== 'AUD' && (localCurrency === 'EUR' || localCurrency === 'GBP')) && isWeekend && (
              <Block>
                <Row
                  label="Fees"
                  customRight={
                    <button
                      type="button"
                      onClick={() => setShowFeeSheet(true)}
                      className="inline-flex items-center gap-1.5 text-[#60A5FA] hover:underline"
                    >
                      <Info size={16} />
                      <span className="text-[16px]">{formatAbs(weekendFeeAud, '$')}</span>
                    </button>
                  }
                />
              </Block>
            )}

            <Block>
              <Row label="Exclude from analytics" customRight={<Toggle />} />
              <Row label="Category" customRight={<BlueButton icon="fork" text="Restaurants" />} />
              <Row label="Adjust for analytics" customRight={<BlueButton icon="bars" text="$2.50" />} />
            </Block>

            <Block>
              <Row label={`Spent at ${tx.merchant}`} value="$80.26" />
              <Row label="Number of transactions" value="9" />
              <Row label="See all" chevron />
            </Block>

            <Block>
              <Row label="Receipt" customRight={<BlueButton icon="camera" text="Upload" />} />
            </Block>

            <Block>
              <Row label="Note" customRight={<BlueButton icon="plus" text="Add note" />} />
            </Block>

            <Block>
              <Row label="Get help" chevron />
            </Block>
          </div>
        </div>
      </div>
    </div>
    {/* Fee breakdown bottom sheet */}
    {showFeeSheet && (
      <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${feeAnim ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setShowFeeSheet(false)}
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end">
          <div
            className={`w-full max-w-[430px] mx-auto rounded-t-3xl bg-[#1C1C1E] text-white pb-8 pt-3 transition-transform duration-250 ease-out ${feeAnim ? 'translate-y-0' : 'translate-y-full'}`}
            style={{ boxShadow: '0 -10px 40px rgba(0,0,0,0.8)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto w-10 h-1.5 rounded-full bg-white/20 mb-3" />
            <div className="px-5">
              <div className="text-[20px] font-semibold text-center mb-4">Fee breakdown</div>
              <div className="rounded-2xl bg-[#2C2C2E] px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/80 text-[16px]">
                    <span>1% weekend exchange</span>
                    <Info size={16} className="text-white/50" />
                  </div>
                  <div className="text-white text-[16px]">{formatAbs(weekendFeeAud, '$')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

function Block({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-[#2C2C2E] px-4 py-4 space-y-4">{children}</div>;
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

function RowIcon({ kind, blue, size = 18, className }: { kind: string; blue?: boolean; size?: number; className?: string }) {
    const iconProps = {
      color: blue ? '#60A5FA' : '#A1A1AA',
      size,
      className,
      strokeWidth: size >= 18 ? 2 : 1.8,
    };
    const icons: Record<string, React.ReactNode> = {
      card: <CreditCard {...iconProps} />,
      download: <Download {...iconProps} />,
      fork: <Utensils {...iconProps} />,
      bars: <BarChart3 {...iconProps} />,
      camera: <Camera {...iconProps} />,
      plus: <Plus {...iconProps} />,
    };
    return icons[kind] ?? null;
}

function Toggle() {
  return (
    <button
      type="button"
      className="relative inline-flex h-8 w-14 items-center rounded-full bg-[#3A3A3C] transition-colors"
      onClick={(e) => e.preventDefault()}
      aria-pressed="false"
    >
      <span className="inline-block h-7 w-7 transform rounded-full bg-white translate-x-0.5 transition-transform will-change-transform shadow-sm" />
    </button>
  );
}

// Location card: renders a dark map preview and opens Apple Maps on click
function LocationCard({ tx }: { tx: Transaction }) {
  const lat = tx.location?.lat;
  const lon = tx.location?.lon;
  const address = tx.location?.address ?? 'Unknown location';
  const merchant = tx.merchant ?? 'Location';
  const hasCoords = typeof lat === 'number' && typeof lon === 'number';
  const appleMapsUrl = hasCoords
    ? `https://maps.apple.com/?q=${encodeURIComponent(merchant)}&ll=${lat},${lon}&z=16`
    : `https://maps.apple.com/?q=${encodeURIComponent(address)}`;

  // Static preview via OSM; darken with overlay to match reference style
  const width = 800; // px (just for the remote image; element is responsive)
  const height = 220;
  const zoom = 14;
  const marker = hasCoords ? `&markers=${lat},${lon},lightblue1` : '';
  const osmUrl = hasCoords
    ? `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lon}&zoom=${zoom}&size=${width}x${height}${marker}`
    : `https://staticmap.openstreetmap.de/staticmap.php?center=${encodeURIComponent(address)}&zoom=${zoom}&size=${width}x${height}`;

  return (
    <a
      href={appleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl overflow-hidden bg-[#2C2C2E] group"
      aria-label={`Open in Apple Maps: ${address}`}
    >
      <div className="relative h-40 w-full">
        <img src={osmUrl} alt={address} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute bottom-3 left-3 text-white text-[12px] font-medium drop-shadow">
          <span className="align-middle"></span>
          <span className="align-middle ml-1">Maps</span>
        </div>
        <div className="absolute bottom-3 right-3 text-white/70 text-[10px] underline">Legal</div>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-white text-[16px] font-medium truncate pr-3">{address}</div>
        <svg width="18" height="18" viewBox="0 0 24 24" className="text-white/40">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    </a>
  );
}
