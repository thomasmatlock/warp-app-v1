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
    isDownloadsPanelCollapsed
      ? setIsDownloadsPanelCollapsed(false)
      : setIsDownloadsPanelCollapsed(true);
  };
  const toggleBrowserPanelCollapsed = () => {
    isBrowserPanelCollapsed
      ? setIsBrowserPanelCollapsed(false)
      : setIsBrowserPanelCollapsed(true);
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
