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

  sortAZhandler: () => {},
  sortZAhandler: () => {},
  sortNewOldhandler: () => {},
  sortOldNewhandler: () => {},
  disableAllStates: () => {},

  isBrowserPanelCollapsed: false,
  isDownloadsPanelCollapsed: false,
  toggleDownloadsPanelCollapsed: () => {},
  toggleBrowserPanelCollapsed: () => {},
});
export const ActionBarContextProvider = (props) => {
  const navCtx = useContext(NavContext);
  // console.log(navCtx);
  const [sortAZ, setSortAZ] = useState(true);
  const [sortZA, setSortZA] = useState(false);
  const [sortNewOld, setSortNewOld] = useState(false);
  const [sortOldNew, setSortOldNew] = useState(false);
  const disableAllSortMethods = () => {
    setSortAZ(false);
    setSortZA(false);
    setSortNewOld(false);
    setSortOldNew(false);
  };
  const sortAZhandler = () => {
    // console.log('sortAZ');

    disableAllSortMethods();
    setSortAZ(true);
  };
  const sortZAhandler = () => {
    disableAllSortMethods();
    setSortZA(true);
  };
  const sortNewOldhandler = () => {
    disableAllSortMethods();
    setSortNewOld(true);
  };
  const sortOldNewhandler = () => {
    disableAllSortMethods();
    setSortOldNew(true);
  };
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

        sortAZhandler: sortAZhandler,
        sortZAhandler: sortZAhandler,
        sortNewOldhandler: sortNewOldhandler,
        sortOldNewhandler: sortOldNewhandler,
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
