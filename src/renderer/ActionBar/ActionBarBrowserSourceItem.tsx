// import classes from './CartItem.module.css';
import React, { useState, useContext } from 'react';
import downloadSourceIcon__available from './correct.svg';
import downloadSourceIcon__unavailable from '../../../assets/BrowserBar/remove.svg';
import SourcesContext from '../../storage/sourcesContext';
import ThemeContext from 'storage/themeContext';

const ActionBarBrowserSourceItem = (props) => {
  const sourcesCtx = useContext(SourcesContext);
  const themeCtx = useContext(ThemeContext);

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
