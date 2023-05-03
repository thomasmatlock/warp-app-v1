import { Fragment } from 'react';
import './ModalPanel.scss';
import ModalSpacer from '../Components/ModalSpacer';
import ModalOutputFolder from '../Components/ModalOutputFolder';
import ModalDropdownList from '../Components/ModalDropdownList';

import ModalSpacerLine from '../Components/ModalSpacerLine';

const ModalPanelVideo = (props) => {
  const outputFolders = {
    label: 'Video Downloads Folder',
    id: 'modalPrefsOutputFolder_video',
    placeholder: 'C:/Users/Tommy/Documents/Warp/Video',
  };
  return (
    <Fragment>
      <div id="modalPrefsPanel_video" className="modalPrefsPanel">
        <ModalOutputFolder
          getID={props.getID}
          item={props.prefs.video.folders[0]}
        />
        <div className="modalDropdownContainer">
          <ModalDropdownList
            getID={props.getID}
            item={props.prefs.video.dropdowns[0]}
          />
          <ModalDropdownList
            getID={props.getID}
            item={props.prefs.video.dropdowns[1]}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default ModalPanelVideo;
