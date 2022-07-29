import { Fragment } from 'react';
import './ModalPanel.scss';
import ModalSpacer from '../Components/ModalSpacer';
import ModalOutputFolder from '../Components/ModalOutputFolder';

import ModalSpacerLine from '../Components/ModalSpacerLine';

const ModalPanelVideo = () => {
  const outputFolders = {
    label: 'Video Downloads Folder',
    id: 'modalPrefsOutputFolder_video',
    placeholder: 'C:/Users/Tommy/Documents/Warp Downloader/Video',
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
          <div className="modalDropdownContent">
            <div className="modalDropdown_title modalDropdown_child">
              <p>Video Quality</p>
            </div>
            <div className="modalDropdown modalDropdown_child">
              <select
                id="modalDropdown_videoQuality"
                name="modalDropdown_select"
              >
                <option
                  id="modalDropdown_videoQuality_best"
                  value="videoQuality_best"
                >
                  Best Available
                </option>
                <option
                  id="modalDropdown_videoQuality_8k_60fps"
                  value="videoQuality_8k_60fps"
                >
                  8k 60fps
                </option>
                <option
                  id="modalDropdown_videoQuality_8k"
                  value="videoQuality_8k"
                >
                  8k
                </option>
                <option
                  id="modalDropdown_videoQuality_4k_60fps"
                  value="videoQuality_4k_60fps"
                >
                  4k 60fps
                </option>
                <option
                  id="modalDropdown_videoQuality_4k"
                  value="videoQuality_4k"
                >
                  4k
                </option>
                <option
                  id="modalDropdown_videoQuality_1080p_60fps"
                  value="videoQuality_1080p_60fps"
                >
                  1080p 60fps
                </option>
                <option
                  id="modalDropdown_videoQuality_1080p"
                  value="videoQuality_1080p"
                >
                  1080p
                </option>
                <option
                  id="modalDropdown_videoQuality_720p_60fps"
                  value="videoQuality_720p_60fps"
                >
                  720p 60fps
                </option>
                <option
                  id="modalDropdown_videoQuality_720p"
                  value="videoQuality_720p"
                >
                  720p
                </option>
                <option
                  id="modalDropdown_videoQuality_480p"
                  value="videoQuality_480p"
                >
                  480p
                </option>
                <option
                  id="modalDropdown_videoQuality_360p"
                  value="videoQuality_360p"
                >
                  360p
                </option>
                <option
                  id="modalDropdown_videoQuality_240p"
                  value="videoQuality_240p"
                >
                  240p
                </option>
              </select>
            </div>
          </div>
          <div className="modalDropdownContent">
            <div className="modalDropdown_title modalDropdown_child">
              <p>Video Format</p>
            </div>
            <div className="modalDropdown modalDropdown_child">
              <select
                id="modalDropdown_videoFormat"
                name="modalDropdown_select"
              >
                <option
                  id="modalDropdown_videoFormat_MP4"
                  value="videoFormat_MP4"
                >
                  MP4
                </option>
                <option
                  id="modalDropdown_videoFormat_MKV"
                  value="videoFormat_MKV"
                >
                  MKV
                </option>
                <option
                  id="modalDropdown_videoFormat_MOV"
                  value="videoFormat_MOV"
                >
                  MOV
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ModalPanelVideo;
