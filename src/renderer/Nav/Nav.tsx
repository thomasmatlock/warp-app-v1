import { useState, useContext } from 'react';
import Logo from '../components/Logo/Logo';

import ThemeContext from '../../store/themeContext';
import './Nav.scss';
import NavButtons from './NavButtons';
import NavStatus from './status/NavStatus';

const Nav = (props) => {
  const themeCtx = useContext(ThemeContext);

  return (
    <div
      className="navMain"
      style={
        themeCtx.isDarkTheme
          ? { backgroundColor: themeCtx.nav.dark.backgroundColor }
          : {
              backgroundColor: themeCtx.nav.light.backgroundColor,
            }
      }
    >
      <Logo />
      <NavButtons />
      <NavStatus />
    </div>
  );
};
export default Nav;
