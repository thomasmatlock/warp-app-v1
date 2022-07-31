import { Fragment } from 'react';
import './ModalPanel.scss';
import ModalSpacer from '../Components/ModalSpacer';
import ModalOutputFolder from '../Components/ModalOutputFolder';
import ModalSpacerLine from '../Components/ModalSpacerLine';
import ModalDropdownList from '../Components/ModalDropdownList';

const ModalPanelAudio = (props) => {
  const outputFolders = {
    label: 'Audio Downloads Folder',
    id: 'modalPrefsOutputFolder_audio',
    placeholder: 'C:/Users/Tommy/Documents/Warp Downloader/Audio',
  };
  const dropdownAudio1 = {
    title: 'Audio Quality',
    selectID: 'modalDropdown_audioQuality',
    options: [
      {
        enabled: true,
        id: 'modalDropdown_audioQuality_best',
        value: 'audioQuality_best',
        label: 'Best Available',
      },
      {
        enabled: true,
        id: 'modalDropdown_audioQuality_high',
        value: 'audioQuality_high',
        label: 'High quality (320kbps)',
      },
      {
        enabled: true,
        id: 'modalDropdown_audioQuality_medium',
        value: 'audioQuality_medium',
        label: 'Medium quality (256kbps)',
      },
      {
        enabled: true,
        id: 'modalDropdown_audioQuality_low',
        value: 'audioQuality_low',
        label: 'Low quality (128kbps)',
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
  const dropdownAudio2 = {
    title: 'Audio Format',
    selectID: 'modalDropdown_audioFormat',
    options: [
      {
        enabled: true,
        id: 'modalDropdown_audioFormat_MP3',
        value: 'audioFormat_MP3',
        label: 'MP3 (default)',
      },
      {
        enabled: true,
        id: 'modalDropdown_audioFormat_M4A',
        value: 'audioFormat_M4A',
        label: 'M4A',
      },
      {
        enabled: true,
        id: 'modalDropdown_audioFormat_WAV',
        value: 'audioFormat_WAV',
        label: 'WAV',
      },
      {
        enabled: true,
        id: 'modalDropdown_audioFormat_OGG',
        value: 'audioFormat_OGG',
        label: 'OGG',
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
      <div id="modalPrefsPanel_audio" className="modalPrefsPanel">
        <ModalOutputFolder
          label={outputFolders.label}
          id={outputFolders.id}
          placeholder={outputFolders.placeholder}
        />
        <div className="modalDropdownContainer">
          <ModalDropdownList dropdownItem={dropdownAudio1} />
          <ModalDropdownList dropdownItem={dropdownAudio2} />
        </div>
      </div>
    </Fragment>
  );
};
export default ModalPanelAudio;
