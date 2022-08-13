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
  const getMatchingDropdownOption = (id: string, options: boolean[]) => {
    let newDefault;
    options.forEach((option) => {
      if (option.id === id) {
        newDefault = option;
      }
    });
    return newDefault;
  };
  const getMatchingDropdown = (
    id: string,
    mode: string,
    listKeyword: string,
    dropdowns: boolean[]
  ) => {
    let newDefault;

    dropdowns.forEach((dropdown) => {
      if (dropdown.id.includes(mode) && dropdown.id.includes(listKeyword)) {
        console.log(dropdown);
        newDefault = getMatchingDropdownOption(id, dropdown.options);
        console.log(newDefault);
      }
    });
  };
  const dropdownHandler = (id: string) => {
    // console.log(id);

    let newPrefs = { ...prefs };

    if (id.includes('audio') && id.includes('quality')) {
      getMatchingDropdown(id, 'audio', 'quality', newPrefs.audio.dropdowns);
    }
    if (id.includes('audio') && id.includes('format')) {
      getMatchingDropdown(id, 'audio', 'format', newPrefs.audio.dropdowns);
    }
    if (id.includes('video') && id.includes('quality')) {
      getMatchingDropdown(id, 'video', 'quality', newPrefs.video.dropdowns);
    }
    if (id.includes('video') && id.includes('format')) {
      getMatchingDropdown(id, 'video', 'format', newPrefs.video.dropdowns);
    }
    if (id.includes('warpstagram') && id.includes('update')) {
      getMatchingDropdown(
        id,
        'warpstagram',
        'update',
        newPrefs.warpstagram.dropdowns
      );
    }
    if (id.includes('warpstagram') && id.includes('postSorting')) {
      getMatchingDropdown(
        id,
        'warpstagram',
        'postSorting',
        newPrefs.warpstagram.dropdowns
      );
    }
    if (id.includes('warpstagram') && id.includes('autoUpdate')) {
      getMatchingDropdown(
        id,
        'warpstagram',
        'autoUpdate',
        newPrefs.warpstagram.dropdowns
      );
    }
    if (id.includes('general') && id.includes('startupMode')) {
      getMatchingDropdown(
        id,
        'general',
        'startupMode',
        newPrefs.general.dropdowns
      );
    }
    if (id.includes('general') && id.includes('startupSource')) {
      getMatchingDropdown(
        id,
        'general',
        'startupSource',
        newPrefs.general.dropdowns
      );
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
