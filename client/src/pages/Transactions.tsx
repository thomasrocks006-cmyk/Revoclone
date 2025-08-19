import { useMemo } from "react";
import { Link } from "wouter";
import { ArrowLeft, Search, Github, Plus, X, Utensils, Bus, Plane, Train, ShoppingBag, Heart, CreditCard, Apple as AppleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Transaction } from "@shared/schema";

export default function Transactions() {
  const transactions: Transaction[] = [
    // August transactions
    { id: "1", date: "2024-08-17T04:25:00", merchant: "GitHub", amount: "1.55", status: "reverted", description: "", secondary: "" },
    { id: "2", date: "2024-08-15T18:06:00", merchant: "Thomas Francis", amount: "-18", status: "", description: "Sent from Revolut", secondary: "" },
    { id: "3", date: "2024-08-15T03:39:00", merchant: "GitHub", amount: "15.46", status: "reverted", description: "", secondary: "" },
    { id: "4", date: "2024-08-15T03:35:00", merchant: "GitHub", amount: "-6.18", status: "", description: "", secondary: "-US$4" },
    { id: "5", date: "2024-08-15T03:24:00", merchant: "GitHub", amount: "0", status: "card_verification", description: "Card verification", secondary: "" },
    { id: "6", date: "2024-08-15T03:23:00", merchant: "Money added via Apple Pay", amount: "25", status: "", description: "", secondary: "" },
    { id: "7", date: "2024-08-15T02:04:00", merchant: "GitHub", amount: "15.46", status: "insufficient_balance", description: "Insufficient balance", secondary: "" },
    // July transactions
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
    // Add any missed unique ones if there are duplicates or overlaps, but this covers all from screenshots
  ];
  const isLoading = false;
  const sortedTransactions = useMemo(() => transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [transactions]);
  const groupTransactionsByDate = (transactions: Transaction[]) => {
    const groups: { [key: string]: Transaction[] } = {};
    transactions.forEach(transaction => {
      const date = new Date(transaction.date).toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'long'
      });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
    });
    return groups;
  };
  const groupedTransactions = groupTransactionsByDate(sortedTransactions);
  const getIcon = (transaction: Transaction) => {
    const { merchant, status } = transaction;
    let baseIcon;
    let bgColor = 'bg-gray-800';
    let additional = null;
    if (merchant === 'Money added via Apple Pay') {
      bgColor = 'bg-black';
      baseIcon = <span className="text-white text-xl"></span>;
      additional = (
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-4 h-4 flex items-center justify-center">
          <Plus className="w-3 h-3 text-black" />
        </div>
      );
    } else if (merchant === 'GitHub') {
      bgColor = 'bg-black';
      baseIcon = <Github className="w-6 h-6 text-white" />;
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
    } else if (merchant.toLowerCase().includes('food') || merchant.toLowerCase().includes('burger') || merchant.toLowerCase().includes('coffee') || merchant.toLowerCase().includes('bar') || merchant.toLowerCase().includes('jay') || merchant.toLowerCase().includes('chope') || merchant.toLowerCase().includes('moer') || merchant.toLowerCase().includes('milly') || merchant.toLowerCase().includes('caffe') || merchant.toLowerCase().includes('meet') || merchant.toLowerCase().includes('boulevard')) {
      bgColor = 'bg-orange-500';
      baseIcon = <Utensils className="w-6 h-6 text-white" />;
    } else if (merchant === 'Zaptrvl') {
      bgColor = 'bg-blue-500';
      baseIcon = <Plane className="w-6 h-6 text-white" />;
    } else if (merchant === 'Trainline') {
      bgColor = 'bg-green-600';
      baseIcon = <Heart className="w-6 h-6 text-white" />;
    } else if (merchant === 'SNCF') {
      bgColor = 'bg-gradient-to-r from-purple-500 to-red-500';
      baseIcon = <Train className="w-6 h-6 text-white" />;
    } else if (merchant === 'SITA SUD' || merchant === 'Navigazione Libera Del' || merchant === 'Consortaxi' || merchant === 'ARST') {
      bgColor = 'bg-purple-500';
      baseIcon = <Bus className="w-6 h-6 text-white" />;
    } else if (merchant === 'Tabacchi Positano' || merchant === 'Olvadis' || merchant === 'Rtf') {
      bgColor = 'bg-pink-500';
      baseIcon = <ShoppingBag className="w-6 h-6 text-white" />;
    } else if (merchant === 'Pains De Provence' || merchant === 'Kosalite' || merchant === 'Pharmacie du Voyage Roissy 1' || merchant === 'Marché Franprix') {
      bgColor = 'bg-green-500';
      baseIcon = <ShoppingBag className="w-6 h-6 text-white" />;
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
    } else if (merchant === 'Consortium \'Unico Campania\'') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-blue-500 font-bold text-xs">Unico</span>;
    } else if (merchant === 'Alimentation General') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-gray-800 font-bold text-xs">AG</span>;
    } else if (merchant === 'SumUp') {
      bgColor = 'bg-white';
      baseIcon = <span className="text-black font-bold text-xs">SumUp</span>;
    } else {
      bgColor = 'bg-gray-800';
      baseIcon = <CreditCard className="w-6 h-6 text-white" />;
    }
    if (status === 'insufficient_balance') {
      additional = (
        <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
          <X className="w-3 h-3 text-white" />
        </div>
      );
    }
    return (
      <div className={`relative w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}>
        {baseIcon}
        {additional}
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-black text-white" data-testid="transactions-screen">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-white text-sm font-medium">
        <span>21:33 🌙</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-2 bg-white rounded-full"></div>
            <div className="w-0.5 h-3 bg-white rounded-full"></div>
            <div className="w-0.5 h-4 bg-white rounded-full"></div>
          </div>
          <span className="ml-1">📶</span>
          <span>35%</span>
        </div>
      </div>
      {/* Header */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="w-10 h-10 text-white">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-white text-2xl font-medium">Transactions</h1>
        </div>
        {/* Search Bar */}
        <div className="bg-gray-800 rounded-full px-4 py-3 flex items-center mb-6">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <span className="text-gray-400">Search</span>
        </div>
        {/* Month Tabs */}
        <div className="flex gap-3 mb-6 text-sm">
          <span className="text-gray-400">November 2023</span>
          <span className="text-gray-400">June</span>
          <span className="bg-gray-800 rounded-full px-4 py-1 text-white">July</span>
          <span className="text-gray-400">August</span>
        </div>
      </div>
      {/* Transactions List */}
      <div className="px-4">
        {isLoading ? (
          <div className="text-gray-400 text-center py-8">Loading transactions...</div>
        ) : Object.keys(groupedTransactions).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedTransactions).map(([date, dayTransactions]) => {
              const dailyTotal = dayTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
              const dailyColor = dailyTotal > 0 ? 'green' : dailyTotal < 0 ? 'red' : 'gray';
              const dailyText = dailyTotal > 0 ? `+$${dailyTotal.toFixed(2)}` : dailyTotal < 0 ? `-$${Math.abs(dailyTotal).toFixed(2)}` : '$0';
              return (
                <div key={date} className="space-y-3">
                  {/* Date Header with Daily Total */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium">{date}</h3>
                    <div className={`text-${dailyColor}-400 text-sm`}>
                      {dailyText}
                    </div>
                  </div>
                  {/* Day's Transactions */}
                  <div className="space-y-3">
                    {dayTransactions.map((transaction) => {
                      const amount = parseFloat(transaction.amount);
                      let displayAmount = '';
                      let amountColor = amount >= 0 ? 'green' : 'white';
                      let amountText = amount >= 0 ? `+$${amount.toFixed(2)}` : `-${Math.abs(amount).toFixed(2)}`;
                      if (transaction.status === 'reverted' || transaction.status === 'insufficient_balance') {
                        amountColor = 'white';
                        amountText = `$${Math.abs(amount).toFixed(2)}`;
                      }
                      if (transaction.status !== 'card_verification' && amount !== 0) {
                        displayAmount = amountText;
                      }
                      return (
                        <div key={transaction.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getIcon(transaction)}
                            <div>
                              <div className="text-white font-medium">{transaction.merchant}</div>
                              <div className="text-gray-400 text-sm">
                                {new Date(transaction.date).toLocaleTimeString('en-AU', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                                {transaction.status === "reverted" && " - Reverted"}
                              </div>
                              {transaction.description && (
                                <div className="text-gray-400 text-sm">{transaction.description}</div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            {displayAmount && (
                              <div className={`text-${amountColor}-400`}>
                                {displayAmount}
                              </div>
                            )}
                            {transaction.secondary && (
                              <div className="text-gray-400 text-sm">{transaction.secondary}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-400 text-center py-8" data-testid="no-transactions">
            No transactions found
          </div>
        )}
      </div>
      {/* Home indicator */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-white/50 rounded-full"></div>
      </div>
    </div>
  );
}
