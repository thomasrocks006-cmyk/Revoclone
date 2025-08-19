import { useQuery } from "@tanstack/react-query";
import { Search, BarChart3, Menu, Plus, ArrowUpDown, MoreHorizontal, X } from "lucide-react";
import MerchantIcon from "@/components/MerchantIcon";
import TransactionCard from "@/components/TransactionCard";
import { type User, type Transaction } from "@shared/schema";

export default function Home() {
  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions", user?.id],
    enabled: !!user?.id,
  });

  if (userLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const recentTransactions = transactions?.slice(0, 2) || [];

  return (
    <div className="min-h-screen bg-background" data-testid="home-screen">
      {/* Header with gradient background */}
      <div className="gradient-bg px-4 pt-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <MerchantIcon merchant={user?.firstName || "TF"} className="w-12 h-12" />
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center" data-testid="button-search">
              <Search className="w-5 h-5 text-white" />
            </button>
            <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center" data-testid="button-charts">
              <BarChart3 className="w-5 h-5 text-white" />
            </button>
            <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center" data-testid="button-menu">
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-white text-opacity-80 text-sm mb-2" data-testid="text-account-type">
            {user?.plan} • {user?.currency}
          </p>
          <h1 className="text-white text-4xl font-light mb-4" data-testid="text-balance">
            ${user?.balance}
          </h1>
          <button className="bg-white bg-opacity-20 text-white px-6 py-2 rounded-full text-sm font-medium" data-testid="button-accounts">
            Accounts
          </button>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center gap-2">
            <button className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center" data-testid="button-add-money">
              <Plus className="w-6 h-6 text-white" />
            </button>
            <span className="text-xs text-gray-400">Add money</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center" data-testid="button-payid">
              <span className="text-white font-bold text-xs">iD</span>
            </button>
            <span className="text-xs text-gray-400">PayID</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center" data-testid="button-move">
              <ArrowUpDown className="w-6 h-6 text-white" />
            </button>
            <span className="text-xs text-gray-400">Move</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center" data-testid="button-more">
              <MoreHorizontal className="w-6 h-6 text-white" />
            </button>
            <span className="text-xs text-gray-400">More</span>
          </div>
        </div>
      </div>
      
      {/* Promotional Banner */}
      <div className="mx-4 mb-6 p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-between" data-testid="promotional-banner">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-sm mb-1">Invite friends, earn $100</h3>
          <p className="text-white text-opacity-90 text-xs">Earn $100 for each friend you invite by 19 August. T&Cs apply</p>
        </div>
        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 2a1 1 0 000 2h8a1 1 0 100-2H6zM5 5a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2V5zM14 15a1 1 0 100 2h1a1 1 0 100-2h-1z"/>
          </svg>
        </div>
        <button className="w-6 h-6 text-white text-opacity-60" data-testid="button-close-banner">
          <X className="w-6 h-6" />
        </button>
      </div>
      
      {/* Recent Transactions */}
      <div className="px-4">
        {transactionsLoading ? (
          <div className="text-gray-400 text-center py-8">Loading transactions...</div>
        ) : recentTransactions.length > 0 ? (
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <TransactionCard 
                key={transaction.id} 
                transaction={transaction}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-center py-8" data-testid="no-transactions">
            No recent transactions
          </div>
        )}
      </div>
    </div>
  );
}
