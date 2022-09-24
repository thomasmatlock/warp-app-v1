/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-fragments */
import { Fragment, useContext } from 'react';
import iconAudio from '../../Common/audio.svg';
import iconVideo from '../../Common/video3.svg';
import iconWarpstagram from '../../Common/warpstagram.svg';
import iconGeneralDark from '../../Common/gear.svg';
import iconLicenses from '../../Common/shuttle.svg';
import IconAuths from '../../Common/auths1_white.svg';
import ThemeContext from '../../../storage/themeContext';
import './ModalPanelNav.scss';

const ModalNav = (props) => {
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
