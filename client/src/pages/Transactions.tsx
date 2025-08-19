import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction } from "@shared/schema";

type Tx = {
  id: string;
  date: string;
  merchant: string;
  amount: string;
  status: string;
  description: string;
  secondary: string;
};

/** Build a stable unique key for a transaction */
function txKey(t: Tx) {
  // status and secondary can change formatting; key off the core identity
  return `${new Date(t.date).toISOString()}|${t.merchant}|${Number(t.amount).toFixed(2)}`;
}

/** Return a new array with duplicates removed by txKey */
function ensureUniqueTransactions(list: Tx[]) {
  const seen = new Set();
  const out: Tx[] = [];
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
  const [openTx, setOpenTx] = useState<Tx | null>(null);

  // small helpers
  const fmtAmt = (n: number) => {
    const sign = n > 0 ? "+" : n < 0 ? "-" : "";
    return `${sign}$${Math.abs(n).toFixed(2)}`;
  };
  const time24 = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  const dateLong = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

  const transactions: Tx[] = ensureUniqueTransactions([
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
    // New transactions from screenshots (continuing from id 73)
    // June (screens 1–3)
    { id: "74", date: "2024-06-06T21:20:00", merchant: "DoorDash", amount: "-30.13", status: "", description: "", secondary: "" },
    { id: "75", date: "2024-06-06T21:19:00", merchant: "DoorDash", amount: "0", status: "card_verification", description: "Card verification", secondary: "" },
    { id: "76", date: "2024-06-03T15:43:00", merchant: "Tinder", amount: "-9.49", status: "", description: "", secondary: "" },
    { id: "77", date: "2024-06-03T15:42:00", merchant: "Money added via Apple Pay", amount: "41", status: "", description: "", secondary: "" },
    // November 2023 (screen 3)
    { id: "78", date: "2023-11-04T15:18:00", merchant: "Thomas Francis", amount: "-473", status: "", description: "Sent from Revolut", secondary: "" },
    { id: "79", date: "2023-11-04T15:17:00", merchant: "ETH → AUD", amount: "473", status: "", description: "", secondary: "-0.17 ETH" },
    { id: "80", date: "2023-11-04T14:35:00", merchant: "AUD → ETH", amount: "-500", status: "", description: "", secondary: "+0.17 ETH" },
    // July 12–11 (screens 4–5)
    { id: "81", date: "2024-07-12T09:59:00", merchant: "Transport for London", amount: "-26.58", status: "delayed_transaction", description: "Delayed transaction", secondary: "-£12.80" },
    { id: "82", date: "2024-07-12T01:00:00", merchant: "Money added via Apple Pay", amount: "1100", status: "", description: "", secondary: "" },
    { id: "83", date: "2024-07-11T23:02:00", merchant: "Transport for London", amount: "0", status: "card_verification", description: "Card verification", secondary: "" },
    { id: "84", date: "2024-07-11T13:33:00", merchant: "Money added via Apple Pay", amount: "50", status: "", description: "", secondary: "" },
    // July 16–15 (screens 6–7)
    { id: "85", date: "2024-07-16T23:53:00", merchant: "Transport for London", amount: "0", status: "card_verification", description: "Card verification", secondary: "" },
    { id: "86", date: "2024-07-16T23:38:00", merchant: "WHSmith", amount: "-51.49", status: "", description: "", secondary: "-£24.99" },
    { id: "87", date: "2024-07-16T23:32:00", merchant: "South Western Railway", amount: "-81.60", status: "", description: "", secondary: "-£39.60" },
    { id: "88", date: "2024-07-16T21:23:00", merchant: "Agoda", amount: "-113.31", status: "", description: "", secondary: "" },
    { id: "89", date: "2024-07-16T00:35:00", merchant: "Money added via Apple Pay", amount: "90", status: "", description: "", secondary: "" },
    { id: "90", date: "2024-07-15T20:53:00", merchant: "Fat Face Lymington", amount: "-57.95", status: "", description: "", secondary: "-£28.20" },
    { id: "91", date: "2024-07-15T01:24:00", merchant: "Waitrose", amount: "-16.25", status: "", description: "", secondary: "-£7.90" },
    // July 17 (screen 8)
    { id: "92", date: "2024-07-17T23:46:00", merchant: "Bookshop Pompeii Op. La", amount: "-2.70", status: "", description: "", secondary: "-€1.50" },
    { id: "93", date: "2024-07-17T23:18:00", merchant: "Ryanair", amount: "-6.29", status: "", description: "", secondary: "-€3.50" },
    { id: "94", date: "2024-07-17T23:05:00", merchant: "Scavi di Pompei", amount: "-39.51", status: "", description: "", secondary: "-€22" },
    { id: "95", date: "2024-07-17T22:24:00", merchant: "Curreri Viaggi", amount: "-23.37", status: "", description: "", secondary: "-€13" },
    { id: "96", date: "2024-07-17T21:27:00", merchant: "yesim", amount: "-12.59", status: "", description: "", secondary: "-€7" },
    { id: "97", date: "2024-07-17T16:06:00", merchant: "Ryanair", amount: "-113.96", status: "", description: "", secondary: "-£55" },
    { id: "98", date: "2024-07-17T09:59:00", merchant: "Transport for London", amount: "-13.30", status: "delayed_transaction", description: "Delayed transaction", secondary: "-£6.40" },
    { id: "99", date: "2024-07-17T00:31:00", merchant: "Pret A Manger", amount: "-6.71", status: "", description: "", secondary: "-£3.25" },
    // July 18 (screen 9)
    { id: "100", date: "2024-07-18T22:49:00", merchant: "Bar Buca di Bacco", amount: "-11.63", status: "", description: "", secondary: "-€6.50" },
    { id: "101", date: "2024-07-18T22:37:00", merchant: "Navigazione Libera Del", amount: "-55.44", status: "", description: "", secondary: "-€31" },
    { id: "102", date: "2024-07-18T21:49:00", merchant: "Tabacchi Positano", amount: "-4.84", status: "", description: "", secondary: "-€2.70" },
    { id: "103", date: "2024-07-18T19:54:00", merchant: "SITA SUD", amount: "-8.59", status: "", description: "", secondary: "-€4.80" },
    { id: "104", date: "2024-07-18T19:24:00", merchant: "Consortium 'Unico Campania'", amount: "-2.69", status: "", description: "", secondary: "-€1.50" },
    // July 18 (earlier list from screen 10)
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
  ]);

  const sorted = useMemo(
    () => [...transactions].sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [transactions]
  );

  const groups = useMemo(() => {
    const map = new Map<string, Tx[]>();
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
        total: items.reduce((sum, t) => sum + parseFloat(t.amount), 0),
      }));
  }, [sorted]);

  const getIcon = (transaction: Tx) => {
    const { merchant, status } = transaction;
    let baseIcon;
    let bgColor = 'bg-gray-800';
    if (merchant === 'Money added via Apple Pay') {
      bgColor = 'bg-black';
      baseIcon = <span className="text-white text-xl"></span>;
      return (
        <div className={`relative w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}>
          {baseIcon}
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-4 h-4 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="black" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
        </div>
      );
    } else if (merchant === 'GitHub') {
      bgColor = 'bg-black';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.57v-2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.35-1.78-1.35-1.78-1.1-.76.08-.75.08-.75 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.84 1.31 3.53 1 .11-.79.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.25-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.49 11.49 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.78.84 1.25 1.92 1.25 3.22 0 4.61-2.8 5.64-5.47 5.94.43.37.81 1.1.81 2.22v3.29c0 .31.22.68.82.57A12 12 0 0 0 12 .5Z"/></svg>;
    } else if (merchant === 'Thomas Francis') {
      bgColor = 'bg-orange-500';
      baseIcon = <span className="text-white font-bold text-sm">TF →</span>;
    } else if (merchant === 'Charlie Faulkner') {
      bgColor = 'bg-purple-500';
      baseIcon = <span className="text-white font-bold text-sm">CF →</span>;
    } else if (merchant === "McDonald's") {
      bgColor = 'bg-red-600';
      baseIcon = <span className="text-yellow-400 font-bold text-xl">M</span>;
    } else if (merchant === 'Lime') {
      bgColor = 'bg-green-600';
      baseIcon = <span className="text-white font-bold text-xl">L</span>;
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
      merchant.toLowerCase().includes('boulevard')
    ) {
      bgColor = 'bg-orange-500';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M6 7h12l-1 10H7L6 7Zm2-4h8l1 3H7l1-3Z"/></svg>;
    } else if (merchant === 'Zaptrvl') {
      bgColor = 'bg-blue-500';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M2 12l20-8-8 20-2-8-8-4Z"/></svg>;
    } else if (merchant === 'Trainline') {
      bgColor = 'bg-green-600';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M4 16h16l-2 4H6l-2-4Zm1-9h14v7H5V7Zm3-4h8l1 3H7l1-3Z"/></svg>;
    } else if (merchant === 'SNCF') {
      bgColor = 'bg-gradient-to-r from-purple-500 to-red-500';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"/></svg>;
    } else if (merchant === 'SITA SUD' || merchant === 'Navigazione Libera Del' || merchant === 'Consortaxi' || merchant === 'ARST') {
      bgColor = 'bg-purple-500';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M3 16h18v2H3v-2Zm2-9h14l1 7H4l1-7Z"/></svg>;
    } else if (merchant === 'Tabacchi Positano' || merchant === 'Olvadis' || merchant === 'Rtf') {
      bgColor = 'bg-pink-500';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M6 7h12v10H6z"/></svg>;
    } else if (merchant === 'Pains De Provence' || merchant === 'Kosalite' || merchant === 'Pharmacie du Voyage Roissy 1' || merchant === 'Marché Franprix') {
      bgColor = 'bg-green-500';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>;
    } else if (merchant === 'yesim') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-orange-500 font-bold text-xs">yesim</span>;
    } else if (merchant === 'Carrefour') {
      bgColor = 'bg-blue-600';
      baseIcon = <span className="text-white font-bold text-xl">C</span>;
    } else if (merchant === 'DropTicket') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-green-500 font-bold text-xs">DropTicket</span>;
    } else if (merchant === 'CRAI') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-green-600 font-bold text-xs">CRAI</span>;
    } else if (merchant === 'Transavia') {
      bgColor = 'bg-green-500';
      baseIcon = <span className="text-white font-bold text-sm">t</span>;
    } else if (merchant === 'Omio') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-blue-500 font-bold text-sm">Omio</span>;
    } else if (merchant === "Consortium 'Unico Campania'") {
      bgColor = 'bg-white';
      baseIcon = <span className="text-blue-500 font-bold text-xs">Unico</span>;
    } else if (merchant === 'Alimentation General') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-gray-800 font-bold text-xs">AG</span>;
    } else if (merchant === 'SumUp') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-black font-bold text-xs">SumUp</span>;
    } else if (merchant === 'DoorDash') {
      bgColor = 'bg-red-600';
      baseIcon = <span className="text-white font-bold text-xl">D</span>;
    } else if (merchant === 'Tinder') {
      bgColor = 'bg-pink-500';
      baseIcon = <span className="text-white font-bold text-xl">🔥</span>;
    } else if (merchant === 'Transport for London') {
      bgColor = 'bg-blue-600';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M4 16h16l-2 4H6l-2-4Zm1-9h14v7H5V7Zm3-4h8l1 3H7l1-3Z"/></svg>;
    } else if (merchant === 'WHSmith') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-blue-600 font-bold text-xs">WH</span>;
    } else if (merchant === 'South Western Railway') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-black font-bold text-xs">SWR</span>;
    } else if (merchant === 'Agoda') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-black font-bold text-xs">agoda</span>;
    } else if (merchant === 'Bookshop Pompeii Op. La') {
      bgColor = 'bg-red-600';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16l-1 10H5L4 6ZM6 8v6h12V8H6Z"/></svg>;
    } else if (merchant === 'Ryanair') {
      bgColor = 'bg-indigo-600';
      baseIcon = <span className="text-yellow-400 font-bold text-xl">R</span>;
    } else if (merchant === 'Scavi di Pompei') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-black font-bold text-xs">Pompei</span>;
    } else if (merchant === 'Curreri Viaggi') {
      bgColor = 'bg-purple-600';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M3 16h18v2H3v-2Zm2-9h14l1 7H4l1-7Z"/></svg>;
    } else if (merchant === 'Pret A Manger') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-black font-bold text-xs">Pret</span>;
    } else if (merchant === 'Fat Face Lymington') {
      bgColor = 'bg-pink-500';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2l12 0 2 18-8-6-8 6z"/></svg>;
    } else if (merchant === 'Waitrose') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-green-600 font-bold text-xs">Waitrose</span>;
    } else if (merchant === 'ETH → AUD' || merchant === 'AUD → ETH') {
      bgColor = 'bg-gray-800';
      baseIcon = <span className="text-white font-bold text-xs">⚡</span>;
    } else if (merchant === 'Apple') {
      bgColor = 'bg-black';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>;
    } else {
      bgColor = 'bg-gray-800';
      baseIcon = <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="6" width="16" height="12" rx="2"/></svg>;
    }
    if (status === 'insufficient_balance') {
      return (
        <div className={`relative w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}>
          {baseIcon}
          <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
        </div>
      );
    }
    return (
      <div className={`relative w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}>
        {baseIcon}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#000] text-white" data-testid="transactions-screen">
      <div className="w-full max-w-[390px] mx-auto px-[18px] pb-24" style={{ paddingTop: "max(env(safe-area-inset-top), 10px)" }}>
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="w-10 h-10 text-white -ml-2">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
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
                <div className="text-[15px]" style={{ color: total > 0 ? "#22C55E" : total < 0 ? "#EF4444" : "#9AA3B2", fontVariantNumeric: "tabular-nums" }}>
                  {(total > 0 ? "+" : total < 0 ? "-" : "") + "$" + Math.abs(total).toFixed(2)}
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

                    return (
                      <div
                        key={t.id}
                        className="flex items-center rounded-xl hover:bg-white/5 active:bg-white/10 transition"
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

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
        <div className="w-32 h-1 bg-white/50 rounded-full"></div>
      </div>
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

  return (
    <div
      className="fixed inset-0 z-50"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60" />
      {/* sheet */}
      <div
        className="absolute left-0 right-0 bottom-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="mx-auto w-full max-w-[430px] rounded-t-3xl bg-[#111316] text-white"
          style={{ boxShadow: "0 -10px 40px rgba(0,0,0,.5)" }}
        >
          {/* grabber */}
          <div className="pt-2 pb-1 flex justify-center">
            <div className="w-12 h-1.5 rounded-full bg-white/20" />
          </div>

          {/* header row */}
          <div className="px-4 pt-3 pb-2 relative">
            <button
              onClick={onClose}
              className="absolute left-3 top-3 w-10 h-10 grid place-items-center rounded-full text-white/80 hover:bg-white/10"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* merchant avatar (top-right) */}
            <div className="absolute right-4 top-4 w-10 h-10 rounded-full bg-[#B71C1C] grid place-items-center">
              {/* demo McD logo circle; replace via mapping if desired */}
              <span className="text-yellow-300 font-extrabold text-xl leading-none">M</span>
            </div>

            {/* amount */}
            <div
              className="text-[34px] font-extrabold leading-none pr-16"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {amountText}
            </div>

            {/* merchant (blue) */}
            <div className="mt-2">
              <span className="text-[#60A5FA] text-[18px]">{tx.merchant}</span>
            </div>

            {/* date/time */}
            <div className="text-white/60 mt-1">
              {dateLong(tx.date)}, {time24(tx.date)}
            </div>

            {/* Split bill */}
            <button
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 h-10"
              aria-label="Split bill"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" className="text-white/80">
                <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>Split bill</span>
            </button>
          </div>

          {/* map placeholder */}
          <div className="px-4">
            <div className="rounded-2xl overflow-hidden bg-[#24324A] h-36 grid place-items-center">
              <span className="text-white/60">Map preview</span>
            </div>
          </div>

          {/* location card */}
          <div className="px-4 mt-3">
            <button className="w-full rounded-2xl bg-white/5 px-4 py-4 text-left flex items-center justify-between">
              <div>Mascot NSW 2020, Australia</div>
              <svg width="18" height="18" viewBox="0 0 24 24" className="text-white/60">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </button>
          </div>

          {/* info blocks */}
          <div className="px-4 mt-4 space-y-3 pb-8">
            <Block>
              <Row label="Status" value="Completed" />
              <Row label="Card" value="Mastercard ··4103" valueClass="text-[#60A5FA]" icon="card" />
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
    <div className="rounded-2xl bg-white/5 px-4 py-3 space-y-3">
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
      <div className="flex items-center gap-3">
        {icon && <RowIcon kind={icon} />}
        <div className="text-white/80">{label}</div>
      </div>
      {customRight ? (
        customRight
      ) : (
        <div className="flex items-center gap-2">
          {value && <div className={`text-white ${valueClass ?? ""}`}>{value}</div>}
          {chevron && (
            <svg width="18" height="18" viewBox="0 0 24 24" className="text-white/60">
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
        <path d="M7 8v8" />
        <circle cx="7" cy="5" r="2" />
        <circle cx="7" cy="19" r="2" />
        <path d="M7 12h6a4 4 0 0 0 4-4V5" />
      </>
    ),
    bars: (
      <>
        <rect x="4" y="6" width="16" height="2" rx="1" />
        <rect x="4" y="11" width="16" height="2" rx="1" />
        <rect x="4" y="16" width="16" height="2" rx="1" />
      </>
    ),
    camera: (
      <>
        <rect x="5" y="7" width="14" height="10" rx="2" />
        <circle cx="12" cy="12" r="3" />
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
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-white/60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {paths[kind] ?? null}
    </svg>
  );
}

function Toggle() {
  return (
    <button
      type="button"
      className="relative inline-flex h-7 w-12 items-center rounded-full bg-white/20"
      onClick={(e) => e.preventDefault()}
    >
      <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-1 transition-transform will-change-transform" />
    </button>
  );
}