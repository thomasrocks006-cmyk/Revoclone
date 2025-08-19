import { useState } from 'react';
import { useLocation, useParams, Link } from 'wouter';
import { ArrowLeft, HelpCircle, Eye, Snowflake, Settings, CreditCard, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CardDetail = () => {
  const [location] = useLocation();
  const { cardId } = useParams();
  
  // Mock data based on screenshots
  const cardData = {
    original: {
      name: 'Original',
      type: 'original',
      number: '•• 4103',
      logo: 'mastercard',
      gradient: 'from-pink-500 via-purple-500 to-blue-600',
      status: 'delivered',
      deliveryTracking: {
        ordered: { date: '4 Nov 2023', completed: true },
        posted: { date: '6 Nov 2023', completed: true },
        expected: { date: '10 Nov 2023', completed: true }
      },
      isActivated: false,
      showActivationPrompt: true,
      recentTransaction: {
        merchant: 'GitHub',
        amount: '$1.55',
        date: '17 August, 04:25',
        status: 'Reverted',
        icon: '⚫'
      }
    }
  };

  const card = cardData[cardId as keyof typeof cardData];

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-white text-sm font-medium">
        <span>12:03 🌙</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
            <div className="w-1 h-3 bg-white/30 rounded-full"></div>
          </div>
          <span className="ml-1">📶</span>
          <span>88</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4">
        <Link href="/cards">
          <Button variant="ghost" size="icon" className="text-white">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" className="text-white">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>

      {/* Card Display */}
      <div className="px-6 mb-8">
        <div className={`relative w-full h-48 bg-gradient-to-br ${card.gradient} rounded-2xl p-6 mb-6 shadow-2xl`}>
          <div className="absolute top-6 left-6 text-white text-xl font-light">
            {card.name}
          </div>
          
          <div className="absolute bottom-6 left-6 text-white text-lg font-mono">
            {card.number}
          </div>
          
          {/* Mastercard logo */}
          <div className="absolute bottom-6 right-6 flex">
            <div className="w-8 h-8 bg-red-500 rounded-full"></div>
            <div className="w-8 h-8 bg-yellow-400 rounded-full -ml-3"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex flex-col items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-12 h-12 bg-black/30 rounded-full text-white mb-2"
            >
              <Eye className="h-5 w-5" />
            </Button>
            <span className="text-xs">Show details</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-12 h-12 bg-black/30 rounded-full text-white mb-2"
            >
              <Snowflake className="h-5 w-5" />
            </Button>
            <span className="text-xs">Freeze</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-12 h-12 bg-black/30 rounded-full text-white mb-2"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <span className="text-xs">Settings</span>
          </div>
        </div>
      </div>

      {/* Activation Prompt */}
      {card.showActivationPrompt && (
        <div className="mx-6 mb-6 bg-black/30 rounded-xl p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-white" />
              <span className="font-medium">Received your card?</span>
            </div>
            <CreditCard className="h-5 w-5 text-white" />
          </div>
          
          <p className="text-sm text-gray-300 mb-4">
            Activate your physical card to use it in-store. You can still shop online without activation, using Apple Pay
          </p>
          
          <Button className="w-full bg-white/20 hover:bg-white/30 text-white rounded-lg py-3">
            Activate now
          </Button>
        </div>
      )}

      {/* Delivery Tracking */}
      <div className="mx-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Should have arrived</h3>
          <Button variant="ghost" className="text-blue-400 text-sm">
            Track delivery
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center mb-4">
          <div className="flex-1 h-1 bg-blue-500 rounded-full"></div>
          <div className="flex-1 h-1 bg-blue-500 rounded-full ml-1"></div>
          <div className="flex-1 h-1 bg-blue-500 rounded-full ml-1"></div>
        </div>
        
        {/* Tracking Steps */}
        <div className="flex justify-between text-center">
          <div>
            <div className="text-sm font-medium">Ordered</div>
            <div className="text-xs text-gray-400">{card.deliveryTracking.ordered.date}</div>
          </div>
          <div>
            <div className="text-sm font-medium">Posted</div>
            <div className="text-xs text-gray-400">{card.deliveryTracking.posted.date}</div>
          </div>
          <div>
            <div className="text-sm font-medium">Expected</div>
            <div className="text-xs text-gray-400">{card.deliveryTracking.expected.date}</div>
          </div>
        </div>
      </div>

      {/* Recent Transaction */}
      <div className="mx-6 mb-24">
        <div className="flex items-center justify-between bg-black/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
              <div className="text-white text-lg">{card.recentTransaction.icon}</div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                <div className="text-xs">⚡</div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">{card.recentTransaction.merchant}</div>
              <div className="text-xs text-gray-400">
                {card.recentTransaction.date} · {card.recentTransaction.status}
              </div>
            </div>
          </div>
          <div className="text-sm">{card.recentTransaction.amount}</div>
        </div>
      </div>

      {/* Home indicator */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default CardDetail;