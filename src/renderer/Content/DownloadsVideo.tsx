import { Fragment, useContext } from 'react';
import thumbnail from '../../../assets/Content/dummythumbnail2.jpg';
import ThemeContext from '../../storage/themeContext';
import ActionBarContext from '../../storage/actionBarContext';

import './Downloads.scss';

const DownloadsVideo = () => {
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  return (
    <Fragment>
      <div
        className={
          actionBarCtx.isVideoPanelCollapsed
            ? 'contentPanel__collapsed'
            : 'contentPanel'
        }
        style={
          themeCtx.isDarkTheme
            ? { backgroundColor: themeCtx.content.dark.backgroundColor }
            : {
                backgroundColor: themeCtx.content.light.backgroundColor,
              }
        }
      >
        <ul className="content__panel__downloads__list">
          <li
            className="content__panel__downloads__list__item content__panel__downloads__list__item__video"
            style={
              themeCtx.isDarkTheme
                ? { backgroundColor: themeCtx.downloads.dark.backgroundColor }
                : {
                    backgroundColor: themeCtx.downloads.light.backgroundColor,
                  }
            }
          >
            <img
              src={thumbnail}
              className="content__panel__downloads__list__item__thumbnail"
            />
            <div
              className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(0%)' }
                  : {
                      filter: 'invert(100%)',
                    }
              }
            >
              Peaky Blinders Season 7: The Movie
            </div>
            <div
              className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(0%)' }
                  : {
                      filter: 'invert(100%)',
                    }
              }
            >
              7:36
            </div>
            <div
              className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(0%)' }
                  : {
                      filter: 'invert(100%)',
                    }
              }
            >
              MP3
            </div>
            <div
              className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(0%)' }
                  : {
                      filter: 'invert(100%)',
                    }
              }
            >
              8.6MB
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
export default DownloadsVideo;
