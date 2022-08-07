import React, { useState, useEffect } from 'react';
const ActionBarContext = React.createContext({
  isAudioPanelCollapsed: false,
  isVideoPanelCollapsed: false,
  toggleAudioPanelCollapsed: () => {},
  toggleVideoPanelCollapsed: () => {},
});

export const ActionBarContextProvider = (props) => {
  const [isAudioPanelCollapsed, setIsAudioPanelCollapsed] = useState(false);
  const [isVideoPanelCollapsed, setIsVideoPanelCollapsed] = useState(false);

  const toggleAudioPanelCollapsed = () =>
    isAudioPanelCollapsed
      ? setIsAudioPanelCollapsed(false)
      : setIsAudioPanelCollapsed(true);
  const toggleVideoPanelCollapsed = () =>
    isVideoPanelCollapsed
      ? setIsVideoPanelCollapsed(false)
      : setIsVideoPanelCollapsed(true);
  return (
    <ActionBarContext.Provider
      value={{
        isAudioPanelCollapsed: isAudioPanelCollapsed,
        isVideoPanelCollapsed: isVideoPanelCollapsed,
        toggleAudioPanelCollapsed: toggleAudioPanelCollapsed,
        toggleVideoPanelCollapsed: toggleVideoPanelCollapsed,
      }}
    >
      {props.children}
    </ActionBarContext.Provider>
  );
};

export default ActionBarContext;
