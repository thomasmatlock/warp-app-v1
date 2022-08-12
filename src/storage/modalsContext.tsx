import React, { useState, useContext } from 'react';
import NavContext from './navContext';
const ModalsContext = React.createContext({
  isModalOpen: false,
  hideModalHandler: () => {},
  showModalHandler: () => {},
  modalStateHandler: () => {},
  //   searchInputChangeHandler: () => {},
});
export const ModalsContextProvider = (props) => {
  const navCtx = useContext(NavContext);
  // console.log(navCtx);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalStateHandler = (value: boolean) => {
    setIsModalOpen(value);
  };
  const hideModalHandler = () => {
    // console.log('hideModalHandler');

    setIsModalOpen(false);
    window.electron.ipcRenderer.sendMessage('showbWin', 'from search');
  };
  const showModalHandler = () => {
    // console.log('showModalHandler');

    window.electron.ipcRenderer.sendMessage('hidebWin', 'from search');
    setIsModalOpen(true);
  };
  window.electron.ipcRenderer.on('modal: preferences', (prefs) => {
    // console.log('prefs modal');
    // navCtx.disableAllStates();

    if (isModalOpen) {
      hideModalHandler();
    } else if (!isModalOpen) {
      showModalHandler();
    }
  });
  window.electron.ipcRenderer.on('modal: preferences: license', (arg) => {
    // navCtx.disableAllStates();
    navCtx.licenseModeHandler();
    if (isModalOpen) {
      hideModalHandler();
    } else if (!isModalOpen) {
      showModalHandler();
    }
  });
  window.electron.ipcRenderer.on('modal: preferences: auths', (arg) => {
    // navCtx.disableAllStates();
    navCtx.authsModeHandler();
    if (isModalOpen) {
      hideModalHandler();
    } else if (!isModalOpen) {
      showModalHandler();
    }
  });
  return (
    <ModalsContext.Provider
      value={{
        isModalOpen: isModalOpen,
        hideModalHandler: hideModalHandler,
        showModalHandler: showModalHandler,
        modalStateHandler: modalStateHandler,
      }}
    >
      {props.children}
    </ModalsContext.Provider>
  );
};

export default ModalsContext;
