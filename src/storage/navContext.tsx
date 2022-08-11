import React, { useState } from 'react';
const NavContext = React.createContext({
  audioMode: true,
  videoMode: false,
  warpstagramMode: false,
  generalMode: false,
  authsMode: false,
  licenseMode: false,
  audioModeHandler: () => {},
  videoModeHandler: () => {},
  warpstagramModeHandler: () => {},
  disableAllStates: () => {},
});
export const NavContextProvider = (props) => {
  const [audioMode, setAudioMode] = useState(true);
  const [videoMode, setVideoMode] = useState(false);
  const [warpstagramMode, setWarpstagramMode] = useState(false);
  const [generalMode, setGeneralMode] = useState(false);
  const [authsMode, setAuthsMode] = useState(false);
  const [licenseMode, setLicenseMode] = useState(false);

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
  window.electron.ipcRenderer.on('nav: mode: audio', (arg) => {
    disableAllStates();
    setAudioMode(true);
  });
  window.electron.ipcRenderer.on('nav: mode: video', (arg) => {
    disableAllStates();
    setVideoMode(true);
  });
  window.electron.ipcRenderer.on('nav: mode: warpstagram', (arg) => {
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
