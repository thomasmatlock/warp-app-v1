import { useState, useContext } from 'react';
import './ModalPreferences.scss';
import './Components/ModalCheckbox.scss';
import './Components/ModalDropdownList.scss';
import './Components/ModalOutputFolder.scss';
import './Components/ModalAction.scss';

import Modal from './Modal';
import ModalHeader from './Components/ModalHeader';
import ModalNav from './Panels/ModalPanelNav';
// import ModalSpacer from './Components/ModalSpacer';
import ModalPanelAudio from './Panels/ModalPanelAudio';
import ModalPanelGeneral from './Panels/ModalPanelGeneral';
import ModalPanelLicenses from './Panels/ModalPanelLicenses';
import ModalPanelMorph from './Panels/ModalPanelMorph';
import ModalPanelVideo from './Panels/ModalPanelVideo';
import ModalPanelAuths from './Panels/ModalPanelAuths';
import ModalPanelWarpstagram from './Panels/ModalPanelWarpstagram';
import ThemeContext from '../../storage/themeContext';
import NavContext from '../../storage/navContext';
import InputContext from '../../storage/inputContext';
import ModalsContext from '../../storage/modalsContext';
import PrefsContext from 'storage/prefsContext';

const ModalPreferences = (props) => {
  const themeCtx = useContext(ThemeContext);
  const navCtx = useContext(NavContext);
  const inputCtx = useContext(InputContext);
  const modalsCtx = useContext(ModalsContext);
  const prefsCtx = useContext(PrefsContext);
  // console.log(prefsCtx);
  // console.log(props);

  // console.log(modalsCtx.getID);
  // console.log(modalsCtx.prefs.audio.dropdowns[1]);
  // console.log(props.prefs);

  const [isModalPanelAudio, setModalPanelAudio] = useState(
    navCtx.audioModePrefs
  );
  const [isModalPanelVideo, setModalPanelVideo] = useState(
    navCtx.videoModePrefs
  );
  const [isModalPanelWarpstagram, setModalPanelWarpstagram] = useState(
    navCtx.warpstagramModePrefs
  );
  const [isModalPanelGeneral, setModalPanelGeneral] = useState(
    navCtx.generalModePrefs
  );
  const [isModalPanelLicenses, setModalPanelLicenses] = useState(
    navCtx.licenseModePrefs
  );
  const [isModalPanelMorph, setModalPanelMorph] = useState(false);
  const [isModalPanelAuths, setModalPanelAuths] = useState(
    navCtx.authsModePrefs
  );

  const hideAllPanels = () => {
    setModalPanelAudio(false);
    setModalPanelVideo(false);
    setModalPanelWarpstagram(false);
    setModalPanelMorph(false);
    setModalPanelGeneral(false);
    setModalPanelAuths(false);
    setModalPanelLicenses(false);
  };
  const showPanelAudio = () => {
    hideAllPanels();
    setModalPanelAudio(true);
    navCtx.audioModePrefsHandler();
  };
  const showPanelVideo = () => {
    hideAllPanels();
    setModalPanelVideo(true);
    navCtx.videoModePrefsHandler();
  };
  const showPanelWarpstagram = () => {
    hideAllPanels();
    setModalPanelWarpstagram(true);
    navCtx.videoModePrefsHandler();
    // navCtx.warpstagramModePrefsHandler();
  };
  const showPanelMorph = () => {
    hideAllPanels();
    setModalPanelMorph(true);
    // navCtx.morph();
  };
  const showPanelGeneral = () => {
    hideAllPanels();
    setModalPanelGeneral(true);
    navCtx.generalModePrefsHandler();
  };
  const showPanelAuths = () => {
    hideAllPanels();
    setModalPanelAuths(true);
    navCtx.authsModePrefsHandler();
  };
  const showPanelLicenses = () => {
    hideAllPanels();
    setModalPanelLicenses(true);
    navCtx.licenseModePrefsHandler();
  };

  return (
    <Modal onClose={modalsCtx.hideModalHandler}>
      <div className="modal_preferences">
        <ModalHeader onClose={modalsCtx.hideModalHandler} />
        <div className="modal_preferences__content">
          <div className="modal_preferences__content__panel modal_preferences__content__panel__nav">
            <ModalNav
              isAudioActive={isModalPanelAudio}
              isVideoActive={isModalPanelVideo}
              isWarpstagramActive={isModalPanelWarpstagram}
              isMorphActive={isModalPanelMorph}
              isGeneralActive={isModalPanelGeneral}
              isAuthsActive={isModalPanelAuths}
              isLicensesActive={isModalPanelLicenses}
              // content panels below
              showAudio={showPanelAudio}
              showVideo={showPanelVideo}
              showMorph={showPanelMorph}
              showWarpstagram={showPanelWarpstagram}
              showGeneral={showPanelGeneral}
              showAuths={showPanelAuths}
              showLicenses={showPanelLicenses}
            />
          </div>
          <div className="modal_preferences__content__panel modal_preferences__content__panel__content">
            {isModalPanelAudio && (
              <ModalPanelAudio getID={prefsCtx.getID} prefs={prefsCtx.prefs} />
            )}
            {isModalPanelVideo && (
              <ModalPanelVideo getID={prefsCtx.getID} prefs={prefsCtx.prefs} />
            )}
            {isModalPanelWarpstagram && (
              <ModalPanelWarpstagram
                getID={prefsCtx.getID}
                prefs={prefsCtx.prefs}
              />
            )}
            {isModalPanelMorph && (
              <ModalPanelMorph getID={prefsCtx.getID} prefs={modalsCtx.prefs} />
            )}
            {isModalPanelGeneral && (
              <ModalPanelGeneral
                getID={prefsCtx.getID}
                prefs={modalsCtx.prefs}
              />
            )}
            {isModalPanelAuths && (
              <ModalPanelAuths getID={prefsCtx.getID} prefs={modalsCtx.prefs} />
            )}
            {isModalPanelLicenses && (
              <ModalPanelLicenses
                getID={prefsCtx.getID}
                prefs={modalsCtx.prefs}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalPreferences;
