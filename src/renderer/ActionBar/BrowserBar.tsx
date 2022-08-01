import { Fragment, useState } from 'react';
import './BrowserBar.scss';
import browserBarDownloadSourceIcon1 from '../../../assets/ActionBar/youtube.svg';
import browserBarDownloadSourceIcon2 from '../../../assets/ActionBar/caret-down.svg';
import downloadSourceIconFacebook from '../../../assets/BrowserBar/facebook.svg';
import downloadSourceIconSoundcloud from '../../../assets/BrowserBar/soundcloud.svg';
import downloadSourceIconTiktok from '../../../assets/BrowserBar/tiktok.svg';
import downloadSourceIconTwitter from '../../../assets/BrowserBar/twitter.svg';
import downloadSourceIconYoutube from '../../../assets/BrowserBar/youtube.svg';
import BrowserBarDownloadSource from './BrowserBarDownloadSource';

// import browserBarDownloadSourceIcon1 from '../../../../assets/3rdparty/fontawesome/svgs/brands/youtube.svg';
// import browserBarDownloadSourceIcon2 from '../../../../assets/3rdparty/fontawesome/svgs/solid/caret-down.svg';
const BrowserBar = (props) => {
  // const [audioMode, setAudioMode] = useState(true);
  // const [videoMode, setVideoMode] = useState(false);
  let audioMode = props.audioMode;
  let videoMode = props.videoMode;
  // const [warpstagramMode, setWarpstagramMode] = useState(false);

  // window.electron.ipcRenderer.on('nav: mode: audio', (arg) => {
  //   setAudioMode(true);
  //   setVideoMode(false);
  // });
  // window.electron.ipcRenderer.on('nav: mode: video', (arg) => {
  //   setVideoMode(true);
  //   setAudioMode(false);
  // });

  const downloadAudioHandler = () => {
    // window.electron.ipcRenderer.on('nav: mode: warpstagram', (arg) => {
    window.electron.ipcRenderer.sendMessage(
      'BrowserBar: button: downloadAudio',
      [`Download Audio`]
    );
  };

  const downloadVideoHandler = () => {
    window.electron.ipcRenderer.sendMessage(
      'BrowserBar: button: downloadVideo',
      [`Download Video`]
    );
  };

  return (
    <Fragment>
      <div className="browserBar">
        <BrowserBarDownloadSource />
        {audioMode && (
          <a
            onClick={downloadAudioHandler}
            className="browserBarDownloadBtn browserBarDownloadBtn__audio"
          >
            Download Audio MP3
          </a>
        )}
        {videoMode && (
          <a
            onClick={downloadVideoHandler}
            className="browserBarDownloadBtn browserBarDownloadBtn__video"
          >
            Download Video MP4
          </a>
        )}
      </div>
    </Fragment>
  );
};
export default BrowserBar;
