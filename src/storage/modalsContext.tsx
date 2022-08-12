import React, { useState, useContext } from 'react';
import NavContext from './navContext';
const ModalsContext = React.createContext({
  isModalOpen: false,
  hideModalHandler: () => {},
  showModalHandler: () => {},
  //   searchInputChangeHandler: () => {},
});
export const ModalsContextProvider = (props) => {
  const navCtx = useContext(NavContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hideModalHandler = () => {
    setIsModalOpen(false);
    window.electron.ipcRenderer.sendMessage('showbWin', 'from search');
  };
  const showModalHandler = () => {
    window.electron.ipcRenderer.sendMessage('hidebWin', 'from search');
    setIsModalOpen(true);
  };
  return (
    <ModalsContext.Provider
      value={{
        isModalOpen: isModalOpen,
        hideModalHandler: hideModalHandler,
        showModalHandler: showModalHandler,
      }}
    >
      {props.children}
    </ModalsContext.Provider>
  );
};

export default ModalsContext;
