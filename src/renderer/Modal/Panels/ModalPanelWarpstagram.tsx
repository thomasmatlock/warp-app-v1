import { Fragment } from 'react';
import './ModalPanel.scss';
import ModalSpacer from '../Components/ModalSpacer';
import ModalOutputFolder from '../Components/ModalOutputFolder';
import ModalDropdownList from '../Components/ModalDropdownList';

import ModalSpacerLine from '../Components/ModalSpacerLine';

const ModalPanelWarpstagram = (props) => {
  const outputFolders = {
    label: 'Warpstagram Downloads Folder',
    id: 'modalPrefsOutputFolder_warpstagram',
    placeholder: 'C:/Users/Tommy/Documents/Warp/Warpstagram',
  };

  return (
    <Fragment>
      <div id="modalPrefsPanel_warpstagram" className="modalPrefsPanel">
        <ModalOutputFolder
          getID={props.getID}
          item={props.prefs.warpstagram.folders[0]}
        />
        <div className="modalDropdownContainer">
          <ModalDropdownList
            getID={props.getID}
            item={props.prefs.warpstagram.dropdowns[0]}
          />
          <ModalDropdownList
            getID={props.getID}
            item={props.prefs.warpstagram.dropdowns[1]}
          />
          <ModalDropdownList
            getID={props.getID}
            item={props.prefs.warpstagram.dropdowns[2]}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default ModalPanelWarpstagram;
