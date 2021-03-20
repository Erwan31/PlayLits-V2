import React from 'react'
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

  componentDidCatch(error, errorInfo) {    // You can also log the error to an error reporting service  
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.error) {  // You can render any custom fallback UI
      // Check also local storage?
      if (this.props.route === "/playlits/[...slug]") {
        switch (this.props.getError().error.status) {
          case 400:
            return <ErrorFallbackPlaylists />;

          case 404:
          case 500:
          default:
            return <ErrorFallbackHome />
        }
      }

      return <ErrorFallbackHome />
    }
    return this.props.children;
  }
}


export default ErrorBoundary;