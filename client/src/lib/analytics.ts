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

