import { useState } from 'react';
import { useLocation, useParams, Link } from 'wouter';
import { ArrowLeft, Bell, Star, MoreHorizontal, TrendingUp, Info, Globe, FileText, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CryptoDetail = () => {
  const [location] = useLocation();
  const { symbol } = useParams();
  const [selectedPeriod, setSelectedPeriod] = useState('1D');
  
  // Mock data based on screenshots
  const cryptoData = {
    ETH: {
      name: 'Ether',
      symbol: 'ETH',
      price: 6613.03,
      change: -69.81,
      changePercent: -1.04,
      icon: '💎',
      chart: {
        high: 6755.35,
        low: 6606.74,
        current: 6682.85
      },
      stats: {
        marketCap: 'US$522.38B',
        marketCapRank: '#2',
        circulatingSupply: '120.7M',
        maxSupply: 'Not Available',
        tradingVolume24h: 'US$40.62B'
      },
      investment: {
        totalValue: 2.09,
        holdings: '0.00031 ETH',
        gainPercent: 132
      },
      collections: [
        {
          name: 'Layer 1',
          change: -0.85,
          icon: '⬡'
        }
      ],
      transactions: [
        {
          type: 'ETH → AUD',
          amount: '-0.17 ETH',
          value: '+$473',
          date: '4 November 2023, 15:17',
          flag: '🇦🇺'
        },
        {
          type: 'AUD → ETH',
          amount: '+0.17 ETH',
          value: '+$500',
          date: '4 November 2023, 14:35',
          flag: '🇦🇺'
        }
      ],
      about: "Ether is a token used on the Ethereum network. Ethereum is a global, open-source platform for decentralised applications and permissionless peer to peer payments. Ethereum supports smart contracts in which developers can write code in order to program digital value."
    }
  };

  const periods = ['1D', '1W', '1M', '6M', '1Y', '5Y', 'All'];
  const crypto = cryptoData[symbol as keyof typeof cryptoData];

  if (!crypto) {
    return <div>Crypto not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-white text-sm font-medium">
        <span>12:10 🌙</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
            <div className="w-1 h-3 bg-white/30 rounded-full"></div>
          </div>
          <span className="ml-1">📶</span>
          <span>85</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4">
        <Link href="/crypto">
          <Button variant="ghost" size="icon" className="text-white">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div className="text-center">
          <div className="text-sm text-gray-400">{symbol}</div>
          <div className="text-sm text-gray-400">${crypto.price.toLocaleString()}</div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-white">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Star className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Price and Change */}
      <div className="px-6 mb-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="text-white text-lg">◊</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">{crypto.name} · {crypto.symbol}</div>
            <div className="text-3xl font-light">${crypto.price.toLocaleString()}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-red-400">${crypto.change}</span>
          <span className="text-red-400">▼ {Math.abs(crypto.changePercent)}%</span>
          <span className="text-gray-400">· Today</span>
        </div>
      </div>

      {/* Chart */}
      <div className="px-6 mb-6">
        <div className="relative h-40 bg-black rounded-lg overflow-hidden">
          {/* Price indicators */}
          <div className="absolute top-2 right-4 text-xs text-gray-400">
            {crypto.chart.high}
          </div>
          <div className="absolute bottom-2 right-4 text-xs text-gray-400">
            {crypto.chart.low}
          </div>
          <div className="absolute bottom-6 left-4 text-xs text-gray-400">
            {crypto.chart.current}
          </div>
          
          {/* Mock chart line */}
          <svg className="w-full h-full" viewBox="0 0 300 160" preserveAspectRatio="none">
            <path
              d="M20,140 L40,120 L60,80 L80,100 L100,60 L120,40 L140,90 L160,70 L180,130 L200,110 L220,150 L240,140 L260,120 L280,130"
              stroke="#ef4444"
              strokeWidth="2"
              fill="none"
              className="drop-shadow-lg"
            />
            <circle cx="280" cy="130" r="3" fill="#ef4444" />
          </svg>
          
          {/* Expand button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute bottom-4 right-4 text-gray-400 bg-gray-800/50 rounded-full w-8 h-8"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Period selector */}
        <div className="flex items-center gap-2 mt-4">
          {periods.map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "ghost"}
              size="sm"
              className={`text-xs px-3 py-1 rounded-full ${
                selectedPeriod === period 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-transparent text-gray-400'
              }`}
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </Button>
          ))}
          <Button variant="ghost" size="icon" className="ml-auto text-gray-400">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-xs text-gray-400 mt-2">
          This is the midpoint between buy and sell rates. Actual rate varies based on whether you buy or sell. Pricing data is provided by Revolut.
        </div>
      </div>

      {/* Investment Section */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Investment</h3>
        <div className="bg-gray-900 rounded-xl p-4">
          <div className="text-2xl font-light mb-1">${crypto.investment.totalValue}</div>
          <div className="text-sm text-gray-400 mb-4">Total value</div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="text-white text-sm">◊</div>
              </div>
              <div>
                <div className="text-sm">Holding</div>
                <div className="text-xs text-gray-400">{crypto.investment.holdings}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm">${crypto.investment.totalValue}</div>
              <div className="text-xs text-green-400">▲ {crypto.investment.gainPercent}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-medium">Stats</h3>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Market cap</span>
            <span>{crypto.stats.marketCap}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Market cap rank</span>
            <span>{crypto.stats.marketCapRank}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Circulating supply</span>
            <span>{crypto.stats.circulatingSupply}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Max supply</span>
            <span>{crypto.stats.maxSupply}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">24h trading volume</span>
            <span>{crypto.stats.tradingVolume24h}</span>
          </div>
        </div>
      </div>

      {/* Featured Collections */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Featured in collections</h3>
        <div className="grid grid-cols-2 gap-3">
          {crypto.collections.map((collection, index) => (
            <div key={index} className="bg-gray-900 rounded-xl p-4">
              <div className="text-2xl mb-2">{collection.icon}</div>
              <div className="text-sm">{collection.name}</div>
              <div className="text-xs text-red-400">▼ {Math.abs(collection.change)}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Transactions</h3>
        <div className="space-y-3">
          {crypto.transactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center relative">
                  <div className="text-white text-sm">◊</div>
                  <div className="absolute -bottom-1 -right-1 text-lg">{transaction.flag}</div>
                </div>
                <div>
                  <div className="text-sm">{transaction.type}</div>
                  <div className="text-xs text-gray-400">{transaction.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm">{transaction.amount}</div>
                <div className="text-xs text-gray-400">{transaction.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-medium mb-4">About {crypto.name}</h3>
        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          {crypto.about}
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-blue-400">
            <Globe className="h-5 w-5" />
            <span className="text-sm">Official website</span>
          </div>
          <div className="flex items-center gap-3 text-blue-400">
            <FileText className="h-5 w-5" />
            <span className="text-sm">Whitepaper</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-black">
        <div className="flex gap-3">
          <Button className="flex-1 bg-white text-black hover:bg-gray-200 rounded-full py-3">
            Buy
          </Button>
          <Button variant="secondary" className="flex-1 bg-gray-700 text-white hover:bg-gray-600 rounded-full py-3">
            Sell
          </Button>
          <Button variant="ghost" size="icon" className="bg-gray-700 rounded-full w-12 h-12">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Home indicator */}
        <div className="flex justify-center mt-4">
          <div className="w-32 h-1 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetail;