import { Fragment, useContext } from 'react';
import './ModalPanel.scss';
import ModalOutputFolder from '../Components/ModalOutputFolder';
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
