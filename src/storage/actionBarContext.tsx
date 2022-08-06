import React, { useState, useEffect } from 'react';
// AuthContext is a obj that contains a component, not a component itself
// React.createContext, which this creates app-wide global state
// you need to do 2 things to use this, 1) provide it, and 2) consume it. MAN this is GREAT. consuming it, is basically listening to it
// 1) providing it also means you need to "wrap" all the components that use it, inside of it, so they can listen to it
// wrapping App in it, means everything in App will listen to it, and everything in App will be able to access it
// need
// put default contexts into this
const ActionBarContext = React.createContext({
  isAudioPanelCollapsed: false,
  isVideoPanelCollapsed: false,
  toggleAudioPanelCollapsed: () => {},
  toggleVideoPanelCollapsed: () => {},
});

export const ActionBarContextProvider = (props) => {
  const [isAudioPanelCollapsed, setIsAudioPanelCollapsed] = useState(false);
  const [isVideoPanelCollapsed, setIsVideoPanelCollapsed] = useState(false);
  const sources = {
    facebook: { URL: 'https://facebook.com', active: false, enabled: false },
    instagram: { URL: 'https://instagram.com', active: false, enabled: false },
    pinterest: { URL: 'https://pinterest.com', active: false, enabled: false },
    snapchat: { URL: 'https://snapchat.com', active: false, enabled: false },
    soundcloud: {
      URL: 'https://soundcloud.com',
      active: false,
      enabled: false,
    },
    tiktok: { URL: 'https://tiktok.com', active: false, enabled: false },
    twitch: { URL: 'https://twitch.com', active: false, enabled: false },
    twitter: { URL: 'https://twitter.com', active: false, enabled: false },
    vimeo: { URL: 'https://vimeo.com', active: false, enabled: false },
    youtube: { URL: 'https://youtube.com', active: true, enabled: true },
  };

  const toggleAudioPanelCollapsed = () => {
    console.log('toggling audio panel collapsed status');
    if (isAudioPanelCollapsed) {
      setIsAudioPanelCollapsed(false);
    } else if (!isAudioPanelCollapsed) {
      setIsAudioPanelCollapsed(true);
    }
  };
  const toggleVideoPanelCollapsed = () => {
    console.log('toggling video panel collapsed status');
    if (isVideoPanelCollapsed) {
      setIsVideoPanelCollapsed(false);
    } else if (!isVideoPanelCollapsed) {
      setIsVideoPanelCollapsed(true);
    }
  };

  return (
    <ActionBarContext.Provider
      value={{
        isAudioPanelCollapsed: isAudioPanelCollapsed,
        isVideoPanelCollapsed: isVideoPanelCollapsed,
        sources: sources,
        toggleAudioPanelCollapsed: toggleAudioPanelCollapsed,
        toggleVideoPanelCollapsed: toggleVideoPanelCollapsed,
      }}
    >
      {props.children}
    </ActionBarContext.Provider>
  );
};

export default ActionBarContext;
