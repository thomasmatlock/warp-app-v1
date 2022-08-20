import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeContextProvider } from '../storage/themeContext';
import { ActionBarContextProvider } from '../storage/actionBarContext';
import { SourcesContextProvider } from '../storage/sourcesContext';
import { DownloadsContextProvider } from '../storage/downloadsContext';
import { NavContextProvider } from '../storage/navContext';
import { InputContextProvider } from '../storage/inputContext';
import { ModalsContextProvider } from '../storage/modalsContext';
import { PrefsContextProvider } from '../storage/prefsContext';
import { ProductsContextProvider } from '../storage/productsContext';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <PrefsContextProvider>
    <ThemeContextProvider>
      <NavContextProvider>
        <ProductsContextProvider>
          <ModalsContextProvider>
            <InputContextProvider>
              <DownloadsContextProvider>
                <SourcesContextProvider>
                  <ActionBarContextProvider>
                    <App />
                  </ActionBarContextProvider>
                </SourcesContextProvider>
              </DownloadsContextProvider>
            </InputContextProvider>
          </ModalsContextProvider>
        </ProductsContextProvider>
      </NavContextProvider>
    </ThemeContextProvider>
  </PrefsContextProvider>
);
