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
    title: 'Download source on startup',
    selectID: 'modalDropdown_general_startupSource',
    options: [
      {
        enabled: true,
        id: 'modalDropdown_general_startupSource_recent',
        value: 'general_startupSource_recent',
        label: 'Most recently used source (default)',
      },
      {
        enabled: true,
        id: 'modalDropdown_general_startupSource_facebook',
        value: 'general_startupSource_facebook',
        label: 'Facebook',
      },
      {
        enabled: true,
        id: 'modalDropdown_general_startupSource_pinterest',
        value: 'general_startupSource_pinterest',
        label: 'Pinterest',
      },
      {
        enabled: true,
        id: 'modalDropdown_general_startupSource_soundcloud',
        value: 'general_startupSource_soundcloud',
        label: 'Soundcloud',
      },
      {
        enabled: true,
        id: 'modalDropdown_general_startupSource_twitter',
        value: 'general_startupSource_twitter',
        label: 'Twitter',
      },
      {
        enabled: true,
        id: 'modalDropdown_general_startupSource_tiktok',
        value: 'general_startupSource_tiktok',
        label: 'Tiktok',
      },
      {
        enabled: true,
        id: 'modalDropdown_general_startupSource_youtube',
        value: 'general_startupSource_youtube',
        label: 'Youtube',
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
  const dropdownGeneral3 = {
    title: 'Startup mode on launch',
    selectID: 'modalDropdown_general_startupTab',
    options: [
      {
        enabled: true,
        id: 'modalDropdown_general_startupTab_recent',
        value: 'general_startupTab_recent',
        label: 'Most recently used (default)',
      },
      {
        enabled: true,
        id: 'modalDropdown_general_startupTab_audio',
        value: 'general_startupTab_audio',
        label: 'Audio',
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
          <ModalDropdownList dropdownItem={dropdownGeneral3} />
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
