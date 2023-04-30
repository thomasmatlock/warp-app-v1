/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useContext } from 'react';
import Logo from '../components/Logo/Logo';

import ThemeContext from '../../store/themeContext';
import './Nav.scss';
import NavButtons from './NavButtons';
import NavStatus from './status/NavStatus';

let appVersion = '1.0.0';
let appRoot = '1.0.0';
let updateMessage = '';
// console.log('appVersion', appVersion);

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
