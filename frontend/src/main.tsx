import '../index.scss';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './theme/styles.css';

import { ThemeProvider } from '@gravity-ui/uikit';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
