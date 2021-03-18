import React from 'react'
import { errorVar } from '../../hooks/useError';
import ErrorFallbackHome from './ErrorFallBackHome';
import ErrorFallbackPlaylists from './ErrorFallBackPlaylists';

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
    console.log(errorVar);
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.error) {  // You can render any custom fallback UI
      switch (errorVar.error.status) {
        case 400:
        case 401:
          return <ErrorFallbackPlaylists />;

        // case 401:
        case 404:
        case 500:
        default:
          return <ErrorFallbackHome />
      }
    }
    return this.props.children;
  }
}


export default ErrorBoundary;