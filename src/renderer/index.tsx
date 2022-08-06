import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeContextProvider } from '../storage/themeContext';
import { ActionBarContextProvider } from '../storage/actionBarContext';

const container = document.getElementById('root')!;
const root = createRoot(container);
// root.render(<App />);
root.render(
  <ThemeContextProvider>
    <ActionBarContextProvider>
      <App />
    </ActionBarContextProvider>
  </ThemeContextProvider>
);
