import React, { useState, useEffect } from 'react';
const ActionBarContext = React.createContext({
  isAudioPanelCollapsed: false,
  isVideoPanelCollapsed: false,
  toggleAudioPanelCollapsed: () => {},
  toggleVideoPanelCollapsed: () => {},
  toggleAudioPanelFullsize: () => {},
  toggleVideoPanelFullsize: () => {},
});

export const ActionBarContextProvider = (props) => {
  const [isAudioPanelCollapsed, setIsAudioPanelCollapsed] = useState(false);
  const [isAudioPanelFullSize, setIsAudioPanelFullSize] = useState(false);
  const [isVideoPanelCollapsed, setIsVideoPanelCollapsed] = useState(false);
  const [isVideoPanelFullSize, setIsVideoPanelFullSize] = useState(false);

  const toggleAudioPanelCollapsed = () => {
    if (isAudioPanelFullSize) {
      setIsAudioPanelFullSize(false);
    }
    if (!isAudioPanelFullSize) {
      setIsAudioPanelFullSize(false);
      isAudioPanelCollapsed
        ? setIsAudioPanelCollapsed(false)
        : setIsAudioPanelCollapsed(true);
    }
  };
  const toggleVideoPanelCollapsed = () => {
    if (isVideoPanelFullSize) {
      setIsVideoPanelFullSize(false);
    }
    if (!isVideoPanelFullSize) {
      setIsVideoPanelFullSize(false);
      isVideoPanelCollapsed
        ? setIsVideoPanelCollapsed(false)
        : setIsVideoPanelCollapsed(true);
    }
    // isVideoPanelCollapsed
    // ? setIsVideoPanelCollapsed(false)
    // : setIsVideoPanelCollapsed(true);
  };
  const toggleAudioPanelFullsize = () =>
    isAudioPanelCollapsed
      ? setIsAudioPanelFullSize(false)
      : setIsAudioPanelFullSize(true);
  const toggleVideoPanelFullsize = () =>
    isVideoPanelCollapsed
      ? setIsVideoPanelFullSize(false)
      : setIsVideoPanelFullSize(true);
  return (
    <ActionBarContext.Provider
      value={{
        isAudioPanelCollapsed: isAudioPanelCollapsed,
        isAudioPanelFullSize: isAudioPanelFullSize,
        isVideoPanelCollapsed: isVideoPanelCollapsed,
        isVideoPanelFullSize: isVideoPanelFullSize,
        toggleAudioPanelCollapsed: toggleAudioPanelCollapsed,
        toggleVideoPanelCollapsed: toggleVideoPanelCollapsed,
        toggleAudioPanelFullsize: toggleAudioPanelFullsize,
        toggleVideoPanelFullsize: toggleVideoPanelFullsize,
      }}
    >
      {props.children}
    </ActionBarContext.Provider>
  );
};

export default ActionBarContext;
