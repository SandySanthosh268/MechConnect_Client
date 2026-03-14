import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import { connectWebSocket, disconnectWebSocket } from './services/websocket';

function AppContent() {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Only connect when user is logged in AND loading is complete
    if (user && !loading) {
      console.log('App: Valid user found, connecting WebSocket...');
      connectWebSocket();
    }
    
    return () => {
      console.log('App: Disconnecting WebSocket...');
      disconnectWebSocket();
    };
  }, [user, loading]);

  return <AppRoutes />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
