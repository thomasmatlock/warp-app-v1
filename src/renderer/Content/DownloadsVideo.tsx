import { Fragment, useContext } from 'react';
import thumbnail from '../../../assets/Content/dummythumbnail2.jpg';
import ThemeContext from '../../storage/themeContext';

import './Downloads.scss';

const DownloadsVideo = () => {
  const themeCtx = useContext(ThemeContext);
  const mouseEnterHandler = () => {
    // console.log('mouse enter');
    window.electron.ipcRenderer.sendMessage('browserNotHovered');
  };
  const mouseLeaveHandler = () => {
    // console.log('mouse leave');
  };
  return (
    <Fragment>
      <div
        // onMouseEnter={mouseEnterHandler}
        // onMouseLeave={mouseLeaveHandler}
        className="contentPanel"
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
            <div className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title">
              Peaky Blinders Season 7: The Movie
            </div>
            <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_length">
              7:36
            </div>
            <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_type">
              MP3
            </div>
            <div className=" content__panel__downloads__list__item__text content__panel__downloads__list__item__file_size">
              8.6MB
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
export default DownloadsVideo;
