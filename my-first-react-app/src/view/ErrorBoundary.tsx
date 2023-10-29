import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorPage from './error/ErrorPage';

class ErrorBoundary extends Component<{
  children: ReactNode;
}> {
  state: {
    hasError: boolean;
  };

  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
