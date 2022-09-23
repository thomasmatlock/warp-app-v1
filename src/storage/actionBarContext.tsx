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

  sortAZ: false,
  sortZA: false,
  sortNewOld: false,
  sortOldNew: false,

  sourceWidth: 'calc(100% - 790px)',
  setSourceWidth: '',
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
  const [sortAZ, setSortAZ] = useState(false);
  const [sortZA, setSortZA] = useState(false);
  const [sortNewOld, setSortNewOld] = useState(true);
  const [sortOldNew, setSortOldNew] = useState(false);
  const disableAllSortMethods = () => {
    setSortAZ(false);
    setSortZA(false);
    setSortNewOld(false);
    setSortOldNew(false);
  };
  const sortAZhandler = () => {
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
  const [sourceWidth, setSourceWidth] = useState(
    videoExists ? 'calc(100% - 500px)' : 'calc(100% - 240px)'
  );

  const disableAllStates = () => {
    setVideoExists(false);
    setSinglePlaylistExists(false);
    setMultiplePlaylistsExist(false);
    setChannelExists(false);
    setChannelVideoExists(false);
    setSourceWidth('calc(100% - 240px)');
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
        videoExists,
        singlePlaylistExists,
        multiplePlaylistsExist,
        channelExists,
        channelVideoExists,

        setVideoExists,
        setSinglePlaylistExists,
        setMultiplePlaylistsExist,
        setChannelExists,
        setChannelVideoExists,

        sortAZ,
        sortZA,
        sortNewOld,
        sortOldNew,
        sourceWidth,
        setSourceWidth,
        sortAZhandler,
        sortZAhandler,
        sortNewOldhandler,
        sortOldNewhandler,

        disableAllStates,

        isBrowserPanelCollapsed,
        isDownloadsPanelCollapsed,
        toggleDownloadsPanelCollapsed,
        toggleBrowserPanelCollapsed,
      }}
    >
      {props.children}
    </ActionBarContext.Provider>
  );
};

export default ActionBarContext;
