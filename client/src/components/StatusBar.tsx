import { Moon, Signal, Wifi, Battery } from "lucide-react";

export default function StatusBar() {
  return (
    <div className="status-bar-height bg-background px-4 flex items-center justify-between text-sm font-semibold text-white safe-area-top" data-testid="status-bar">
      <div className="flex items-center gap-1">
        <span data-testid="time">11:42</span>
        <Moon className="w-4 h-4" data-testid="moon-icon" />
      </div>
      <div className="flex items-center gap-1">
        <div className="flex gap-1" data-testid="signal-bars">
          <div className="w-1 h-3 bg-white rounded-full"></div>
          <div className="w-1 h-3 bg-white rounded-full"></div>
          <div className="w-1 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-1 h-3 bg-gray-500 rounded-full"></div>
        </div>
        <Wifi className="w-4 h-4" data-testid="wifi-icon" />
        <div className="bg-white text-black px-1.5 py-0.5 rounded text-xs font-bold" data-testid="battery">
          92
        </div>
      </div>
    </div>
  );
}
