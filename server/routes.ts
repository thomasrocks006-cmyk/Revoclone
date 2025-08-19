import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get user profile
  app.get("/api/user/:id", async (req, res) => {
    const { id } = req.params;
    const user = await storage.getUser(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  });

  // Get Thomas Francis user (default user)
  app.get("/api/user", async (req, res) => {
    const user = await storage.getUserByUsername("thomas.francis");
    if (!user) {
      return res.status(404).json({ message: "Default user not found" });
    }
    res.json(user);
  });

  // Get user transactions
  app.get("/api/transactions/:userId", async (req, res) => {
    const { userId } = req.params;
    const transactions = await storage.getUserTransactions(userId);
    res.json(transactions);
  });

  // Get user cards
  app.get("/api/cards/:userId", async (req, res) => {
    const { userId } = req.params;
    const cards = await storage.getUserCards(userId);
    res.json(cards);
  });

  // Get crypto assets
  app.get("/api/crypto", async (req, res) => {
    const assets = await storage.getCryptoAssets();
    res.json(assets);
  });

  const httpServer = createServer(app);
  return httpServer;
}
