import React, { useState, useContext } from 'react';
let prefs;
const PrefsContext = React.createContext({
  prefs: {},
  getID: () => {},
});
export const PrefsContextProvider = (props) => {
  window.electron.ipcRenderer.on('main: prefs', (arg) => {
    prefs = arg;
    // console.log(prefs);
  });
  const parseID = (id) => {
    // console.log(id);
    if (id.includes('dropdown')) {
      console.log('dropdown', id);
    }
    if (id.includes('checkbox')) {
      console.log('checkbox', id);
    }
    if (id.includes('outputFolder')) {
      console.log('outputFolder', id);
    }
  };
  const getID = (id: string) => {
    parseID(id);
    // console.log(prefs);
  };
  return (
    <PrefsContext.Provider
      value={{
        prefs: prefs,
        getID: getID,
      }}
    >
      {props.children}
    </PrefsContext.Provider>
  );
};

export default PrefsContext;
