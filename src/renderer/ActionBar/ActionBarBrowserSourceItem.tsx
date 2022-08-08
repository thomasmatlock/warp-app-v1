// import classes from './CartItem.module.css';
import React, { useState, useContext } from 'react';
import downloadSourceIcon__available from '../../../assets/BrowserBar/check.svg';
import downloadSourceIcon__unavailable from '../../../assets/BrowserBar/remove.svg';
import SourcesContext from '../../storage/sourcesContext';

const ActionBarBrowserSourceItem = (props) => {
  const sourcesCtx = useContext(SourcesContext);

  const getSourceID = (id) => {
    sourcesCtx.setActiveSource(id);
  };
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
        />
        <div className="browserBarDownloadSource__list__item__text browserBarDownloadSource__list__item__title">
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
