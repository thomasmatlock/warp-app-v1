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
    let matchingDropdown;

    dropdowns.forEach((dropdown) => {
      if (dropdown.id.includes(mode) && dropdown.id.includes(listKeyword)) {
        matchingDropdown = dropdown;
        // newDefault = getMatchingDropdownOption(id, dropdown.options);
        // console.log(newDefault);
      }
    });
    return matchingDropdown;
  };
  const setNewDefault = (newPrefs, mode, listKeyword: string, newDefault) => {
    for (let key in newPrefs) {
      if (key === mode) {
        newPrefs[key].dropdowns.forEach((dropdown, index) => {
          if (dropdown.id.includes(listKeyword)) {
            newPrefs[key].dropdowns[index].defaultValue = newDefault;
          }
        });
      }
    }
    window.electron.ipcRenderer.sendMessage('main: prefs', newPrefs);
  };
  const dropdownHandler = (id: string) => {
    let mode;
    let listKeyword;
    let newPrefs = { ...prefs };
    let matchingDropdown;
    let newDefault;

    if (id.includes('audio') && id.includes('quality')) {
      mode = 'audio';
      listKeyword = 'quality';
      matchingDropdown = getMatchingDropdown(
        id,
        mode,
        listKeyword,
        newPrefs.audio.dropdowns
      );
      newDefault = getMatchingDropdownOption(id, matchingDropdown.options);
      setNewDefault(newPrefs, mode, listKeyword, newDefault);
    }
    if (id.includes('audio') && id.includes('format')) {
      mode = 'audio';
      listKeyword = 'format';
      matchingDropdown = getMatchingDropdown(
        id,
        mode,
        listKeyword,
        newPrefs.audio.dropdowns
      );
      newDefault = getMatchingDropdownOption(id, matchingDropdown.options);
      setNewDefault(newPrefs, mode, listKeyword, newDefault);
    }
    if (id.includes('video') && id.includes('quality')) {
      mode = 'video';
      listKeyword = 'quality';
      matchingDropdown = getMatchingDropdown(
        id,
        mode,
        listKeyword,
        newPrefs.video.dropdowns
      );
      newDefault = getMatchingDropdownOption(id, matchingDropdown.options);
      setNewDefault(newPrefs, mode, listKeyword, newDefault);
    }
    if (id.includes('video') && id.includes('format')) {
      mode = 'video';
      listKeyword = 'format';
      matchingDropdown = getMatchingDropdown(
        id,
        mode,
        listKeyword,
        newPrefs.video.dropdowns
      );
      newDefault = getMatchingDropdownOption(id, matchingDropdown.options);
      setNewDefault(newPrefs, mode, listKeyword, newDefault);
    }
    if (id.includes('warpstagram') && id.includes('update')) {
      mode = 'warpstagram';
      listKeyword = 'update';
      matchingDropdown = getMatchingDropdown(
        id,
        mode,
        listKeyword,
        newPrefs.warpstagram.dropdowns
      );
      newDefault = getMatchingDropdownOption(id, matchingDropdown.options);
      setNewDefault(newPrefs, mode, listKeyword, newDefault);
    }
    if (id.includes('warpstagram') && id.includes('postSorting')) {
      mode = 'warpstagram';
      listKeyword = 'postSorting';
      matchingDropdown = getMatchingDropdown(
        id,
        mode,
        listKeyword,
        newPrefs.warpstagram.dropdowns
      );
      newDefault = getMatchingDropdownOption(id, matchingDropdown.options);
      setNewDefault(newPrefs, mode, listKeyword, newDefault);
    }
    if (id.includes('warpstagram') && id.includes('autoUpdate')) {
      mode = 'warpstagram';
      listKeyword = 'autoUpdate';
      matchingDropdown = getMatchingDropdown(
        id,
        mode,
        listKeyword,
        newPrefs.warpstagram.dropdowns
      );
      newDefault = getMatchingDropdownOption(id, matchingDropdown.options);
      setNewDefault(newPrefs, mode, listKeyword, newDefault);
    }
    if (id.includes('general') && id.includes('startupMode')) {
      mode = 'general';
      listKeyword = 'startupMode';
      matchingDropdown = getMatchingDropdown(
        id,
        mode,
        listKeyword,
        newPrefs.general.dropdowns
      );
      newDefault = getMatchingDropdownOption(id, matchingDropdown.options);
      setNewDefault(newPrefs, mode, listKeyword, newDefault);
    }
    if (id.includes('general') && id.includes('startupSource')) {
      mode = 'general';
      listKeyword = 'startupSource';
      matchingDropdown = getMatchingDropdown(
        id,
        mode,
        listKeyword,
        newPrefs.general.dropdowns
      );
      newDefault = getMatchingDropdownOption(id, matchingDropdown.options);
      setNewDefault(newPrefs, mode, listKeyword, newDefault);
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
