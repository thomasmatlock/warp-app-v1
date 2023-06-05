import React, { useState, useEffect } from 'react';
import downloadSourceIconFacebook from '../renderer/ActionBar/assets/facebook.svg';
import downloadSourceIconInstagram from '../renderer/ActionBar/assets/instagram.svg';
import downloadSourceIconPinterest from '../renderer/ActionBar/assets/pinterest.svg';
import downloadSourceIconSoundcloud from '../renderer/ActionBar/assets/soundcloud.svg';
import downloadSourceIconSnapchat from '../renderer/ActionBar/assets/snapchat.svg';
import downloadSourceIconTiktok from '../renderer/ActionBar/assets/tiktok.svg';
import downloadSourceIconTwitch from '../renderer/ActionBar/assets/twitch.svg';
import downloadSourceIconTwitter from '../renderer/ActionBar/assets/twitter.svg';
import downloadSourceIconVimeo from '../renderer/ActionBar/assets/vimeo.svg';
import downloadSourceIconYoutube from '../renderer/ActionBar/assets/youtube.svg';
// settings.get('sources');
let prefs;
const SourcesContext = React.createContext({
  activeSource: '',
  currentURL: '',
  enabledSources: [],
  setActiveSource: () => {},
  removeAllActiveSources: () => {},
});
let sources = [
  {
    name: 'Facebook',
    id: 'modal_dropdown_general_startupSource_facebook',
    src: downloadSourceIconFacebook,
    URL: 'https://facebook.com',
    active: false,
    enabled: true,
  },
  {
    name: 'Instagram',
    id: 'modal_dropdown_general_startupSource_instagram',
    src: downloadSourceIconInstagram,
    URL: 'https://instagram.com',
    active: false,
    enabled: true,
  },
  {
    name: 'Pinterest',
    id: 'modal_dropdown_general_startupSource_pinterest',
    src: downloadSourceIconPinterest,
    URL: 'https://pinterest.com',
    active: false,
    enabled: true,
  },
  {
    name: 'Snapchat',
    id: 'modal_dropdown_general_startupSource_snapchat',
    src: downloadSourceIconSnapchat,
    URL: 'https://snapchat.com',
    active: false,
    enabled: true,
  },
  {
    name: 'Soundcloud',
    id: 'modal_dropdown_general_startupSource_soundcloud',
    src: downloadSourceIconSoundcloud,
    URL: 'https://soundcloud.com',
    active: false,
    enabled: true,
  },
  {
    name: 'Tiktok',
    id: 'modal_dropdown_general_startupSource_tiktok',
    src: downloadSourceIconTiktok,
    URL: 'https://tiktok.com',
    active: false,
    enabled: true,
  },
  {
    name: 'Twitch',
    id: 'modal_dropdown_general_startupSource_twitch',
    src: downloadSourceIconTwitch,
    URL: 'https://twitch.com',
    active: false,
    enabled: true,
  },
  {
    name: 'Twitter',
    id: 'modal_dropdown_general_startupSource_twitter',
    src: downloadSourceIconTwitter,
    URL: 'https://twitter.com',
    active: false,
    enabled: false,
  },
  {
    name: 'Vimeo',
    id: 'modal_dropdown_general_startupSource_vimeo',
    src: downloadSourceIconVimeo,
    URL: 'https://vimeo.com',
    active: false,
    enabled: true,
  },
  {
    name: 'Youtube',
    id: 'modal_dropdown_general_startupSource_youtube',
    src: downloadSourceIconYoutube,
    URL: 'https://youtube.com',
    active: true,
    enabled: true,
  },
];

const getEnabledSources = (sources) => {
  // console.log('getEnabledSources');

  return sources.filter((source) => source.enabled);
};
const getActiveSource = (sources) => {
  return sources.filter((source) => source.active);
};
let enabledSources;
let activeSource;
window.electron.ipcRenderer.on('global', (arg) => {
  prefs = arg.prefs;
  // console.log(prefs.general.dropdowns);
  prefs.general.dropdowns.forEach((dropdown) => {
    if (dropdown.id.includes('source') || dropdown.id.includes('Source')) {
      // console.log(dropdown.defaultValue.id);
      // if (dropdown.defaultValue.id.includes('facebook'))
      //   setActiveSource(dropdown.defaultValue.id);
      // if (dropdown.defaultValue.id.includes('instagram'))
      //   setActiveSource(dropdown.defaultValue.id);
      // if (dropdown.defaultValue.id.includes('pinterest'))
      //   setActiveSource(dropdown.defaultValue.id);
      // if (dropdown.defaultValue.id.includes('snapchat'))
      //   setActiveSource(dropdown.defaultValue.id);
      // if (dropdown.defaultValue.id.includes('soundcloud'))
      //   setActiveSource(dropdown.defaultValue.id);
      // if (dropdown.defaultValue.id.includes('tiktok'))
      //   setActiveSource(dropdown.defaultValue.id);
      // if (dropdown.defaultValue.id.includes('twitch'))
      //   setActiveSource(dropdown.defaultValue.id);
      // if (dropdown.defaultValue.id.includes('twitter'))
      //   setActiveSource(dropdown.defaultValue.id);
      // if (dropdown.defaultValue.id.includes('vimeo'))
      //   setActiveSource(dropdown.defaultValue.id);
      // if (dropdown.defaultValue.id.includes('youtube'))
      //   setActiveSource(dropdown.defaultValue.id);
    }
    // console.log(activeSource[0].name);
  });
});
export const SourcesContextProvider = (props) => {
  const [isActiveSource, setIsActiveSource] = useState(
    sources.filter((source) => source.active)
  );
  const [currentURL, setCurrentURL] = useState('');
  window.electron.ipcRenderer.on('browser-url-change', (arg) => {
    // console.log(arg);
    setCurrentURL(arg);
  });

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
    console.log(id);
    removeAllActiveSources(id);
    sources.forEach((source) => {
      // console.log(source.id);

      if (source.id === id) {
        source.active = true;
        // console.log(source.URL);
        // source: change;
        setIsActiveSource(source);
        window.electron.ipcRenderer.sendMessage('source: change', source.URL);
      }
    });
    sources.forEach((source) => {
      // console.log(source.id, source.active);
    });
  };

  return (
    <SourcesContext.Provider
      value={{
        enabledSources: enabledSources,
        activeSource: activeSource,
        currentURL: currentURL,
        setActiveSource: setActiveSource,
      }}
    >
      {props.children}
    </SourcesContext.Provider>
  );
};

export default SourcesContext;
