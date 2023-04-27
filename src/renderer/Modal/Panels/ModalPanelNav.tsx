/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-fragments */
import { Fragment, useContext } from 'react';
import iconAudio from '../../Global/audio.svg';
// import iconAudio from '../../Global/warpstagram.svg';

import iconVideo from '../../Nav/assets/video.svg';
import iconWarpstagram from '../../Global/warpstagram.svg';
import iconGeneralDark from '../../Global/gear.svg';
import iconLicenses from '../../Global/rocket.svg';
import IconAuths from '../../Global/auths1_white.svg';
import ThemeContext from '../../../store/themeContext';
import './ModalPanelNav.scss';

const ModalNav = (props: any) => {
  const themeCtx = useContext(ThemeContext);
  return (
    <Fragment>
      <div className="modalPrefsNav">
        <div
          onClick={props.showAudio}
          id="modalPrefsNav_button_audio_ID"
          className={
            props.isAudioActive
              ? 'modalPrefsNav_button__active'
              : 'modalPrefsNav_button'
          }
        >
          <img
            className={
              props.isGeneralActive
                ? 'modalPrefsNav_button__icon'
                : 'modalPrefsNav_button__icon'
            }
            style={{ filter: 'invert(1)' }}
            src={iconAudio}
          />
          <p>Audio</p>
        </div>
        <div
          onClick={props.showVideo}
          id="modalPrefsNav_button_video_ID"
          className={
            props.isVideoActive
              ? 'modalPrefsNav_button__active'
              : 'modalPrefsNav_button'
          }
        >
          <img
            className={
              props.isGeneralActive
                ? 'modalPrefsNav_button__icon'
                : 'modalPrefsNav_button__icon'
            }
            src={iconVideo}
            // invert
          />
          <p>Video</p>
        </div>
        <div
          onClick={props.showWarpstagram}
          id="modalPrefsNav_button_warpstagram_ID"
          // className="modalPrefsNav_button modalPrefsNav_button_background"
          className={
            props.isWarpstagramActive
              ? 'modalPrefsNav_button__active'
              : 'modalPrefsNav_button'
          }
        >
          <img
            className={
              props.isGeneralActive
                ? 'modalPrefsNav_button__icon'
                : 'modalPrefsNav_button__icon'
            }
            src={iconWarpstagram}
            // grayscale
            style={{
              filter: 'grayscale(100%)',
            }}
          />
          <p>Warpstagram</p>
        </div>
        {/* <div
          onClick={props.showMorph}
          id="modalPrefsNav_button_license_ID"
          className={
            props.isMor
              ? 'modalPrefsNav_button__active'
              : 'modalPrefsNav_button'
          }
        >
          <img
            className={
              props.isGeneralActive
                ? 'modalPrefsNav_button__icon'
                : 'modalPrefsNav_button__icon'
            }
            src={iconLicenses}
          />
          <p>Morph</p>
        </div> */}
        <div
          onClick={props.showGeneral}
          id="modalPrefsNav_button_general_ID"
          className={
            props.isGeneralActive
              ? 'modalPrefsNav_button__active'
              : 'modalPrefsNav_button'
          }
        >
          <img
            className={
              props.isGeneralActive
                ? 'modalPrefsNav_button__icon'
                : 'modalPrefsNav_button__icon'
            }
            style={
              themeCtx.isDarkTheme
                ? { filter: 'invert(100%)' }
                : {
                    filter: 'invert(0%)',
                  }
            }
            src={iconGeneralDark}
          />
          <p>General</p>
        </div>
        <div
          onClick={props.showAuths}
          id="modalPrefsNav_button_general_ID"
          className={
            props.isAuthsActive
              ? 'modalPrefsNav_button__active'
              : 'modalPrefsNav_button'
          }
        >
          <img
            className={
              props.isAuthsActive
                ? 'modalPrefsNav_button__icon'
                : 'modalPrefsNav_button__icon'
            }
            src={IconAuths}
          />
          <p>Authorizations</p>
        </div>
        <div
          onClick={props.showLicenses}
          id="modalPrefsNav_button_license_ID"
          className={
            props.isLicensesActive
              ? 'modalPrefsNav_button__active'
              : 'modalPrefsNav_button'
          }
        >
          <img
            className={
              props.isGeneralActive
                ? 'modalPrefsNav_button__icon'
                : 'modalPrefsNav_button__icon'
            }
            src={iconLicenses}
          />
          <p>License</p>
        </div>
      </div>
    </Fragment>
  );
};
export default ModalNav;
