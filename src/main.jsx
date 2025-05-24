import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './components/store/index.js';
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Provider store = {store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
