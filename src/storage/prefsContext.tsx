import React, { useState, useContext } from 'react';
let prefs;
const PrefsContext = React.createContext({
  prefs: {},
  getID: () => {},
});
export const PrefsContextProvider = (props) => {
  window.electron.ipcRenderer.on('main: prefs', (arg) => {
    prefs = arg;
  });
  const checkboxHandler = (id) => {
    let newPrefs = { ...prefs };
    newPrefs.general.checkboxes.forEach((checkbox) => {
      if (checkbox.id === id) {
        checkbox.checked = !checkbox.checked;
      }
    });
    window.electron.ipcRenderer.sendMessage('main: prefs', newPrefs);
  };
  const disableDropdownOptions = (arr) => {
    arr.forEach((list) => {
      console.log(list);
      list.options.forEach((option) => {
        // option.disabled = true;
      });
    });
  };
  const audioDropdownHandler = (id) => {
    let newPrefs = { ...prefs };
    if (id.includes('quality')) {
      console.log(newPrefs.audio.dropdowns);
    }
    if (id.includes('format')) {
      console.log(newPrefs.audio.dropdowns);
    }
  };

  const getDropdown = (mode, listKeyword, dropdowns) => {
    dropdowns.forEach((dropdown) => {
      if (dropdown.id.includes(mode) && dropdown.id.includes(listKeyword)) {
        console.log(dropdown);

        // return dropdown;
      }
      // console.log(dropdown.id);
    });
  };
  const dropdownHandler = (id: string) => {
    console.log(id);

    let newPrefs = { ...prefs };

    if (id.includes('audio') && id.includes('quality')) {
      getDropdown('audio', 'quality', newPrefs.audio.dropdowns);
    }
    if (id.includes('audio') && id.includes('format')) {
      getDropdown('audio', 'format', newPrefs.audio.dropdowns);
    }
  };
  const parseID = (id) => {
    // console.log(id);
    if (id.includes('dropdown')) {
      // console.log('dropdown', id);
      dropdownHandler(id);
    }
    if (id.includes('checkbox')) {
      checkboxHandler(id);
    }
    if (id.includes('outputFolder')) {
      // console.log('outputFolder', id);
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
