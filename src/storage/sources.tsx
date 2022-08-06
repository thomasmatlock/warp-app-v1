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
  const sources = {
    facebook: { URL: 'https://facebook.com', active: false, enabled: false },
    instagram: { URL: 'https://instagram.com', active: false, enabled: false },
    pinterest: { URL: 'https://pinterest.com', active: false, enabled: false },
    snapchat: { URL: 'https://snapchat.com', active: false, enabled: false },
    soundcloud: {
      URL: 'https://soundcloud.com',
      active: false,
      enabled: false,
    },
    tiktok: { URL: 'https://tiktok.com', active: false, enabled: false },
    twitch: { URL: 'https://twitch.com', active: false, enabled: false },
    twitter: { URL: 'https://twitter.com', active: false, enabled: false },
    vimeo: { URL: 'https://vimeo.com', active: false, enabled: false },
    youtube: { URL: 'https://youtube.com', active: true, enabled: true },
  };
  // const toggleTheme = () => {
  //   console.log('changing theme');

  //   if (isDarkTheme) {
  //     setIsDarkTheme(false);
  //   } else if (!isDarkTheme) {
  //     setIsDarkTheme(true);
  //   }
  // };

  return (
    <ThemeContext.Provider
      value={{
        sources: sources,
        isDarkTheme: isDarkTheme,
        toggleTheme: toggleTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
