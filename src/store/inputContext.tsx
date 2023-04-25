import React, { useState } from 'react';
const InputContext = React.createContext({
  searchText: '',
  setSearchText: (text: string) => {},
  searchInputSubmit: () => {},
  searchInputChangeHandler: () => {},
});
export const InputContextProvider = (props) => {
  const [searchText, setSearchText] = useState('');

  const searchInputSubmit = (event) => {
    event.preventDefault();
    if (searchText.length > 0) {
      // console.log(searchText);
      window.electron.ipcRenderer.sendMessage('Search: Submit', [searchText]);
    } else {
      console.log('no search text');
    }
  };
  return (
    <InputContext.Provider
      value={{
        searchText: searchText,
        setSearchText: setSearchText,
        searchInputSubmit: searchInputSubmit,
        // searchInputChangeHandler: searchInputChangeHandler,
      }}
    >
      {props.children}
    </InputContext.Provider>
  );
};

export default InputContext;
