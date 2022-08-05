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
  const dropdownWarpstagram1 = {
    title: 'Auto update',
    selectID: 'modalDropdown_warpstagram_updateSelected',
    options: [
      {
        enabled: true,
        id: 'modalDropdown_warpstagram_updateSelected_all',
        value: 'warpstagram_updateSelected_all',
        label: 'Update All (default)',
      },
      {
        enabled: true,
        id: 'modalDropdown_warpstagram_updateSelected_pinned',
        value: 'warpstagram_updateSelected_pinned',
        label: 'Update Pinned',
      },
      {
        enabled: true,
        id: 'modalDropdown_warpstagram_updateSelected_disabled',
        value: 'warpstagram_updateSelected_disabled',
        label: 'Disabled',
      },
      {
        enabled: false,
        id: 'changeThis',
        value: 'changeThis',
        label: 'changeThis',
      },
      {
        enabled: false,
        id: 'changeThis',
        value: 'changeThis',
        label: 'changeThis',
      },
      {
        enabled: false,
        id: 'changeThis',
        value: 'changeThis',
        label: 'changeThis',
      },
      {
        enabled: false,
        id: 'changeThis',
        value: 'changeThis',
        label: 'changeThis',
      },
      {
        enabled: false,
        id: 'changeThis',
        value: 'changeThis',
        label: 'changeThis',
      },
      {
        enabled: false,
        id: 'changeThis',
        value: 'changeThis',
        label: 'changeThis',
      },
    ],
  };
  const dropdownWarpstagram2 = {
    title: 'Post sorting',
    selectID: 'modalDropdown_warpstagram_postSorting',
    options: [
      {
        enabled: true,
        id: 'modalDropdown_warpstagram_postSorting_new_to_old',
        value: 'warpstagram_postSorting_new_to_old',
        label: 'Newest to oldest (default)',
      },
      {
        enabled: true,
        id: 'modalDropdown_warpstagram_postSorting_old_to_new',
        value: 'warpstagram_postSorting_old_to_new',
        label: 'Oldest to newest',
      },
      {
        enabled: true,
        id: 'modalDropdown_warpstagram_postSorting_AZ',
        value: 'warpstagram_postSorting_AZ',
        label: 'A to Z',
      },
      {
        enabled: true,
        id: 'modalDropdown_warpstagram_postSorting_ZA',
        value: 'warpstagram_postSorting_ZA',
        label: 'Z to A',
      },
      {
        enabled: false,
        id: 'changeThis',
        value: 'changeThis',
        label: 'changeThis',
      },
      {
        enabled: false,
        id: 'changeThis',
        value: 'changeThis',
        label: 'changeThis',
      },
      {
        enabled: false,
        id: 'changeThis',
        value: 'changeThis',
        label: 'changeThis',
      },
      {
        enabled: false,
        id: 'changeThis',
        value: 'changeThis',
        label: 'changeThis',
      },
    ],
  };
  const dropdownWarpstagram3 = {
    title: 'Auto update frequency',
    selectID: 'modalDropdown_warpstagram_autoUpdateFrequency',
    options: [
      {
        enabled: true,
        id: 'modalDropdown_warpstagram_autoUpdateFrequency_24',
        value: 'warpstagram_autoUpdateFrequency_24',
        label: 'Daily (default)',
      },
      {
        enabled: true,
        id: 'modalDropdown_warpstagram_autoUpdateFrequency_12',
        value: 'warpstagram_autoUpdateFrequency_12',
        label: '12 hours',
      },
      {
        enabled: true,
        id: 'modalDropdown_warpstagram_autoUpdateFrequency_6',
        value: 'warpstagram_autoUpdateFrequency_6',
        label: '6 hours',
      },
      {
        enabled: false,
        id: 'changeThis',
        value: 'changeThis',
        label: 'changeThis',
      },
      {
        enabled: false,
        id: 'changeThis',
        value: 'changeThis',
        label: 'changeThis',
      },
      {
        enabled: false,
        id: 'changeThis',
        value: 'changeThis',
        label: 'changeThis',
      },
      {
        enabled: false,
        id: 'changeThis',
        value: 'changeThis',
        label: 'changeThis',
      },
      {
        enabled: false,
        id: 'changeThis',
        value: 'changeThis',
        label: 'changeThis',
      },
      {
        enabled: false,
        id: 'changeThis',
        value: 'changeThis',
        label: 'changeThis',
      },
      {
        enabled: false,
        id: 'changeThis',
        value: 'changeThis',
        label: 'changeThis',
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
        <div className="modalDropdownContainer">
          <ModalDropdownList dropdownItem={dropdownWarpstagram1} />
          <ModalDropdownList dropdownItem={dropdownWarpstagram2} />
          <ModalDropdownList dropdownItem={dropdownWarpstagram3} />
        </div>
      </div>
    </Fragment>
  );
};
export default ModalPanelWarpstagram;
