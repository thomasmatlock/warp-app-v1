import { Fragment } from 'react';
import './ModalPanel.scss';
import ModalSpacer from '../Components/ModalSpacer';
import ModalOutputFolder from '../Components/ModalOutputFolder';
import ModalDropdownList from '../Components/ModalDropdownList';

import ModalSpacerLine from '../Components/ModalSpacerLine';

const ModalPanelWarpstagram = (props) => {
  console.log(props.prefs.warpstagram.dropdowns[0]);
  console.log(props.prefs.warpstagram.dropdowns[1]);
  const outputFolders = {
    label: 'Warpstagram Downloads Folder',
    id: 'modalPrefsOutputFolder_warpstagram',
    placeholder: 'C:/Users/Tommy/Documents/Warp Downloader/Warpstagram',
  };

  return (
    <Fragment>
      <div id="modalPrefsPanel_warpstagram" className="modalPrefsPanel">
        <ModalOutputFolder
          label={outputFolders.label}
          id={outputFolders.id}
          placeholder={outputFolders.placeholder}
        />
        <div className="modalDropdownContainer">
          <ModalDropdownList item={props.prefs.warpstagram.dropdowns[0]} />
          <ModalDropdownList item={props.prefs.warpstagram.dropdowns[1]} />
          <ModalDropdownList item={props.prefs.warpstagram.dropdowns[2]} />
        </div>
      </div>
    </Fragment>
  );
};
export default ModalPanelWarpstagram;
