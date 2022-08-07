import { Fragment } from 'react';
import iconAudio from '../../../../assets/Modals/settings/audio.svg';
import iconVideo from '../../../../assets/Modals/settings/video3.svg';
import iconWarpstagram from '../../../../assets/Modals/settings/warpstagram.svg';
import iconGeneralDark from '../../../../assets/Modals/settings/gear.svg';
import iconLicenses from '../../../../assets/Modals/settings/shuttle.svg';
import IconAuths from '../../../../assets/Modals/settings/auths1_white.svg';
import './ModalPanelNav.scss';

const ModalNav = (props) => {
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
