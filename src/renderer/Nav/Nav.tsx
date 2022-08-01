import { Fragment, useState } from 'react';
import NavLogoImg from '../../../assets/Nav/008-blackhole_lunacy.svg';
import navLogoText from '../../../assets/Nav/logo_lowercase_extrabold.svg';
import './Nav.scss';
let appVersion: string = '1.0.0';

const Nav = (props) => {
  window.electron.ipcRenderer.sendMessage('package', [
    'Nav requesting package.json',
  ]);
  const [audioMode, setAudioMode] = useState(true);
  const [videoMode, setVideoMode] = useState(false);
  const [warpstagramMode, setWarpstagramMode] = useState(false);

  const AudioBtnHandler = () => {
    setAudioMode(true);
    setVideoMode(false);
    setWarpstagramMode(false);
    window.electron.ipcRenderer.sendMessage('nav: mode: audio', [
      `Nav change: Audio Mode`,
    ]);
  };
  const VideoBtnHandler = () => {
    setVideoMode(true);
    setAudioMode(false);
    setWarpstagramMode(false);
    window.electron.ipcRenderer.sendMessage('nav: mode: video', [
      `Nav change: Video Mode`,
    ]);
  };
  const WarpstagramBtnHandler = () => {
    setWarpstagramMode(true);
    setAudioMode(false);
    setVideoMode(false);
    window.electron.ipcRenderer.sendMessage('nav: mode: warpstagram', [
      `Nav change: Warpstagram Mode`,
    ]);
  };
  window.electron.ipcRenderer.on('package', (arg) => {
    appVersion = arg.version;
  });
  window.electron.ipcRenderer.on('nav: mode: audio', (arg) => {
    setAudioMode(true);
    setVideoMode(false);
    setWarpstagramMode(false);
  });
  window.electron.ipcRenderer.on('nav: mode: video', (arg) => {
    setAudioMode(false);
    setVideoMode(true);
    setWarpstagramMode(false);
  });
  window.electron.ipcRenderer.on('nav: mode: warpstagram', (arg) => {
    setAudioMode(false);
    setVideoMode(false);
    setWarpstagramMode(true);
  });

  return (
    <Fragment>
      <div className="navMain">
        <div className="logoContainer">
          <a className="navLogo">
            <img className="navLogoImg" alt="icon" src={NavLogoImg} />
            <img className="navLogoText" alt="icon" src={navLogoText} />
          </a>
        </div>
        <div className="buttonContainer">
          <a
            id="navMainBtnAudio"
            className={audioMode ? 'navMainBtnActive' : 'navMainBtn'}
            onClick={AudioBtnHandler}
          >
            Audio
          </a>
          <a
            id="navMainBtnVideo"
            onClick={VideoBtnHandler}
            className={videoMode ? 'navMainBtnActive' : 'navMainBtn'}
          >
            Video
          </a>
          <a
            id="navMainBtnWarpstagram"
            onClick={WarpstagramBtnHandler}
            className={warpstagramMode ? 'navMainBtnActive' : 'navMainBtn'}
          >
            Warpstagram
          </a>
          {/* <a className="navMainBtn" >Images</a> */}
          {/* <a className="navMainBtn" >Morph</a> */}
        </div>
        <div className="logoContainer">
          <p className="navVersion">{`Version ` + appVersion}</p>
        </div>
      </div>
    </Fragment>
  );
};
export default Nav;
