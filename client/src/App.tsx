import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Transactions from "@/pages/Transactions";
import Cards from "@/pages/Cards";
import Crypto from "@/pages/Crypto";
import Invest from "@/pages/Invest";
import Lifestyle from "@/pages/Lifestyle";
import CryptoDetail from "@/pages/CryptoDetail";
import CardDetail from "@/pages/CardDetail";
import StatusBar from "@/components/StatusBar";
import BottomNavigation from "@/components/BottomNavigation";

function Router() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <StatusBar />
      <div className="flex-1 pb-14">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/transactions" component={Transactions} />
          <Route path="/cards" component={Cards} />
          <Route path="/cards/:cardId" component={CardDetail} />
          <Route path="/crypto" component={Crypto} />
          <Route path="/crypto/:symbol" component={CryptoDetail} />
          <Route path="/invest" component={Invest} />
          <Route path="/lifestyle" component={Lifestyle} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <BottomNavigation />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
