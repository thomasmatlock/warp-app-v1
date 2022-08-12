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

const ModalPreferences = () => {
  const themeCtx = useContext(ThemeContext);
  const navCtx = useContext(NavContext);
  const inputCtx = useContext(InputContext);
  const modalsCtx = useContext(ModalsContext);
  // console.log(navCtx);

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
  };
  const showPanelVideo = () => {
    hideAllPanels();
    setModalPanelVideo(true);
  };
  const showPanelWarpstagram = () => {
    hideAllPanels();
    setModalPanelWarpstagram(true);
  };
  const showPanelMorph = () => {
    hideAllPanels();
    setModalPanelMorph(true);
  };
  const showPanelGeneral = () => {
    hideAllPanels();
    setModalPanelGeneral(true);
  };
  const showPanelAuths = () => {
    hideAllPanels();
    setModalPanelAuths(true);
  };
  const showPanelLicenses = () => {
    hideAllPanels();
    setModalPanelLicenses(true);
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
            {isModalPanelAudio && <ModalPanelAudio />}
            {isModalPanelVideo && <ModalPanelVideo />}
            {isModalPanelWarpstagram && <ModalPanelWarpstagram />}
            {isModalPanelMorph && <ModalPanelMorph />}
            {isModalPanelGeneral && <ModalPanelGeneral />}
            {isModalPanelAuths && <ModalPanelAuths />}
            {isModalPanelLicenses && <ModalPanelLicenses />}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalPreferences;
