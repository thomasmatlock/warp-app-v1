import { Fragment, useState, useContext } from 'react';
import sortIcon from '../../../assets/Content/Warpstagram/sort.svg';
import collapseIcon from '../../../assets/ActionBar/collapse.svg';
import expandIcon from '../../../assets/ActionBar/expand.svg';
import ThemeContext from '../../storage/themeContext';
import ActionBarContext from '../../storage/actionBarContext';

import './FilterBar.scss';
const FilterBar = (props) => {
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);

  return (
    <Fragment>
      <div
        // className="filterBar"
        className={
          actionBarCtx.isAudioPanelCollapsed
            ? 'filterBar__collapsed'
            : 'filterBar'
        }
      >
        <div className="filterBar__menu filterBar__menu__left">
          {!actionBarCtx.isAudioPanelCollapsed && (
            <div
              onClick={actionBarCtx.toggleAudioPanelCollapsed}
              // onClick={themeCtx.toggleTheme}
              className="filterBar__menu__item filterBar__menu__item__sort"
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
          {actionBarCtx.isAudioPanelCollapsed && (
            <div
              onClick={actionBarCtx.toggleAudioPanelCollapsed}
              className="filterBar__menu__item filterBar__menu__item__sort"
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
        </div>
        {!actionBarCtx.isAudioPanelCollapsed && (
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
              {props.audioDownloadsTotal} audio downloads
            </div>
            {/* <div className="filterBar__menu__item filterBar__menu__item__find">
            <img src={searchIcon} />
          </div> */}
            <div className="filterBar__menu__item filterBar__menu__item__sort">
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
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default FilterBar;
