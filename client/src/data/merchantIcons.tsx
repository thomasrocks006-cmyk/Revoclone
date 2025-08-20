import React from 'react';
import { Github, Plus, CircleAlert, RotateCcw, CreditCard } from 'lucide-react';
import { MerchantIconConfig } from '@/types/transaction';

export const MERCHANT_ICONS: Record<string, MerchantIconConfig> = {
  "McDonald's": {
    bgColor: 'bg-red-600',
    icon: <span className="text-yellow-300 font-bold text-xl leading-none">M</span>,
  },
  "GitHub": {
    bgColor: 'bg-black',
    icon: <Github className="w-6 h-6 text-white" />,
  },
  "Money added via Apple Pay": {
    bgColor: 'bg-black',
    icon: <CreditCard className="w-6 h-6 text-white" />,
    statusOverlay: (
      <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-4 h-4 flex items-center justify-center">
        <Plus className="w-3 h-3 text-black" strokeWidth={3} />
      </div>
    ),
  },
  "Transport for London": {
    bgColor: 'bg-blue-600',
    icon: (
      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center border-2 border-white">
        <div className="w-3 h-3 bg-red-600 rounded-full" />
      </div>
    ),
  },
};

export const getDefaultIcon = (): MerchantIconConfig => ({
  bgColor: 'bg-gray-800',
  icon: (
    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="6" width="16" height="12" rx="2" />
    </svg>
  ),
});

