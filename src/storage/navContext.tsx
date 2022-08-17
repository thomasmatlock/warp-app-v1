import React, { useState } from 'react';
let prefs;
const NavContext = React.createContext({
  audioMode: true,
  videoMode: false,
  warpstagramMode: false,
  //
  disableMainModes: () => {},
  audioModeHandler: () => {},
  videoModeHandler: () => {},
  warpstagramModeHandler: () => {},
  //
  audioModePrefs: true,
  videoModePrefs: false,
  warpstagramModePrefs: false,
  generalModePrefs: false,
  licenseModePrefs: false,
  authsModePrefs: false,
  audioModePrefsHandler: () => {},
  videoModePrefsHandler: () => {},
  warpstagramModePrefsHandler: () => {},
  generalModePrefsHandler: () => {},
  authsModePrefsHandler: () => {},
  licenseModePrefsHandler: () => {},
  //
  placeholder: '',

  // warpstagramModeHandler: () => {},
});
export const NavContextProvider = (props) => {
  window.electron.ipcRenderer.on('main: prefs', (arg) => {
    prefs = arg;
    // console.log(prefs.general.dropdowns);
    prefs.general.dropdowns.forEach((dropdown) => {
      if (dropdown.id.includes('startupMode')) {
        // console.log(dropdown);
        // console.log(dropdown.defaultValue.id);
        if (dropdown.defaultValue.id.includes('audio')) audioModeHandler();
        if (dropdown.defaultValue.id.includes('video')) videoModeHandler();
        if (dropdown.defaultValue.id.includes('warpstagram'))
          warpstagramModeHandler();
      }
    });
  });
  // main mode states
  const [audioMode, setAudioMode] = useState(false);
  const [videoMode, setVideoMode] = useState(true);
  const [warpstagramMode, setWarpstagramMode] = useState(false);
  // modal pref nav states
  const [audioModePrefs, setAudioModePrefs] = useState(true);
  const [videoModePrefs, setVideoModePrefs] = useState(false);
  const [warpstagramModePrefs, setWarpstagramModePrefs] = useState(false);
  const [generalModePrefs, setGeneralModePrefs] = useState(false);
  const [authsModePrefs, setAuthsModePrefs] = useState(false);
  const [licenseModePrefs, setLicenseModePrefs] = useState(false);
  // search placeholder states
  const [placeholder, setPlaceholder] = useState('');
  const audioSearchPlaceholder = 'audio search...beep boop';
  const videoSearchPlaceholder = 'video search...boop beep';
  const warpstagramSearchPlaceholder =
    'Enter instagram username, hashtag, or location';

  window.electron.ipcRenderer.on('ready-to-show', (arg) => {
    if (audioMode) setPlaceholder(audioSearchPlaceholder);
    if (videoMode) setPlaceholder(videoSearchPlaceholder);
    if (warpstagramMode) setPlaceholder(warpstagramSearchPlaceholder);
  });
  // MAIN MODES HANDLERS
  const disableMainModes = () => {
    setAudioMode(false);
    setVideoMode(false);
    setWarpstagramMode(false);
  };
  window.electron.ipcRenderer.on('nav: mode: audio', () => audioModeHandler());
  window.electron.ipcRenderer.on('nav: mode: video', () => videoModeHandler());
  window.electron.ipcRenderer.on('nav: mode: warpstagram', () =>
    warpstagramModeHandler()
  );

  const audioModeHandler = () => {
    disableMainModes();
    disableAllPrefs();
    setAudioMode(true);
    setAudioModePrefs(true);
    setPlaceholder(audioSearchPlaceholder);
    window.electron.ipcRenderer.sendMessage('nav: mode: audio');
  };
  const videoModeHandler = () => {
    disableMainModes();
    disableAllPrefs();
    setVideoMode(true);
    setVideoModePrefs(true);
    setPlaceholder(videoSearchPlaceholder);

    window.electron.ipcRenderer.sendMessage('nav: mode: video', []);
  };
  const warpstagramModeHandler = () => {
    disableMainModes();
    disableAllPrefs();
    setWarpstagramMode(true);
    setWarpstagramModePrefs(true);
    setPlaceholder(warpstagramSearchPlaceholder);
    window.electron.ipcRenderer.sendMessage('browserPanelSize', 'hidden');
    window.electron.ipcRenderer.sendMessage('nav: mode: warpstagram');
  };
  // PREFS MODES HANDLERS

  const disableAllPrefs = () => {
    setAudioModePrefs(false);
    setVideoModePrefs(false);
    setWarpstagramModePrefs(false);
    setGeneralModePrefs(false);
    setAuthsModePrefs(false);
    setLicenseModePrefs(false);
  };
  const audioModePrefsHandler = () => {
    disableAllPrefs();
    setAudioModePrefs(true);
  };
  const videoModePrefsHandler = () => {
    disableAllPrefs();
    setVideoModePrefs(true);
  };
  const warpstagramModePrefsHandler = () => {
    disableAllPrefs();
    setLicenseModePrefs(true);
  };
  const generalModePrefsHandler = () => {
    disableAllPrefs();
    setGeneralModePrefs(true);
  };
  const authsModePrefsHandler = () => {
    disableAllPrefs();
    setAuthsModePrefs(true);
  };
  const licenseModePrefsHandler = () => {
    disableAllPrefs();
    setLicenseModePrefs(true);
  };

  return (
    <NavContext.Provider
      value={{
        audioMode: audioMode,
        videoMode: videoMode,
        warpstagramMode: warpstagramMode,
        audioModeHandler: audioModeHandler,
        videoModeHandler: videoModeHandler,
        warpstagramModeHandler: warpstagramModeHandler,
        disableMainModes: disableMainModes,
        //
        audioModePrefs: audioModePrefs,
        videoModePrefs: videoModePrefs,
        warpstagramModePrefs: warpstagramModePrefs,
        generalModePrefs: generalModePrefs,
        authsModePrefs: authsModePrefs,
        licenseModePrefs: licenseModePrefs,
        //
        audioModePrefsHandler: audioModePrefsHandler,
        videoModePrefsHandler: videoModePrefsHandler,
        warpstagramModePrefsHandler: warpstagramModePrefsHandler,
        generalModePrefsHandler: generalModePrefsHandler,
        authsModePrefsHandler: authsModePrefsHandler,
        licenseModePrefsHandler: licenseModePrefsHandler,
        //
        placeholder: placeholder,
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
};

export default NavContext;
