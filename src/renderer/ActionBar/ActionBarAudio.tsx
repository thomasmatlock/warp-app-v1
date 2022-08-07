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

  return (
    <Fragment>
      <div
        className={
          actionBarCtx.isDownloadsPanelCollapsed
            ? 'menuBar__collapsed'
            : 'menuBar'
        }
      >
        {/* <div className="menuBar__menu menuBar__menu__left">
         
        </div> */}
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
              {props.audioDownloadsTotal} audio downloads
            </div>
          )}
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
          )}
          {!actionBarCtx.isBrowserPanelCollapsed &&
            !actionBarCtx.isDownloadsPanelCollapsed && (
              <div
                onClick={actionBarCtx.toggleBrowserPanelCollapsed}
                className="menuBar__menu__item menuBar__menu__item__icon"
              >
                <img
                  title="Expand downloads panel"
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
                title="Restore split view"
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
                title="Restore split view"
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
                  title="Collapse downloads panel"
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
