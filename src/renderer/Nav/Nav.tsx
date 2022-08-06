import { Fragment, useState, useContext } from 'react';
// LOGO ICONS
import NavLogoImg from '../../../assets/Nav/008-blackhole_lunacy.svg';
import navLogoText from '../../../assets/Nav/logo_lowercase_extrabold.svg';
// NAV BUTTON ICONS
import iconAudio from '../../../assets/Modals/settings/audio.svg';
import iconVideo from '../../../assets/Modals/settings/video3.svg';
import iconWarpstagram from '../../../assets/Modals/settings/warpstagram.svg';
// PLATFORM ICONS
import iconWindows from '../../../assets/Nav/windows.svg';
import iconApple from '../../../assets/Nav/apple.svg';
import iconLinux from '../../../assets/Nav/linux.svg';
import ThemeContext from '../../storage/themeContext';
import './Nav.scss';
let appVersion: string = '1.0.0';

const Nav = (props) => {
  const themeCtx = useContext(ThemeContext);
  window.electron.ipcRenderer.sendMessage('package', [
    'Nav requesting package.json',
  ]);
  const [audioMode, setAudioMode] = useState(true);
  const [videoMode, setVideoMode] = useState(false);
  const [warpstagramMode, setWarpstagramMode] = useState(false);
  const [isWindows, setIsWindows] = useState(false);
  const [isApple, setIsApple] = useState(false);
  const [isLinux, setIsLinux] = useState(false);
  window.electron.ipcRenderer.on('platform', (arg) => {
    window.electron.ipcRenderer.sendMessage('package', []);
    if (arg === 'windows') setIsWindows(true);
    if (arg === 'darwin') setIsApple(true);
    if (arg === 'linux') setIsLinux(true);
  });
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
    // window.electron.ipcRenderer.sendMessage('nav: mode: warpstagram', [
    //   `Nav change: Warpstagram Mode`,
    // ]);
    setAudioMode(false);
    setVideoMode(false);
    setWarpstagramMode(true);
  });
  const mouseEnterHandler = () => {
    // console.log('mouse enter');
    window.electron.ipcRenderer.sendMessage('browserNotHovered');
  };
  const mouseLeaveHandler = () => {
    // console.log('mouse leave');
  };
  return (
    <Fragment>
      <div
        // onMouseEnter={mouseEnterHandler}
        // onMouseLeave={mouseLeaveHandler}
        className="navMain"
        style={
          themeCtx.isDarkTheme
            ? { backgroundColor: themeCtx.nav.dark.backgroundColor }
            : {
                backgroundColor: themeCtx.nav.light.backgroundColor,
              }
        }
      >
        <div className="logoContainer">
          <a className="navLogo">
            <img className="navLogoImg" alt="icon" src={NavLogoImg} />
            <img className="navLogoText" alt="icon" src={navLogoText} />
          </a>
        </div>
        <div className="buttonContainer">
          <div
            onClick={AudioBtnHandler}
            id="navMainBtnAudio"
            className={audioMode ? 'navMainBtnActive' : 'navMainBtn'}
          >
            <img
              className={audioMode ? 'navMainBtn__icon' : 'navMainBtn__icon'}
              src={iconAudio}
            />
            <p>Audio</p>
          </div>
          <div
            onClick={VideoBtnHandler}
            id="navMainBtnVideo"
            className={videoMode ? 'navMainBtnActive' : 'navMainBtn'}
          >
            <img
              className={videoMode ? 'navMainBtn__icon' : 'navMainBtn__icon'}
              src={iconVideo}
            />
            <p>Video</p>
          </div>
          <div
            onClick={WarpstagramBtnHandler}
            id="navMainBtnWarpstagram"
            className={warpstagramMode ? 'navMainBtnActive' : 'navMainBtn'}
          >
            <img
              className={
                warpstagramMode ? 'navMainBtn__icon' : 'navMainBtn__icon'
              }
              src={iconWarpstagram}
            />
            <p>Warpstagram</p>
          </div>
        </div>
        <div className="logoContainer">
          <a className="navLogo">
            {isWindows && (
              <img className="platformImg" alt="icon" src={iconWindows} />
            )}
            {isApple && (
              <img className="platformImg" alt="icon" src={iconApple} />
            )}
            {isLinux && (
              <img className="platformImg" alt="icon" src={iconLinux} />
            )}
            {/* <img className="navLogoText" alt="icon" src={navLogoText} /> */}
          </a>
          <a className="navLogo">
            <p className="navVersion">{`Version ` + appVersion}</p>
          </a>
        </div>
      </div>
    </Fragment>
  );
};
export default Nav;
