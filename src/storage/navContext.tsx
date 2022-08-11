import React, { useState } from 'react';
const NavContext = React.createContext({
  audioMode: true,
  videoMode: false,
  warpstagramMode: false,
  audioModeHandler: () => {},
  videoModeHandler: () => {},
  warpstagramModeHandler: () => {},
  disableAllStates: () => {},
});
export const NavContextProvider = (props) => {
  const [audioMode, setAudioMode] = useState(true);
  const [videoMode, setVideoMode] = useState(false);
  const [warpstagramMode, setWarpstagramMode] = useState(false);

  const disableAllStates = () => {
    setAudioMode(false);
    setVideoMode(false);
    setWarpstagramMode(false);
  };
  const audioModeHandler = () => {
    disableAllStates();
    setAudioMode(true);
  };
  const videoModeHandler = () => {
    disableAllStates();
    setVideoMode(true);
  };
  const warpstagramModeHandler = () => {
    disableAllStates();
    setWarpstagramMode(true);
  };
  //     window.electron.ipcRenderer.sendMessage('nav: mode: audio', [
  //       `Nav change: Audio Mode`,
  //     ]);
  //     window.electron.ipcRenderer.sendMessage('nav: mode: video', []);
  //     window.electron.ipcRenderer.sendMessage('nav: mode: warpstagram', [
  //       `Nav change: Warpstagram Mode`,
  //     ]);
  //   window.electron.ipcRenderer.on('nav: mode: audio', (arg) => {});
  //   window.electron.ipcRenderer.on('nav: mode: video', (arg) => {});
  //   window.electron.ipcRenderer.on('nav: mode: warpstagram', (arg) => {});
  return (
    <NavContext.Provider
      value={{
        audioMode: audioMode,
        videoMode: videoMode,
        warpstagramMode: warpstagramMode,
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
