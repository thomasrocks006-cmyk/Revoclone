import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type User, type Transaction } from "@shared/schema";

export default function Transactions() {
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions", user?.id],
    enabled: !!user?.id,
  });

  const groupTransactionsByDate = (transactions: Transaction[]) => {
    const groups: { [key: string]: Transaction[] } = {};
    
    transactions?.forEach(transaction => {
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

  const groupedTransactions = groupTransactionsByDate(transactions || []);

  return (
    <div className="min-h-screen bg-black text-white" data-testid="transactions-screen">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-white text-sm font-medium">
        <span>12:05 🌙</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
            <div className="w-1 h-3 bg-white/30 rounded-full"></div>
          </div>
          <span className="ml-1">📶</span>
          <span>87</span>
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
          <h1 className="text-white text-xl font-medium">Transactions</h1>
        </div>

        {/* Search Bar */}
        <div className="bg-gray-800 rounded-full px-4 py-3 flex items-center mb-6">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <span className="text-gray-400">Search</span>
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
              
              return (
                <div key={date} className="space-y-3">
                  {/* Date Header with Daily Total */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium">{date}</h3>
                    <div className="text-gray-400 text-sm">
                      {dailyTotal >= 0 ? `+$${dailyTotal.toFixed(2)}` : `$${dailyTotal.toFixed(2)}`}
                    </div>
                  </div>
                  
                  {/* Day's Transactions */}
                  <div className="space-y-3">
                    {dayTransactions.map((transaction) => {
                      const amount = parseFloat(transaction.amount);
                      const isPositive = amount >= 0;
                      
                      return (
                        <div key={transaction.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                              {transaction.merchant === "GitHub" && (
                                <div className="text-white text-lg">⚫</div>
                              )}
                              {transaction.merchant === "Thomas Francis" && (
                                <span className="text-white font-bold text-sm">TF</span>
                              )}
                              {!["GitHub", "Thomas Francis"].includes(transaction.merchant) && (
                                <div className="text-white text-lg">💳</div>
                              )}
                            </div>
                            <div>
                              <div className="text-white font-medium">{transaction.merchant}</div>
                              <div className="text-gray-400 text-sm">
                                {new Date(transaction.date).toLocaleDateString('en-AU', { 
                                  day: 'numeric', 
                                  month: 'short' 
                                })}, {new Date(transaction.date).toLocaleTimeString('en-AU', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                                {transaction.status === "reverted" && " · Reverted"}
                              </div>
                              {transaction.description && (
                                <div className="text-gray-400 text-sm">{transaction.description}</div>
                              )}
                            </div>
                          </div>
                          <div className={`text-${isPositive ? 'green' : 'white'}-400`}>
                            {isPositive ? `+$${amount.toFixed(2)}` : `-$${Math.abs(amount).toFixed(2)}`}
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
        <div className="w-32 h-1 bg-white rounded-full"></div>
      </div>
    </div>
  );
}