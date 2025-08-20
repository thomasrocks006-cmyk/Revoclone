import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Transaction } from '@/types/transaction';
import TransactionIcon from '@/components/TransactionIcon';
import { useTransactions } from '@/hooks/useTransactions';
import { useFocusManagement } from '@/hooks/useAccessibility';

export default function TransactionSheet({ tx, onClose }: { tx: Transaction; onClose: () => void }) {
  const { transactions } = useTransactions();
  const { containerRef, handleKeyDown } = useFocusManagement(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const amount = parseFloat(tx.amount || '0');
  const isNeg = amount < 0;
  const symbol = tx.currency === 'EUR' ? '€' : tx.currency === 'USD' ? '$' : '$';
  const amountText = `${isNeg ? '-' : '+'}${symbol}${Math.abs(amount).toFixed(2)}`;

  const time24 = (iso: string) => new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateLong = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

  // Local persistence keys
  const storeKey = (k: string) => `tx:${tx.id}:${k}`;

  const [excluded, setExcluded] = useState<boolean>(() => localStorage.getItem(storeKey('excluded')) === '1');
  const [category, setCategory] = useState<string>(() => localStorage.getItem(storeKey('category')) || tx.category || 'Uncategorized');
  const [adjustment, setAdjustment] = useState<string>(() => localStorage.getItem(storeKey('adjustment')) || '0');
  const [note, setNote] = useState<string>(() => localStorage.getItem(storeKey('note')) || '');
  const [receiptName, setReceiptName] = useState<string>(() => localStorage.getItem(storeKey('receiptName')) || '');

  useEffect(() => localStorage.setItem(storeKey('excluded'), excluded ? '1' : '0'), [excluded]);
  useEffect(() => localStorage.setItem(storeKey('category'), category), [category]);
  useEffect(() => localStorage.setItem(storeKey('adjustment'), adjustment), [adjustment]);
  useEffect(() => localStorage.setItem(storeKey('note'), note), [note]);
  useEffect(() => localStorage.setItem(storeKey('receiptName'), receiptName), [receiptName]);

  const merchantStats = useMemo(() => {
    const list = (transactions || []).filter(t => t.merchant === tx.merchant);
    const netTotal = list.reduce((sum, t) => sum + parseFloat(t.amount || '0'), 0);
    return { count: list.length, total: netTotal };
  }, [transactions, tx.merchant]);

  const categoryOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const t of transactions || []) {
      const key = (t.category || inferCategoryFromMerchant(t.merchant));
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return Array.from(counts.keys()).sort();
  }, [transactions]);

  const openInMaps = () => {
    if (tx.location?.lat && tx.location?.lon) {
      const url = `https://www.google.com/maps/search/?api=1&query=${tx.location.lat},${tx.location.lon}`;
      window.open(url, '_blank');
    } else if (tx.location?.address) {
      const q = encodeURIComponent(tx.location.address);
      window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank');
    }
  };

  const downloadStatement = () => {
    const headers = ['id','date','merchant','amount','currency','status','description','secondary'];
    const values = [tx.id, tx.date, tx.merchant, tx.amount, tx.currency || 'AUD', tx.status || 'completed', tx.description || '', tx.secondary || ''];
    const csv = `${headers.join(',')}
${values.map(v => `"${String(v ?? '').replace(/"/g,'""')}"`).join(',')}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `statement_${tx.id}.csv`;
    link.click();
  };

  const navigateToCards = () => {
    window.location.assign('/cards/original');
  };

  const seeAllForMerchant = () => {
    const q = encodeURIComponent(tx.merchant);
    window.location.assign(`/transactions?q=${q}`);
  };

  const onUploadReceipt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptName(file.name);
    }
  };

  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const promptCategory = () => setShowCategoryPicker(true);

  const promptAdjustment = () => {
    const val = window.prompt('Adjust amount for analytics (use positive or negative)', adjustment);
    if (val !== null) setAdjustment(val);
  };

  const promptNote = () => {
    const val = window.prompt('Add a note', note);
    if (val !== null) setNote(val);
  };

  return (
    <div className="fixed inset-0 z-50" aria-modal="true" role="dialog" onKeyDown={(e) => handleKeyDown(e) && onClose()}>
      <div className="absolute inset-0 bg-black" onClick={onClose} />
      <div className="absolute inset-0 flex items-end">
        <div ref={containerRef as React.MutableRefObject<HTMLDivElement | null>} tabIndex={-1} className="w-full max-w-[430px] mx-auto bg-[#1C1C1E] rounded-t-3xl text-white h-[95vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} style={{ boxShadow: '0 -10px 40px rgba(0,0,0,1)' }}>
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

            <button onClick={() => window.alert('Split bill coming soon')} className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 h-12 hover:bg-white/15 transition-colors" aria-label="Split bill">
              <svg width="20" height="20" viewBox="0 0 24 24" className="text-white/80">
                <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[16px] text-white">Split bill</span>
            </button>
          </div>

          <div className="px-6 mb-6">
            {tx.location?.lat && tx.location?.lon ? (
              <div className="rounded-2xl overflow-hidden h-40 relative">
                <iframe
                  title="map"
                  className="w-full h-full"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${tx.location.lon - 0.01}%2C${tx.location.lat - 0.01}%2C${tx.location.lon + 0.01}%2C${tx.location.lat + 0.01}&layer=mapnik&marker=${tx.location.lat}%2C${tx.location.lon}`}
                />
                <button onClick={openInMaps} className="absolute bottom-2 left-2 bg-white/20 rounded px-3 py-1 text-[12px]">Open in Maps</button>
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden bg-[#3A5998] h-40 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4A7C99] to-[#2D4A6B]"></div>
                <div className="absolute bottom-3 left-3 text-white text-[12px] font-medium">{tx.location?.address || 'Unknown location'}</div>
                <div className="absolute bottom-2 left-2">
                  <button onClick={openInMaps} className="bg-white/20 rounded px-3 py-1 text-[12px]">Open in Maps</button>
                </div>
              </div>
            )}
          </div>

          <div className="px-6 space-y-4 pb-20">
            <Block>
              <Row label="Status" value={tx.status || 'Completed'} />
              <Row label="Card" value="Mastercard ••4103" valueClass="text-[#60A5FA]" icon="card" onClick={navigateToCards} clickable />
              <Row label="Statement" value="Download" valueClass="text-[#60A5FA]" icon="download" onClick={downloadStatement} clickable />
            </Block>

            <Block>
              <Row label="Exclude from analytics" customRight={<Toggle checked={excluded} onChange={setExcluded} />} />
              <Row label="Category" value={category} valueClass="text-[#60A5FA]" icon="fork" onClick={promptCategory} clickable />
              <Row label="Adjust for analytics" value={adjustment} valueClass="text-[#60A5FA]" icon="bars" onClick={promptAdjustment} clickable />
            </Block>

            <Block>
              <Row label={`Spent at ${tx.merchant}`} value={`$${Math.abs(merchantStats.total).toFixed(2)}`} />
              <Row label="Number of transactions" value={String(merchantStats.count)} />
              <Row label="See all" chevron onClick={seeAllForMerchant} clickable />
            </Block>

            <Block>
              <input ref={fileInputRef} type="file" className="hidden" onChange={onUploadReceipt} />
              <Row label="Receipt" value={receiptName || 'Upload'} valueClass="text-[#60A5FA]" icon="camera" onClick={() => fileInputRef.current?.click()} clickable />
            </Block>

            <Block>
              <Row label="Note" value={note || 'Add note'} valueClass="text-[#60A5FA]" icon="plus" onClick={promptNote} clickable />
            </Block>

            <Block>
              <Row label="Get help" chevron onClick={() => window.alert('Help coming soon')} clickable />
            </Block>

            {showCategoryPicker && (
              <div className="fixed inset-0 z-50" onClick={() => setShowCategoryPicker(false)}>
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full max-w-[430px] mx-auto bg-[#1C1C1E] rounded-t-2xl text-white p-4" onClick={(e) => e.stopPropagation()}>
                    <div className="text-center font-semibold mb-2">Select category</div>
                    <div className="max-h-64 overflow-y-auto space-y-1">
                      {[category, ...categoryOptions.filter(c => c !== category)].map((c) => (
                        <button key={c} className={`w-full text-left px-3 py-2 rounded-lg ${c === category ? 'bg-white/10' : 'hover:bg-white/5'}`} onClick={() => { setCategory(c); setShowCategoryPicker(false); }}>
                          {c}
                        </button>
                      ))}
                      <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5" onClick={() => {
                        const val = window.prompt('New category name');
                        if (val) setCategory(val);
                        setShowCategoryPicker(false);
                      }}>+ New category</button>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15" onClick={() => setShowCategoryPicker(false)}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Block({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-[#2C2C2E] px-5 py-4 space-y-4">{children}</div>;
}

function Row({ label, value, valueClass, chevron, icon, customRight, onClick, clickable }: { label: string; value?: string; valueClass?: string; chevron?: boolean; icon?: 'card' | 'download' | 'fork' | 'bars' | 'camera' | 'plus'; customRight?: React.ReactNode; onClick?: () => void; clickable?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${clickable ? 'cursor-pointer hover:opacity-90' : ''}`} onClick={onClick}>
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

function inferCategoryFromMerchant(merchant: string): string {
  const m = merchant.toLowerCase();
  if (/(mcdonald|burger|cafe|bar|restaurant|pizza|dishoom|nando|chez|trattoria|gelato|caffe|cafe|pub)/.test(m)) return 'Restaurants';
  if (/(uber|taxi|train|tfl|heathrow|express|bus|sncf|tram|ferry)/.test(m)) return 'Transport';
  if (/(hotel|resort|airbnb|hostel)/.test(m)) return 'Accommodation';
  if (/(market|grocer|waitrose|marks|spencer|selfridges|galeries)/.test(m)) return 'Shopping';
  if (/(museum|tickets|tour|storehouse|abbey|beach|club)/.test(m)) return 'Entertainment';
  return 'Uncategorized';
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

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" className={`relative inline-flex h-8 w-14 items-center rounded-full ${checked ? 'bg-green-500' : 'bg-[#3A3A3C]'} transition-colors`} onClick={(e) => { e.preventDefault(); onChange(!checked); }}>
      <span className={`inline-block h-7 w-7 transform rounded-full bg-white transition-transform will-change-transform shadow-sm ${checked ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
    </button>
  );
}

