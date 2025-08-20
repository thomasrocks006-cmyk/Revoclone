import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Transaction component error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback || DefaultErrorFallback;
      return <Fallback error={this.state.error!} resetError={this.resetError} />;
    }
    return this.props.children;
  }
}

const DefaultErrorFallback = ({ error, resetError }: { error: Error; resetError: () => void }) => (
  <div className="text-center py-12">
    <div className="text-red-400 mb-4">Something went wrong</div>
    <div className="text-gray-400 mb-4 text-sm">{error.message}</div>
    <button onClick={resetError} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
      Try Again
    </button>
  </div>
);

