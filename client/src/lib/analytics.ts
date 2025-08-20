import type { Transaction } from '@/types/transaction';

const excludedKey = (id: string) => `tx:${id}:excluded`;
const categoryKey = (id: string) => `tx:${id}:category`;

export function isTransactionExcluded(id: string): boolean {
  try { return typeof localStorage !== 'undefined' && localStorage.getItem(excludedKey(id)) === '1'; } catch { return false; }
}

export function setTransactionExcluded(id: string, val: boolean) {
  try {
    if (val) localStorage.setItem(excludedKey(id), '1');
    else localStorage.removeItem(excludedKey(id));
  } catch {}
}

export function getEffectiveCategory(t: Transaction): string {
  try {
    const ov = typeof localStorage !== 'undefined' ? localStorage.getItem(categoryKey(t.id)) : null;
    if (ov) return ov;
  } catch {}
  if (t.category) return t.category;
  return inferCategoryFromMerchant(t.merchant);
}

export function setCategoryOverride(id: string, category: string) {
  try { localStorage.setItem(categoryKey(id), category); } catch {}
}

export function inferCategoryFromMerchant(merchant: string): string {
  const m = merchant.toLowerCase();
  if (/(mcdonald|burger|cafe|bar|restaurant|pizza|dishoom|nando|chez|trattoria|gelato|caffe|cafe|pub)/.test(m)) return 'Restaurants';
  if (/(uber|taxi|train|tfl|heathrow|express|bus|sncf|tram|ferry)/.test(m)) return 'Transport';
  if (/(hotel|resort|airbnb|hostel)/.test(m)) return 'Accommodation';
  if (/(market|grocer|waitrose|marks|spencer|selfridges|galeries)/.test(m)) return 'Shopping';
  if (/(museum|tickets|tour|storehouse|abbey|beach|club)/.test(m)) return 'Entertainment';
  return 'Uncategorized';
}

// Budgets per category
const budgetKey = (cat: string) => `budget:${cat}`;
export function getBudgetForCategory(category: string): number {
  try {
    const v = localStorage.getItem(budgetKey(category));
    return v ? parseFloat(v) : 0;
  } catch { return 0; }
}

export function setBudgetForCategory(category: string, amount: number) {
  try { localStorage.setItem(budgetKey(category), String(amount)); } catch {}
}

export function aggregateByCategory(transactions: Transaction[]): Map<string, { spend: number; income: number; count: number }> {
  const map = new Map<string, { spend: number; income: number; count: number }>();
  for (const t of transactions) {
    const cat = getEffectiveCategory(t);
    const amt = parseFloat(t.amount || '0');
    const obj = map.get(cat) || { spend: 0, income: 0, count: 0 };
    if (amt < 0) obj.spend += Math.abs(amt);
    else obj.income += amt;
    obj.count += 1;
    map.set(cat, obj);
  }
  return map;
}

export function aggregateByMerchant(transactions: Transaction[]): Map<string, { total: number; count: number }> {
  const map = new Map<string, { total: number; count: number }>();
  for (const t of transactions) {
    const amt = parseFloat(t.amount || '0');
    const obj = map.get(t.merchant) || { total: 0, count: 0 };
    obj.total += amt;
    obj.count += 1;
    map.set(t.merchant, obj);
  }
  return map;
}

