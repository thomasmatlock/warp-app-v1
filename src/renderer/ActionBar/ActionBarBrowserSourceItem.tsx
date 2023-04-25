/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import classes from './CartItem.module.css';
import { useState, useContext, useEffect } from 'react';
import ThemeContext from 'store/themeContext';
import downloadSourceIcon__available from './correct.svg';
// import downloadSourceIcon__unavailable from '../../../assets/BrowserBar/remove.svg';
import SourcesContext from '../../store/sourcesContext';
import ActionBarContext from '../../store/actionBarContext';

const ActionBarBrowserSourceItem = (props) => {
  const sourcesCtx = useContext(SourcesContext);
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);

  const name = `${props.name}`;
  return (
    <li
      onClick={() => {
        // getSourceID(props.id);
        sourcesCtx.setActiveSource(props.id);
      }}
      className={
        props.isActive
          ? 'browserBarDownloadSource__list__item__active'
          : 'browserBarDownloadSource__list__item'
      }
      style={
        {
          // width: sourceWidth,
          // width: 'calc(100% - 790px)',
        }
      }
      id={props.id}
    >
      <div className="browserBarDownloadSource__list__item__container1">
        <img
          src={props.src}
          className="browserBarDownloadSource__list__item__icon"
          style={
            themeCtx.isDarkTheme
              ? { filter: 'invert(0%)' }
              : {
                  filter: 'invert(100%)',
                }
          }
        />
        <div
          className="browserBarDownloadSource__list__item__text browserBarDownloadSource__list__item__title"
          style={
            themeCtx.isDarkTheme
              ? { filter: 'invert(0%)' }
              : {
                  filter: 'invert(100%)',
                }
          }
        >
          {name}
        </div>
      </div>
      <div className="browserBarDownloadSource__list__item__container2">
        <img
          src={downloadSourceIcon__available}
          className="browserBarDownloadSource__list__item__icon browserBarDownloadSource__list__item__icon__status browserBarDownloadSource__list__item__icon__status__1"
        />
      </div>
    </li>
  );
};

export default ActionBarBrowserSourceItem;
