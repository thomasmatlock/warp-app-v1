import React, { useState, useContext } from 'react';
import NavContext from './navContext';
let prefs;
const PreferencesContext = React.createContext({
  prefs: {},
  getID: () => {},
});
export const PreferencesContextProvider = (props) => {
  window.electron.ipcRenderer.on('main: prefs', (arg) => {
    prefs = arg;
  });
  const getID = (id: string) => {
    console.log(id);
  };
  return (
    <PreferencesContext.Provider
      value={{
        prefs: prefs,
        getID: getID,
      }}
    >
      {props.children}
    </PreferencesContext.Provider>
  );
};

export default PreferencesContext;
