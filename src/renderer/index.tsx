import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeContextProvider } from '../store/themeContext';
import { ActionBarContextProvider } from '../store/actionBarContext';
import { SourcesContextProvider } from '../store/sourcesContext';
import { DownloadsContextProvider } from '../store/downloadsContext';
import { NavContextProvider } from '../store/navContext';
import { InputContextProvider } from '../store/inputContext';
import { ModalsContextProvider } from '../store/modalsContext';
import { PrefsContextProvider } from '../store/prefsContext';
import { ProductsContextProvider } from '../store/productsContext';
import { UserContextProvider } from '../store/userContext';

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
