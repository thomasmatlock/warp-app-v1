import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeContextProvider } from '../storage/themeContext';
import { ActionBarContextProvider } from '../storage/actionBarContext';
import { SourcesContextProvider } from '../storage/sourcesContext';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <ThemeContextProvider>
    <SourcesContextProvider>
      <ActionBarContextProvider>
        <App />
      </ActionBarContextProvider>
    </SourcesContextProvider>
  </ThemeContextProvider>
);
