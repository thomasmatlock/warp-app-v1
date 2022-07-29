import { Fragment } from 'react';
import './ModalPanel.scss';

const ModalPanelWarpstagram = () => {
  return (
    <Fragment>
      <div
        id="modalPrefsContentPanel_warpstagram"
        className="modalPrefsContentPanel"
      >
        {/* <!-- MODAL-TEXT-INPUT --> */}
        <div
          id="modalPrefsOutputFolderComponent_warpstagram"
          className="modalOutputFolder"
        >
          <div className="modalOutputFolder_title">
            <p>Warpstagram Output Folder</p>
          </div>
          <div className="modalOutputFolder_userInput">
            <div className="modalOutputFolder_userInput__textInput">
              <input
                id="modalPrefsOutputFolder_warpstagram"
                type="text"
                placeholder="C:/Users/Tommy/Documents/Warp Downloader"
              />
            </div>
            <div
              id="modalOutputFolderBtn_warpstagram"
              className="modalOutputFolder_userInput__button"
            >
              <p>Browse</p>
            </div>
          </div>
        </div>

        {/* <!-- MODAL-SPACER --> */}
        <div className="modalSpacer_space"></div>
        <div className="modalSpacer_space"></div>

        {/* <!-- DROPDOWN --> */}
        <div className="modalDropdownContainer">
          <div className="modalDropdownColumn modalDropdownColumn_left">
            <div className="modalDropdownContent">
              <div className="modalDropdown_title modalDropdown_child">
                <p>Auto update</p>
              </div>
              <div className="modalDropdown modalDropdown_child">
                <select
                  id="modalDropdown_warpstagram_updateSelected"
                  name="modalDropdown_select"
                >
                  <option
                    id="modalDropdown_warpstagram_updateSelected_all"
                    value="warpstagram_updateSelected_all"
                  >
                    Update All
                  </option>
                  <option
                    id="modalDropdown_warpstagram_updateSelected_pinned"
                    value="warpstagram_updateSelected_pinned"
                  >
                    Update Pinned
                  </option>
                  <option
                    id="modalDropdown_warpstagram_updateSelected_disabled"
                    value="warpstagram_updateSelected_disabled"
                  >
                    Disabled
                  </option>
                </select>
              </div>
            </div>
            <div className="modalDropdownContent">
              <div className="modalDropdown_title modalDropdown_child">
                <p>Post sorting</p>
              </div>
              <div className="modalDropdown modalDropdown_child">
                <select
                  id="modalDropdown_warpstagram_postSorting"
                  name="modalDropdown_select"
                >
                  <option
                    id="modalDropdown_warpstagram_postSorting_default"
                    value="warpstagram_postSorting_default"
                  >
                    Default
                  </option>
                  <option
                    id="modalDropdown_warpstagram_postSorting_new_to_old"
                    value="warpstagram_postSorting_new_to_old"
                  >
                    Newest to oldest
                  </option>
                  <option
                    id="modalDropdown_warpstagram_postSorting_old_to_new"
                    value="warpstagram_postSorting_old_to_new"
                  >
                    Oldest to newest
                  </option>
                  <option
                    id="modalDropdown_warpstagram_postSorting_AZ"
                    value="warpstagram_postSorting_AZ"
                  >
                    A to Z
                  </option>
                  <option
                    id="modalDropdown_warpstagram_postSorting_ZA"
                    value="warpstagram_postSorting_ZA"
                  >
                    Z to A
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="modalDropdownColumn">
            <div className="modalDropdownContent">
              <div className="modalDropdown_title modalDropdown_child">
                <p>Auto update frequency</p>
              </div>
              <div className="modalDropdown modalDropdown_child">
                <select
                  id="modalDropdown_warpstagram_autoUpdateFrequency"
                  name="modalDropdown_select"
                >
                  <option
                    id="modalDropdown_warpstagram_autoUpdateFrequency_24"
                    value="warpstagram_autoUpdateFrequency_24"
                  >
                    Daily
                  </option>
                  <option
                    id="modalDropdown_warpstagram_autoUpdateFrequency_12"
                    value="warpstagram_autoUpdateFrequency_12"
                  >
                    12 hours
                  </option>
                  <option
                    id="modalDropdown_warpstagram_autoUpdateFrequency_6"
                    value="warpstagram_autoUpdateFrequency_6"
                  >
                    6 hours
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- MODAL-SPACER --> */}
        <div className="modalSpacer_space"></div>
        <div className="modalSpacer_space"></div>
      </div>
    </Fragment>
  );
};
export default ModalPanelWarpstagram;
