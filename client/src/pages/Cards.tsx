import { useQuery } from "@tanstack/react-query";
import { X, MapPin } from "lucide-react";
import { Link } from "wouter";
import { type User, type Card } from "@shared/schema";

export default function Cards() {
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const { data: cards, isLoading } = useQuery<Card[]>({
    queryKey: ["/api/cards", user?.id],
    enabled: !!user?.id,
  });

  return (
    <div className="min-h-screen gradient-bg" data-testid="cards-screen">
      {/* Header */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="w-8 h-8 flex items-center justify-center" data-testid="button-close">
            <X className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-white text-2xl font-light" data-testid="text-title">Cards</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Cards List */}
      <div className="px-4 space-y-4">
        {isLoading ? (
          <div className="text-white text-center py-8">Loading cards...</div>
        ) : cards && cards.length > 0 ? (
          cards.map((card) => {
            const getCardIcon = (type: string) => {
              if (type === "disposable") {
                return (
                  <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                    </svg>
                  </div>
                );
              }
              
              return (
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">R</span>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-black text-xs font-bold">!</span>
                  </div>
                </div>
              );
            };

            return (
              <Link key={card.id} href={`/cards/${card.type}`}>
                <div 
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-20 cursor-pointer hover:bg-opacity-20 transition-all"
                  data-testid={`card-${card.type}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {getCardIcon(card.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-lg" data-testid={`text-card-name-${card.type}`}>
                        {card.name}
                      </h3>
                      <p className="text-white text-opacity-70 text-sm" data-testid={`text-card-description-${card.type}`}>
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-white text-center py-8" data-testid="no-cards">
            No cards available
          </div>
        )}

        {/* Find ATMs */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-20 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium" data-testid="text-find-atms">Find ATMs nearby</h3>
              </div>
            </div>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Add New Card Button */}
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2">
        <button className="bg-white text-black px-8 py-3 rounded-full font-medium flex items-center gap-2" data-testid="button-add-card">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add new
        </button>
      </div>
    </div>
  );
}
