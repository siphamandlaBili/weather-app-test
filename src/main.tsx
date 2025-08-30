
import React, { StrictMode } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
  <Toaster richColors position="bottom-center" />
      <App />
    </>
  </StrictMode>,
)
