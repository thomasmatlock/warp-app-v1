import React, { useState, useEffect } from 'react';
const SourcesContext = React.createContext({
  activeSource: '',
  toggleAudioPanelCollapsed: () => {},
  toggleVideoPanelCollapsed: () => {},
});

export const SourcesContextProvider = (props) => {
  const [activeSource, setActiveSource] = useState('');
  let sources = {
    facebook: { URL: 'https://facebook.com', active: false, enabled: false },
    instagram: { URL: 'https://instagram.com', active: false, enabled: false },
    pinterest: { URL: 'https://pinterest.com', active: false, enabled: false },
    snapchat: { URL: 'https://snapchat.com', active: false, enabled: false },
    soundcloud: {
      URL: 'https://soundcloud.com',
      active: false,
      enabled: true,
    },
    tiktok: { URL: 'https://tiktok.com', active: false, enabled: false },
    twitch: { URL: 'https://twitch.com', active: false, enabled: false },
    twitter: { URL: 'https://twitter.com', active: false, enabled: false },
    vimeo: { URL: 'https://vimeo.com', active: false, enabled: false },
    youtube: { URL: 'https://youtube.com', active: true, enabled: true },
  };

  const toggleVideoPanelCollapsed = () =>
    isVideoPanelCollapsed
      ? setIsVideoPanelCollapsed(false)
      : setIsVideoPanelCollapsed(true);
  return (
    <SourcesContext.Provider
      value={{
        sources: sources,
        activeSource: activeSource,
        toggleVideoPanelCollapsed: toggleVideoPanelCollapsed,
      }}
    >
      {props.children}
    </SourcesContext.Provider>
  );
};

export default SourcesContext;
