import { Fragment } from 'react';
import './ModalPanel.scss';
import ModalSpacer from '../Components/ModalSpacer';
import ModalCheckbox from '../Components/ModalCheckbox';
import ModalDropdownList from '../Components/ModalDropdownList';
import ModalSpacerLine from '../Components/ModalSpacerLine';

const ModalPanelGeneral = () => {
  const checkboxes = {
    autostartWarpLabel: 'Automatically start Warp on system start',
    minimizeToTrayOnCloseLabel:
      'Warp will minimize to your system tray when you close it',
  };
  const dropdownGeneral1 = {
    title: 'Theme',
    selectID: 'modalDropdown_general_theme',
    options: [
      {
        enabled: true,
        id: 'modalDropdown_general_theme_dark',
        value: 'general_theme_dark',
        label: 'Dark theme (default theme of Warp)',
      },
      {
        enabled: true,
        id: 'modalDropdown_general_theme_light',
        value: 'general_theme_light',
        label: 'Light theme',
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
  const dropdownGeneral2 = {
    title: 'Startup mode on launch',
    selectID: 'modalDropdown_general_startupTab',
    options: [
      {
        enabled: true,
        id: 'modalDropdown_general_startupTab_audio',
        value: 'general_startupTab_audio',
        label: 'Audio (default startup mode)',
      },
      {
        enabled: true,
        id: 'modalDropdown_general_startupTab_video',
        value: 'general_startupTab_video',
        label: 'Video',
      },
      {
        enabled: true,
        id: 'modalDropdown_general_startupTab_warpstagram',
        value: 'general_startupTab_warpstagram',
        label: 'Warpstagram',
      },
      {
        enabled: true,
        id: 'modalDropdown_general_startupTab_recent',
        value: 'general_startupTab_recent',
        label: 'Most recently used mode',
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
      <div id="modalPrefsPanel_general" className="modalPrefsPanel">
        <div className="modalDropdownContainer">
          <ModalDropdownList dropdownItem={dropdownGeneral1} />
          <ModalDropdownList dropdownItem={dropdownGeneral2} />
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
