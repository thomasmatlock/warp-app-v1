import React, { useState, useContext } from 'react';
import NavContext from './navContext';
let prefs;
const ModalsContext = React.createContext({
  prefs: {},
  isModalOpen: false,
  hideModalHandler: () => {},
  showModalHandler: () => {},
  modalStateHandler: () => {},
  getID: () => {},
  //   searchInputChangeHandler: () => {},
});
export const ModalsContextProvider = (props) => {
  const navCtx = useContext(NavContext);
  // console.log(navCtx);
  // console.log(prefs);

  // let prefs;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalStateHandler = (value: boolean) => {
    setIsModalOpen(value);
  };
  const hideModalHandler = () => {
    // console.log('hideModalHandler');

    setIsModalOpen(false);
    if (!navCtx.warpstagramMode) {
      window.electron.ipcRenderer.sendMessage('showbWin', 'from search');
    }
  };
  const showModalHandler = () => {
    // console.log('showModalHandler');

    window.electron.ipcRenderer.sendMessage('hidebWin', 'from search');
    setIsModalOpen(true);
  };
  window.electron.ipcRenderer.on('modal: preferences', () => {
    isModalOpen ? hideModalHandler() : showModalHandler();
  });
  window.electron.ipcRenderer.on('modal: preferences: license', () => {
    // navCtx.disableAllStates();
    navCtx.licenseModePrefsHandler();
    isModalOpen ? hideModalHandler() : showModalHandler();
  });

  window.electron.ipcRenderer.on('modal: preferences: auths', () => {
    // navCtx.disableAllStates();
    navCtx.authsModePrefsHandler();
    if (isModalOpen) {
      hideModalHandler();
    } else if (!isModalOpen) {
      showModalHandler();
    }
  });
  // let prefs;
  window.electron.ipcRenderer.on('main: prefs', (arg) => {
    prefs = arg;
    // showModalHandler(); // TESTING ONLY, REMOVE FOR PRODUCTION
  });
  const getID = (id: string) => {
    console.log(id);
  };
  return (
    <ModalsContext.Provider
      value={{
        prefs: prefs,
        isModalOpen: isModalOpen,
        hideModalHandler: hideModalHandler,
        getID: getID,
        showModalHandler: showModalHandler,
        modalStateHandler: modalStateHandler,
      }}
    >
      {props.children}
    </ModalsContext.Provider>
  );
};

export default ModalsContext;
