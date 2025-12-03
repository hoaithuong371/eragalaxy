import React, { Suspense, ReactNode } from 'react';
import SpaceScene from './components/SpaceScene';
import UIOverlay from './components/UIOverlay';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Error Boundary to catch 3D scene crashes (like texture load failures)
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("SpaceScene crashed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center text-pink-300 font-light z-0">
          <p>Ký ức đang trôi đi... (Vui lòng tải lại)</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* UI Layer */}
      <UIOverlay />

      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <ErrorBoundary>
          <Suspense fallback={
            <div className="flex items-center justify-center h-full w-full text-pink-300 font-light tracking-widest animate-pulse">
              ĐANG TẢI KÝ ỨC...
            </div>
          }>
            <SpaceScene />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;