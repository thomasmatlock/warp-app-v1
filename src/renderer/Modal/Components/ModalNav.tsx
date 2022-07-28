import { Fragment } from 'react';
import './ModalNav.scss';

const ModalNav = (props) => {
  return (
    <Fragment>
      <div className="modalPrefsNav">
        <div
          onClick={props.showAudio}
          id="modalPrefsNav_button_audio_ID"
          className="modalPrefsNav_button modalPrefsNav_button_background"
        >
          <i className="fas fa-headphones-alt"></i>
          <p>Audio</p>
        </div>
        <div
          onClick={props.showVideo}
          id="modalPrefsNav_button_video_ID"
          className="modalPrefsNav_button modalPrefsNav_button_background"
        >
          <i className="fas fa-video"></i>
          <p>Video</p>
        </div>
        <div
          onClick={props.showWarpstagram}
          id="modalPrefsNav_button_warpstagram_ID"
          className="modalPrefsNav_button modalPrefsNav_button_background"
        >
          <i className="fas fa-camera"></i>
          <p>Warpstagram</p>
        </div>
        <div
          onClick={props.showGeneral}
          id="modalPrefsNav_button_general_ID"
          className="modalPrefsNav_button modalPrefsNav_button_background"
        >
          <i className="fas fa-sliders-h"></i>
          <p>General</p>
        </div>
        <div
          onClick={props.showLicenses}
          id="modalPrefsNav_button_license_ID"
          className="modalPrefsNav_button modalPrefsNav_button_background"
        >
          <i className="fas fa-rocket"></i>
          <p>License</p>
        </div>
      </div>
    </Fragment>
  );
};
export default ModalNav;
