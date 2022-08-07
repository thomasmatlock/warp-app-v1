import { Fragment, useState, useContext } from 'react';
import sortIcon from '../../../assets/Content/Warpstagram/sort.svg';
import collapseIcon from '../../../assets/ActionBar/collapse.svg';
import expandIcon from '../../../assets/ActionBar/expand.svg';
import ThemeContext from '../../storage/themeContext';
import ActionBarContext from '../../storage/actionBarContext';

import './ActionBarMenu.scss';
const FilterBar = (props) => {
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  // console.log(actionBarCtx);

  const [filterTypeAll, setFilterTypeAll] = useState(true);
  const [filterTypeUsers, setFilterTypeUsers] = useState(false);
  const [filterTypeHashtags, setFilterTypeHashtags] = useState(false);
  const [filterTypeLocations, setFilterTypeLocations] = useState(false);

  return (
    <Fragment>
      <div
        // className="menuBar"
        className={
          actionBarCtx.isDownloadsPanelCollapsed
            ? 'menuBar__collapsed'
            : 'menuBar'
        }
      >
        <div className="menuBar__menu menuBar__menu__left"></div>
        <div className="menuBar__menu menuBar__menu__right">
          {!actionBarCtx.isDownloadsPanelCollapsed && (
            <div
              className="menuBar__menu__item menuBar__menu__item__accounts_total"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(0%)' }
                  : {
                      filter: 'invert(100%)',
                    }
              }
            >
              {props.videoDownloadsTotal} video downloads
            </div>
          )}
          {/* <div className="menuBar__menu__item menuBar__menu__item__find">
            <img src={searchIcon} />
          </div> */}
          {!actionBarCtx.isDownloadsPanelCollapsed && (
            <div className="menuBar__menu__item menuBar__menu__item__icon">
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
            </div>
          )}{' '}
          {!actionBarCtx.isBrowserPanelCollapsed &&
            !actionBarCtx.isDownloadsPanelCollapsed && (
              <div
                onClick={actionBarCtx.toggleBrowserPanelCollapsed}
                className="menuBar__menu__item menuBar__menu__item__icon"
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
              className="menuBar__menu__item menuBar__menu__item__icon"
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
              className="menuBar__menu__item menuBar__menu__item__icon"
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
                className="menuBar__menu__item menuBar__menu__item__icon"
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
