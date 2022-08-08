import React, { useState, useEffect } from 'react';
const ActionBarContext = React.createContext({
  isDownloadsPanelCollapsed: false,
  isBrowserPanelCollapsed: false,
  toggleDownloadsPanelCollapsed: () => {},
  toggleBrowserPanelCollapsed: () => {},
});

export const ActionBarContextProvider = (props) => {
  const [isDownloadsPanelCollapsed, setIsDownloadsPanelCollapsed] =
    useState(false);
  const [isBrowserPanelCollapsed, setIsBrowserPanelCollapsed] = useState(false);
  const toggleDownloadsPanelCollapsed = () => {
    if (isDownloadsPanelCollapsed) {
      setIsDownloadsPanelCollapsed(false);

      window.electron.ipcRenderer.sendMessage('browserPanelSize', 'default');
    } else if (!isBrowserPanelCollapsed) {
      setIsDownloadsPanelCollapsed(true);
      window.electron.ipcRenderer.sendMessage('browserPanelSize', 'expand');
    }
  };
  const toggleBrowserPanelCollapsed = () => {
    if (isBrowserPanelCollapsed) {
      setIsBrowserPanelCollapsed(false);
      window.electron.ipcRenderer.sendMessage('browserPanelSize', 'default');
    } else if (!isBrowserPanelCollapsed) {
      setIsBrowserPanelCollapsed(true);
      window.electron.ipcRenderer.sendMessage('browserPanelSize', 'collapse');
    }
  };
  return (
    <ActionBarContext.Provider
      value={{
        isDownloadsPanelCollapsed: isDownloadsPanelCollapsed,
        isBrowserPanelCollapsed: isBrowserPanelCollapsed,
        toggleDownloadsPanelCollapsed: toggleDownloadsPanelCollapsed,
        toggleBrowserPanelCollapsed: toggleBrowserPanelCollapsed,
      }}
    >
      {props.children}
    </ActionBarContext.Provider>
  );
};

export default ActionBarContext;
