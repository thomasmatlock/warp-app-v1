import React, { useContext } from 'react';
import ThemeContext from 'storage/themeContext';
import DownloadsContext from 'storage/downloadsContext';
const ContextMenuItem = (props) => {
  const themeCtx = useContext(ThemeContext);
  const downloadsCtx = useContext(DownloadsContext);

  return (
    <li
      onClick={props.onClick}
      className="context_menu__item"
      style={
        themeCtx.isDarkTheme
          ? { filter: 'invert(0%)' }
          : {
              filter: 'invert(100%)',
            }
      }
    >
      <img
        className="context_menu__item__element context_menu__item__element__icon"
        style={
          themeCtx.isDarkTheme
            ? { filter: 'invert(100%)' }
            : {
                filter: 'invert(0%)',
              }
        }
        src={props.icon}
        alt=""
      />
      <span
        className="context_menu__item__element"
        style={
          themeCtx.isDarkTheme
            ? { filter: 'invert(0%)' }
            : {
                filter: 'invert(100%)',
              }
        }
      >
        {props.name}
      </span>
    </li>
  );
};

export default ContextMenuItem;
