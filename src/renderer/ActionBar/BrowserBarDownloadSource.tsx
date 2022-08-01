import { Fragment } from 'react';
import './BrowserBarDownloadSource.scss';
import browserBarDownloadSourceIcon1 from '../../../assets/ActionBar/youtube.svg';
import browserBarDownloadSourceIcon2 from '../../../assets/ActionBar/caret-down.svg';
import downloadSourceIconCheck from '../../../assets/BrowserBar/check.svg';
import downloadSourceIconRemove from '../../../assets/BrowserBar/remove.svg';
import downloadSourceIconFacebook from '../../../assets/BrowserBar/facebook.svg';
import downloadSourceIconSoundcloud from '../../../assets/BrowserBar/soundcloud.svg';
import downloadSourceIconTiktok from '../../../assets/BrowserBar/tiktok.svg';
import downloadSourceIconTwitter from '../../../assets/BrowserBar/twitter.svg';
import downloadSourceIconYoutube from '../../../assets/BrowserBar/youtube.svg';

// import browserBarDownloadSourceIcon1 from '../../../../assets/3rdparty/fontawesome/svgs/brands/youtube.svg';
// import browserBarDownloadSourceIcon2 from '../../../../assets/3rdparty/fontawesome/svgs/solid/caret-down.svg';
const BrowserBarDownloadSource = () => {
  return (
    <Fragment>
      <div className="browserBarDownloadSource ">
        {/* <li className="browserBarDownloadSource__item ">
            <div className="browserBarDownloadSource__item__container browserBarDownloadSource__item__container1">
              <img
                src={browserBarDownloadSourceIcon1}
                className="browserBarDownloadSource__item__icon"
              />

              <div className="browserBarDownloadSource__item__text browserBarDownloadSource__item__title">
                Youtube
              </div>
            </div>
            <div className="browserBarDownloadSource__item__container browserBarDownloadSource__item__container2">
              <img
                src={browserBarDownloadSourceIcon2}
                className="browserBarDownloadSource__item__icon browserBarDownloadSource__item__icon__status browserBarDownloadSource__item__icon__status__5"
              />
            </div>
          </li>
          <li className="browserBarDownloadSource__item ">
            <div className="browserBarDownloadSource__item__container browserBarDownloadSource__item__container1">
              <img
                src={browserBarDownloadSourceIcon1}
                className="browserBarDownloadSource__item__icon"
              />

              <div className="browserBarDownloadSource__item__text browserBarDownloadSource__item__title">
                Youtube
              </div>
            </div>
            <div className="browserBarDownloadSource__item__container browserBarDownloadSource__item__container2">
              <img
                src={browserBarDownloadSourceIcon2}
                className="browserBarDownloadSource__item__icon browserBarDownloadSource__item__icon__status browserBarDownloadSource__item__icon__status__5"
              />
            </div>
          </li> */}
        <ul className="feature_display_wrapup__panel__list">
          <li className="feature_display_wrapup__panel__list__item ">
            <div className="feature_display_wrapup__panel__list__item__container1">
              <img
                src={downloadSourceIconTwitter}
                className="feature_display_wrapup__panel__list__item__icon "
              />

              <div className="feature_display_wrapup__panel__list__item__text feature_display_wrapup__panel__list__item__title">
                Twitter
              </div>
            </div>
            <div className="feature_display_wrapup__panel__list__item__container2">
              <img
                src={downloadSourceIconRemove}
                className="feature_display_wrapup__panel__list__item__icon feature_display_wrapup__panel__list__item__icon__status feature_display_wrapup__panel__list__item__icon__status__4"
              />
            </div>
          </li>
          <li className="feature_display_wrapup__panel__list__item ">
            <div className="feature_display_wrapup__panel__list__item__container1">
              <img
                src={downloadSourceIconFacebook}
                className="feature_display_wrapup__panel__list__item__icon"
              />

              <div className="feature_display_wrapup__panel__list__item__text feature_display_wrapup__panel__list__item__title">
                Facebook
              </div>
            </div>
            <div className="feature_display_wrapup__panel__list__item__container2">
              <img
                src={downloadSourceIconCheck}
                alt=""
                loading="lazy"
                className="feature_display_wrapup__panel__list__item__icon feature_display_wrapup__panel__list__item__icon__status feature_display_wrapup__panel__list__item__icon__status__1"
              />
            </div>
          </li>
          <li className="feature_display_wrapup__panel__list__item ">
            <div className="feature_display_wrapup__panel__list__item__container1">
              <img
                src={downloadSourceIconSoundcloud}
                alt=""
                loading="lazy"
                className="feature_display_wrapup__panel__list__item__icon"
              />

              <div className="feature_display_wrapup__panel__list__item__text feature_display_wrapup__panel__list__item__title">
                Soundcloud
              </div>
            </div>
            <div className="feature_display_wrapup__panel__list__item__container2">
              <img
                id="feature_display_wrapup__panel__list__item__icon__status__2"
                src={downloadSourceIconCheck}
                alt=""
                loading="lazy"
                className="feature_display_wrapup__panel__list__item__icon feature_display_wrapup__panel__list__item__icon__status feature_display_wrapup__panel__list__item__icon__status__2"
              />
            </div>
          </li>
          <li className="feature_display_wrapup__panel__list__item ">
            <div className="feature_display_wrapup__panel__list__item__container1">
              <img
                src={downloadSourceIconTiktok}
                className="feature_display_wrapup__panel__list__item__icon"
              />

              <div className="feature_display_wrapup__panel__list__item__text feature_display_wrapup__panel__list__item__title">
                Tiktok
              </div>
            </div>
            <div className="feature_display_wrapup__panel__list__item__container2">
              <img
                src={downloadSourceIconCheck}
                className="feature_display_wrapup__panel__list__item__icon feature_display_wrapup__panel__list__item__icon__status feature_display_wrapup__panel__list__item__icon__status__3"
              />
            </div>
          </li>

          <li className="feature_display_wrapup__panel__list__item ">
            <div className="feature_display_wrapup__panel__list__item__container1">
              <img
                src={downloadSourceIconYoutube}
                className="feature_display_wrapup__panel__list__item__icon"
              />

              <div className="feature_display_wrapup__panel__list__item__text feature_display_wrapup__panel__list__item__title">
                Youtube
              </div>
            </div>
            <div className="feature_display_wrapup__panel__list__item__container2">
              <img
                src={downloadSourceIconCheck}
                className="feature_display_wrapup__panel__list__item__icon feature_display_wrapup__panel__list__item__icon__status feature_display_wrapup__panel__list__item__icon__status__5"
              />
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
export default BrowserBarDownloadSource;
