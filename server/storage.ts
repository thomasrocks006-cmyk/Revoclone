import { type User, type InsertUser, type Transaction, type InsertTransaction, type Card, type InsertCard, type CryptoAsset, type InsertCryptoAsset } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserTransactions(userId: string): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getUserCards(userId: string): Promise<Card[]>;
  createCard(card: InsertCard): Promise<Card>;
  getCryptoAssets(): Promise<CryptoAsset[]>;
  updateCryptoAsset(asset: CryptoAsset): Promise<CryptoAsset>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private transactions: Map<string, Transaction>;
  private cards: Map<string, Card>;
  private cryptoAssets: Map<string, CryptoAsset>;

  constructor() {
    this.users = new Map();
    this.transactions = new Map();
    this.cards = new Map();
    this.cryptoAssets = new Map();
    this.seedData();
  }

  private seedData() {
    // Create Thomas Francis user
    const thomasId = randomUUID();
    const thomas: User = {
      id: thomasId,
      username: "thomas.francis",
      firstName: "Thomas",
      lastName: "Francis",
      email: "thomas@example.com",
      avatar: "TF",
      balance: "2.19",
      currency: "AUD",
      plan: "Personal",
      createdAt: new Date(),
    };
    this.users.set(thomasId, thomas);

    // Create cards
    const originalCard: Card = {
      id: randomUUID(),
      userId: thomasId,
      type: "original",
      name: "Original",
      lastFour: "1234",
      isActive: true,
      description: "Fully activate card",
      createdAt: new Date(),
    };

    const disposableCard: Card = {
      id: randomUUID(),
      userId: thomasId,
      type: "disposable",
      name: "Disposable",
      lastFour: "5678",
      isActive: true,
      description: "Regenerates details after each use",
      createdAt: new Date(),
    };

    this.cards.set(originalCard.id, originalCard);
    this.cards.set(disposableCard.id, disposableCard);

    // Create transactions based on screenshots
    const transactions: Omit<Transaction, 'id'>[] = [
      {
        userId: thomasId,
        merchant: "GitHub",
        amount: "1.55",
        currency: "AUD",
        category: "Technology",
        status: "reverted",
        description: "04:25 • Reverted",
        date: new Date("2024-08-17T04:25:00"),
        merchantIcon: "github",
        iconColor: "#000000",
      },
      {
        userId: thomasId,
        merchant: "Thomas Francis",
        amount: "-18.00",
        currency: "AUD",
        category: "Transfer",
        status: "completed",
        description: "18:06 • Sent from Revolut",
        date: new Date("2024-08-15T18:06:00"),
        merchantIcon: "TF",
        iconColor: "#FB923C",
      },
      {
        userId: thomasId,
        merchant: "GitHub",
        amount: "15.46",
        currency: "AUD",
        category: "Technology",
        status: "reverted",
        description: "03:39 • Reverted",
        date: new Date("2024-08-15T03:39:00"),
        merchantIcon: "github",
        iconColor: "#000000",
      },
      {
        userId: thomasId,
        merchant: "GitHub",
        amount: "-6.18",
        currency: "AUD",
        originalAmount: "-4.00",
        originalCurrency: "USD",
        category: "Technology",
        status: "completed",
        description: "03:35 • -US$4",
        date: new Date("2024-08-15T03:35:00"),
        merchantIcon: "github",
        iconColor: "#000000",
      },
      {
        userId: thomasId,
        merchant: "GitHub",
        amount: "15.46",
        currency: "AUD",
        category: "Technology",
        status: "completed",
        description: "03:24 • Card verification",
        date: new Date("2024-08-15T03:24:00"),
        merchantIcon: "github",
        iconColor: "#000000",
      },
      {
        userId: thomasId,
        merchant: "Money added via Apple Pay",
        amount: "25.00",
        currency: "AUD",
        category: "Top Up",
        status: "completed",
        description: "03:23",
        date: new Date("2024-08-15T03:23:00"),
        merchantIcon: "apple",
        iconColor: "#000000",
      },
      {
        userId: thomasId,
        merchant: "GitHub",
        amount: "15.46",
        currency: "AUD",
        category: "Technology",
        status: "failed",
        description: "02:04 • Insufficient balance",
        date: new Date("2024-08-15T02:04:00"),
        merchantIcon: "github",
        iconColor: "#000000",
      },
      // July transactions
      {
        userId: thomasId,
        merchant: "Rtf",
        amount: "-23.55",
        currency: "AUD",
        originalAmount: "-13.00",
        originalCurrency: "EUR",
        category: "Shopping",
        status: "completed",
        description: "21:38 • -€13",
        date: new Date("2024-07-27T21:38:00"),
        merchantIcon: "R",
        iconColor: "#EC4899",
      },
      {
        userId: thomasId,
        merchant: "Pains De Provence",
        amount: "-2.18",
        currency: "AUD",
        originalAmount: "-1.20",
        originalCurrency: "EUR",
        category: "Food & Drink",
        status: "completed",
        description: "20:28 • -€1.20",
        date: new Date("2024-07-27T20:28:00"),
        merchantIcon: "P",
        iconColor: "#4ADE80",
      },
      {
        userId: thomasId,
        merchant: "Pains De Provence",
        amount: "-12.14",
        currency: "AUD",
        originalAmount: "-6.70",
        originalCurrency: "EUR",
        category: "Food & Drink",
        status: "completed",
        description: "20:12 • -€6.70",
        date: new Date("2024-07-27T20:12:00"),
        merchantIcon: "P",
        iconColor: "#4ADE80",
      },
      {
        userId: thomasId,
        merchant: "Money added via Apple Pay",
        amount: "50.00",
        currency: "AUD",
        category: "Top Up",
        status: "completed",
        description: "19:48",
        date: new Date("2024-07-27T19:48:00"),
        merchantIcon: "apple",
        iconColor: "#000000",
      },
      {
        userId: thomasId,
        merchant: "Omio",
        amount: "-68.61",
        currency: "AUD",
        category: "Transport",
        status: "completed",
        description: "17:21",
        date: new Date("2024-07-27T17:21:00"),
        merchantIcon: "O",
        iconColor: "#FFFFFF",
      },
      {
        userId: thomasId,
        merchant: "Alimentation General",
        amount: "-3.63",
        currency: "AUD",
        originalAmount: "-2.00",
        originalCurrency: "EUR",
        category: "Food & Drink",
        status: "completed",
        description: "11:35 • -€2",
        date: new Date("2024-07-27T11:35:00"),
        merchantIcon: "A",
        iconColor: "#6B7280",
      },
      {
        userId: thomasId,
        merchant: "McDonald's",
        amount: "-15.98",
        currency: "AUD",
        originalAmount: "-8.90",
        originalCurrency: "EUR",
        category: "Food & Drink",
        status: "completed",
        description: "05:35 • -€8.90",
        date: new Date("2024-07-27T05:35:00"),
        merchantIcon: "M",
        iconColor: "#DA020E",
      },
      {
        userId: thomasId,
        merchant: "Lime",
        amount: "-11.29",
        currency: "AUD",
        originalAmount: "-6.29",
        originalCurrency: "EUR",
        category: "Transport",
        status: "completed",
        description: "05:07 • -€6.29",
        date: new Date("2024-07-27T05:07:00"),
        merchantIcon: "L",
        iconColor: "#65A30D",
      },
      {
        userId: thomasId,
        merchant: "Lime",
        amount: "0.00",
        currency: "AUD",
        category: "Transport",
        status: "completed",
        description: "05:07 • Card verification",
        date: new Date("2024-07-27T05:07:00"),
        merchantIcon: "L",
        iconColor: "#65A30D",
      },
      {
        userId: thomasId,
        merchant: "Jay",
        amount: "-8.97",
        currency: "AUD",
        originalAmount: "-5.00",
        originalCurrency: "EUR",
        category: "Food & Drink",
        status: "completed",
        description: "04:14 • -€5",
        date: new Date("2024-07-27T04:14:00"),
        merchantIcon: "J",
        iconColor: "#FB923C",
      },
      // More July transactions
      {
        userId: thomasId,
        merchant: "Pharmacie du Voyage Roissy 1",
        amount: "-3.63",
        currency: "AUD",
        originalAmount: "-2.00",
        originalCurrency: "EUR",
        category: "Health",
        status: "completed",
        description: "23:38 • -€2",
        date: new Date("2024-07-26T23:38:00"),
        merchantIcon: "P",
        iconColor: "#FFFFFF",
      },
      {
        userId: thomasId,
        merchant: "Marché Franprix",
        amount: "-0.91",
        currency: "AUD",
        originalAmount: "-0.50",
        originalCurrency: "EUR",
        category: "Food & Drink",
        status: "completed",
        description: "17:10 • -€0.50",
        date: new Date("2024-07-26T17:10:00"),
        merchantIcon: "M",
        iconColor: "#FB923C",
      },
      {
        userId: thomasId,
        merchant: "Burger Foods",
        amount: "-10.88",
        currency: "AUD",
        originalAmount: "-6.00",
        originalCurrency: "EUR",
        category: "Food & Drink",
        status: "completed",
        description: "03:39 • -€6",
        date: new Date("2024-07-26T03:39:00"),
        merchantIcon: "B",
        iconColor: "#FB923C",
      },
      {
        userId: thomasId,
        merchant: "yesim",
        amount: "-12.69",
        currency: "AUD",
        originalAmount: "-7.00",
        originalCurrency: "EUR",
        category: "Technology",
        status: "completed",
        description: "00:32 • -€7",
        date: new Date("2024-07-26T00:32:00"),
        merchantIcon: "Y",
        iconColor: "#FFFFFF",
      },
      {
        userId: thomasId,
        merchant: "Olvadis",
        amount: "-1.82",
        currency: "AUD",
        originalAmount: "-1.00",
        originalCurrency: "EUR",
        category: "Shopping",
        status: "completed",
        description: "00:06 • -€1",
        date: new Date("2024-07-26T00:06:00"),
        merchantIcon: "O",
        iconColor: "#EC4899",
      },
      {
        userId: thomasId,
        merchant: "Money added via Apple Pay",
        amount: "25.00",
        currency: "AUD",
        category: "Top Up",
        status: "completed",
        description: "23:07",
        date: new Date("2024-07-25T23:07:00"),
        merchantIcon: "apple",
        iconColor: "#000000",
      },
      {
        userId: thomasId,
        merchant: "Thomas Francis",
        amount: "-5.00",
        currency: "AUD",
        category: "Transfer",
        status: "completed",
        description: "23:07 • Sent from Revolut",
        date: new Date("2024-07-25T23:07:00"),
        merchantIcon: "TF",
        iconColor: "#FB923C",
      },
    ];

    transactions.forEach(transaction => {
      const id = randomUUID();
      this.transactions.set(id, { ...transaction, id });
    });

    // Create crypto assets
    const cryptoAssets: CryptoAsset[] = [
      {
        id: "bitcoin",
        symbol: "BTC",
        name: "Bitcoin",
        price: "178792.00",
        change24h: "0.25",
        chartData: [
          { time: 1, value: 175000 },
          { time: 2, value: 176500 },
          { time: 3, value: 178000 },
          { time: 4, value: 179200 },
          { time: 5, value: 178792 }
        ],
        icon: "₿",
      },
      {
        id: "ethereum",
        symbol: "ETH",
        name: "Ethereum",
        price: "6635.63",
        change24h: "-0.71",
        chartData: [
          { time: 1, value: 6800 },
          { time: 2, value: 6750 },
          { time: 3, value: 6700 },
          { time: 4, value: 6650 },
          { time: 5, value: 6635.63 }
        ],
        icon: "Ξ",
      },
      {
        id: "0x",
        symbol: "XCN",
        name: "0x Protocol",
        price: "0.45",
        change24h: "23.44",
        icon: "0x",
      },
      {
        id: "polygon",
        symbol: "MATIC",
        name: "Polygon",
        price: "1.23",
        change24h: "4.14",
        icon: "⬟",
      },
      {
        id: "polkadot",
        symbol: "POL",
        name: "Polkadot",
        price: "8.92",
        change24h: "4.10",
        icon: "●",
      },
      {
        id: "golem",
        symbol: "GLM",
        name: "Golem",
        price: "0.34",
        change24h: "3.40",
        icon: "G",
      },
      {
        id: "amp",
        symbol: "AMP",
        name: "Amp",
        price: "0.012",
        change24h: "3.19",
        icon: "A",
      },
      {
        id: "qtum",
        symbol: "QI",
        name: "Qtum",
        price: "4.56",
        change24h: "2.64",
        icon: "Q",
      },
      {
        id: "cronos",
        symbol: "CRO",
        name: "Cronos",
        price: "0.18",
        change24h: "2.39",
        icon: "C",
      },
      {
        id: "loot",
        symbol: "AGLD",
        name: "Adventure Gold",
        price: "2.34",
        change24h: "2.36",
        icon: "L",
      },
    ];

    cryptoAssets.forEach(asset => {
      this.cryptoAssets.set(asset.id, asset);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async getUserTransactions(userId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter(transaction => transaction.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = { ...insertTransaction, id, date: new Date() };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getUserCards(userId: string): Promise<Card[]> {
    return Array.from(this.cards.values())
      .filter(card => card.userId === userId);
  }

  async createCard(insertCard: InsertCard): Promise<Card> {
    const id = randomUUID();
    const card: Card = { ...insertCard, id, createdAt: new Date() };
    this.cards.set(id, card);
    return card;
  }

  async getCryptoAssets(): Promise<CryptoAsset[]> {
    return Array.from(this.cryptoAssets.values());
  }

  async updateCryptoAsset(asset: CryptoAsset): Promise<CryptoAsset> {
    this.cryptoAssets.set(asset.id, asset);
    return asset;
  }
}

export const storage = new MemStorage();
