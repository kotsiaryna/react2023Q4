import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorPage from './error/ErrorPage';

type Props = {
  children: ReactNode;
};

class ErrorBoundary extends Component<Props> {
  state: {
    hasError: boolean;
  };

  constructor(props: Props) {
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
