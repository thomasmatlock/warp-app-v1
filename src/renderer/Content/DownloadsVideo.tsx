import { Fragment } from 'react';
import thumbnail from '../../../assets/Content/dummythumbnail2.jpg';

import './Downloads.scss';

const DownloadsVideo = () => {
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
      >
        <ul className="content__panel__downloads__list">
          <li className="content__panel__downloads__list__item">
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
          <li className="content__panel__downloads__list__item">
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
          <li className="content__panel__downloads__list__item">
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
          <li className="content__panel__downloads__list__item">
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
          <li className="content__panel__downloads__list__item">
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
          <li className="content__panel__downloads__list__item">
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
          <li className="content__panel__downloads__list__item">
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
          <li className="content__panel__downloads__list__item">
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
          <li className="content__panel__downloads__list__item">
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
          <li className="content__panel__downloads__list__item">
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
          <li className="content__panel__downloads__list__item">
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
          <li className="content__panel__downloads__list__item">
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
          <li className="content__panel__downloads__list__item">
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
          <li className="content__panel__downloads__list__item">
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
