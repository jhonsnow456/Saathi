import React from 'react';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; FallbackComponent: React.ComponentType },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; FallbackComponent: React.ComponentType }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.FallbackComponent;
      return <FallbackComponent />;
    }
    return this.props.children;
  }
}

function withErrorHandler<P extends object>(
  Component: React.ComponentType<P>,
  Fallback: React.ComponentType
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary FallbackComponent={Fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

export default withErrorHandler;
