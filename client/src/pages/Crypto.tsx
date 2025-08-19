import { useQuery } from "@tanstack/react-query";
import { Search, BarChart3, Menu } from "lucide-react";
import MerchantIcon from "@/components/MerchantIcon";
import { type User, type CryptoAsset } from "@shared/schema";

export default function Crypto() {
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const { data: cryptoAssets, isLoading } = useQuery<CryptoAsset[]>({
    queryKey: ["/api/crypto"],
  });

  const generateMiniChart = (isPositive: boolean) => {
    const points = [];
    let value = 50;
    for (let i = 0; i < 20; i++) {
      value += (Math.random() - 0.5) * 10 + (isPositive ? 0.5 : -0.5);
      points.push(`${i * 5},${100 - value}`);
    }
    return points.join(' ');
  };

  const btc = cryptoAssets?.find(asset => asset.symbol === "BTC");
  const eth = cryptoAssets?.find(asset => asset.symbol === "ETH");
  const topMovers = cryptoAssets?.filter(asset => !["BTC", "ETH"].includes(asset.symbol)).slice(0, 8) || [];

  return (
    <div className="min-h-screen bg-background" data-testid="crypto-screen">
      {/* Header */}
      <div className="bg-background px-4 pt-4 pb-6">
        <div className="flex items-center justify-between mb-6">
          <MerchantIcon merchant={user?.firstName || "TF"} className="w-12 h-12" />
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center" data-testid="button-search">
              <Search className="w-5 h-5 text-white" />
            </button>
            <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center" data-testid="button-charts">
              <BarChart3 className="w-5 h-5 text-white" />
            </button>
            <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center" data-testid="button-menu">
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Crypto Cards */}
      <div className="px-4 grid grid-cols-2 gap-4 mb-6">
        {/* BTC Card */}
        {btc && (
          <div className="crypto-card" data-testid="card-btc">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">₿</span>
              </div>
              <span className="text-gray-400 text-sm">BTC</span>
            </div>
            <div className="mb-3">
              <p className="text-white text-xl font-semibold" data-testid="text-btc-price">
                ${parseFloat(btc.price).toLocaleString()}
              </p>
              <p className="text-green-400 text-sm" data-testid="text-btc-change">
                ▲ {btc.change24h}%
              </p>
            </div>
            <div className="h-12">
              <svg width="100%" height="100%" className="overflow-visible">
                <polyline
                  points={generateMiniChart(true)}
                  className="chart-positive"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        )}

        {/* ETH Card */}
        {eth && (
          <div className="crypto-card" data-testid="card-eth">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">Ξ</span>
              </div>
              <span className="text-gray-400 text-sm">ETH</span>
            </div>
            <div className="mb-3">
              <p className="text-white text-xl font-semibold" data-testid="text-eth-price">
                ${parseFloat(eth.price).toLocaleString()}
              </p>
              <p className="text-red-400 text-sm" data-testid="text-eth-change">
                ▼ {Math.abs(parseFloat(eth.change24h))}%
              </p>
            </div>
            <div className="h-12">
              <svg width="100%" height="100%" className="overflow-visible">
                <polyline
                  points={generateMiniChart(false)}
                  className="chart-negative"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Top Movers Section */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg font-medium" data-testid="text-top-movers">Top movers</h2>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          <button className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium" data-testid="button-top-gainers">
            Top gainers
          </button>
          <button className="text-gray-400 px-4 py-2 text-sm font-medium" data-testid="button-top-losers">
            Top losers
          </button>
        </div>

        {/* Top Movers Grid */}
        {isLoading ? (
          <div className="text-gray-400 text-center py-8">Loading crypto data...</div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {topMovers.map((asset) => {
              const changeValue = parseFloat(asset.change24h);
              const isPositive = changeValue > 0;
              
              return (
                <div 
                  key={asset.id} 
                  className="bg-card rounded-xl p-3 text-center"
                  data-testid={`card-crypto-${asset.symbol.toLowerCase()}`}
                >
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-xs font-bold">
                      {asset.icon || asset.symbol.charAt(0)}
                    </span>
                  </div>
                  <p className="text-white text-xs font-medium mb-1" data-testid={`text-symbol-${asset.symbol.toLowerCase()}`}>
                    {asset.symbol}
                  </p>
                  <p className={`text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`} data-testid={`text-change-${asset.symbol.toLowerCase()}`}>
                    ▲ {Math.abs(changeValue).toFixed(2)}%
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="px-4 mt-8">
        <h3 className="text-gray-400 text-sm font-medium mb-4" data-testid="text-features">Features</h3>
        
        <div className="bg-card rounded-xl p-4 flex items-center justify-between" data-testid="card-strategies">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium" data-testid="text-strategies">Strategies</p>
              <p className="text-gray-400 text-sm">Levelled-up trading</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
