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

  return (
    <Fragment>
      <div id="modalPrefsPanel_audio" className="modalPrefsPanel">
        <ModalOutputFolder
          label={outputFolders.label}
          id={outputFolders.id}
          placeholder={outputFolders.placeholder}
        />
        <ModalDropdownList
        // warpstagram={true}
        // dropdownWarpstagram1={dropdownWarpstagram1}
        // dropdownWarpstagram2={dropdownWarpstagram2}
        // dropdownWarpstagram3={dropdownWarpstagram3}
        />
        {/* <div className="modalDropdownContainer">
          <div className="modalDropdownContent">
            <div className="modalDropdown_title modalDropdown_child">
              <p>Audio Quality</p>
            </div>
            <div className="modalDropdown modalDropdown_child">
              <select
                id="modalDropdown_audioQuality"
                name="modalDropdown_select"
              >
                <option
                  id="modalDropdown_audioQuality_best"
                  value="audioQuality_best"
                >
                  Best Available
                </option>
                <option
                  id="modalDropdown_audioQuality_high"
                  value="audioQuality_high"
                >
                  High quality (320kbps)
                </option>
                <option
                  id="modalDropdown_audioQuality_medium"
                  value="audioQuality_medium"
                >
                  Medium quality (256kbps)
                </option>
                <option
                  id="modalDropdown_audioQuality_low"
                  value="audioQuality_low"
                >
                  Low quality (128kbps)
                </option>
              </select>
            </div>
          </div>
          <div className="modalDropdownContent">
            <div className="modalDropdown_title modalDropdown_child">
              <p>Audio Format</p>
            </div>
            <div className="modalDropdown modalDropdown_child">
              <select
                id="modalDropdown_audioFormat"
                name="modalDropdown_select"
              >
                <option
                  id="modalDropdown_audioFormat_MP3"
                  value="audioFormat_MP3"
                >
                  MP3
                </option>
                <option
                  id="modalDropdown_audioFormat_M4A"
                  value="audioFormat_M4A"
                >
                  M4A
                </option>
                <option
                  id="modalDropdown_audioFormat_WAV"
                  value="audioFormat_WAV"
                >
                  WAV
                </option>
                <option
                  id="modalDropdown_audioFormat_OGG"
                  value="audioFormat_OGG"
                >
                  OGG
                </option>
              </select>
            </div>
          </div>
        </div> */}
      </div>
    </Fragment>
  );
};
export default ModalPanelAudio;
