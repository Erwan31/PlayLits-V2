import React from 'react'
import ErrorFallback from './ErrorFallBack';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  // static getDerivedStateFromError(error) {    // Update state so the next render will show the fallback UI.    
  // }

  componentDidCatch(error, errorInfo) {    // You can also log the error to an error reporting service    
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.error) {      // You can render any custom fallback UI      
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}


export default ErrorBoundary;