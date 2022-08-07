import React, { useState, useEffect } from 'react';
const SourcesContext = React.createContext({
  activeSource: '',
  enabledSources: [],
  // toggleAudioPanelCollapsed: () => {},
  // toggleVideoPanelCollapsed: () => {},
});

export const SourcesContextProvider = (props) => {
  let sources = [
    {
      name: 'facebook',
      URL: 'https://facebook.com',
      active: false,
      enabled: false,
    },
    {
      name: 'instagram',
      URL: 'https://instagram.com',
      active: false,
      enabled: false,
    },
    {
      name: 'pinterest',
      URL: 'https://pinterest.com',
      active: false,
      enabled: false,
    },
    {
      name: 'snapchat',
      URL: 'https://snapchat.com',
      active: false,
      enabled: true,
    },
    {
      name: 'soundcloud',
      URL: 'https://soundcloud.com',
      active: false,
      enabled: true,
    },
    {
      name: 'tiktok',
      URL: 'https://tiktok.com',
      active: false,
      enabled: false,
    },
    {
      name: 'twitch',
      URL: 'https://twitch.com',
      active: false,
      enabled: false,
    },
    {
      name: 'twitter',
      URL: 'https://twitter.com',
      active: false,
      enabled: false,
    },
    { name: 'vimeo', URL: 'https://vimeo.com', active: false, enabled: false },
    {
      name: 'youtube',
      URL: 'https://youtube.com',
      active: true,
      enabled: true,
    },
  ];
  const getEnabledSources = (sources) => {
    return sources.filter((source) => source.enabled);
  };
  const getActiveSource = (sources) => {
    return sources.filter((source) => source.active);
  };
  let enabledSources = getEnabledSources(sources);
  let activeSource = getActiveSource(enabledSources);
  // setIsActiveSource(activeSource[0].name);
  // console.log(enabledSources);
  // console.log(activeSource[0].name);
  const [isActiveSource, setIsActiveSource] = useState(activeSource[0].name);

  return (
    <SourcesContext.Provider
      value={{
        enabledSources: enabledSources,
        activeSource: activeSource,
        setIsActiveSource: setIsActiveSource,
        // toggleVideoPanelCollapsed: toggleVideoPanelCollapsed,
      }}
    >
      {props.children}
    </SourcesContext.Provider>
  );
};

export default SourcesContext;
