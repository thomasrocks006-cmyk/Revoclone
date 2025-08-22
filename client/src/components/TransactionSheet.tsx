import React, { useMemo, useState } from "react";

/** ---- Tiny placeholder icon for the merchant ---- */
function TransactionIcon({ transaction }: { transaction: any }) {
  const ch = (transaction?.merchant?.[0] || "?").toUpperCase();
  return (
    <div className="size-12 rounded-2xl bg-white/10 grid place-items-center text-white/90 font-semibold">
      {ch}
    </div>
  );
}

/** ---- Minimal inline icons (no external libs) ---- */
const Icon = {
  X: () => (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  ChevronRight: () => (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  ),
};

/** =========================================================
 * TransactionSheet — Refined Layout V1
 * - Max height to viewport, header pinned, content scrolls
 * - iOS-like bottom sheet styling
 * ========================================================= */
function TransactionSheet({ tx, onClose }: { tx: any; onClose: () => void }) {
  if (!tx) return null;

  const amountNum = Number(tx.amount ?? 0);
  const isOutflow = amountNum < 0;
  const currency = tx.currency || "EUR";

  const fmtAmount = useMemo(() => {
    try {
      return `${isOutflow ? "-" : "+"}${new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
      }).format(Math.abs(amountNum))}`;
    } catch {
      return `${isOutflow ? "-" : "+"}${currency} ${Math.abs(amountNum).toFixed(2)}`;
    }
  }, [amountNum, currency, isOutflow]);

  const time24 = (iso?: string) =>
    iso ? new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }) : "";
  const dateLong = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) : "";

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center" role="dialog" aria-modal="true">
      {/* dim/backdrop */}
      <button className="absolute inset-0 bg-black/65" onClick={onClose} aria-label="Close" />

      {/* SHEET container */}
      <div className="w-full max-w-[430px] bg-[#1C1C1E] text-white rounded-t-[28px] shadow-[0_-12px_60px_rgba(0,0,0,0.8)] max-h-[92vh] flex flex-col overflow-hidden">
        {/* grabber */}
        <div className="sticky top-0 z-20 bg-[#1C1C1E] pt-2 pb-1 flex justify-center">
          <div className="h-1.5 w-[52px] rounded-full bg-white/25" />
        </div>

        {/* HEADER (pinned) */}
        <div className="relative px-6 pt-2 pb-4 shrink-0">
          <button
            onClick={onClose}
            className="absolute left-3 top-2 size-9 grid place-items-center rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <Icon.X />
          </button>

          <div className="absolute right-6 top-1.5">
            <TransactionIcon transaction={tx} />
          </div>

          <div className="pr-20">
            <div className={`text-[34px] font-extrabold leading-none tabular-nums ${isOutflow ? "text-white" : "text-emerald-400"}`}>
              {fmtAmount}
            </div>
            <div className="mt-1 text-[18px] text-[#60A5FA] font-medium truncate">{tx.merchant}</div>
            <div className="mt-0.5 text-[15px] text-white/60">
              {dateLong(tx.date)}
              {tx.date ? ", " : ""}
              {time24(tx.date)}
            </div>
          </div>

          {/* Split bill pill */}
          <div className="mt-4">
            <button className="inline-flex h-11 items-center gap-2.5 rounded-full bg-white/10 px-4 hover:bg-white/15 active:bg-white/20 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" className="text-white/90">
                <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[16px]">Split bill</span>
            </button>
          </div>
        </div>

        {/* SCROLL AREA (map + sections) */}
        <div className="flex-1 overflow-y-auto px-6 pb-[calc(env(safe-area-inset-bottom)+24px)]">
          {/* Map/banner card */}
          <div className="relative h-40 rounded-2xl overflow-hidden mb-5">
            <div className="absolute inset-0 bg-gradient-to-br from-[#335d92] via-[#2f4a70] to-[#213454]" />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/20 rounded-lg px-3 py-1 text-[11px]">🍎 Maps</div>
            <div className="absolute bottom-3 left-3 text-[12px]">{tx.location?.address || "Unknown location"}</div>
            <div className="absolute bottom-3 right-3 text-[10px] text-white/70">Legal</div>
          </div>

          {/* Sections */}
          <Section>
            <Row label="Status" value={tx.status || "Completed"} />
            <Divider />
            <Row label="Card" value={<span className="text-[#60A5FA]">Mastercard ••4103</span>} />
            <Divider />
            <Row label="Statement" value={<span className="text-[#60A5FA]">Download</span>} chevron />
          </Section>

          <Section>
            <Row label="Exclude from analytics" value={<Toggle />} />
            <Divider />
            <Row label="Category" value={<span className="text-[#60A5FA]">Restaurants</span>} chevron />
            <Divider />
            <Row label="Adjust for analytics" value={<span className="text-[#60A5FA]">$2.50</span>} chevron />
          </Section>

          <Section>
            <Row label={`Spent at ${tx.merchant}`} value="$80.26" />
            <Divider />
            <Row label="Number of transactions" value="9" />
            <Divider />
            <Row label="See all" chevron />
          </Section>

          <Section>
            <Row label="Receipt" value={<span className="text-[#60A5FA]">Upload</span>} chevron />
          </Section>

          <Section>
            <Row label="Note" value={<span className="text-[#60A5FA]">Add note</span>} chevron />
          </Section>

          <Section>
            <Row label="Get help" chevron />
          </Section>
        </div>
      </div>
    </div>
  );
}

/** ---- Small UI helpers ---- */
function Section({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-[#2C2C2E] overflow-hidden mb-4">{children}</div>;
}
function Divider() {
  return <div className="h-px bg-white/10" />;
}
function Row({
  label,
  value,
  chevron,
}: {
  label: string;
  value?: React.ReactNode;
  chevron?: boolean;
}) {
  return (
    <div className="flex justify-between items-center px-4 py-3">
      <div className="text-white/70 text-[16px]">{label}</div>
      <div className="flex items-center gap-1">
        {typeof value === "string" ? <div className="text-white text-[16px]">{value}</div> : value}
        {chevron && <Icon.ChevronRight />}
      </div>
    </div>
  );
}
function Toggle() {
  return (
    <button
      type="button"
      className="relative inline-flex h-7 w-[52px] items-center rounded-full bg-[#3A3A3C]"
      onClick={(e) => e.preventDefault()}
      aria-pressed="false"
    >
      <span className="inline-block size-6 translate-x-0.5 rounded-full bg-white shadow-sm" />
    </button>
  );
}

/** =========================================================
 * Default export: Canvas preview harness
 * - Full page you can scroll
 * - Sheet opens by default (can be closed/reopened)
 * ========================================================= */
export default function App() {
  const sample = {
    id: "tx_maccas_001",
    merchant: "McDonald's",
    amount: "-12.80",
    currency: "EUR",
    date: new Date().toISOString(),
    status: "Completed",
    location: { address: "Via della Vite 23, Rome" },
    category: "Restaurants",
  } as any;

  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-[2000px] bg-neutral-900 text-white">
      {/* Top header so you can see the real top of the page */}
      <div className="sticky top-0 z-10 bg-neutral-900/80 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-[430px] px-4 py-3 flex items-center justify-between">
          <div className="text-sm text-white/70">9:41</div>
          <div className="text-sm font-semibold">Page Preview</div>
          <div className="text-sm text-white/70">LTE ▮▮▮</div>
        </div>
      </div>

      {/* Tall filler content to ensure page scroll */}
      <div className="mx-auto max-w-[430px] px-4 pt-6 pb-40 space-y-4">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="h-24 rounded-2xl bg-white/5" />
        ))}
      </div>

      {/* Floating open button */}
      <button
        className="fixed right-4 bottom-4 z-[120] rounded-full px-4 py-2 bg-white/10 hover:bg-white/15 backdrop-blur border border-white/10"
        onClick={() => setOpen(true)}
      >
        Open Sheet
      </button>

      {/* Sheet overlay */}
      {open && <TransactionSheet tx={sample} onClose={() => setOpen(false)} />}
    </div>
  );
}
