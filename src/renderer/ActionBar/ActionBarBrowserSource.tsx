/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Fragment, useState, useContext, useEffect } from 'react';
import ThemeContext from '../../store/themeContext';
import SourcesContext from '../../store/sourcesContext';
import ActionBarBrowserSourceItem from './/ActionBarBrowserSourceItem';
import ActionBarContext from '../../store/actionBarContext';
import './ActionBarBrowserSource.scss';
// import browserBarDownloadSourceIcon1 from '../../../assets/ActionBar/youtube.svg';
// import browserBarDownloadSourceIcon2 from '../../../assets/ActionBar/caret-down.svg';
// import downloadSourceIcon__available from '../../../assets/BrowserBar/check.svg';
// import downloadSourceIcon__unavailable from '../../../assets/BrowserBar/remove.svg';
// import downloadSourceIconFacebook from '../../../assets/BrowserBar/facebook.svg';
// import downloadSourceIconPinterest from '../../../assets/BrowserBar/pinterest.svg';
// import downloadSourceIconSoundcloud from '../../../assets/BrowserBar/soundcloud.svg';
// import downloadSourceIconSnapchat from '../../../assets/BrowserBar/snapchat.svg';
// import downloadSourceIconTiktok from '../../../assets/BrowserBar/tiktok.svg';
// import downloadSourceIconTwitch from '../../../assets/BrowserBar/twitch.svg';
// import downloadSourceIconTwitter from '../../../assets/BrowserBar/twitter.svg';
// import downloadSourceIconVimeo from '../../../assets/BrowserBar/vimeo.svg';
// import downloadSourceIconYoutube from '../../../assets/BrowserBar/youtube.svg';
import { log } from 'console';

const BrowserBarDownloadSource = () => {
  const themeCtx = useContext(ThemeContext);
  const sourcesCtx = useContext(SourcesContext);
  const actionBarCtx = useContext(ActionBarContext);

  let sourcesCount = sourcesCtx.enabledSources.length;
  // window.electron.ipcRenderer.on('ready-to-show', (arg) => {
  //   // console.log(sourcesCtx.activeSource[0].URL);
  //   setTimeout(() => {
  //     window.electron.ipcRenderer.sendMessage(
  //       'loadActiveSource',

  //       sourcesCtx.activeSource[0].URL
  //     );
  //   }, 1000);
  // });
  let height_browserBarDownloadSource__hovering = sourcesCount * 48 + 6 + 'px';
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(false);
  const sourceSelectedHandler = (id) => {
    toggleSourceExpanded();
  };
  const toggleSourceExpanded = () => {
    if (isSourcesExpanded) {
      setIsSourcesExpanded(false);
    } else if (!isSourcesExpanded) {
      setIsSourcesExpanded(true);
    }
  };
  const mouseEnterHandler = () => {
    window.electron.ipcRenderer.sendMessage(
      'hideBrowser',
      'from browserSource'
    );
    setIsSourcesExpanded(true);
  };
  const mouseLeaveHandler = () => {
    window.electron.ipcRenderer.sendMessage(
      'showBrowser',
      'from browserSource'
    );
    setIsSourcesExpanded(false);
  };
  // console.log(isSourcesExpanded);
  const sourceItems = (
    <ul
      onMouseEnter={mouseEnterHandler}
      // onMouseLeave={mouseLeaveHandler}
      className={
        !isSourcesExpanded
          ? 'browserBarDownloadSource__list'
          : 'browserBarDownloadSource__hovering__list'
      }
      style={{
        height: height_browserBarDownloadSource__hovering,
        // width: actionBarCtx.sourceWidth,
      }}
    >
      {!isSourcesExpanded && (
        <ActionBarBrowserSourceItem
          key={sourcesCtx.activeSource[0].id}
          name={sourcesCtx.activeSource[0].name}
          src={sourcesCtx.activeSource[0].src}
          style={{
            height: height_browserBarDownloadSource__hovering,
            width: actionBarCtx.sourceWidth,
          }}
        />
      )}
      {sourcesCtx.enabledSources.map((item) => (
        <ActionBarBrowserSourceItem
          key={item.id}
          id={item.id}
          name={item.name}
          src={item.src}
          isActive={item.active}
          onClick={() => sourceSelectedHandler(item.id)}
          style={{
            height: height_browserBarDownloadSource__hovering,
            width: actionBarCtx.sourceWidth,
          }}
        />
      ))}
    </ul>
  );
  // const sourcesList = () => {
  // return sourcesCtx.enabledSources.map((source) => {

  return (
    <>
      <div
        // onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        onClick={sourceSelectedHandler}
        className={
          !isSourcesExpanded
            ? 'browserBarDownloadSource'
            : 'browserBarDownloadSource__hovering'
        }
        style={
          !isSourcesExpanded
            ? // { height: height_browserBarDownloadSource__hovering }
              { height: 48 + 'px', width: actionBarCtx.sourceWidth }
            : {
                height: height_browserBarDownloadSource__hovering,
                width: actionBarCtx.sourceWidth,
              }
        }
      >
        {sourceItems}
      </div>
    </>
  );
};
export default BrowserBarDownloadSource;
