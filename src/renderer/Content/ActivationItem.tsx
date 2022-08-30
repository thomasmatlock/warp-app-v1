// import classes from './CartItem.module.css';
import React, { useState, useState, useContext } from 'react';
import iconSourceFacebook from '../../../assets/BrowserBar/facebook.svg';
import iconSourceInstagram from '../../../assets/BrowserBar/instagram.svg';
import iconSourcePinterest from '../../../assets/BrowserBar/pinterest.svg';
import iconSourceSoundcloud from '../../../assets/BrowserBar/soundcloud.svg';
import iconSourceSnapchat from '../../../assets/BrowserBar/snapchat.svg';
import iconSourceTiktok from '../../../assets/BrowserBar/tiktok.svg';
import iconSourceTwitch from '../../../assets/BrowserBar/twitch.svg';
import iconSourceTwitter from '../../../assets/BrowserBar/twitter.svg';
import iconSourceVimeo from '../../../assets/BrowserBar/vimeo.svg';
import iconSourceYoutube from '../../../assets/BrowserBar/youtube.svg';
import iconLength from '../../../assets/Downloads/duration.svg';
import iconFileSize from '../../../assets/Downloads/fileSize.svg';
import IconFileTypeAudio from '../../../assets/Downloads/fileTypeAudio.svg';
import IconFileTypeVideo from '../../../assets/Downloads/fileTypeVideo.svg';
import iconFileResolution from '../../../assets/Downloads/resolution.svg';
import IconFileFps from '../../../assets/Downloads/fps1.svg';
import IconFileDownloading from '../../../assets/Downloads/download.svg';
import IconFileConverting from '../../../assets/Downloads/converting.svg';
import IconDate from '../../../assets/Downloads/date.svg';
// import IconDate from '../../../assets/Downloads/date2.svg';
import SourcesContext from '../../storage/sourcesContext';
import ThemeContext from 'storage/themeContext';
import DownloadsContext from 'storage/downloadsContext';
import menuIcon from '../../../assets/Warpstagram/menu.svg';
import iconFolder from '../../../assets/Downloads/folder1.svg';
import ContextMenu from '../ContextMenu/ContextMenu';
import ContextMenuDownloadItemOptions from '../ContextMenu/ContextMenuDownloadItemOptions';
import itemFormat from './DownloadItemFormat';
// console.log(itemFormat);

const ActivationItem = (props) => {
  // console.log(props);
  const themeCtx = useContext(ThemeContext);
  const downloadsCtx = useContext(DownloadsContext);
  return (
    <li
      onClick={() => {}}
      className={'content__panel__downloads__list__activation__item'}
      style={
        themeCtx.isDarkTheme
          ? {
              backgroundColor: themeCtx.nav.dark.backgroundColor,
            }
          : {
              backgroundColor: themeCtx.nav.light.backgroundColor,
            }
      }
    >
      <div className="content__panel__downloads__list__activation__item__title">
        <p>{props.title}</p>
      </div>
      <div className="content__panel__downloads__list__activation__item__cta">
        <p>{props.ctaText}</p>
      </div>
    </li>
  );
};

export default ActivationItem;
