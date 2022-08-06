import React, { useState, useEffect } from 'react';
// AuthContext is a obj that contains a component, not a component itself
// React.createContext, which this creates app-wide global state
// you need to do 2 things to use this, 1) provide it, and 2) consume it. MAN this is GREAT. consuming it, is basically listening to it
// 1) providing it also means you need to "wrap" all the components that use it, inside of it, so they can listen to it
// wrapping App in it, means everything in App will listen to it, and everything in App will be able to access it
// need
// put default contexts into this
const ThemeContext = React.createContext({
  isDarkTheme: true,
  toggleTheme: () => {},
});

export const ThemeContextProvider = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const colors = {
    black: '#000000',
    dark1: '#1a1a1a',
    dark2: '#202020',
    dark3: '#252525',
    dark4: '#313131',
    dark5: '#3d3d3d',
    dark6: '#434243',
    dark7: '#545254',
    dark8: '#656465',
    light8: '#757575',
    light7: '#868786',
    light6: '#979798',
    light5: '#A8A7A8',
    light4: '#B8BAB8',
    light3: '#CACACA',
    light2: '#DBDCDB',
    light1: '#ECECEC',
    white: '#FFFFFF',
  };
  const search = {
    dark: {
      color: colors.light1,
      placeholderColor: colors.light1,
      backgroundColor: colors.dark1,
      inputBackgroundColor: colors.dark2,
      inputBorderColor: colors.dark2,
    },
    light: {
      color: colors.black,
      placeholderColor: colors.dark1,
      backgroundColor: colors.white,
      inputBackgroundColor: colors.white,
      inputBorderColor: colors.light2,
    },
  };
  const downloads = {
    dark: {
      color: colors.light1,
      placeholderColor: colors.light1,
      backgroundColor: colors.dark1,
      inputBackgroundColor: colors.dark2,
      inputBorderColor: colors.dark2,
    },
    light: {
      color: colors.black,
      placeholderColor: colors.dark1,
      backgroundColor: colors.white,
      inputBackgroundColor: colors.light1,
      inputBorderColor: colors.light2,
    },
  };
  const nav = {
    dark: {
      color: colors.light1,
      placeholderColor: colors.light1,
      backgroundColor: colors.dark1,
      inputBackgroundColor: colors.dark2,
      inputBorderColor: colors.dark2,
    },
    light: {
      color: colors.black,
      placeholderColor: colors.dark1,
      backgroundColor: colors.white,
      inputBackgroundColor: colors.light1,
      inputBorderColor: colors.light2,
    },
  };
  const content = {
    dark: {
      color: colors.light1,
      placeholderColor: colors.light1,
      backgroundColor: colors.dark3,
      inputBackgroundColor: colors.dark2,
      inputBorderColor: colors.dark2,
    },
    light: {
      color: colors.black,
      placeholderColor: colors.dark1,
      backgroundColor: colors.light1,
      inputBackgroundColor: colors.light1,
      inputBorderColor: colors.light2,
    },
  };
  const actionBar = {
    dark: {
      color: colors.light1,
      placeholderColor: colors.light1,
      backgroundColor: colors.dark2,
      inputBackgroundColor: colors.dark2,
      inputBorderColor: colors.dark2,
    },
    light: {
      color: colors.black,
      placeholderColor: colors.dark1,
      backgroundColor: colors.white,
      inputBackgroundColor: colors.light1,
      inputBorderColor: colors.light2,
    },
  };
  const toggleTheme = () => {
    console.log('toggleTheme');

    if (isDarkTheme) {
      setIsDarkTheme(false);
    } else if (!isDarkTheme) {
      setIsDarkTheme(true);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        search: search,
        actionBar: actionBar,
        content: content,
        downloads: downloads,
        nav: nav,
        isDarkTheme: isDarkTheme,
        toggleTheme: toggleTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
