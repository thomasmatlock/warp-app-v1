import { Fragment } from 'react';
import './ModalPanel.scss';
import ModalSpacer from '../Components/ModalSpacer';
import ModalSpacerLine from '../Components/ModalSpacerLine';

const ModalPanelAudio = (props) => {
  return (
    <Fragment>
      <div id="modalPrefsPanel_audio" className="modalPrefsPanel">
        {/* <!-- MODAL-TEXT-INPUT --> */}
        <div
          id="modalPrefsOutputFolderComponent_audio"
          className="modalOutputFolder"
        >
          <div className="modalOutputFolder_title">
            <p>Audio Downloads Folder</p>
          </div>
          <div className="modalOutputFolder_userInput">
            <div className="modalOutputFolder_userInput__textInput">
              <input
                id="modalPrefsOutputFolder_audio"
                type="text"
                placeholder="C:/Users/Tommy/Documents/Warp Downloader/Audio"
              />
            </div>
            <div
              id="modalOutputFolderBtn_audio"
              className="modalOutputFolder_userInput__button"
            >
              <p>Browse</p>
            </div>
          </div>
        </div>

        {/* <ModalSpacer /> */}
        {/* <ModalSpacer /> */}

        {/* <!-- DROPDOWN --> */}
        <div className="modalDropdownContainer">
          <div className="modalDropdownColumn modalDropdownColumn_left">
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
          </div>
          <div className="modalDropdownColumn">
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
                    id="modalDropdown_audioFormat_OGG"
                    value="audioFormat_OGG"
                  >
                    OGG
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ModalPanelAudio;
