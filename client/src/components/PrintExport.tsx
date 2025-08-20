import React from 'react';

export default function PrintExport({ onPrint }: { onPrint?: () => void }) {
  const doPrint = () => {
    onPrint?.();
    window.print();
  };
  return (
    <button onClick={doPrint} className="h-9 rounded-full px-3 bg-white/10 hover:bg-white/15 text-sm">Print</button>
  );
}

