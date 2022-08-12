import React, { useState } from 'react';
const NavContext = React.createContext({
  audioMode: true,
  videoMode: false,
  warpstagramMode: false,
  generalMode: false,
  authsMode: false,
  licenseMode: false,
  placeholder: '',
  audioModeHandler: () => {},
  videoModeHandler: () => {},
  warpstagramModeHandler: () => {},
  generalModeHandler: () => {},
  authsModeHandler: () => {},
  licenseModeHandler: () => {},
  disableAllStates: () => {},
});
export const NavContextProvider = (props) => {
  const [audioMode, setAudioMode] = useState(true);
  const [videoMode, setVideoMode] = useState(false);
  const [warpstagramMode, setWarpstagramMode] = useState(false);
  const [generalMode, setGeneralMode] = useState(false);
  const [authsMode, setAuthsMode] = useState(false);
  const [licenseMode, setLicenseMode] = useState(false);
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

  const disableAllStates = () => {
    setAudioMode(false);
    setVideoMode(false);
    setWarpstagramMode(false);
    setGeneralMode(false);
    setAuthsMode(false);
    setLicenseMode(false);
  };
  const audioModeHandler = () => {
    disableAllStates();
    setAudioMode(true);
    window.electron.ipcRenderer.sendMessage('nav: mode: audio', [
      `Nav change: Audio Mode`,
    ]);
  };
  const videoModeHandler = () => {
    disableAllStates();
    setVideoMode(true);
    window.electron.ipcRenderer.sendMessage('nav: mode: video', []);
  };
  const warpstagramModeHandler = () => {
    disableAllStates();
    setWarpstagramMode(true);
    window.electron.ipcRenderer.sendMessage('nav: mode: warpstagram', [
      `Nav change: Warpstagram Mode`,
    ]);
  };
  const generalModeHandler = () => {
    // disableAllStates();
    setGeneralMode(true);
    // console.log(generalMode);
  };
  const authsModeHandler = () => {
    // disableAllStates();
    // setGeneralMode(false);
    // setLicenseMode(false);
    setAuthsMode(true);
  };
  const licenseModeHandler = () => {
    // disableAllStates();
    // setGeneralMode(false);
    // setAuthsMode(false);
    setLicenseMode(true);
  };
  window.electron.ipcRenderer.on('nav: mode: audio', (arg) => {
    setPlaceholder(audioSearchPlaceholder);
    disableAllStates();
    setAudioMode(true);
  });
  window.electron.ipcRenderer.on('nav: mode: video', (arg) => {
    setPlaceholder(videoSearchPlaceholder);
    disableAllStates();
    setVideoMode(true);
  });
  window.electron.ipcRenderer.on('nav: mode: warpstagram', (arg) => {
    setPlaceholder(warpstagramSearchPlaceholder);
    disableAllStates();
    setWarpstagramMode(true);
  });

  return (
    <NavContext.Provider
      value={{
        audioMode: audioMode,
        videoMode: videoMode,
        warpstagramMode: warpstagramMode,
        generalMode: generalMode,
        authsMode: authsMode,
        licenseMode: licenseMode,
        placeholder: placeholder,
        generalModeHandler: generalModeHandler,
        licenseModeHandler: licenseModeHandler,
        authsModeHandler: authsModeHandler,
        audioModeHandler: audioModeHandler,
        videoModeHandler: videoModeHandler,
        warpstagramModeHandler: warpstagramModeHandler,
        disableAllStates: disableAllStates,
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
};

export default NavContext;
