import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Search, BarChart3, Menu, Plus, ArrowUpDown, MoreHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white" data-testid="home-screen">
      {/* Header */}
      <div className="px-4 py-4 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">TF</span>
          </div>
          
          <div className="flex-1 mx-4">
            <div className="bg-gray-800 bg-opacity-50 rounded-full px-4 py-2 flex items-center">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <span className="text-gray-400">Search</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="w-10 h-10 bg-gray-800 bg-opacity-50 rounded-full">
              <BarChart3 className="w-5 h-5 text-white" />
            </Button>
            <Button variant="ghost" size="icon" className="w-10 h-10 bg-gray-800 bg-opacity-50 rounded-full">
              <Menu className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
        
        {/* Account Balance */}
        <div className="text-center mb-8">
          <p className="text-white text-opacity-80 text-sm mb-2" data-testid="text-account-type">
            Personal • AUD
          </p>
          <h1 className="text-white text-5xl font-light mb-4" data-testid="text-balance">
            $2.19
          </h1>
          <Button className="bg-white bg-opacity-20 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-opacity-30" data-testid="button-accounts">
            Accounts
          </Button>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center gap-2">
            <Button className="w-12 h-12 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center" data-testid="button-add-money">
              <Plus className="w-6 h-6 text-white" />
            </Button>
            <span className="text-xs text-white text-opacity-80">Add money</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button className="w-12 h-12 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center" data-testid="button-payid">
              <span className="text-white font-bold text-xs">iD</span>
            </Button>
            <span className="text-xs text-white text-opacity-80">PayID</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button className="w-12 h-12 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center" data-testid="button-move">
              <ArrowUpDown className="w-6 h-6 text-white" />
            </Button>
            <span className="text-xs text-white text-opacity-80">Move</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button className="w-12 h-12 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center" data-testid="button-more">
              <MoreHorizontal className="w-6 h-6 text-white" />
            </Button>
            <span className="text-xs text-white text-opacity-80">More</span>
          </div>
        </div>
      </div>
      
      {/* Invite Friends Banner */}
      <div className="mx-4 mb-6">
        <div className="bg-black bg-opacity-30 rounded-xl p-4 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-white font-medium mb-1">Invite friends, earn $100</h3>
            <p className="text-white text-opacity-70 text-sm">Earn $100 for each friend you invite by 19 August. T&Cs apply</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-4xl">🎁</div>
            <Button variant="ghost" size="icon">
              <X className="w-5 h-5 text-white text-opacity-70" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="mx-4 mb-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <div className="text-white text-lg">⚫</div>
              </div>
              <div>
                <div className="text-white font-medium">GitHub</div>
                <div className="text-gray-400 text-sm">17 Aug, 04:25 · Reverted</div>
              </div>
            </div>
            <div className="text-white">$1.55</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">TF</span>
              </div>
              <div>
                <div className="text-white font-medium">Thomas Francis</div>
                <div className="text-gray-400 text-sm">15 Aug, 18:06</div>
                <div className="text-gray-400 text-sm">Sent from Revolut</div>
              </div>
            </div>
            <div className="text-white">-$18</div>
          </div>
        </div>
        
        <Link href="/payments">
          <Button className="w-full mt-4 bg-transparent text-white hover:bg-white hover:bg-opacity-10 text-center py-3">
            See all
          </Button>
        </Link>
      </div>
      
      {/* Cards Section */}
      <div className="mx-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium">Cards</h3>
          <svg className="w-5 h-5 text-white text-opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        
        <div className="flex gap-3">
          <Link href="/cards/original" className="flex-1">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-3 h-20 relative">
              <div className="text-white text-xs mb-1">R</div>
              <div className="absolute bottom-2 left-3 text-white text-xs">••4103</div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">!</span>
              </div>
            </div>
            <div className="text-center mt-2">
              <div className="text-white text-sm">Original</div>
              <div className="text-gray-400 text-xs">••4103</div>
            </div>
          </Link>
          
          <div className="flex-1">
            <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-lg p-3 h-20 relative">
              <div className="text-white text-xs mb-1">R</div>
            </div>
            <div className="text-center mt-2">
              <div className="text-white text-sm">Disposable</div>
              <div className="text-gray-400 text-xs">Generate</div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-gray-700 rounded-lg p-3 h-20 flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div className="text-center mt-2">
              <div className="text-white text-sm">Get card</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Total Wealth */}
      <div className="mx-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium">Total wealth</h3>
          <svg className="w-5 h-5 text-white text-opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <div className="text-white text-2xl font-light mb-4">$4.28</div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">$</span>
              </div>
              <span className="text-white">Cash</span>
            </div>
            <span className="text-white">$2.19</span>
          </div>
          
          <Link href="/crypto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">₿</span>
                </div>
                <span className="text-white">Crypto</span>
              </div>
              <span className="text-white">$2.09</span>
            </div>
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">$</span>
              </div>
              <div>
                <div className="text-white">Loan</div>
                <div className="text-gray-400 text-sm">Get a low-rate loan up to $50,000</div>
              </div>
            </div>
            <svg className="w-5 h-5 text-white text-opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          
          <Link href="/invest">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white">Invest</div>
                  <div className="text-gray-400 text-sm">Invest for as little as $1</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-white text-opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Spent This Month */}
      <div className="mx-4 mb-6">
        <div className="bg-black bg-opacity-30 rounded-xl p-4">
          <h3 className="text-white font-medium mb-1">Spent this month</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-white text-2xl font-light">$24</span>
            <span className="text-green-400 text-sm">▼ $1,051</span>
            <span className="text-gray-400 text-sm ml-auto">$144</span>
          </div>
          
          {/* Mini Chart */}
          <div className="h-16 relative">
            <svg className="w-full h-full" viewBox="0 0 300 60" preserveAspectRatio="none">
              <path
                d="M0,50 L50,50 L100,50 L120,45 L140,40 L160,35 L180,30 L200,35 L220,40 L240,45 L260,50 L300,45"
                stroke="#22c55e"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M0,50 L50,50 L100,50 L120,45 L140,40 L160,35 L180,30 L200,35 L220,40 L240,45 L260,50 L300,45 L300,60 L0,60 Z"
                fill="url(#gradient)"
                fillOpacity="0.2"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Chart labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400">
              <span>1</span>
              <span>6</span>
              <span>11</span>
              <span>16</span>
              <span>21</span>
              <span>26</span>
              <span>31</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Watchlist */}
      <div className="mx-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium">Watchlist</h3>
          <svg className="w-5 h-5 text-white text-opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">Au</span>
              </div>
              <div>
                <div className="text-white">Gold</div>
                <div className="text-gray-400 text-sm">XAU to AUD</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white">$5,137.5257</div>
              <div className="text-red-400 text-sm">▼ 0.04%</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🇪🇺</span>
              </div>
              <div>
                <div className="text-white">Euro</div>
                <div className="text-gray-400 text-sm">EUR to AUD</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white">$1.7961</div>
              <div className="text-red-400 text-sm">▼ 0.12%</div>
            </div>
          </div>
        </div>
        
        <Button className="w-full mt-4 bg-transparent text-white hover:bg-white hover:bg-opacity-10 text-center py-3">
          See all
        </Button>
      </div>
      
      {/* Add Widgets */}
      <div className="mx-4 mb-24">
        <Button className="w-full bg-gray-800 bg-opacity-50 text-white rounded-full py-3 flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Add widgets
        </Button>
      </div>
    </div>
  );
}