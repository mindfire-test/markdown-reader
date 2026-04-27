

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import "./index.css";
import './themes/github-light.css';
import './themes/github-dark.css';
import './themes/notion.css';
import './themes/nord.css';
import './themes/minimal.css';
import './themes/dracula.css';
import { ThemeProvider } from './context/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
