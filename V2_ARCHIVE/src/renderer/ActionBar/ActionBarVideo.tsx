import { Fragment, useState, useContext } from 'react';
import sortIcon from '../../../assets/Content/Warpstagram/sort.svg';
import collapseIcon from '../../../assets/ActionBar/collapse.svg';
import expandIcon from '../../../assets/ActionBar/expand.svg';
import ThemeContext from '../../storage/themeContext';
import ActionBarContext from '../../storage/actionBarContext';

import ContextMenu from '../ContextMenu/ContextMenu';
import ContextMenuSortOptions from '../ContextMenu/ContextMenuOptionsSort';

import './ActionBarWarpstagram.scss';
const FilterBar = (props) => {
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  // console.log(actionBarCtx);

  const [filterTypeAll, setFilterTypeAll] = useState(true);
  const [filterTypeUsers, setFilterTypeUsers] = useState(false);
  const [filterTypeHashtags, setFilterTypeHashtags] = useState(false);
  const [filterTypeLocations, setFilterTypeLocations] = useState(false);
  const [isContextMenuVisible, setisContextMenuVisible] = useState(false);
  const downloadsTotalString =
    props.videoDownloadsTotal === 1
      ? `${props.videoDownloadsTotal} video download`
      : `${props.videoDownloadsTotal} video downloads`;
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
  return (
    <Fragment>
      <div
        onMouseLeave={turnOffContextMenu}
        // className="filterBar"
        className={
          actionBarCtx.isDownloadsPanelCollapsed
            ? 'filterBar__collapsed'
            : 'filterBar'
        }
      >
        <div className="filterBar__menu filterBar__menu__left"></div>
        <div className="filterBar__menu filterBar__menu__right">
          {!actionBarCtx.isDownloadsPanelCollapsed && (
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
              {downloadsTotalString}
              {/* {downloadsTotal} {downloadsTotal.length > 0 ? ''} */}
            </div>
          )}
          {/* <div className="filterBar__menu__item filterBar__menu__item__find">
            <img src={searchIcon} />
          </div> */}
          {!actionBarCtx.isDownloadsPanelCollapsed && (
            <div
              onClick={toggleContextMenuSort}
              className="filterBar__menu__item filterBar__menu__item__sort"
            >
              <img
                title="Sort"
                src={sortIcon}
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
          )}{' '}
          {!actionBarCtx.isBrowserPanelCollapsed &&
            !actionBarCtx.isDownloadsPanelCollapsed && (
              <div
                onClick={actionBarCtx.toggleBrowserPanelCollapsed}
                className="filterBar__menu__item filterBar__menu__item__sort"
              >
                <img
                  title="collapse browser"
                  src={expandIcon}
                  style={
                    themeCtx.isDarkTheme
                      ? { filter: 'invert(100%)' }
                      : {
                          filter: 'invert(0%)',
                        }
                  }
                />
              </div>
            )}
          {actionBarCtx.isBrowserPanelCollapsed && (
            <div
              onClick={actionBarCtx.toggleBrowserPanelCollapsed}
              className="filterBar__menu__item filterBar__menu__item__sort"
            >
              <img
                title="reset browser"
                src={collapseIcon}
                style={
                  themeCtx.isDarkTheme
                    ? { filter: 'invert(100%)' }
                    : {
                        filter: 'invert(0%)',
                      }
                }
              />
            </div>
          )}
          {actionBarCtx.isDownloadsPanelCollapsed && (
            <div
              onClick={actionBarCtx.toggleDownloadsPanelCollapsed}
              className="filterBar__menu__item filterBar__menu__item__sort"
            >
              <img
                title="Collapse audio downloads panel"
                src={expandIcon}
                style={
                  themeCtx.isDarkTheme
                    ? { filter: 'invert(100%)' }
                    : {
                        filter: 'invert(0%)',
                      }
                }
              />
            </div>
          )}{' '}
          {!actionBarCtx.isDownloadsPanelCollapsed &&
            !actionBarCtx.isBrowserPanelCollapsed && (
              <div
                onClick={actionBarCtx.toggleDownloadsPanelCollapsed}
                className="filterBar__menu__item filterBar__menu__item__sort"
              >
                <img
                  title="Expand audio downloads panel"
                  src={collapseIcon}
                  style={
                    themeCtx.isDarkTheme
                      ? { filter: 'invert(100%)' }
                      : {
                          filter: 'invert(0%)',
                        }
                  }
                />
              </div>
            )}
        </div>
      </div>
    </Fragment>
  );
};
export default FilterBar;
