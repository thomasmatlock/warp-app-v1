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
  console.log(props);

  // const [fileSizeExists, setFileSizeExists] = useState(props.fileSize);
  // // console.log(props);
  // function shortenString(str, maxChars) {
  //   return str.length > maxChars ? str.slice(0, maxChars - 1) + '...' : str;
  // }
  // const [isContentMenuVisible, setisContentMenuVisible] = useState(false);
  // // const options = 'downloadItemContextMenu';
  // // const sourcesCtx = useContext(SourcesContext);
  const themeCtx = useContext(ThemeContext);
  const downloadsCtx = useContext(DownloadsContext);
  // const dateString = props.timestamp;
  // const format = props.format ? props.format.toUpperCase() : '';
  // const fps = `${props.fps}`;
  // const length = `${props.length}`;
  // // const fileSize = `${props.fileSize}`;
  // const fileSizeInMB = `${(props.fileSize / 1000000).toFixed(1)}MB`;
  // // const source = itemFormat.capitalizeFirstLetter(props.source);
  // const sourceIcon = itemFormat.findSourceIcon(props.source);
  // const resolution = `${props.resolution}`;
  // const title = `${props.title}`;
  // const titleShortened = shortenString(title, 120);
  // let downloadPercentageWidth = props.downloadComplete
  //   ? 'calc(100% - 1.5rem)'
  //   : `calc(${props.downloadedPercentage}% - 1.5rem)`;

  // const showInFolderHandler = () => {
  //   downloadsCtx.showInFolder(props.id);
  //   // console.log('show in folder');
  // };

  // const toggleContextMenu = () => {
  //   if (isContentMenuVisible) {
  //     setisContentMenuVisible(false);
  //   } else {
  //     setisContentMenuVisible(true);
  //   }
  // };
  // const turnOffContextMenu = () => {
  //   setisContentMenuVisible(false);
  // };
  return (
    <li
      onClick={() => {
        // getSourceID(props.id);
        // downloadsCtx.getDownloadID(props.id);
      }}
      className={
        props.type === 'audio'
          ? 'content__panel__downloads__list__item content__panel__downloads__list__item__audio'
          : 'content__panel__downloads__list__item content__panel__downloads__list__item__video'
      }
      style={
        themeCtx.isDarkTheme
          ? {
              backgroundColor: themeCtx.nav.dark.backgroundColor,
              width: 'calc(100% - 1.5rem)',
              // width: downloadPercentageWidth,
            }
          : {
              backgroundColor: themeCtx.nav.light.backgroundColor,
              width: 'calc(100% - 1.5rem)',
            }
      }
    >
      <p>{props.title}</p>
      <p>{props.ctaText}</p>
    </li>
  );
};

export default ActivationItem;
