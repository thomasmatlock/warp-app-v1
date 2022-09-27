/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import classes from './CartItem.module.css';
import { useContext } from 'react';
// import iconSourceFacebook from '../../../assets/BrowserBar/facebook.svg';
// import iconSourceInstagram from '../../../assets/BrowserBar/instagram.svg';
// import iconSourcePinterest from '../../../assets/BrowserBar/pinterest.svg';
// import iconSourceSoundcloud from '../../../assets/BrowserBar/soundcloud.svg';
// import iconSourceSnapchat from '../../../assets/BrowserBar/snapchat.svg';
// import iconSourceTiktok from '../../../assets/BrowserBar/tiktok.svg';
// import iconSourceTwitch from '../../../assets/BrowserBar/twitch.svg';
// import iconSourceTwitter from '../../../assets/BrowserBar/twitter.svg';
// import iconSourceVimeo from '../../../assets/BrowserBar/vimeo.svg';
// import iconSourceYoutube from '../../../assets/BrowserBar/youtube.svg';
// import iconLength from '../../../assets/Downloads/duration.svg';
// import iconFileSize from '../../../assets/Downloads/fileSize.svg';
// import IconFileTypeAudio from '../../../assets/Downloads/fileTypeAudio.svg';
// import IconFileTypeVideo from '../../../assets/Downloads/fileTypeVideo.svg';
// import iconFileResolution from '../../../assets/Downloads/resolution.svg';
// import IconFileFps from '../../../assets/Downloads/fps1.svg';
// import IconFileDownloading from '../../../assets/Downloads/download.svg';
// import IconFileConverting from '../../../assets/Downloads/converting.svg';
// import IconDate from '../../../assets/Downloads/date.svg';
// // import IconDate from '../../../assets/Downloads/date2.svg';
// import SourcesContext from '../../storage/sourcesContext';
import ThemeContext from 'storage/themeContext';
import DownloadsContext from 'storage/downloadsContext';
// import menuIcon from '../../../assets/Warpstagram/menu.svg';
// import iconFolder from '../../../assets/Downloads/folder1.svg';
// import ContextMenu from '../ContextMenu/ContextMenu';
// import ContextMenuDownloadItemOptions from '../ContextMenu/ContextMenuDownloadItemOptions';
// import itemFormat from './DownloadItemFormat';
import NavContext from '../../storage/navContext';
import ModalsContext from '../../storage/modalsContext';
import ProductsContext from '../../storage/productsContext';
// console.log(itemFormat);
export default function ActivationItem(props) {
  const navCtx = useContext(NavContext);
  const modalsCtx = useContext(ModalsContext);
  const productsCtx = useContext(ProductsContext);

  const clickHandler = () => {
    navCtx.licenseModePrefsHandler();
    modalsCtx.showModalHandler();
    if (props.id.toLowerCase().includes('audio')) {
      productsCtx.expandAudioCard();
    }
    if (props.id.toLowerCase().includes('video')) {
      productsCtx.expandVideoCard();
    }
  };
  const themeCtx = useContext(ThemeContext);
  const downloadsCtx = useContext(DownloadsContext);
  return (
    <li
      id={props.id}
      key={props.id}
      onClick={clickHandler}
      className="content__panel__downloads__list__activation__item"
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
        <p className="content__panel__downloads__list__activation__item__title__text1">
          {props.title}
        </p>{' '}
        <p className="content__panel__downloads__list__activation__item__title__text2">
          {props.subtitle}
        </p>
      </div>
      <div className="content__panel__downloads__list__activation__item__cta">
        <img src={props.ctaImage} />
        {/* {actionBarCtx.videoExists && <p> Download Audio {audioFormat}</p>} */}
        <p>{props.ctaText}</p>
      </div>
    </li>
  );
}
