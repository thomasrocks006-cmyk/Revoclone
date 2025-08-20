export const TransactionSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="rounded-3xl bg-[#181A1F] p-3">
        <div className="h-6 bg-gray-700 rounded w-24 mb-4"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((j) => (
            <div key={j} className="flex items-center gap-3 p-3">
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded w-32 mb-1"></div>
                <div className="h-3 bg-gray-700 rounded w-20"></div>
              </div>
              <div className="h-4 bg-gray-700 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const ErrorMessage = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="text-center py-12">
    <div className="text-red-400 mb-4">Error loading transactions</div>
    <div className="text-gray-400 mb-4 text-sm">{error}</div>
    <button onClick={onRetry} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
      Try Again
    </button>
  </div>
);

export const EmptyState = () => (
  <div className="text-center py-12">
    <div className="text-gray-400 mb-4">No transactions found</div>
    <div className="text-gray-500 text-sm">Your transactions will appear here</div>
  </div>
);

