import { Fragment, useContext } from 'react';
import iconLength from '../../../assets/Downloads/duration.svg';
import iconFileSize from '../../../assets/Downloads/fileSize.svg';
import iconFileResolution from '../../../assets/Downloads/resolution.svg';
import IconFileTypeVideo from '../../../assets/Downloads/fileTypeVideo.svg';
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
            <div className="content__panel__downloads__list__item__info">
              <div className="content__panel__downloads__list__item__info__container">
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
              </div>
              <div className="content__panel__downloads__list__item__info__container">
                <img
                  src={iconLength}
                  className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_length"
                  style={
                    themeCtx.isDarkTheme
                      ? { filter: 'invert(0%)' }
                      : {
                          filter: 'invert(100%)',
                        }
                  }
                ></img>
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
                <img
                  src={iconFileSize}
                  className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_length"
                  style={
                    themeCtx.isDarkTheme
                      ? { filter: 'invert(0%)' }
                      : {
                          filter: 'invert(100%)',
                        }
                  }
                ></img>
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
                <img
                  src={IconFileTypeVideo}
                  className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_length"
                  style={
                    themeCtx.isDarkTheme
                      ? { filter: 'invert(0%)' }
                      : {
                          filter: 'invert(100%)',
                        }
                  }
                ></img>
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
                  MP4
                </div>
                <img
                  src={iconFileResolution}
                  className=" content__panel__downloads__list__item__img content__panel__downloads__list__item__file_length"
                  style={
                    themeCtx.isDarkTheme
                      ? { filter: 'invert(0%)' }
                      : {
                          filter: 'invert(100%)',
                        }
                  }
                ></img>
                <div
                  className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_resolution"
                  style={
                    themeCtx.isDarkTheme
                      ? { filter: 'invert(0%)' }
                      : {
                          filter: 'invert(100%)',
                        }
                  }
                >
                  1080p
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
export default DownloadsVideo;
