import { Fragment, useState } from 'react';
import './BrowserBarDownloadSource.scss';
import browserBarDownloadSourceIcon1 from '../../../assets/ActionBar/youtube.svg';
import browserBarDownloadSourceIcon2 from '../../../assets/ActionBar/caret-down.svg';
import downloadSourceIcon__available from '../../../assets/BrowserBar/check.svg';
import downloadSourceIcon__unavailable from '../../../assets/BrowserBar/remove.svg';
import downloadSourceIconFacebook from '../../../assets/BrowserBar/facebook.svg';
import downloadSourceIconSoundcloud from '../../../assets/BrowserBar/soundcloud.svg';
import downloadSourceIconTiktok from '../../../assets/BrowserBar/tiktok.svg';
import downloadSourceIconTwitter from '../../../assets/BrowserBar/twitter.svg';
import downloadSourceIconYoutube from '../../../assets/BrowserBar/youtube.svg';

// import browserBarDownloadSourceIcon1 from '../../../../assets/3rdparty/fontawesome/svgs/brands/youtube.svg';
// import browserBarDownloadSourceIcon2 from '../../../../assets/3rdparty/fontawesome/svgs/solid/caret-down.svg';
const BrowserBarDownloadSource = () => {
  const [sourceFacebookActive, setSourceFacebookActive] = useState(false);
  const [sourceSoundcloudActive, setSourceSoundcloudActive] = useState(false);
  const [sourceTiktokActive, setSourceTiktokActive] = useState(false);
  const [sourceTwitterActive, setSourceTwitterActive] = useState(false);
  const [sourceYoutubeActive, setSourceYoutubeActive] = useState(false);
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(false);
  // const selectedSourceHandler = (event) => {
  //   if (event.target.nodeName === 'IMG') {
  //     console.log('IMG found');
  //     console.log(event.target.parentNode.parentNode.id); // GOOD
  //   }
  //   if (event.target.nodeName === 'LI') {
  //     console.log(event.target.id);
  //   }
  //   if (event.target.nodeName === 'DIV') {
  //     // console.log('DIV  found');
  //     if (event.target.parentNode.parentNode.nodeName === 'LI') {
  //       console.log(event.target.parentNode.parentNode.id);
  //       // console.log('LI found');
  //     }
  //     if (event.target.parentNode.parentNode.nodeName === 'UL') {
  //       console.log('UL found');
  //       console.log(event.target.parentNode.parentNode.children);
  //     }
  //     // if (event.target.parentNode.parentNode.nodeName === 'UL') {
  //     //   console.log(event.target.parentNode.parentNode);
  //     // }
  //   }
  // };
  const disableAllSources = () => {
    setSourceFacebookActive(false);
    setSourceSoundcloudActive(false);
    setSourceTiktokActive(false);
    setSourceTwitterActive(false);
    setSourceYoutubeActive(false);
    // console.log('disabledAllSources');
  };
  const selectedSourceHandler = (event) => {
    disableAllSources();
    toggleSourceExpanded();
  };
  const toggleSourceExpanded = (event) => {
    window.electron.ipcRenderer.sendMessage('hideBrowserWindow');
    if (isSourcesExpanded) {
      setIsSourcesExpanded(false);
    } else if (!isSourcesExpanded) {
      setIsSourcesExpanded(true);
    }
  };
  const mouseEnterHandler = () => {
    // console.log('mouse enter');
  };
  const mouseLeaveHandler = () => {
    window.electron.ipcRenderer.sendMessage('showBrowserWindow');
    // console.log('mouse leave');
  };
  return (
    <Fragment>
      <div
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        onClick={toggleSourceExpanded}
        className={
          !isSourcesExpanded
            ? 'browserBarDownloadSource'
            : 'browserBarDownloadSource__hovering'
        }
      >
        <ul
          className={
            !isSourcesExpanded
              ? 'browserBarDownloadSource__list'
              : 'browserBarDownloadSource__hovering__list'
          }
        >
          <li
            onClick={selectedSourceHandler}
            className="browserBarDownloadSource__list__item "
            id="downloadSource__facebook"
          >
            <div className="browserBarDownloadSource__list__item__container1">
              <img
                src={downloadSourceIconFacebook}
                className="browserBarDownloadSource__list__item__icon"
              />
              <div className="browserBarDownloadSource__list__item__text browserBarDownloadSource__list__item__title">
                Facebook
              </div>
            </div>
            <div className="browserBarDownloadSource__list__item__container2">
              <img
                src={downloadSourceIcon__available}
                alt=""
                loading="lazy"
                className="browserBarDownloadSource__list__item__icon browserBarDownloadSource__list__item__icon__status browserBarDownloadSource__list__item__icon__status__1"
              />
            </div>
          </li>
          <li
            onClick={selectedSourceHandler}
            id="downloadSource__soundcloud"
            className="browserBarDownloadSource__list__item "
          >
            <div className="browserBarDownloadSource__list__item__container1">
              <img
                src={downloadSourceIconSoundcloud}
                alt=""
                loading="lazy"
                className="browserBarDownloadSource__list__item__icon"
              />

              <div className="browserBarDownloadSource__list__item__text browserBarDownloadSource__list__item__title">
                Soundcloud
              </div>
            </div>
            <div className="browserBarDownloadSource__list__item__container2">
              <img
                id="browserBarDownloadSource__list__item__icon__status__2"
                src={downloadSourceIcon__available}
                alt=""
                loading="lazy"
                className="browserBarDownloadSource__list__item__icon browserBarDownloadSource__list__item__icon__status browserBarDownloadSource__list__item__icon__status__2"
              />
            </div>
          </li>
          <li
            onClick={selectedSourceHandler}
            id="downloadSource__tiktok"
            className="browserBarDownloadSource__list__item "
          >
            <div className="browserBarDownloadSource__list__item__container1">
              <img
                src={downloadSourceIconTiktok}
                className="browserBarDownloadSource__list__item__icon"
              />

              <div className="browserBarDownloadSource__list__item__text browserBarDownloadSource__list__item__title">
                Tiktok
              </div>
            </div>
            <div className="browserBarDownloadSource__list__item__container2">
              <img
                src={downloadSourceIcon__available}
                className="browserBarDownloadSource__list__item__icon browserBarDownloadSource__list__item__icon__status browserBarDownloadSource__list__item__icon__status__3"
              />
            </div>
          </li>
          <li
            onClick={selectedSourceHandler}
            id="downloadSource__twitter"
            className="browserBarDownloadSource__list__item "
          >
            <div className="browserBarDownloadSource__list__item__container1">
              <img
                src={downloadSourceIconTwitter}
                className="browserBarDownloadSource__list__item__icon "
              />

              <div className="browserBarDownloadSource__list__item__text browserBarDownloadSource__list__item__title">
                Twitter
              </div>
            </div>
            <div className="browserBarDownloadSource__list__item__container2">
              <img
                src={downloadSourceIcon__unavailable}
                className="browserBarDownloadSource__list__item__icon browserBarDownloadSource__list__item__icon__status browserBarDownloadSource__list__item__icon__status__4"
              />
            </div>
          </li>
          <li
            id="downloadSource__youtube"
            onClick={selectedSourceHandler}
            className="browserBarDownloadSource__list__item "
          >
            <div className="browserBarDownloadSource__list__item__container1">
              <img
                src={downloadSourceIconYoutube}
                className="browserBarDownloadSource__list__item__icon"
              />

              <div className="browserBarDownloadSource__list__item__text browserBarDownloadSource__list__item__title">
                Youtube
              </div>
            </div>
            <div className="browserBarDownloadSource__list__item__container2">
              <img
                src={downloadSourceIcon__available}
                className="browserBarDownloadSource__list__item__icon browserBarDownloadSource__list__item__icon__status browserBarDownloadSource__list__item__icon__status__5"
              />
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
export default BrowserBarDownloadSource;
