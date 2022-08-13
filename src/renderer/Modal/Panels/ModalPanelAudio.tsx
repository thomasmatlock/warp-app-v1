import { Fragment } from 'react';
import './ModalPanel.scss';
import ModalSpacer from '../Components/ModalSpacer';
import ModalOutputFolder from '../Components/ModalOutputFolder';
import ModalSpacerLine from '../Components/ModalSpacerLine';
import ModalDropdownList from '../Components/ModalDropdownList';

const ModalPanelAudio = (props) => {
  return (
    <Fragment>
      <div id="modalPrefsPanel_audio" className="modalPrefsPanel">
        <ModalOutputFolder
          getID={props.getID}
          item={props.prefs.audio.folders[0]}
        />
        <div className="modalDropdownContainer">
          {/* <ModalDropdownList dropdownItem={dropdownAudio1} /> */}
          {/* <ModalDropdownList dropdownItem={dropdownAudio2} /> */}
          <ModalDropdownList
            getID={props.getID}
            item={props.prefs.audio.dropdowns[0]}
          />
          <ModalDropdownList
            getID={props.getID}
            item={props.prefs.audio.dropdowns[1]}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default ModalPanelAudio;
