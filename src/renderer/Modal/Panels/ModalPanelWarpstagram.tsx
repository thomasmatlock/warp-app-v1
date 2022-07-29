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
  const dropdowns = {
    warpstagram: [
      {
        title1: 'Auto update',
        selectID: 'modalDropdown_warpstagram_updateSelected',
        options: [
          {
            id: 'modalDropdown_warpstagram_updateSelected_all',
            value: 'warpstagram_updateSelected_all',
            label: 'Update All',
          },
          {
            id: 'modalDropdown_warpstagram_updateSelected_pinned',
            value: 'warpstagram_updateSelected_pinned',
            label: 'Update Pinned',
          },
          {
            id: 'modalDropdown_warpstagram_updateSelected_disabled',
            value: 'warpstagram_updateSelected_disabled',
            label: 'Disabled',
          },
        ],
      },
      {
        title: 'Auto update',
        selectID: 'modalDropdown_warpstagram_updateSelected',
        options: [
          {
            id: 'modalDropdown_warpstagram_updateSelected_all',
            value: 'warpstagram_updateSelected_all',
            label: 'Update All',
          },
          {
            id: 'modalDropdown_warpstagram_updateSelected_pinned',
            value: 'warpstagram_updateSelected_pinned',
            label: 'Update Pinned',
          },
          {
            id: 'modalDropdown_warpstagram_updateSelected_disabled',
            value: 'warpstagram_updateSelected_disabled',
            label: 'Disabled',
          },
        ],
      },
      {
        title: 'Auto update',
        selectID: 'modalDropdown_warpstagram_updateSelected',
        options: [
          {
            id: 'modalDropdown_warpstagram_updateSelected_all',
            value: 'warpstagram_updateSelected_all',
            label: 'Update All',
          },
          {
            id: 'modalDropdown_warpstagram_updateSelected_pinned',
            value: 'warpstagram_updateSelected_pinned',
            label: 'Update Pinned',
          },
          {
            id: 'modalDropdown_warpstagram_updateSelected_disabled',
            value: 'warpstagram_updateSelected_disabled',
            label: 'Disabled',
          },
        ],
      },
    ],
  };
  return (
    <Fragment>
      <div id="modalPrefsPanel_warpstagram" className="modalPrefsPanel">
        <ModalOutputFolder
          label={outputFolders.label}
          id={outputFolders.id}
          placeholder={outputFolders.placeholder}
        />
        <ModalDropdownList
          title1={dropdowns.warpstagram[0].title1}
          selectID1={dropdowns.warpstagram[0].selectID}
          optionID1={dropdowns.warpstagram[0].options[0].id}
          optionValue1={dropdowns.warpstagram[0].options[0].value}
          optionLabel1={dropdowns.warpstagram[0].options[0].label}
          optionID2={dropdowns.warpstagram[0].options[1].id}
          optionValue2={dropdowns.warpstagram[0].options[1].value}
          optionLabel2={dropdowns.warpstagram[0].options[1].label}
          optionID3={dropdowns.warpstagram[0].options[2].id}
          optionValue3={dropdowns.warpstagram[0].options[2].value}
          optionLabel3={dropdowns.warpstagram[0].options[2].label}
        />
      </div>
    </Fragment>
  );
};
export default ModalPanelWarpstagram;
