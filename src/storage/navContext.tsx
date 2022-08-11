import React, { useState } from 'react';
const NavContext = React.createContext({
  audioMode: true,
  videoMode: false,
  warpstagramMode: false,
  //   setAudioMode: false,
  //   setVideoMode: false,
  //   setWarpstagramMode: false,
  audioModeHandler: () => {},
  videoModeHandler: () => {},
  warpstagramModeHandler: () => {},
  disableAllStates: () => {},
});
export const NavContextProvider = (props) => {
  const [audioMode, setAudioMode] = useState(true);
  const [videoMode, setVideoMode] = useState(false);
  const [warpstagramMode, setWarpstagramMode] = useState(false);

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
  const disableAllStates = () => {
    setAudioMode(false);
    setVideoMode(false);
    setWarpstagramMode(false);
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
        disableAllStates: disableAllStates,
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
};

export default NavContext;
