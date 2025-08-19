import React, { useMemo, useState, useEffect } from "react";
import { ArrowLeft, Search } from "lucide-react";

type Transaction = {
  id: string;
  date: string;
  merchant: string;
  amount: string;
  status: string;
  description: string;
  secondary: string;
};

/** Build a stable unique key for a transaction */
function txKey(t: Transaction) {
  // status and secondary can change formatting; key off the core identity
  return `${new Date(t.date).toISOString()}|${t.merchant}|${Number(t.amount).toFixed(2)}`;
}

/** Return a new array with duplicates removed by txKey */
function ensureUniqueTransactions(list: Transaction[]) {
  const seen = new Set<string>();
  const out: Transaction[] = [];
  for (const t of list) {
    const k = txKey(t);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(t);
    }
  }
  return out;
}

export default function Transactions() {
  const [openTx, setOpenTx] = useState<Transaction | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (openTx) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [openTx]);

  // small helpers
  const fmtAmt = (n: number) => {
    const sign = n > 0 ? "+" : n < 0 ? "-" : "";
    return `${sign}$${Math.abs(n).toFixed(2)}`;
  };
  const time24 = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  const dateLong = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

  const transactions: Transaction[] = ensureUniqueTransactions([
    { id: "1", date: "2024-08-17T04:25:00", merchant: "GitHub", amount: "1.55", status: "reverted", description: "", secondary: "" },
    { id: "2", date: "2024-08-15T18:06:00", merchant: "Thomas Francis", amount: "-18", status: "", description: "Sent from Revolut", secondary: "" },
    { id: "3", date: "2024-08-15T03:39:00", merchant: "GitHub", amount: "15.46", status: "reverted", description: "", secondary: "" },
    { id: "4", date: "2024-08-15T03:35:00", merchant: "GitHub", amount: "-6.18", status: "", description: "", secondary: "-US$4" },
    { id: "5", date: "2024-08-15T03:24:00", merchant: "GitHub", amount: "0", status: "card_verification", description: "Card verification", secondary: "" },
    { id: "6", date: "2024-08-15T03:23:00", merchant: "Money added via Apple Pay", amount: "25", status: "", description: "", secondary: "" },
    { id: "7", date: "2024-08-15T02:04:00", merchant: "GitHub", amount: "15.46", status: "insufficient_balance", description: "Insufficient balance", secondary: "" },
    { id: "8", date: "2024-07-29T07:20:00", merchant: "McDonald's", amount: "-2.50", status: "", description: "", secondary: "" },
    { id: "9", date: "2024-07-27T23:38:00", merchant: "Pharmacie du Voyage Roissy 1", amount: "-3.63", status: "", description: "", secondary: "-€2" },
    { id: "10", date: "2024-07-27T17:10:00", merchant: "Marché Franprix", amount: "-0.91", status: "", description: "", secondary: "-€0.50" },
    { id: "11", date: "2024-07-27T03:39:00", merchant: "Burger Foods", amount: "-10.88", status: "", description: "", secondary: "-€6" },
    { id: "12", date: "2024-07-27T00:32:00", merchant: "yesim", amount: "-12.69", status: "", description: "", secondary: "-€7" },
    { id: "13", date: "2024-07-27T00:06:00", merchant: "Olvadis", amount: "-1.82", status: "", description: "", secondary: "-€1" },
    { id: "14", date: "2024-07-26T23:07:00", merchant: "Money added via Apple Pay", amount: "25", status: "", description: "", secondary: "" },
    { id: "15", date: "2024-07-26T23:07:00", merchant: "Thomas Francis", amount: "-5", status: "", description: "Sent from Revolut", secondary: "" },
    { id: "16", date: "2024-07-26T21:38:00", merchant: "Rtf", amount: "-23.35", status: "", description: "", secondary: "-€13" },
    { id: "17", date: "2024-07-26T20:28:00", merchant: "Pains De Provence", amount: "-2.18", status: "", description: "", secondary: "-€1.20" },
    { id: "18", date: "2024-07-26T20:12:00", merchant: "Pains De Provence", amount: "-12.14", status: "", description: "", secondary: "-€6.70" },
    { id: "19", date: "2024-07-25T23:44:00", merchant: "Kosalite", amount: "-2.69", status: "", description: "", secondary: "-€1.50" },
    { id: "20", date: "2024-07-25T19:57:00", merchant: "McDonald's", amount: "-9.87", status: "", description: "", secondary: "-€5.50" },
    { id: "21", date: "2024-07-25T18:46:00", merchant: "McDonald's", amount: "-5.20", status: "", description: "", secondary: "-€2.90" },
    { id: "22", date: "2024-07-25T08:13:00", merchant: "McDonald's", amount: "-6.08", status: "", description: "", secondary: "-€3.40" },
    { id: "23", date: "2024-07-25T07:05:00", merchant: "32 Boulevard d'Aguillon", amount: "-44.69", status: "", description: "", secondary: "-€25" },
    { id: "24", date: "2024-07-25T04:47:00", merchant: "yesim", amount: "-12.52", status: "", description: "", secondary: "-€7" },
    { id: "25", date: "2024-07-25T00:34:00", merchant: "SNCF", amount: "-5.36", status: "", description: "", secondary: "-€3" },
    { id: "26", date: "2024-07-24T22:57:00", merchant: "RELAY", amount: "-4.81", status: "", description: "", secondary: "-€2.70" },
    { id: "27", date: "2024-07-24T22:38:00", merchant: "Trainline", amount: "-185.08", status: "", description: "", secondary: "-€103.95" },
    { id: "28", date: "2024-07-24T21:51:00", merchant: "Money added via Apple Pay", amount: "300", status: "", description: "", secondary: "" },
    { id: "29", date: "2024-07-24T16:48:00", merchant: "Transavia", amount: "-6.25", status: "", description: "", secondary: "-€3.50" },
    { id: "30", date: "2024-07-24T08:45:00", merchant: "CHOPE-MOI Pigalle", amount: "-26.83", status: "", description: "", secondary: "-€15" },
    { id: "31", date: "2024-07-24T07:39:00", merchant: "CHOPE-MOI Pigalle", amount: "-8.95", status: "", description: "", secondary: "-€5" },
    { id: "32", date: "2024-07-24T07:26:00", merchant: "Moer", amount: "-17.89", status: "", description: "", secondary: "-€10" },
    { id: "33", date: "2024-07-24T01:30:00", merchant: "yesim", amount: "-12.51", status: "", description: "", secondary: "-€7" },
    { id: "34", date: "2024-07-23T20:12:00", merchant: "Kara Food", amount: "-14.29", status: "", description: "", secondary: "-€8" },
    { id: "35", date: "2024-07-23T02:25:00", merchant: "Money added via Apple Pay", amount: "190", status: "", description: "", secondary: "" },
    { id: "36", date: "2024-07-20T20:17:00", merchant: "DropTicket", amount: "-5.62", status: "", description: "", secondary: "-€3.10" },
    { id: "37", date: "2024-07-20T19:27:00", merchant: "DropTicket", amount: "-4.52", status: "", description: "", secondary: "-€2.50" },
    { id: "38", date: "2024-07-20T18:25:00", merchant: "CRAI", amount: "-3.63", status: "", description: "", secondary: "-€2" },
    { id: "39", date: "2024-07-20T07:34:00", merchant: "Charlie Faulkner", amount: "-300", status: "", description: "Sent from Revolut", secondary: "" },
    { id: "40", date: "2024-07-20T03:46:00", merchant: "CRAI", amount: "-12.04", status: "", description: "", secondary: "-€6.65" },
    { id: "41", date: "2024-07-20T01:02:00", merchant: "Thomas Francis", amount: "-25", status: "", description: "Sent from Revolut", secondary: "" },
    { id: "42", date: "2024-07-19T22:16:00", merchant: "ARST", amount: "-5.62", status: "", description: "", secondary: "-€3.10" },
    { id: "43", date: "2024-07-19T21:51:00", merchant: "ARST", amount: "-5.62", status: "", description: "", secondary: "-€3.10" },
    { id: "44", date: "2024-07-19T21:32:00", merchant: "Meet And Greet", amount: "-5.43", status: "", description: "", secondary: "-€3" },
    { id: "45", date: "2024-07-19T16:29:00", merchant: "Azdistributionautoma", amount: "-2.72", status: "", description: "", secondary: "-€1.50" },
    { id: "46", date: "2024-07-19T14:04:00", merchant: "McDonald's", amount: "-14.30", status: "", description: "", secondary: "-€7.90" },
    { id: "47", date: "2024-07-18T03:40:00", merchant: "Zaptrvl", amount: "-48.36", status: "", description: "", secondary: "-€27" },
    { id: "48", date: "2024-07-18T02:12:00", merchant: "yesim", amount: "-12.53", status: "", description: "", secondary: "-€7" },
    { id: "49", date: "2024-07-18T02:08:00", merchant: "McDonald's", amount: "-16.65", status: "", description: "", secondary: "-€9.30" },
    { id: "50", date: "2024-07-18T00:20:00", merchant: "A & G Coffee Srl", amount: "-3.58", status: "", description: "", secondary: "-€2" },
    { id: "51", date: "2024-07-18T22:49:00", merchant: "Bar Buca di Bacco", amount: "-11.63", status: "", description: "", secondary: "-€6.50" },
    { id: "52", date: "2024-07-18T22:37:00", merchant: "Navigazione Libera Del", amount: "-55.44", status: "", description: "", secondary: "-€31" },
    { id: "53", date: "2024-07-18T21:49:00", merchant: "Tabacchi Positano", amount: "-4.84", status: "", description: "", secondary: "-€2.70" },
    { id: "54", date: "2024-07-18T19:54:00", merchant: "SITA SUD", amount: "-8.59", status: "", description: "", secondary: "-€4.80" },
    { id: "55", date: "2024-07-18T19:24:00", merchant: "Consortium 'Unico Campania'", amount: "-2.69", status: "", description: "", secondary: "-€1.50" },
    { id: "56", date: "2024-07-18T19:48:00", merchant: "Money added via Apple Pay", amount: "50", status: "", description: "", secondary: "" },
    { id: "57", date: "2024-07-18T17:21:00", merchant: "Omio", amount: "-68.61", status: "", description: "", secondary: "" },
    { id: "58", date: "2024-07-18T11:35:00", merchant: "Alimentation General", amount: "-3.63", status: "", description: "", secondary: "-€2" },
    { id: "59", date: "2024-07-18T05:35:00", merchant: "McDonald's", amount: "-15.98", status: "", description: "", secondary: "-€8.90" },
    { id: "60", date: "2024-07-18T05:07:00", merchant: "Lime", amount: "-11.29", status: "", description: "", secondary: "-€6.29" },
    { id: "61", date: "2024-07-18T05:07:00", merchant: "Lime", amount: "0", status: "card_verification", description: "Card verification", secondary: "" },
    { id: "62", date: "2024-07-18T04:14:00", merchant: "Jay", amount: "-8.97", status: "", description: "", secondary: "-€5" },
    { id: "63", date: "2024-07-18T02:08:00", merchant: "yesim", amount: "-12.56", status: "", description: "", secondary: "-€7" },
    { id: "64", date: "2024-07-18T01:01:00", merchant: "Carrefour", amount: "-6.64", status: "", description: "", secondary: "-€3.70" },
    { id: "65", date: "2024-07-18T14:00:00", merchant: "Consortaxi", amount: "-45.23", status: "", description: "", secondary: "-€25" },
    { id: "66", date: "2024-07-18T12:11:00", merchant: "Caffe D'Epoca Gendec.", amount: "-27.14", status: "", description: "", secondary: "-€15" },
    { id: "67", date: "2024-07-18T10:45:00", merchant: "Caffe D'Epoca Gendec.", amount: "-27.14", status: "", description: "", secondary: "-€15" },
    { id: "68", date: "2024-07-18T10:15:00", merchant: "Milly 69", amount: "-27.14", status: "", description: "", secondary: "-€15" },
    { id: "69", date: "2024-07-18T06:42:00", merchant: "Money added via Apple Pay", amount: "200", status: "", description: "", secondary: "" },
    { id: "70", date: "2024-07-18T05:43:00", merchant: "McDonald's", amount: "-6.27", status: "", description: "", secondary: "-€3.50" },
    { id: "71", date: "2024-07-18T04:32:00", merchant: "SumUp", amount: "-5.38", status: "", description: "", secondary: "-€3" },
    { id: "72", date: "2024-07-18T03:42:00", merchant: "McDonald's", amount: "-3.41", status: "", description: "", secondary: "-€1.90" },
    { id: "73", date: "2024-07-20T00:18:00", merchant: "yesim", amount: "-12.67", status: "", description: "", secondary: "-€7" },
    
    // New transactions from Cursor agent updates
    // June 2024
    { id: "74", date: "2024-06-06T21:20:00", merchant: "DoorDash", amount: "-30.13", status: "", description: "", secondary: "" },
    { id: "75", date: "2024-06-06T21:19:00", merchant: "DoorDash", amount: "0", status: "card_verification", description: "Card verification", secondary: "" },
    { id: "76", date: "2024-06-03T15:43:00", merchant: "Tinder", amount: "-9.49", status: "", description: "", secondary: "" },
    { id: "77", date: "2024-06-03T15:42:00", merchant: "Money added via Apple Pay", amount: "41", status: "", description: "", secondary: "" },
    
    // November 2023
    { id: "78", date: "2023-11-04T15:18:00", merchant: "Thomas Francis", amount: "-473", status: "", description: "Sent from Revolut", secondary: "" },
    { id: "79", date: "2023-11-04T15:17:00", merchant: "ETH → AUD", amount: "473", status: "", description: "", secondary: "-0.17 ETH" },
    { id: "80", date: "2023-11-04T14:35:00", merchant: "AUD → ETH", amount: "-500", status: "", description: "", secondary: "+0.17 ETH" },
    
    // July 2024 (new dates)
    { id: "81", date: "2024-07-12T09:59:00", merchant: "Transport for London", amount: "-26.58", status: "delayed_transaction", description: "Delayed transaction", secondary: "-£12.80" },
    { id: "82", date: "2024-07-12T01:00:00", merchant: "Money added via Apple Pay", amount: "1100", status: "", description: "", secondary: "" },
    { id: "83", date: "2024-07-11T23:02:00", merchant: "Transport for London", amount: "0", status: "card_verification", description: "Card verification", secondary: "" },
    { id: "84", date: "2024-07-11T13:33:00", merchant: "Money added via Apple Pay", amount: "50", status: "", description: "", secondary: "" },
    { id: "85", date: "2024-07-16T23:53:00", merchant: "Transport for London", amount: "0", status: "card_verification", description: "Card verification", secondary: "" },
    { id: "86", date: "2024-07-16T23:38:00", merchant: "WHSmith", amount: "-51.49", status: "", description: "", secondary: "-£24.99" },
    { id: "87", date: "2024-07-16T23:32:00", merchant: "South Western Railway", amount: "-81.60", status: "", description: "", secondary: "-£39.60" },
    { id: "88", date: "2024-07-16T21:23:00", merchant: "Agoda", amount: "-113.31", status: "", description: "", secondary: "" },
    { id: "89", date: "2024-07-16T00:35:00", merchant: "Money added via Apple Pay", amount: "90", status: "", description: "", secondary: "" },
    { id: "90", date: "2024-07-15T20:53:00", merchant: "Fat Face Lymington", amount: "-57.95", status: "", description: "", secondary: "-£28.20" },
    { id: "91", date: "2024-07-15T01:24:00", merchant: "Waitrose", amount: "-16.25", status: "", description: "", secondary: "-£7.90" },
    { id: "92", date: "2024-07-17T23:46:00", merchant: "Bookshop Pompeii Op. La", amount: "-2.70", status: "", description: "", secondary: "-€1.50" },
    { id: "93", date: "2024-07-17T23:18:00", merchant: "Ryanair", amount: "-6.29", status: "", description: "", secondary: "-€3.50" },
    { id: "94", date: "2024-07-17T23:05:00", merchant: "Scavi di Pompei", amount: "-39.51", status: "", description: "", secondary: "-€22" },
    { id: "95", date: "2024-07-17T22:24:00", merchant: "Curreri Viaggi", amount: "-23.37", status: "", description: "", secondary: "-€13" },
    { id: "96", date: "2024-07-17T21:27:00", merchant: "yesim", amount: "-12.59", status: "", description: "", secondary: "-€7" },
    { id: "97", date: "2024-07-17T16:06:00", merchant: "Ryanair", amount: "-113.96", status: "", description: "", secondary: "-£55" },
    { id: "98", date: "2024-07-17T09:59:00", merchant: "Transport for London", amount: "-13.30", status: "delayed_transaction", description: "Delayed transaction", secondary: "-£6.40" },
    { id: "99", date: "2024-07-17T00:31:00", merchant: "Pret A Manger", amount: "-6.71", status: "", description: "", secondary: "-£3.25" },
    { id: "100", date: "2024-07-18T22:49:00", merchant: "Bar Buca di Bacco", amount: "-11.63", status: "", description: "", secondary: "-€6.50" },
    { id: "101", date: "2024-07-18T22:37:00", merchant: "Navigazione Libera Del", amount: "-55.44", status: "", description: "", secondary: "-€31" },
    { id: "102", date: "2024-07-18T21:49:00", merchant: "Tabacchi Positano", amount: "-4.84", status: "", description: "", secondary: "-€2.70" },
    { id: "103", date: "2024-07-18T19:54:00", merchant: "SITA SUD", amount: "-8.59", status: "", description: "", secondary: "-€4.80" },
    { id: "104", date: "2024-07-18T19:24:00", merchant: "Consortium 'Unico Campania'", amount: "-2.69", status: "", description: "", secondary: "-€1.50" },
    { id: "105", date: "2024-07-18T19:24:00", merchant: "Consortium 'Unico Campania'", amount: "-5.38", status: "", description: "", secondary: "-€3" },
    { id: "106", date: "2024-07-18T02:12:00", merchant: "yesim", amount: "-12.53", status: "", description: "", secondary: "-€7" },
    { id: "107", date: "2024-07-18T02:08:00", merchant: "Apple", amount: "-12.99", status: "", description: "Disposable cards can't be used for recurring payments", secondary: "" },
    { id: "108", date: "2024-07-18T06:00:00", merchant: "Apple", amount: "-12.99", status: "", description: "Disposable cards can't be used for recurring payments", secondary: "" },
    { id: "109", date: "2024-07-18T05:59:00", merchant: "Apple", amount: "-10", status: "", description: "Disposable cards can't be used for recurring payments", secondary: "" },
    { id: "110", date: "2024-07-18T05:59:00", merchant: "Apple", amount: "0", status: "card_verification", description: "Card verification", secondary: "" },
    { id: "111", date: "2024-07-18T05:07:00", merchant: "Lime", amount: "0", status: "card_verification", description: "Card verification", secondary: "" },
    { id: "112", date: "2024-07-18T05:07:00", merchant: "Lime", amount: "-11.29", status: "", description: "", secondary: "-€6.29" },
    { id: "113", date: "2024-07-18T05:07:00", merchant: "McDonald's", amount: "-6.27", status: "", description: "", secondary: "-€3.50" },
    { id: "114", date: "2024-07-18T04:32:00", merchant: "SumUp", amount: "-5.38", status: "", description: "", secondary: "-€3" },
    { id: "115", date: "2024-07-18T03:42:00", merchant: "McDonald's", amount: "-3.41", status: "", description: "", secondary: "-€1.90" },
    { id: "116", date: "2024-07-19T21:32:00", merchant: "Meet And Greet", amount: "-5.43", status: "", description: "", secondary: "-€3" },
    { id: "117", date: "2024-07-19T22:16:00", merchant: "ARST", amount: "-5.62", status: "", description: "", secondary: "-€3.10" },
    { id: "118", date: "2024-07-20T02:12:00", merchant: "Unconventional Sorrent", amount: "-2.69", status: "", description: "", secondary: "-€1.50" },
    { id: "119", date: "2024-07-20T01:50:00", merchant: "Photo Aminta Sorrento", amount: "-33.18", status: "", description: "", secondary: "-€18.50" },
    { id: "120", date: "2024-07-20T00:39:00", merchant: "Lequile Maria Rosaria", amount: "-8.08", status: "", description: "", secondary: "-€4.50" },
    { id: "121", date: "2024-07-20T00:08:00", merchant: "Suisse Pompei", amount: "-10.77", status: "", description: "", secondary: "-€6" },
    { id: "122", date: "2024-07-20T00:06:00", merchant: "Suisse Pompei", amount: "-19.75", status: "", description: "", secondary: "-€11" },
    
    // Additional transactions to match reference screenshots
    { id: "123", date: "2024-07-14T02:47:00", merchant: "Scotney S Stn", amount: "-7.96", status: "", description: "", secondary: "-£3.83" },
  ]);

  const sorted = useMemo(
    () => [...transactions].sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [transactions]
  );

  const groups = useMemo(() => {
    const map = new Map<string, Transaction[]>();
    for (const t of sorted) {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
        d.getDate()
      ).padStart(2, "0")}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    }
    return Array.from(map.entries())
      .sort((a, b) => (a[0] > b[0] ? -1 : 1))
      .map(([key, items]) => ({
        key,
        label: new Date(items[0].date).toLocaleDateString("en-GB", { day: "2-digit", month: "long" }),
        items,
        total: items.reduce((sum, t) => {
          // Only count non-reverted transactions for daily total
          if (t.status === "reverted" || t.status === "card_verification") return sum;
          return sum + parseFloat(t.amount);
        }, 0),
      }));
  }, [sorted]);

  const getIcon = (transaction: Transaction) => {
    const { merchant, status } = transaction;
    let baseIcon;
    let bgColor = 'bg-gray-800';
    let statusOverlay = null;
    
    if (merchant === 'Money added via Apple Pay') {
      bgColor = 'bg-black';
      baseIcon = <span className="text-white text-xl"></span>;
      statusOverlay = (
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-4 h-4 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="black" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      );
    } else if (merchant === 'GitHub') {
      bgColor = 'bg-black';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.57v-2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.35-1.78-1.35-1.78-1.1-.76.08-.75.08-.75 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.84 1.31 3.53 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.25-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.49 11.49 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.78.84 1.25 1.92 1.25 3.22 0 4.61-2.8 5.64-5.47 5.94.43.37.81 1.1.81 2.22v3.29c0 .31.22.68.82.57A12 12 0 0 0 12 .5Z"/></svg>;
    } else if (merchant === 'Thomas Francis') {
      bgColor = 'bg-orange-500';
      baseIcon = <span className="text-white font-bold text-sm">TF</span>;
      statusOverlay = (
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-4 h-4 flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="black" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      );
    } else if (merchant === 'Charlie Faulkner') {
      bgColor = 'bg-purple-500';
      baseIcon = <span className="text-white font-bold text-sm">CF</span>;
      statusOverlay = (
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-4 h-4 flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="black" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      );
    } else if (merchant === "McDonald's") {
      bgColor = 'bg-red-600';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-red-600 flex items-center justify-center">
          <span className="text-yellow-300 font-bold text-xl leading-none" style={{ fontFamily: 'Arial Black, sans-serif' }}>M</span>
        </div>
      );
    } else if (merchant === 'Apple') {
      bgColor = 'bg-black';
      baseIcon = (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      );
    } else if (merchant === 'Lime') {
      bgColor = 'bg-white';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#32CD32"/>
            <circle cx="12" cy="12" r="6" fill="none" stroke="white" strokeWidth="1"/>
            <path d="M12 6 L12 18 M6 12 L18 12" stroke="white" strokeWidth="1"/>
          </svg>
        </div>
      );
    } else if (merchant === 'DoorDash') {
      bgColor = 'bg-red-600';
      baseIcon = <span className="text-white font-bold text-xl">D</span>;
    } else if (merchant === 'Tinder') {
      bgColor = 'bg-pink-500';
      baseIcon = <span className="text-white font-bold text-xl">🔥</span>;
    } else if (merchant === 'Transport for London') {
      bgColor = 'bg-blue-600';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center border-2 border-white">
          <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
            <div className="w-2 h-0.5 bg-white rounded"></div>
          </div>
        </div>
      );
    } else if (merchant === 'WHSmith') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-blue-600 font-bold text-xs">WH</span>;
    } else if (merchant === 'South Western Railway') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-black font-bold text-xs">SWR</span>;
    } else if (merchant === 'Agoda') {
      bgColor = 'bg-white';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <span className="text-blue-600 font-bold text-[5px] leading-none">agoda</span>
        </div>
      );
    } else if (merchant === 'Bookshop Pompeii Op. La') {
      bgColor = 'bg-red-600';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M4 19h16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12Z"/></svg>;
    } else if (merchant === 'Ryanair') {
      bgColor = 'bg-indigo-600';
      baseIcon = <span className="text-yellow-400 font-bold text-xl">R</span>;
    } else if (merchant === 'Scavi di Pompei') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-gray-800 font-bold text-xs">Pompei</span>;
    } else if (merchant === 'Curreri Viaggi') {
      bgColor = 'bg-purple-500';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M3 16h18v2H3v-2Zm2-9h14l1 7H4l1-7Z"/></svg>;
    } else if (merchant === 'Pret A Manger') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-red-600 font-bold text-xs">Pret</span>;
    } else if (merchant === 'Fat Face Lymington') {
      bgColor = 'bg-pink-500';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4v2h-2v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6H3V4h4z"/></svg>;
    } else if (merchant === 'Waitrose') {
      bgColor = 'bg-white';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <span className="text-green-600 font-bold text-[5px] leading-none">Waitrose</span>
        </div>
      );
    } else if (merchant === 'Scotney S Stn') {
      bgColor = 'bg-purple-500';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M3 16h18v2H3v-2Zm2-9h14l1 7H4l1-7Z"/></svg>;
    } else if (merchant === 'ETH → AUD' || merchant === 'AUD → ETH') {
      bgColor = 'bg-purple-600';
      baseIcon = <span className="text-white font-bold text-sm">⇄</span>;
    } else if (
      merchant.toLowerCase().includes('food') ||
      merchant.toLowerCase().includes('burger') ||
      merchant.toLowerCase().includes('coffee') ||
      merchant.toLowerCase().includes('bar') ||
      merchant.toLowerCase().includes('jay') ||
      merchant.toLowerCase().includes('chope') ||
      merchant.toLowerCase().includes('moer') ||
      merchant.toLowerCase().includes('milly') ||
      merchant.toLowerCase().includes('caffe') ||
      merchant.toLowerCase().includes('meet') ||
      merchant.toLowerCase().includes('boulevard') ||
      merchant.toLowerCase().includes('photo') ||
      merchant.toLowerCase().includes('lequile') ||
      merchant.toLowerCase().includes('suisse')
    ) {
      bgColor = 'bg-orange-500';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M6 7h12l-1 10H7L6 7Zm2-4h8l1 3H7l1-3Z"/></svg>;
    } else if (merchant === 'Zaptrvl') {
      bgColor = 'bg-blue-500';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M2 12l20-8-8 20-2-8-8-4Z"/></svg>;
    } else if (merchant === 'Trainline') {
      bgColor = 'bg-teal-600';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-teal-600 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
      );
    } else if (merchant === 'SNCF') {
      bgColor = 'bg-white';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <span className="text-purple-600 font-bold text-[6px] leading-none">SNCF</span>
        </div>
      );
    } else if (merchant === 'SITA SUD' || merchant === 'Navigazione Libera Del' || merchant === 'Consortaxi' || merchant === 'ARST') {
      bgColor = 'bg-purple-500';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M3 16h18v2H3v-2Zm2-9h14l1 7H4l1-7Z"/></svg>;
    } else if (merchant === 'Tabacchi Positano' || merchant === 'Olvadis') {
      bgColor = 'bg-pink-500';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M6 7h12v10H6z"/></svg>;
    } else if (merchant === 'Rtf') {
      bgColor = 'bg-pink-500';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-pink-500 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 7h-1V6a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1H1a1 1 0 0 0 0 2h1v10a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V9h1a1 1 0 0 0 0-2Z"/>
          </svg>
        </div>
      );
    } else if (merchant === 'Marché Franprix') {
      bgColor = 'bg-orange-500';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-orange-500 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20V6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4V4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
          </svg>
        </div>
      );
    } else if (merchant === 'Pharmacie du Voyage Roissy 1') {
      bgColor = 'bg-white';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L12 6L16 6L16 10L20 10L20 14L16 14L16 18L12 18L12 22L8 22L8 18L4 18L4 14L8 14L8 10L12 10L12 6L12 2Z"/>
          </svg>
        </div>
      );
    } else if (merchant === 'Pains De Provence' || merchant === 'Kosalite') {
      bgColor = 'bg-green-500';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-green-500 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20V6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4V4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
          </svg>
        </div>
      );
    } else if (merchant === 'Kosalite') {
      bgColor = 'bg-green-500';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-green-500 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20V6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4V4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
          </svg>
        </div>
      );
    } else if (merchant === 'yesim') {
      bgColor = 'bg-white';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <span className="text-orange-500 font-bold text-[5px] leading-none">yesim</span>
        </div>
      );
    } else if (merchant === 'Carrefour') {
      bgColor = 'bg-white';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" fill="#0066CC"/>
            <path d="M12 8L10 12H14L12 8Z" fill="#E60012"/>
          </svg>
        </div>
      );
    } else if (merchant === 'DropTicket') {
      bgColor = 'bg-white';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-[5px] font-bold text-teal-600 leading-[0.6]">
            <span>Drop</span>
            <span>Ticket</span>
          </div>
        </div>
      );
    } else if (merchant === 'CRAI') {
      bgColor = 'bg-white';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <span className="text-red-600 font-bold text-[6px] leading-none">CRAI</span>
        </div>
      );
    } else if (merchant === 'Transavia') {
      bgColor = 'bg-green-600';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-green-600 flex items-center justify-center">
          <span className="text-white font-bold text-sm">t</span>
        </div>
      );
    } else if (merchant === 'Omio') {
      bgColor = 'bg-white';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <span className="text-blue-600 font-bold text-[5px] leading-none">omio</span>
        </div>
      );
    } else if (merchant === "Consortium 'Unico Campania'") {
      bgColor = 'bg-white';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <span className="text-blue-500 font-bold text-[4px] leading-none">Unico</span>
        </div>
      );
    } else if (merchant === 'Alimentation General') {
      bgColor = 'bg-white';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <span className="text-gray-800 font-bold text-[5px] leading-none">AG</span>
        </div>
      );
    } else if (merchant === 'SumUp') {
      bgColor = 'bg-white';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <span className="text-black font-bold text-[5px] leading-none">SumUp</span>
        </div>
      );
    } else if (merchant === 'Unconventional Sorrent') {
      bgColor = 'bg-orange-500';
      baseIcon = <span className="text-white font-bold text-xs">US</span>;
    } else if (merchant === 'RELAY') {
      bgColor = 'bg-red-600';
      baseIcon = (
        <div className="w-full h-full rounded-full bg-red-600 flex items-center justify-center">
          <span className="text-white font-bold text-[5px] leading-none">RELAY</span>
        </div>
      );
    } else {
      bgColor = 'bg-gray-800';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="6" width="16" height="12" rx="2"/></svg>;
    }
    
    // Add status overlays
    if (status === 'reverted') {
      statusOverlay = (
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-4 h-4 flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" stroke="black" strokeWidth="2" strokeLinecap="round"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" stroke="black" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      );
    } else if (status === 'insufficient_balance') {
      statusOverlay = (
        <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      );
    } else if (status === 'delayed_transaction') {
      statusOverlay = (
        <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full w-4 h-4 flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2" fill="white"/></svg>
        </div>
      );
    }
    
    return (
      <div className={`relative w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}>
        {baseIcon}
        {statusOverlay}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white" data-testid="transactions-screen">
      <div className="w-full max-w-[390px] mx-auto px-[18px] pb-24" style={{ paddingTop: "max(env(safe-area-inset-top), 10px)" }}>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 text-white -ml-2 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center text-2xl font-bold -ml-8">Transactions</div>
          <div className="w-10" />
        </div>

        <div className="mt-3">
          <div className="h-10 rounded-full px-4 flex items-center" style={{ background: "#2A313C", boxShadow: "inset 0 1px 0 rgba(255,255,255,.06)" }}>
            <Search className="w-5 h-5 text-[#9AA3B2] mr-3" />
            <span className="text-[#9AA3B2]">Search</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-8 text-[15px]">
          <span className="text-[#9AA3B2]">November 2023</span>
          <span className="text-[#9AA3B2]">June</span>
          <span className="px-4 h-8 rounded-full grid place-items-center" style={{ background: "#232730" }}>July</span>
          <span className="text-[#9AA3B2]">August</span>
        </div>

        <div className="mt-5 space-y-8">
          {groups.map(({ key, label, items, total }) => (
            <section key={key}>
              <div className="flex items-baseline justify-between px-1 mb-2">
                <div className="text-[17px] font-semibold">{label}</div>
                <div className="text-[15px] text-white" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {total === 0 ? "$0" : (total > 0 ? "+" : "") + "$" + Math.abs(total).toFixed(2)}
                </div>
              </div>

              <div className="rounded-3xl p-3" style={{ background: "#181A1F", boxShadow: "inset 0 1px 0 rgba(255,255,255,.06)" }}>
                <div className="space-y-2">
                  {items.map((t) => {
                    const amt = parseFloat(t.amount);
                    const isReverted = t.status === "reverted";
                    const isCV = t.status === "card_verification";
                    const isPos = amt > 0;
                    const isNeg = amt < 0;

                    const primaryColor = isReverted ? "rgba(255,255,255,.7)" : isPos ? "#22C55E" : isNeg ? "#EF4444" : "#FFFFFF";
                    const primaryText = isReverted ? "$" + Math.abs(amt).toFixed(2) : (isPos ? "+" : isNeg ? "-" : "") + "$" + Math.abs(amt).toFixed(2);

                    const timeText = new Date(t.date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
                    const subs: string[] = [timeText];
                    if (t.status === "reverted") subs.push("Reverted");
                    if (t.status === "card_verification") subs.push("Card verification");
                    if (t.status === "delayed_transaction") subs.push("Delayed transaction");

                    return (
                      <div
                        key={t.id}
                        className="flex items-center rounded-xl hover:bg-white/5 active:bg-white/10 transition px-3 py-3"
                        onClick={() => setOpenTx(t)}
                        role="button"
                        aria-label={`Open details for ${t.merchant}`}
                      >
                        <div className="mr-3">{getIcon(t)}</div>

                        <div className="flex-1 min-w-0">
                          <div className="text-[16px] font-semibold leading-tight truncate">{t.merchant}</div>
                          <div className="text-[13px] text-white/60">
                            {subs.join(" · ")}
                            {t.description && <div className="text-[13px] text-white/60">{t.description}</div>}
                          </div>
                        </div>

                        <div className="ml-3 text-right">
                          {!isCV && (
                            <div className="text-[16px]" style={{ color: primaryColor, textDecoration: isReverted ? "line-through" : "none", fontVariantNumeric: "tabular-nums" }}>
                              {primaryText}
                            </div>
                          )}
                          {t.secondary && <div className="text-[12px] text-[#6B7280]">{t.secondary}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {openTx && (
        <TransactionSheet tx={openTx} onClose={() => setOpenTx(null)} />
      )}
    </div>
  );
}

function TransactionSheet({
  tx,
  onClose,
}: {
  tx: any; // Transaction shape you use
  onClose: () => void;
}) {
  if (!tx) return null;

  const amount = parseFloat(tx.amount || "0");
  const isNeg = amount < 0;
  const amountText = `${isNeg ? "-" : "+"}$${Math.abs(amount).toFixed(2)}`;

  const time24 = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  const dateLong = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

  // Get the same icon as in the main list
  const getTransactionIcon = () => {
    const { merchant } = tx;
    if (merchant === "McDonald's") {
      return (
        <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
          <span className="text-yellow-300 font-bold text-2xl leading-none" style={{ fontFamily: 'Arial Black, sans-serif' }}>M</span>
        </div>
      );
    }
    // Add other merchant icons as needed
    return (
      <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
          <rect x="4" y="6" width="16" height="12" rx="2"/>
        </svg>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50"
      aria-modal="true"
      role="dialog"
    >
      {/* backdrop */}
      <div 
        className="absolute inset-0 bg-black" 
        onClick={onClose}
      />
      {/* sheet container */}
      <div className="absolute inset-0 flex items-end">
        <div 
          className="w-full max-w-[430px] mx-auto bg-[#1C1C1E] rounded-t-3xl text-white h-[95vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          style={{ boxShadow: "0 -10px 40px rgba(0,0,0,1)" }}
        >
          {/* grabber */}
          <div className="pt-3 pb-2 flex justify-center sticky top-0 bg-[#1C1C1E] z-10">
            <div className="w-12 h-1.5 rounded-full bg-white/30" />
          </div>

          {/* header section */}
          <div className="px-6 pt-4 pb-6 relative">
            <button
              onClick={onClose}
              className="absolute left-4 top-4 w-8 h-8 grid place-items-center rounded-full text-white hover:bg-white/10"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* merchant icon (top-right) */}
            <div className="absolute right-6 top-4">
              {getTransactionIcon()}
            </div>

            {/* amount */}
            <div
              className="text-[34px] font-extrabold leading-none pr-20 mb-2 text-white"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {amountText}
            </div>

            {/* merchant name (blue) */}
            <div className="mb-1">
              <span className="text-[#60A5FA] text-[18px]">{tx.merchant}</span>
            </div>

            {/* date/time */}
            <div className="text-white/60 mb-4 text-[15px]">
              {dateLong(tx.date)}, {time24(tx.date)}
            </div>

            {/* Split bill button */}
            <button
              className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 h-12 hover:bg-white/15 transition-colors"
              aria-label="Split bill"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="text-white/80">
                <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[16px] text-white">Split bill</span>
            </button>
          </div>

          {/* map section */}
          <div className="px-6 mb-6">
            <div className="rounded-2xl overflow-hidden bg-[#3A5998] h-40 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A7C99] to-[#2D4A6B]"></div>
              <div className="absolute bottom-3 left-3 text-white text-[12px] font-medium">
                T2 Domestic
              </div>
              <div className="absolute bottom-3 right-3 text-white/70 text-[10px]">
                Legal
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 rounded-lg px-3 py-1">
                <span className="text-white text-[11px] font-medium">🍎 Maps</span>
              </div>
            </div>
          </div>

          {/* location card */}
          <div className="px-6 mb-6">
            <button className="w-full rounded-2xl bg-white/5 px-5 py-4 text-left flex items-center justify-between hover:bg-white/10 transition-colors">
              <div className="text-white text-[16px]">Mascot NSW 2020, Australia</div>
              <svg width="18" height="18" viewBox="0 0 24 24" className="text-white/40">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </button>
          </div>

          {/* info sections */}
          <div className="px-6 space-y-4 pb-20">
            <Block>
              <Row label="Status" value="Completed" />
              <Row label="Card" value="Mastercard ••4103" valueClass="text-[#60A5FA]" icon="card" />
              <Row label="Statement" value="Download" valueClass="text-[#60A5FA]" icon="download" />
            </Block>

            <Block>
              <Row
                label="Exclude from analytics"
                customRight={<Toggle />}
              />
              <Row
                label="Category"
                value="Restaurants"
                valueClass="text-[#60A5FA]"
                icon="fork"
              />
              <Row
                label="Adjust for analytics"
                value="$2.50"
                valueClass="text-[#60A5FA]"
                icon="bars"
              />
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
  return (
    <div className="rounded-2xl bg-[#2C2C2E] px-5 py-4 space-y-4">
      {children}
    </div>
  );
}

function Row({
  label,
  value,
  valueClass,
  chevron,
  icon,
  customRight,
}: {
  label: string;
  value?: string;
  valueClass?: string;
  chevron?: boolean;
  icon?: "card" | "download" | "fork" | "bars" | "camera" | "plus";
  customRight?: React.ReactNode;
}) {
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
          {value && <div className={`text-white text-[16px] ${valueClass ?? ""}`}>{value}</div>}
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
    <button
      type="button"
      className="relative inline-flex h-8 w-14 items-center rounded-full bg-[#3A3A3C] transition-colors"
      onClick={(e) => e.preventDefault()}
    >
      <span className="inline-block h-7 w-7 transform rounded-full bg-white translate-x-0.5 transition-transform will-change-transform shadow-sm" />
    </button>
  );
}
