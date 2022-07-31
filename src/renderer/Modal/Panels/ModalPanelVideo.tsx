import { Fragment } from 'react';
import './ModalPanel.scss';
import ModalSpacer from '../Components/ModalSpacer';
import ModalOutputFolder from '../Components/ModalOutputFolder';
import ModalDropdownList from '../Components/ModalDropdownList';

import ModalSpacerLine from '../Components/ModalSpacerLine';

const ModalPanelVideo = () => {
  const outputFolders = {
    label: 'Video Downloads Folder',
    id: 'modalPrefsOutputFolder_video',
    placeholder: 'C:/Users/Tommy/Documents/Warp Downloader/Video',
  };
  const dropdownVideol1 = {
    title: 'Video Quality',
    selectID: 'modalDropdown_videoQuality',
    options: [
      {
        enabled: true,
        id: 'modalDropdown_videoQuality_best',
        value: 'videoQuality_best',
        label: 'Best Available',
      },
      {
        enabled: true,
        id: 'modalDropdown_videoQuality_8k_60fps',
        value: 'videoQuality_8k_60fps',
        label: '8k 60fps',
      },

      {
        enabled: true,
        id: 'modalDropdown_videoQuality_8k',
        value: 'videoQuality_8k',
        label: '8k',
      },
      {
        enabled: true,
        id: 'modalDropdown_videoQuality_4k_60fps',
        value: 'videoQuality_4k_60fps',
        label: '4k 60fps',
      },
      {
        enabled: true,
        id: 'modalDropdown_videoQuality_4k',
        value: 'videoQuality_4k',
        label: '4k',
      },
      {
        enabled: true,
        id: 'modalDropdown_videoQuality_1080p_60fps',
        value: 'videoQuality_1080p_60fps',
        label: '1080p 60fps',
      },
      {
        enabled: true,
        id: 'modalDropdown_videoQuality_1080p',
        value: 'videoQuality_1080p',
        label: '1080p',
      },
      {
        enabled: true,
        id: 'modalDropdown_videoQuality_720p_60fps',
        value: 'videoQuality_720p_60fps',
        label: '720p 60fps',
      },
      {
        enabled: true,
        id: 'modalDropdown_videoQuality_720p',
        value: 'videoQuality_720p',
        label: '720p',
      },
      {
        enabled: true,
        id: 'modalDropdown_videoQuality_480p',
        value: 'videoQuality_480p',
        label: '480p',
      },
      {
        enabled: true,
        id: 'modalDropdown_videoQuality_360p',
        value: 'videoQuality_360p',
        label: '360p',
      },
      {
        enabled: true,
        id: 'modalDropdown_videoQuality_240p',
        value: 'videoQuality_240p',
        label: '240p',
      },
    ],
  };
  const dropdownVideo2 = {
    title: 'Video Format',
    selectID: 'modalDropdown_videoFormat',
    options: [
      {
        enabled: true,
        id: 'modalDropdown_videoFormat_MP4',
        value: 'videoFormat_MP4',
        label: 'MP4 (default)',
      },
      {
        enabled: true,
        id: 'modalDropdown_videoFormat_MKV',
        value: 'videoFormat_MKV',
        label: 'MKV',
      },

      {
        enabled: true,
        id: 'modalDropdown_videoFormat_MOV',
        value: 'videoFormat_MOV',
        label: 'MOV',
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
      <div id="modalPrefsPanel_video" className="modalPrefsPanel">
        <ModalOutputFolder
          label={outputFolders.label}
          id={outputFolders.id}
          placeholder={outputFolders.placeholder}
        />
        <div className="modalDropdownContainer">
          <ModalDropdownList dropdownItem={dropdownVideol1} />
          <ModalDropdownList dropdownItem={dropdownVideo2} />
        </div>
      </div>
    </Fragment>
  );
};
export default ModalPanelVideo;
