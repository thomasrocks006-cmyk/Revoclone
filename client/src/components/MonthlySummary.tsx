import React, { useMemo, useState } from 'react';
import type { Transaction } from '@/types/transaction';
import { aggregateByCategory, aggregateByMerchant, getBudgetForCategory, setBudgetForCategory, getEffectiveCategory } from '@/lib/analytics';

export default function MonthlySummary({ transactions }: { transactions: Transaction[] }) {
  const [editingCat, setEditingCat] = useState<string | null>(null);
  const byCat = useMemo(() => aggregateByCategory(transactions), [transactions]);
  const byMerchant = useMemo(() => aggregateByMerchant(transactions), [transactions]);

  const spent = useMemo(() => transactions.reduce((s, t) => s + Math.min(0, parseFloat(t.amount || '0')), 0), [transactions]);
  const income = useMemo(() => transactions.reduce((s, t) => s + Math.max(0, parseFloat(t.amount || '0')), 0), [transactions]);
  const net = income + spent; // spent negative

  const topMerchants = useMemo(() => Array.from(byMerchant.entries()).sort((a, b) => Math.abs(b[1].total) - Math.abs(a[1].total)).slice(0, 5), [byMerchant]);
  const topCategories = useMemo(() => Array.from(byCat.entries()).sort((a, b) => b[1].spend - a[1].spend).slice(0, 5), [byCat]);

  return (
    <section className="mt-5">
      <div className="rounded-3xl p-3" style={{ background: '#181A1F', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.06)' }}>
        <div className="flex items-baseline justify-between px-1 mb-3">
          <div className="text-[17px] font-semibold">Summary</div>
          <div className="text-[13px] text-white/70">Net {fmt(net)}</div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <SummaryCard label="Income" value={fmt(income)} color="#22C55E" />
          <SummaryCard label="Spent" value={fmt(spent)} color="#EF4444" />
          <SummaryCard label="Transactions" value={String(transactions.length)} color="#9AA3B2" />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4">
          <div>
            <div className="text-[15px] mb-2">Top merchants</div>
            <div className="space-y-1">
              {topMerchants.map(([m, v]) => (
                <div key={m} className="flex justify-between text-sm">
                  <span className="text-white/80">{m}</span>
                  <span className="text-white/80">{fmt(v.total)}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[15px] mb-2">Top categories</div>
            <div className="space-y-2">
              {topCategories.map(([c, v]) => {
                const budget = getBudgetForCategory(c);
                const progress = budget > 0 ? Math.min(100, Math.round((v.spend / budget) * 100)) : 0;
                return (
                  <div key={c} className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-white/80">{c}</span>
                      <span className="text-white/80">{fmt(-v.spend)}{budget ? ` / $${budget.toFixed(0)}` : ''}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded">
                      <div className="h-2 bg-blue-500 rounded" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="mt-1 flex justify-end">
                      <button className="text-xs text-white/70 underline" onClick={() => setEditingCat(c)}>Set budget</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {editingCat && (
        <div className="fixed inset-0 z-50" onClick={() => setEditingCat(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-end">
            <div className="w-full max-w-[430px] mx-auto bg-[#1C1C1E] rounded-t-2xl text-white p-4" onClick={(e) => e.stopPropagation()}>
              <div className="text-center font-semibold mb-2">Budget for {editingCat}</div>
              <BudgetForm category={editingCat} onClose={() => setEditingCat(null)} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl p-3" style={{ background: '#0F1224' }}>
      <div className="text-white/70 text-xs">{label}</div>
      <div className="text-white text-[16px] font-semibold" style={{ color }}>{value}</div>
    </div>
  );
}

function BudgetForm({ category, onClose }: { category: string; onClose: () => void }) {
  const [val, setVal] = useState<string>(String(getBudgetForCategory(category) || ''));
  return (
    <div>
      <div className="text-sm text-white/70 mb-2">Monthly budget (in $)</div>
      <input value={val} onChange={(e) => setVal(e.target.value)} className="w-full bg-white/10 rounded px-3 py-2" placeholder="e.g., 500" />
      <div className="mt-3 flex justify-end gap-2">
        <button className="px-3 py-2 rounded bg-white/10" onClick={onClose}>Cancel</button>
        <button className="px-3 py-2 rounded bg-blue-600" onClick={() => { const n = parseFloat(val || '0'); if (!isNaN(n)) setBudgetForCategory(category, n); onClose(); }}>Save</button>
      </div>
    </div>
  );
}

function fmt(n: number) { return `${n >= 0 ? '+' : ''}$${Math.abs(n).toFixed(2)}`; }

