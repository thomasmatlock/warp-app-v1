import React, { useState, useEffect } from 'react';
import downloadSourceIconFacebook from '../../assets/BrowserBar/facebook.svg';
import downloadSourceIconInstagram from '../../assets/BrowserBar/instagram.svg';
import downloadSourceIconPinterest from '../../assets/BrowserBar/pinterest.svg';
import downloadSourceIconSoundcloud from '../../assets/BrowserBar/soundcloud.svg';
import downloadSourceIconSnapchat from '../../assets/BrowserBar/snapchat.svg';
import downloadSourceIconTiktok from '../../assets/BrowserBar/tiktok.svg';
import downloadSourceIconTwitch from '../../assets/BrowserBar/twitch.svg';
import downloadSourceIconTwitter from '../../assets/BrowserBar/twitter.svg';
import downloadSourceIconVimeo from '../../assets/BrowserBar/vimeo.svg';
import downloadSourceIconYoutube from '../../assets/BrowserBar/youtube.svg';
const SourcesContext = React.createContext({
  activeSource: '',
  enabledSources: [],
  // toggleAudioPanelCollapsed: () => {},
  setActiveSource: () => {},
  removeAllActiveSources: () => {},
  // toggleVideoPanelCollapsed: () => {},
});

export const SourcesContextProvider = (props) => {
  // const [isActiveSource, setISActiveSource] = useState(activeSource[0].name);
  const [isActiveSource, setIsActiveSource] = useState();
  let enabledSources;
  let activeSource;
  let sources = [
    {
      name: 'Facebook',
      id: 'facebook',
      src: downloadSourceIconFacebook,
      URL: 'https://facebook.com',
      active: false,
      enabled: false,
    },
    {
      name: 'Instagram',
      id: 'instagram',
      src: downloadSourceIconInstagram,
      URL: 'https://instagram.com',
      active: false,
      enabled: false,
    },
    {
      name: 'Pinterest',
      id: 'pinterest',
      src: downloadSourceIconPinterest,
      URL: 'https://pinterest.com',
      active: true,
      enabled: true,
    },
    {
      name: 'Snapchat',
      id: 'snapchat',
      src: downloadSourceIconSnapchat,
      URL: 'https://snapchat.com',
      active: false,
      enabled: true,
    },
    {
      name: 'Soundcloud',
      id: 'soundcloud',
      src: downloadSourceIconSoundcloud,
      URL: 'https://soundcloud.com',
      active: false,
      enabled: false,
    },
    {
      name: 'Tiktok',
      id: 'tiktok',
      src: downloadSourceIconTiktok,
      URL: 'https://tiktok.com',
      active: false,
      enabled: false,
    },
    {
      name: 'Twitch',
      id: 'twitch',
      src: downloadSourceIconTwitch,
      URL: 'https://twitch.com',
      active: false,
      enabled: true,
    },
    {
      name: 'Twitter',
      id: 'twitter',
      src: downloadSourceIconTwitter,
      URL: 'https://twitter.com',
      active: false,
      enabled: true,
    },
    {
      name: 'Vimeo',
      id: 'vimeo',
      src: downloadSourceIconVimeo,
      URL: 'https://vimeo.com',
      active: false,
      enabled: true,
    },
    {
      name: 'Youtube',
      id: 'youtube',
      src: downloadSourceIconYoutube,
      URL: 'https://youtube.com',
      active: false,
      enabled: true,
    },
  ];
  const getEnabledSources = (sources) => {
    console.log('getEnabledSources');

    return sources.filter((source) => source.enabled);
  };
  const getActiveSource = (sources) => {
    console.log('getActiveSource');
    return sources.filter((source) => source.active);
  };
  enabledSources = getEnabledSources(sources);
  activeSource = getActiveSource(enabledSources);
  const removeAllActiveSources = (id) => {
    sources = sources
      .map((source) => {
        source.active = false;
        return source;
      })
      .filter((source) => source.enabled);
  };
  const setActiveSource = (id) => {
    // console.log(id);
    removeAllActiveSources(id);
    sources.forEach((source) => {
      // console.log(source.id);

      if (source.id === id) {
        source.active = true;
        setIsActiveSource(source);
      }
    });
    sources.forEach((source) => {
      console.log(source.id, source.active);
    });
  };

  console.log(activeSource[0].name);

  return (
    <SourcesContext.Provider
      value={{
        enabledSources: enabledSources,
        activeSource: activeSource,
        setActiveSource: setActiveSource,
        setIsActiveSource: setIsActiveSource,
        removeAllActiveSources: removeAllActiveSources,
        // setIsActiveSource: setIsActiveSource,
        // toggleVideoPanelCollapsed: toggleVideoPanelCollapsed,
      }}
    >
      {props.children}
    </SourcesContext.Provider>
  );
};

export default SourcesContext;
