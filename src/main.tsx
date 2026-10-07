import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Guard against third-party extension injection crashes (e.g. MetaMask inpage.js)
if (typeof window !== 'undefined') {
  const isExtensionError = (err: unknown): boolean => {
    if (!err) return false;
    const str = String((err as any)?.message || '') + ' ' + String((err as any)?.stack || '') + ' ' + String(err);
    return (
      str.includes('chrome-extension://') ||
      str.includes('moz-extension://') ||
      str.includes('safari-extension://') ||
      str.includes('nkbihfbeogaeaoehlefnkodbefgpgknn') ||
      str.includes('MetaMask') ||
      str.includes('Failed to connect to MetaMask') ||
      str.includes('inpage.js')
    );
  };

  window.addEventListener(
    'error',
    (e) => {
      if (isExtensionError(e.error) || isExtensionError(e.message) || isExtensionError(e.filename)) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    (e) => {
      if (isExtensionError(e.reason)) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    },
    true
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
