

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import "./index.css";
import { ThemeProvider } from './context/ThemeProvider'
import 'katex/dist/katex.min.css';
import { TabProvider } from './context/TabProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TabProvider>
        <App />
      </TabProvider>
    </ThemeProvider>
  </StrictMode>
)
