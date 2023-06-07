import { Fragment } from 'react';
import './ModalPanel.scss';
import ModalSpacer from '../Components/ModalSpacer';
import ModalCheckbox from '../Components/ModalCheckbox';
import ModalDropdownList from '../Components/ModalDropdownList';
import ModalSpacerLine from '../Components/ModalSpacerLine';

const ModalPanelGeneral = (props) => {
  // console.log(props);

  // console.log(props.prefs.general.checkboxes);

  // const checkboxes = {
  //   autostartWarpLabel: 'Automatically start Warp on system start',
  //   minimizeToTrayOnCloseLabel:
  //     'Warp will minimize to your system tray when you close it',
  // };
  return (
    <div id="modalPrefsPanel_general" className="modalPrefsPanel">
      <div className="modalDropdownContainer">
        <ModalDropdownList
          getID={props.getID}
          item={props.prefs.general.dropdowns[0]}
        />
        <ModalDropdownList
          getID={props.getID}
          item={props.prefs.general.dropdowns[1]}
        />
      </div>

      <ModalSpacer />
      <ModalSpacerLine />
      <ModalSpacer />
      {/* AUTOSTART WARP */}
      {/* <ModalCheckbox
        getID={props.getID}
        item={props.prefs.general.checkboxes[0]}
      /> */}
      {/* AUTOMINIMIZE ON CLOSE */}
      {/* <ModalCheckbox
        getID={props.getID}
        item={props.prefs.general.checkboxes[1]}
      /> */}
    </div>
  );
};
export default ModalPanelGeneral;
