// Mock data for development - matches the screenshot content exactly

export const mockUser = {
  id: "thomas-francis",
  firstName: "Thomas",
  lastName: "Francis",
  avatar: "TF",
  balance: 2.19,
  currency: "AUD",
  plan: "Personal",
};

export const mockCards = [
  {
    id: "original",
    type: "original",
    name: "Original",
    description: "Fully activate card",
    isActive: true,
  },
  {
    id: "disposable", 
    type: "disposable",
    name: "Disposable",
    description: "Regenerates details after each use",
    isActive: true,
  }
];

export const mockCryptoData = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 178792,
    change: 0.25,
    chartData: [175000, 176500, 178000, 179200, 178792],
    icon: "₿",
  },
  {
    symbol: "ETH", 
    name: "Ethereum",
    price: 6635.63,
    change: -0.71,
    chartData: [6800, 6750, 6700, 6650, 6635.63],
    icon: "Ξ",
  }
];

export const mockTopMovers = [
  { symbol: "XCN", name: "0x Protocol", change: 23.44, icon: "0x" },
  { symbol: "MATIC", name: "Polygon", change: 4.14, icon: "⬟" },
  { symbol: "POL", name: "Polkadot", change: 4.10, icon: "●" },
  { symbol: "GLM", name: "Golem", change: 3.40, icon: "G" },
  { symbol: "AMP", name: "Amp", change: 3.19, icon: "A" },
  { symbol: "QI", name: "Qtum", change: 2.64, icon: "Q" },
  { symbol: "CRO", name: "Cronos", change: 2.39, icon: "C" },
  { symbol: "AGLD", name: "Adventure Gold", change: 2.36, icon: "L" },
];

// Chart data for crypto prices
export const generateChartData = (basePrice: number, isPositive: boolean) => {
  const points = [];
  let price = basePrice * (isPositive ? 0.95 : 1.05);
  
  for (let i = 0; i < 20; i++) {
    const variation = (Math.random() - 0.5) * 0.02;
    price = price * (1 + variation);
    points.push({ x: i, y: price });
  }
  
  return points;
};
