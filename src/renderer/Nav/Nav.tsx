import { Fragment, useState, useContext } from 'react';
// LOGO ICONS
import NavLogoImgDark from '../../../assets/Nav/logo/blackholeDark.svg';
import NavLogoImgLight from '../../../assets/Nav/logo/blackholeLight.svg';
import navLogoTextDark from '../../../assets/Nav/logo/logoDark.svg';
import navLogoTextLight from '../../../assets/Nav/logo/logoLight.svg';
// NAV BUTTON ICONS
import iconAudio from '../../../assets/Modals/settings/audio.svg';
import iconVideo from '../../../assets/Modals/settings/video3.svg';
import iconWarpstagram from '../../../assets/Modals/settings/warpstagram.svg';
// PLATFORM ICONS
import iconWindowsDark from '../../../assets/Nav/platform/windowsDark.svg';
import iconWindowsLight from '../../../assets/Nav/platform/windowsLight.svg';
import iconAppleDark from '../../../assets/Nav/platform/appleDark.svg';
import iconAppleLight from '../../../assets/Nav/platform/appleLight.svg';
import iconLinuxDark from '../../../assets/Nav/platform/linuxDark.svg';
import iconLinuxLight from '../../../assets/Nav/platform/linuxLight.svg';
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
            <img
              className="navLogoImg"
              alt="icon"
              // src={NavLogoImg}
              src={themeCtx.isDarkTheme ? NavLogoImgDark : NavLogoImgLight}
            />
            <img
              className="navLogoText"
              alt="icon"
              src={themeCtx.isDarkTheme ? navLogoTextDark : navLogoTextLight}
            />
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
              <img
                className="platformImg"
                alt="icon"
                src={themeCtx.isDarkTheme ? iconWindowsDark : iconWindowsLight}
              />
            )}
            {isApple && (
              <img
                className="platformImg"
                alt="icon"
                src={themeCtx.isDarkTheme ? iconAppleDark : iconAppleLight}
              />
            )}
            {isLinux && (
              <img
                className="platformImg"
                alt="icon"
                src={themeCtx.isDarkTheme ? iconLinuxDark : iconLinuxLight}
              />
            )}
            {/* <img className="navLogoText" alt="icon" src={navLogoText} /> */}
          </a>
          <a className="navLogo">
            <p
              className="navVersion"
              style={
                themeCtx.isDarkTheme
                  ? { color: themeCtx.nav.dark.color }
                  : {
                      color: themeCtx.nav.light.color,
                    }
              }
            >
              {`Version ` + appVersion}
            </p>
          </a>
        </div>
      </div>
    </Fragment>
  );
};
export default Nav;
