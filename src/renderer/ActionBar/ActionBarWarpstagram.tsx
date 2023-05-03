import { Fragment, useState, useContext } from 'react';
import sortIcon from './assets/sort.svg';
import ThemeContext from '../../store/themeContext';
import ActionBarContext from '../../store/actionBarContext';
import ContextMenu from '../ContextMenu/ContextMenu';
import ContextMenuSortOptions from '../ContextMenu/ContextMenuOptionsSort';

import './ActionBarWarpstagram.scss';
const FilterBar = (props) => {
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  // console.log(actionBarCtx);
  const downloadsTotalString =
    props.warpstagramDownloadsTotal === 1
      ? `${props.warpstagramDownloadsTotal}  account`
      : `${props.warpstagramDownloadsTotal} accounts`;
  const [isContextMenuVisible, setisContextMenuVisible] = useState(false);
  const toggleContextMenuSort = () => {
    if (isContextMenuVisible) {
      setisContextMenuVisible(false);
    } else {
      setisContextMenuVisible(true);
    }
  };
  const turnOffContextMenu = () => {
    setisContextMenuVisible(false);
  };

  const [filterTypeAll, setFilterTypeAll] = useState(true);
  const [filterTypeUsers, setFilterTypeUsers] = useState(false);
  const [filterTypeHashtags, setFilterTypeHashtags] = useState(false);
  const [filterTypeLocations, setFilterTypeLocations] = useState(false);

  const filterTypeAllHandler = () => {
    window.electron.ipcRenderer.sendMessage(
      'FilterBar: Warpstagram: FilterTypeAll',
      [`FilterBar: Warpstagram: FilterTypeAll`]
    );
    setFilterTypeAll(true);
    setFilterTypeUsers(false);
    setFilterTypeHashtags(false);
    setFilterTypeLocations(false);
  };
  const filterTypeUsersHandler = () => {
    window.electron.ipcRenderer.sendMessage(
      'FilterBar: Warpstagram: FilterTypeUsers',
      [`FilterBar: Warpstagram: FilterTypeUsers`]
    );
    setFilterTypeAll(false);
    setFilterTypeUsers(true);
    setFilterTypeHashtags(false);
    setFilterTypeLocations(false);
  };
  const filterTypeHashtagsHandler = () => {
    window.electron.ipcRenderer.sendMessage(
      'FilterBar: Warpstagram: FilterTypeHashtags',
      [`FilterBar: Warpstagram: FilterTypeHashtags`]
    );
    setFilterTypeAll(false);
    setFilterTypeUsers(false);
    setFilterTypeHashtags(true);
    setFilterTypeLocations(false);
  };
  const filterTypeLocationsHandler = () => {
    window.electron.ipcRenderer.sendMessage(
      'FilterBar: Warpstagram: FilterTypeLocations',
      [`FilterBar: Warpstagram: FilterTypeLocations`]
    );
    setFilterTypeAll(false);
    setFilterTypeUsers(false);
    setFilterTypeHashtags(false);
    setFilterTypeLocations(true);
  };
  let items;
  // document.querySelectorAll('.filter-content__panel__warpstagram__account');
  // console.log(items);
  setTimeout(() => {
    items = document.querySelectorAll('.filter-filterBar__menu__item');
    // console.log(items);
  }, 1000);

  return (
    <Fragment>
      <div onMouseLeave={turnOffContextMenu} className="filterBar">
        <div className="filterBar__menu filterBar__menu__left">
          <div
            className={
              filterTypeAll
                ? 'filterBar__menu__item__active'
                : 'filterBar__menu__item'
            }
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(0%)' }
                : {
                    filter: 'invert(100%)',
                  }
            }
            onClick={filterTypeAllHandler}
          >
            All
          </div>
          <div
            className={
              filterTypeUsers
                ? 'filterBar__menu__item__active'
                : 'filterBar__menu__item'
            }
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(0%)' }
                : {
                    filter: 'invert(100%)',
                  }
            }
            onClick={filterTypeUsersHandler}
          >
            Users
          </div>
          <div
            className={
              filterTypeHashtags
                ? 'filterBar__menu__item__active'
                : 'filterBar__menu__item'
            }
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(0%)' }
                : {
                    filter: 'invert(100%)',
                  }
            }
            onClick={filterTypeHashtagsHandler}
          >
            Hashtags
          </div>
          <div
            className={
              filterTypeLocations
                ? 'filterBar__menu__item__active'
                : 'filterBar__menu__item'
            }
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(0%)' }
                : {
                    filter: 'invert(100%)',
                  }
            }
            onClick={filterTypeLocationsHandler}
          >
            Locations
          </div>
        </div>
        <div className="filterBar__menu filterBar__menu__right">
          <div
            className="filterBar__menu__item filterBar__menu__item__accounts_total"
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(0%)' }
                : {
                    filter: 'invert(100%)',
                  }
            }
          >
            {/* {props.warpstagramDownloadsTotal} accounts */}
            {downloadsTotalString}
          </div>
          {/* <div className="filterBar__menu__item filterBar__menu__item__find">
            <img src={searchIcon} />
          </div> */}
          <div
            onClick={toggleContextMenuSort}
            className="filterBar__menu__item filterBar__menu__item__sort"
          >
            <img
              src={sortIcon}
              title="Sort"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(0%)' }
                  : {
                      filter: 'invert(100%)',
                    }
              }
            />
            {isContextMenuVisible && (
              <ContextMenu options={ContextMenuSortOptions} />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default FilterBar;
