import { Fragment } from 'react';
import './ModalPanel.scss';
import ModalSpacer from '../Components/ModalSpacer';
import ModalOutputFolder from '../Components/ModalOutputFolder';
import ModalDropdownList from '../Components/ModalDropdownList';

import ModalSpacerLine from '../Components/ModalSpacerLine';

const ModalPanelWarpstagram = () => {
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
        <ModalDropdownList />
      </div>
    </Fragment>
  );
};
export default ModalPanelWarpstagram;
