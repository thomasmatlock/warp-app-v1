import { Fragment, useState } from 'react';
import './ActionBar.scss';
// import BrowserBar from '../ActionBar/BrowserBar/BrowserBar';
import BrowserBar from './BrowserBar';
import FilterBar from './FilterBar';

const ActionBar = (props) => {
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
  });
  window.electron.ipcRenderer.on('nav: mode: warpstagram', (arg) => {
    setWarpstagramMode(true);
    setAudioMode(false);
    setVideoMode(false);
  });
  // window.electron.ipcRenderer.sendMessage('package', ['Nav requesting package.json']); // send message to main process
  return (
    <Fragment>
      <div className="actionBar">
        {audioMode && <BrowserBar audioMode={audioMode} />}
        {videoMode && <BrowserBar videoMode={videoMode} />}
        {warpstagramMode && <FilterBar />}
      </div>
    </Fragment>
  );
};
export default ActionBar;
