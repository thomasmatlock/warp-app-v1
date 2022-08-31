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
import { UserContextProvider } from '../storage/userContext';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <ThemeContextProvider>
    <DownloadsContextProvider>
      <UserContextProvider>
        <PrefsContextProvider>
          <NavContextProvider>
            <ProductsContextProvider>
              <ModalsContextProvider>
                <InputContextProvider>
                  <SourcesContextProvider>
                    <ActionBarContextProvider>
                      <App />
                    </ActionBarContextProvider>
                  </SourcesContextProvider>
                </InputContextProvider>
              </ModalsContextProvider>
            </ProductsContextProvider>
          </NavContextProvider>
        </PrefsContextProvider>
      </UserContextProvider>
    </DownloadsContextProvider>
  </ThemeContextProvider>
);
