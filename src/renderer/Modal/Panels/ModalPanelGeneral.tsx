import { Fragment } from 'react';
import './ModalPanel.scss';
import ModalSpacer from '../Components/ModalSpacer';
import ModalCheckbox from '../Components/ModalCheckbox';
import ModalDropdownList from '../Components/ModalDropdownList';
import ModalSpacerLine from '../Components/ModalSpacerLine';

const ModalPanelGeneral = (props) => {
  const checkboxes = {
    autostartWarpLabel: 'Automatically start Warp on system start',
    minimizeToTrayOnCloseLabel:
      'Warp will minimize to your system tray when you close it',
  };
  return (
    <Fragment>
      <div id="modalPrefsPanel_general" className="modalPrefsPanel">
        <div className="modalDropdownContainer">
          <ModalDropdownList item={props.prefs.general.dropdowns[0]} />
          <ModalDropdownList item={props.prefs.general.dropdowns[1]} />
        </div>

        <ModalSpacer />
        <ModalSpacerLine />
        <ModalSpacer />
        <ModalCheckbox label={checkboxes.autostartWarpLabel} />
        <ModalCheckbox label={checkboxes.minimizeToTrayOnCloseLabel} />
      </div>
    </Fragment>
  );
};
export default ModalPanelGeneral;
