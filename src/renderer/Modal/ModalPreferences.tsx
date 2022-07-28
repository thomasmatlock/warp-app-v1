import { Fragment, useState } from 'react';
import './ModalPreferences.scss';
import Modal from './Modal';
import ModalHeader from './Components/ModalHeader';
import ModalNav from './Components/ModalNav';
import ModalSpacer from './Components/ModalSpacer';
import ModalPanelAudio from './Panels/ModalPanelAudio';
import ModalPanelGeneral from './Panels/ModalPanelGeneral';
import ModalPanelLicenses from './Panels/ModalPanelLicenses';
import ModalPanelVideo from './Panels/ModalPanelVideo';
import ModalPanelWarpstagram from './Panels/ModalPanelWarpstagram';

const ModalPreferences = (props) => {
  const [isModalPanelAudio, setModalPanelAudio] = useState(true);
  const [isModalPanelGeneral, setModalPanelGeneral] = useState(false);
  const [isModalPanelLicenses, setModalPanelLicenses] = useState(false);
  const [isModalPanelVideo, setModalPanelVideo] = useState(false);
  const [isModalPanelWarpstagram, setModalPanelWarpstagram] = useState(false);

  const hideAllPanels = () => {
    setModalPanelAudio(false);
    setModalPanelGeneral(false);
    setModalPanelLicenses(false);
    setModalPanelVideo(false);
    setModalPanelWarpstagram(false);
  };
  const showPanelAudio = () => {
    hideAllPanels();
    setModalPanelAudio(true);
  };
  const showPanelGeneral = () => {
    hideAllPanels();
    setModalPanelGeneral(true);
  };
  const showPanelLicenses = () => {
    hideAllPanels();
    setModalPanelLicenses(true);
  };
  const showPanelVideo = () => {
    hideAllPanels();
    setModalPanelVideo(true);
  };
  const showPanelWarpstagram = () => {
    hideAllPanels();
    setModalPanelWarpstagram(true);
  };
  const setNavMode = () => {
    if (props.mode === 'audio') {
      console.log('setNavMode: audio');

      hideAllPanels();
      setModalPanelAudio(true);
    } else if (props.mode === 'general') {
      hideAllPanels();
      setModalPanelGeneral(true);
    } else if (props.mode === 'licenses') {
      hideAllPanels();
      setModalPanelLicenses(true);
    } else if (props.mode === 'video') {
      hideAllPanels();
      setModalPanelVideo(true);
    } else if (props.mode === 'warpstagram') {
      setModalPanelVideo(true);
      setModalPanelWarpstagram(true);
    }
  };
  setNavMode();
  return (
    <Modal onClose={props.onClose}>
      <div className="modal_preferences">
        <ModalHeader onClose={props.onClose} />
        <div className="modal_preferences__content">
          <div className="modal_preferences__content__panel modal_preferences__content__panel__nav">
            <ModalSpacer />
            <ModalNav
              showAudio={showPanelAudio}
              showGeneral={showPanelGeneral}
              showLicenses={showPanelLicenses}
              showVideo={showPanelVideo}
              showWarpstagram={showPanelWarpstagram}
            />
          </div>
          <div className="modal_preferences__content__panel modal_preferences__content__panel__content">
            {isModalPanelAudio && <ModalPanelAudio />}
            {isModalPanelGeneral && <ModalPanelGeneral />}
            {isModalPanelLicenses && <ModalPanelLicenses />}
            {isModalPanelVideo && <ModalPanelVideo />}
            {isModalPanelWarpstagram && <ModalPanelWarpstagram />}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalPreferences;
