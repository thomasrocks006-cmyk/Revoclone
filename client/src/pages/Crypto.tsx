import { Search, TrendingUp, ArrowLeft, ArrowRight, MoreHorizontal, ChevronRight, Home, BarChart3, ArrowUpDown, Bitcoin, Grid3X3, Lightbulb, Plus } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

export default function Crypto() {
  const [activeFilter, setActiveFilter] = useState<'gainers' | 'losers'>('gainers');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Generate exact chart pattern for main ETH chart
  const ethChartData = useMemo(() => {
    const points = [
      [0, 85], [8, 75], [15, 65], [22, 35], [28, 25], [35, 45], 
      [42, 75], [48, 85], [55, 60], [62, 45], [68, 55], [72, 40], 
      [78, 50], [82, 35], [86, 55], [90, 70], [95, 80], [100, 90]
    ];
    return points.map(([x, y]) => `${x},${y}`).join(' ');
  }, []);

  // Generate mini chart for BTC/ETH cards
  const generateMiniChart = (symbol: string) => {
    const points = [
      [0, 30], [15, 35], [25, 45], [35, 40], [45, 55], 
      [55, 65], [65, 60], [75, 70], [85, 75], [100, 80]
    ];
    return points.map(([x, y]) => `${x},${y}`).join(' ');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-600 via-purple-700 via-blue-700 to-blue-800 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* ETH DETAIL SECTION - Purple Gradient Background */}
      <div className="bg-gradient-to-b from-purple-600 via-purple-700 via-blue-700 to-blue-800 text-white pb-8">
        {/* Top Icons and Search */}
        <div className="px-4 py-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center relative">
            <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-gray-700 rounded-full bg-white"></div>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
          
          <div className="flex-1 bg-white bg-opacity-25 backdrop-blur-sm rounded-full px-4 py-3 flex items-center gap-3">
            <Search className="w-5 h-5 text-white opacity-80" />
            <span className="text-white opacity-80">Search</span>
          </div>
          
          <div className="w-12 h-12 bg-white bg-opacity-25 backdrop-blur-sm rounded-full flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div className="w-12 h-12 bg-white bg-opacity-25 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Grid3X3 className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Main Price Display - Centered between search bar and Trade/Receive buttons */}
        <div className="flex flex-col items-center justify-center py-4 px-4">
          <div className="text-5xl font-extralight mb-2 tracking-tight">$2.03</div>
          <div className="text-green-400 text-base font-medium flex items-center justify-center gap-2">
            <span>+$1.13</span>
            <span>▲ 126%</span>
          </div>
        </div>

        {/* Chart */}
        <div className="px-4 h-56 mb-8">
          <svg width="100%" height="100%" className="overflow-visible">
            <polyline
              points={ethChartData}
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'
              }}
            />
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="px-8 mb-8">
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-black bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 mx-auto">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-white">Trade</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 mx-auto">
                <ArrowLeft className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-white">Receive</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 mx-auto">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-white">Send</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 mx-auto">
                <MoreHorizontal className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-white">More</span>
            </div>
          </div>
        </div>

        {/* Portfolio Card */}
        <div className="px-4 mb-6">
          <div className="bg-black bg-opacity-25 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Ξ</span>
                </div>
                <div>
                  <div className="text-white text-lg font-medium">Ether</div>
                  <div className="text-gray-300 text-sm">0.00031 ETH • $6,423.02</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white text-lg font-medium">$2.03</div>
                <div className="text-green-400 text-sm">▲ 125%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions in Purple Section */}
        <div className="px-4">
          <div className="bg-black bg-opacity-25 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300 text-base">Transactions</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            
            {/* Transaction 1 */}
            <div className="flex items-center justify-between py-3 border-b border-gray-600 border-opacity-20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">Ξ</span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full overflow-hidden border border-white">
                    <div className="w-full h-full bg-blue-600 flex items-center justify-center text-xs">🇦🇺</div>
                  </div>
                </div>
                <div>
                  <div className="text-white font-medium text-base">ETH → AUD</div>
                  <div className="text-gray-400 text-sm">4 November 2023, 15:17</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium text-base">-0.17 ETH</div>
                <div className="text-gray-400 text-sm">+$473</div>
              </div>
            </div>

            {/* Transaction 2 */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-blue-500">
                    <div className="w-full h-full bg-blue-600 flex items-center justify-center text-sm">🇦🇺</div>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border border-white">
                    <span className="text-white font-bold text-xs">Ξ</span>
                  </div>
                </div>
                <div>
                  <div className="text-white font-medium text-base">AUD → ETH</div>
                  <div className="text-gray-400 text-sm">4 November 2023, 14:35</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium text-base">+0.17 ETH</div>
                <div className="text-gray-400 text-sm">-$500</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DASHBOARD SECTION - Dark Background */}
      <div className="bg-gray-900 text-white">
        {/* Header with Search - Dark Theme */}
        <div className="px-4 py-4 flex items-center gap-3 border-b border-gray-800">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            Tf
          </div>
          
          <div className="flex-1 bg-gray-700 rounded-full px-4 py-3 flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400">Search</span>
          </div>
          
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
            <Grid3X3 className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Transactions Section - Dark */}
        <div className="px-4 py-6">
          <div className="bg-gray-800 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Transactions</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            
            {/* Transaction 1 */}
            <div className="flex items-center justify-between py-3 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">Ξ</span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-blue-600 flex items-center justify-center text-xs">🇦🇺</div>
                  </div>
                </div>
                <div>
                  <div className="text-white font-medium">ETH → AUD</div>
                  <div className="text-gray-400 text-sm">4 November 2023, 15:17</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">-0.17 ETH</div>
                <div className="text-gray-400 text-sm">+$473</div>
              </div>
            </div>

            {/* Transaction 2 */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-blue-600 flex items-center justify-center text-sm">🇦🇺</div>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">Ξ</span>
                  </div>
                </div>
                <div>
                  <div className="text-white font-medium">AUD → ETH</div>
                  <div className="text-gray-400 text-sm">4 November 2023, 14:35</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">+0.17 ETH</div>
                <div className="text-gray-400 text-sm">-$500</div>
              </div>
            </div>
          </div>

          {/* Price Cards Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* BTC Card */}
            <div className="bg-gray-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <Bitcoin className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-400 text-sm">BTC</span>
              </div>
              <div className="mb-3">
                <div className="text-white text-xl font-semibold">$175,546</div>
                <div className="text-red-400 text-sm">▼ 0.35%</div>
              </div>
              <div className="h-10">
                <svg width="100%" height="100%" className="overflow-visible">
                  <polyline
                    points={generateMiniChart('BTC')}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="#6b7280" strokeWidth="1" opacity="0.3" strokeDasharray="2,2" />
                </svg>
              </div>
            </div>

            {/* ETH Card */}
            <div className="bg-gray-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Ξ</span>
                </div>
                <span className="text-gray-400 text-sm">ETH</span>
              </div>
              <div className="mb-3">
                <div className="text-white text-xl font-semibold">$6,421.29</div>
                <div className="text-red-400 text-sm">▼ 0.96%</div>
              </div>
              <div className="h-10">
                <svg width="100%" height="100%" className="overflow-visible">
                  <polyline
                    points={generateMiniChart('ETH')}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="#6b7280" strokeWidth="1" opacity="0.3" strokeDasharray="2,2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Top Movers Section */}
          <div className="bg-gray-800 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Top movers</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-6">
              <button 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === 'gainers'
                    ? 'bg-gray-600 text-white'
                    : 'text-gray-400'
                }`}
                onClick={() => setActiveFilter('gainers')}
              >
                Top gainers
              </button>
              <button 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === 'losers'
                    ? 'bg-gray-600 text-white'
                    : 'text-gray-400'
                }`}
                onClick={() => setActiveFilter('losers')}
              >
                Top losers
              </button>
            </div>

            {/* Top Movers Grid */}
            <div className="grid grid-cols-4 gap-4">
              {/* Row 1 */}
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm">O</span>
                </div>
                <div className="text-white text-xs font-medium mb-1">OGN</div>
                <div className="text-green-400 text-xs">▲ 15.16%</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm">IO</span>
                </div>
                <div className="text-white text-xs font-medium mb-1">IO</div>
                <div className="text-green-400 text-xs">▲ 3.28%</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-black font-bold text-sm">♦</span>
                </div>
                <div className="text-white text-xs font-medium mb-1">RARE</div>
                <div className="text-green-400 text-xs">▲ 2.55%</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-red-500 font-bold text-sm">UMA</span>
                </div>
                <div className="text-white text-xs font-medium mb-1">UMA</div>
                <div className="text-green-400 text-xs">▲ 3.01%</div>
              </div>

              {/* Row 2 */}
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <div className="text-white text-xs font-medium mb-1">DROP</div>
                <div className="text-green-400 text-xs">▲ 1.84%</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-black font-bold text-sm">G</span>
                </div>
                <div className="text-white text-xs font-medium mb-1">GRAPH</div>
                <div className="text-green-400 text-xs">▲ 2.12%</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-black font-bold text-sm">B</span>
                </div>
                <div className="text-white text-xs font-medium mb-1">BNB</div>
                <div className="text-green-400 text-xs">▲ 1.92%</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-red-500 font-bold text-sm">T</span>
                </div>
                <div className="text-white text-xs font-medium mb-1">TRON</div>
                <div className="text-green-400 text-xs">▲ 0.95%</div>
              </div>
            </div>
          </div>

          {/* Strategies Section */}
          <div className="bg-gray-800 rounded-2xl p-4 flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-white font-medium text-lg">Strategies</div>
              <div className="text-gray-400 text-sm">Levelled-up trading</div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          {/* Learn Section */}
          <div className="bg-gray-800 rounded-2xl p-4 flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-white font-medium text-lg">Learn</div>
              <div className="text-gray-400 text-sm">Get $3 in crypto</div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          {/* All Crypto Section */}
          <div className="bg-gray-800 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">All crypto</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            
            {/* Crypto List */}
            <div className="space-y-4">
              {/* Bitcoin */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <Bitcoin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Bitcoin</div>
                    <div className="text-gray-400 text-sm">BTC</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">$175,524</div>
                  <div className="text-red-400 text-sm">▼ 0.43%</div>
                </div>
              </div>

              {/* Ether */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">Ξ</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Ether</div>
                    <div className="text-gray-400 text-sm">ETH</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">$6,418.38</div>
                  <div className="text-red-400 text-sm">▼ 1.32%</div>
                </div>
              </div>

              {/* XRP */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">×</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">XRP</div>
                    <div className="text-gray-400 text-sm">XRP</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">$4.48</div>
                  <div className="text-red-400 text-sm">▼ 1.79%</div>
                </div>
              </div>

              {/* BNB */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">BNB</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">BNB</div>
                    <div className="text-gray-400 text-sm">BNB</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">$1,292.82</div>
                  <div className="text-green-400 text-sm">▲ 0.43%</div>
                </div>
              </div>

              {/* Solana */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Solana</div>
                    <div className="text-gray-400 text-sm">SOL</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">$276.98</div>
                  <div className="text-red-400 text-sm">▼ 0.05%</div>
                </div>
              </div>
            </div>

            {/* See All Button */}
            <div className="text-center mt-6">
              <button className="text-gray-400 text-sm">See all</button>
            </div>
          </div>

          {/* Add Widgets Button */}
          <button className="w-full bg-gray-700 rounded-full py-3 flex items-center justify-center gap-2 mb-6">
            <Plus className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400">Add widgets</span>
          </button>

          {/* Footer */}
          <div className="text-center mb-20">
            <span className="text-gray-500 text-xs">Service provided by Revolut Ltd. View </span>
            <span className="text-blue-400 text-xs">Crypto Disclosures.</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
        <div className="px-4 py-2">
          <div className="grid grid-cols-5 gap-4 text-center">
            <div className="py-2">
              <div className="w-6 h-6 mx-auto mb-1 bg-white rounded text-black flex items-center justify-center">
                <span className="text-xs font-bold">R</span>
              </div>
              <span className="text-xs text-gray-400">Home</span>
            </div>
            <div className="py-2">
              <BarChart3 className="w-6 h-6 mx-auto mb-1 text-gray-400" />
              <span className="text-xs text-gray-400">Invest</span>
            </div>
            <div className="py-2">
              <ArrowUpDown className="w-6 h-6 mx-auto mb-1 text-gray-400" />
              <span className="text-xs text-gray-400">Payments</span>
            </div>
            <div className="py-2">
              <Bitcoin className="w-6 h-6 mx-auto mb-1 text-white" />
              <span className="text-xs text-white">Crypto</span>
            </div>
            <div className="py-2">
              <Grid3X3 className="w-6 h-6 mx-auto mb-1 text-gray-400" />
              <span className="text-xs text-gray-400">Lifestyle</span>
            </div>
          </div>
        </div>
        
        {/* Home indicator */}
        <div className="flex justify-center pb-1">
          <div className="w-32 h-1 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
