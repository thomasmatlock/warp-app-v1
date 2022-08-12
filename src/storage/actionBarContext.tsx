import React, { useState, useEffect, useContext } from 'react';
import NavContext from './navContext';

const ActionBarContext = React.createContext({
  // PLAYLISTS
  videoExists: false,
  singlePlaylistExists: false,
  multiplePlaylistsExist: false,
  channelExists: false,
  channelVideoExists: false,

  setVideoExists: false,
  setSinglePlaylistExists: false,
  setMultiplePlaylistsExist: false,
  setChannelExists: false,
  setChannelVideoExists: false,

  disableAllStates: () => {},

  isBrowserPanelCollapsed: false,
  isDownloadsPanelCollapsed: false,
  toggleDownloadsPanelCollapsed: () => {},
  toggleBrowserPanelCollapsed: () => {},
});
export const ActionBarContextProvider = (props) => {
  const navCtx = useContext(NavContext);
  // console.log(navCtx);

  // PANELS
  const [isDownloadsPanelCollapsed, setIsDownloadsPanelCollapsed] =
    useState(false);
  const [isBrowserPanelCollapsed, setIsBrowserPanelCollapsed] = useState(false);
  // VIDEOS
  const [videoExists, setVideoExists] = useState(false);
  // PLAYLISTS
  const [singlePlaylistExists, setSinglePlaylistExists] = useState(false);
  const [multiplePlaylistsExist, setMultiplePlaylistsExist] = useState(false);
  // CHANNELS
  const [channelExists, setChannelExists] = useState(false);
  const [channelVideoExists, setChannelVideoExists] = useState(false);

  const disableAllStates = () => {
    setVideoExists(false);
    setSinglePlaylistExists(false);
    setMultiplePlaylistsExist(false);
    setChannelExists(false);
    setChannelVideoExists(false);
  };
  const toggleDownloadsPanelCollapsed = () => {
    if (isDownloadsPanelCollapsed) {
      setIsDownloadsPanelCollapsed(false);

      window.electron.ipcRenderer.sendMessage('browserPanelSize', 'default');
    } else if (!isBrowserPanelCollapsed) {
      setIsDownloadsPanelCollapsed(true);
      window.electron.ipcRenderer.sendMessage('browserPanelSize', 'expand');
    }
  };
  const toggleBrowserPanelCollapsed = () => {
    if (isBrowserPanelCollapsed) {
      setIsBrowserPanelCollapsed(false);
      window.electron.ipcRenderer.sendMessage('browserPanelSize', 'default');
    } else if (!isBrowserPanelCollapsed) {
      setIsBrowserPanelCollapsed(true);
      window.electron.ipcRenderer.sendMessage('browserPanelSize', 'collapse');
    }
  };
  return (
    <ActionBarContext.Provider
      value={{
        videoExists: videoExists,
        singlePlaylistExists: singlePlaylistExists,
        multiplePlaylistsExist: multiplePlaylistsExist,
        channelExists: channelExists,
        channelVideoExists: channelVideoExists,

        setVideoExists: setVideoExists,
        setSinglePlaylistExists: setSinglePlaylistExists,
        setMultiplePlaylistsExist: setMultiplePlaylistsExist,
        setChannelExists: setChannelExists,
        setChannelVideoExists: setChannelVideoExists,

        disableAllStates: disableAllStates,

        isBrowserPanelCollapsed: isBrowserPanelCollapsed,
        isDownloadsPanelCollapsed: isDownloadsPanelCollapsed,
        toggleDownloadsPanelCollapsed: toggleDownloadsPanelCollapsed,
        toggleBrowserPanelCollapsed: toggleBrowserPanelCollapsed,
      }}
    >
      {props.children}
    </ActionBarContext.Provider>
  );
};

export default ActionBarContext;
