import { Fragment, useState, useContext } from 'react';
import ThemeContext from '../../storage/themeContext';
import ActionBarContext from '../../storage/actionBarContext';
import SourcesContext from '../../storage/sourcesContext';
import ActionBarBrowserSourceItem from './/ActionBarBrowserSourceItem';

import './ActionBarBrowserSource.scss';
import browserBarDownloadSourceIcon1 from '../../../assets/ActionBar/youtube.svg';
import browserBarDownloadSourceIcon2 from '../../../assets/ActionBar/caret-down.svg';
import downloadSourceIcon__available from '../../../assets/BrowserBar/check.svg';
import downloadSourceIcon__unavailable from '../../../assets/BrowserBar/remove.svg';
import downloadSourceIconFacebook from '../../../assets/BrowserBar/facebook.svg';
import downloadSourceIconPinterest from '../../../assets/BrowserBar/pinterest.svg';
import downloadSourceIconSoundcloud from '../../../assets/BrowserBar/soundcloud.svg';
import downloadSourceIconSnapchat from '../../../assets/BrowserBar/snapchat.svg';
import downloadSourceIconTiktok from '../../../assets/BrowserBar/tiktok.svg';
import downloadSourceIconTwitch from '../../../assets/BrowserBar/twitch.svg';
import downloadSourceIconTwitter from '../../../assets/BrowserBar/twitter.svg';
import downloadSourceIconVimeo from '../../../assets/BrowserBar/vimeo.svg';
import downloadSourceIconYoutube from '../../../assets/BrowserBar/youtube.svg';
import { log } from 'console';

const BrowserBarDownloadSource = () => {
  const themeCtx = useContext(ThemeContext);
  const sourcesCtx = useContext(SourcesContext);
  // console.log(sourcesCtx);

  let sourcesCount = sourcesCtx.enabledSources.length;
  window.electron.ipcRenderer.on('ready-to-show', (arg) => {
    // console.log(sourcesCtx.activeSource[0].URL);
    setTimeout(() => {
      window.electron.ipcRenderer.sendMessage(
        'loadActiveSource',

        sourcesCtx.activeSource[0].URL
      );
    }, 1000);
  });
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
    window.electron.ipcRenderer.sendMessage('hidebWin', 'from browserSource');
    setIsSourcesExpanded(true);
  };
  const mouseLeaveHandler = () => {
    window.electron.ipcRenderer.sendMessage('showbWin', 'from browserSource');
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
      style={{ height: height_browserBarDownloadSource__hovering }}
    >
      {!isSourcesExpanded && (
        <ActionBarBrowserSourceItem
          key={sourcesCtx.activeSource[0].id}
          name={sourcesCtx.activeSource[0].name}
          src={sourcesCtx.activeSource[0].src}
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
        />
      ))}
    </ul>
  );
  // const sourcesList = () => {
  // return sourcesCtx.enabledSources.map((source) => {

  return (
    <Fragment>
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
              { height: 48 + 'px' }
            : { height: height_browserBarDownloadSource__hovering }
        }
      >
        {sourceItems}
      </div>
    </Fragment>
  );
};
export default BrowserBarDownloadSource;
