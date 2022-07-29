import { Fragment } from 'react';
import './ModalPanel.scss';
import ModalSpacer from '../Components/ModalSpacer';
import ModalSpacerLine from '../Components/ModalSpacerLine';

const ModalPanelVideo = () => {
  return (
    <Fragment>
      <div id="modalPrefsPanel_video" className="modalPrefsPanel">
        {/* <!-- MODAL-TEXT-INPUT --> */}
        <div
          id="modalPrefsOutputFolderComponent_video"
          className="modalOutputFolder"
        >
          <div className="modalOutputFolder_title">
            <p>Video Downloads Folder</p>
          </div>
          <div className="modalOutputFolder_userInput">
            <div className="modalOutputFolder_userInput__textInput">
              <input
                id="modalPrefsOutputFolder_video"
                type="text"
                placeholder="C:/Users/Tommy/Documents/Warp Downloader/Video"
              />
            </div>
            <div
              id="modalOutputFolderBtn_video"
              className="modalOutputFolder_userInput__button"
            >
              <p>Browse</p>
            </div>
          </div>
        </div>
        {/* <ModalSpacer /> */}
        {/* <ModalSpacerLine /> */}
        <div className="modalDropdownContainer">
          <div className="modalDropdownColumn modalDropdownColumn_left">
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
            {/* <!-- <div className="modalDropdownContent">
                        <div className="modalDropdown_title modalDropdown_child">
                            <p>Audio Format</p>
                        </div>
                        <div className="modalDropdown modalDropdown_child">
                            <select name="modalDropdown_select">
                                <option value=" volvo ">System</option>
                                <option value=" saab ">Saab</option>
                                <option value=" mercedes ">Mercedes</option>
                                <option value=" audi ">Audi</option>
                            </select>
                        </div>
                    </div> --> */}
          </div>
          <div className="modalDropdownColumn">
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
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ModalPanelVideo;
