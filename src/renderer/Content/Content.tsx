import { Fragment, useState } from 'react';
import Browser from './Browser';
import DownloadsAudio from './DownloadsAudio';
import DownloadsVideo from './DownloadsVideo';
import Warpstagram from './Warpstagram';
// import thumbnail from '../../../assets/Content/thumbnail.png'
import './Content.scss';
const Content = (props) => {
  const [audioMode, setAudioMode] = useState(true);
  const [videoMode, setVideoMode] = useState(false);
  const [warpstagramMode, setWarpstagramMode] = useState(false);

  window.electron.ipcRenderer.on('nav: mode: audio', (arg) => {
    // console.log(arg);
    setAudioMode(true);
    setVideoMode(false);
    setWarpstagramMode(false);
  });
  window.electron.ipcRenderer.on('nav: mode: video', (arg) => {
    setVideoMode(true);
    setAudioMode(false);
    setWarpstagramMode(false);
    // console.log(videoMode);
  });
  window.electron.ipcRenderer.on('nav: mode: warpstagram', (arg) => {
    setWarpstagramMode(true);
    setAudioMode(false);
    setVideoMode(false);
  });

  return (
    <div className="content">
      {audioMode && <Browser />}
      {audioMode && <DownloadsAudio />}
      {videoMode && <Browser />}
      {videoMode && <DownloadsVideo />}
      {warpstagramMode && <Warpstagram />}
    </div>
  );
};
export default Content;
