import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  moduleName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`[ErrorBoundary: ${this.props.moduleName || 'Component'}] caught an error:`, error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full p-8 my-4 rounded-xl bg-[#131318] border border-[#cbb38d]/20 text-center flex flex-col items-center justify-center">
          <AlertCircle className="w-8 h-8 text-[#cbb38d] mb-3" />
          <h4 className="text-lg font-serif text-[#f5f2eb] mb-1">
            {this.props.moduleName || 'Experience'} Temporarily Unavailable
          </h4>
          <p className="text-xs text-[#8a8882] max-w-sm mb-4">
            An unexpected error occurred while rendering this view. You can continue exploring other sections without interruption.
          </p>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e1e27] hover:bg-[#282836] text-[#dfccad] text-xs font-mono tracking-wider border border-[#cbb38d]/30 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> RETRY EXPERIENCE
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
