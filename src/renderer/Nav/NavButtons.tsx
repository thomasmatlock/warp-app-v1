/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext } from 'react';
import NavContext from '../../store/navContext';
import ThemeContext from '../../store/themeContext';
import iconAudio from '../Global/audio.svg';
import iconVideo from '../Global/video.svg';
import iconWarpstagram from '../Global/warpstagram.svg';
import './Nav.scss';

export default function NavButtons() {
  const themeCtx = useContext(ThemeContext);
  const navCtx = useContext(NavContext);

  return (
    <div className="buttonContainer">
      <div
        onClick={navCtx.audioModeHandler}
        id="navMainBtnAudio"
        className={navCtx.audioMode ? 'navMainBtnActive' : 'navMainBtn'}
      >
        <img
          className={navCtx.audioMode ? 'navMainBtn__icon' : 'navMainBtn__icon'}
          style={
            themeCtx.isDarkTheme
              ? { filter: 'invert(100%)' }
              : { filter: 'invert(0%)' }
          }
          src={iconAudio}
          alt="audio"
        />
        <p>Audio</p>
      </div>
      <div
        onClick={navCtx.videoModeHandler}
        id="navMainBtnVideo"
        className={navCtx.videoMode ? 'navMainBtnActive' : 'navMainBtn'}
      >
        <img
          className={navCtx.videoMode ? 'navMainBtn__icon' : 'navMainBtn__icon'}
          src={iconVideo}
          alt="video"
        />
        <p>Video</p>
      </div>
      <div
        onClick={navCtx.warpstagramModeHandler}
        id="navMainBtnWarpstagram"
        className={navCtx.warpstagramMode ? 'navMainBtnActive' : 'navMainBtn'}
      >
        <img
          className={
            navCtx.warpstagramMode ? 'navMainBtn__icon' : 'navMainBtn__icon'
          }
          src={iconWarpstagram}
          alt="warpstagram"
        />
        <p>Warpstagram</p>
      </div>
    </div>
  );
}
