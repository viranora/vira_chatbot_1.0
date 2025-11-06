import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Tailwind stillerini yüklemek için

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root elementi bulunamadı.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);