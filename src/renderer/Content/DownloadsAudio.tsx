import { Fragment, useState } from 'react';
import thumbnail from '../../../assets/Content/dummy_thumbnail.png';

import './Downloads.scss';

const DownloadsAudio = () => {
  const [searchInput, setSearchInput] = useState('');

  window.electron.ipcRenderer.on('Search: InputChange', (arg) => {
    setSearchInput(arg[0]);
  });
  return (
    <Fragment>
      <div className="contentPanel">
        {/* <div className="content__panel__toggle_collapse"></div> */}
        <ul className="content__panel__downloads__list">
          <li className="content__panel__downloads__list__item">
            <img
              src={thumbnail}
              className="content__panel__downloads__list__item__thumbnail"
            />
            <div className="content__panel__downloads__list__item__text content__panel__downloads__list__item__title">
              Magic of Hong Kong cyberpunk drone video
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
              Magic of Hong Kong cyberpunk drone video
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
              Magic of Hong Kong cyberpunk drone video
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
              Magic of Hong Kong cyberpunk drone video
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
              Magic of Hong Kong cyberpunk drone video
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
              Magic of Hong Kong cyberpunk drone video
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
              Magic of Hong Kong cyberpunk drone video
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
              Magic of Hong Kong cyberpunk drone video
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
              Magic of Hong Kong cyberpunk drone video
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
              Magic of Hong Kong cyberpunk drone video
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
              Magic of Hong Kong cyberpunk drone video
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
              Magic of Hong Kong cyberpunk drone video
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
              Magic of Hong Kong cyberpunk drone video
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
              Magic of Hong Kong cyberpunk drone video
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
export default DownloadsAudio;
