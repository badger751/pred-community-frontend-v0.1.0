import { Component,type  ReactNode } from 'react';

interface Props { children: ReactNode }
interface State { hasError: boolean; error?: Error }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Render crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          padding: '40px',
          background: '#fff5f5',
          color: '#c53030',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h1 style={{ fontSize: '48px' }}>Page crashed</h1>
          <p style={{ fontSize: '24px' }}>{this.state.error?.message}</p>
          <pre style={{
            background: '#fed7d7',
            padding: '20px',
            borderRadius: '8px',
            overflow: 'auto',
            maxHeight: '60vh'
          }}>
            {this.state.error?.stack}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              fontSize: '18px',
              background: '#c53030',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}