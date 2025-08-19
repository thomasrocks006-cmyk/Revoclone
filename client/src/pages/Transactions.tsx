import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "wouter";
import TransactionCard from "@/components/TransactionCard";
import { type User, type Transaction } from "@shared/schema";

export default function Transactions() {
  const [selectedMonth, setSelectedMonth] = useState("August");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions", user?.id],
    enabled: !!user?.id,
  });

  const months = ["November 2023", "June", "July", "August"];

  // Group transactions by date
  const groupedTransactions = transactions?.reduce((groups: Record<string, Transaction[]>, transaction) => {
    const date = new Date(transaction.date);
    const dateKey = `${date.getDate()} ${date.toLocaleDateString('en-US', { month: 'long' })}`;
    
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(transaction);
    return groups;
  }, {}) || {};

  // Calculate daily totals
  const getDayTotal = (transactions: Transaction[]) => {
    return transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  };

  const filteredGroupedTransactions = Object.entries(groupedTransactions).filter(([date, transactions]) => {
    if (searchQuery) {
      return transactions.some(t => 
        t.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background" data-testid="transactions-screen">
      {/* Header */}
      <div className="bg-background px-4 py-4">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="w-8 h-8 flex items-center justify-center" data-testid="button-back">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-white text-lg font-semibold" data-testid="text-title">Transactions</h1>
          <div className="w-8"></div>
        </div>
        
        {/* Month Filter */}
        <div className="flex gap-4 mb-4 overflow-x-auto">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`${
                selectedMonth === month
                  ? "bg-white bg-opacity-10 text-white px-3 py-1 rounded-full"
                  : "text-gray-400"
              } text-sm whitespace-nowrap`}
              data-testid={`button-month-${month.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {month}
            </button>
          ))}
        </div>
        
        {/* Search Bar */}
        <div className="bg-gray-800 rounded-xl px-4 py-3 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-white placeholder-gray-400 flex-1 outline-none"
            data-testid="input-search"
          />
        </div>
      </div>
      
      {/* Transaction List */}
      <div className="px-4 pt-4">
        {isLoading ? (
          <div className="text-gray-400 text-center py-8">Loading transactions...</div>
        ) : filteredGroupedTransactions.length > 0 ? (
          <div className="space-y-8">
            {filteredGroupedTransactions.map(([date, dayTransactions]) => {
              const total = getDayTotal(dayTransactions);
              
              return (
                <div key={date}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-white text-lg font-medium" data-testid={`text-date-${date.replace(/\s+/g, '-').toLowerCase()}`}>
                      {date}
                    </h2>
                    <span 
                      className={`text-sm ${total > 0 ? 'text-green-400' : total < 0 ? 'text-red-400' : 'text-gray-400'}`}
                      data-testid={`text-daily-total-${date.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      {total > 0 ? '+' : ''}${Math.abs(total).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {dayTransactions.map((transaction) => (
                      <TransactionCard 
                        key={transaction.id} 
                        transaction={transaction}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-400 text-center py-8" data-testid="no-transactions">
            {searchQuery ? "No transactions found" : "No transactions available"}
          </div>
        )}
      </div>
    </div>
  );
}
