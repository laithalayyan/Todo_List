import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TodoProvider } from './store/TodoStore';
import { ThemeProvider } from './store/ThemeStore';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </ThemeProvider>
  </StrictMode>
);