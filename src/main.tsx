
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(

  <>
    <Toaster richColors position="bottom-center" />
    <App />
  </>

)
