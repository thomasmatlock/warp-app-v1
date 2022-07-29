import { Fragment } from 'react';
import './ModalPanel.scss';
import ModalSpacer from '../Components/ModalSpacer';
import ModalSpacerLine from '../Components/ModalSpacerLine';

const ModalPanelGeneral = () => {
  return (
    <Fragment>
      <div id="modalPrefsPanel_general" className="modalPrefsPanel">
        <div className="modalDropdownContainer">
          {/* <!-- LEFT SIDE, TOP DROPDOWN --> */}
          <div className="modalDropdownColumn modalDropdownColumn_left">
            <div className="modalDropdownContent">
              <div className="modalDropdown_title modalDropdown_child">
                <p>Theme</p>
              </div>
              <div className="modalDropdown modalDropdown_child">
                <select
                  id="modalDropdown_general_theme"
                  name="modalDropdown_select"
                >
                  <option
                    id="modalDropdown_general_theme_dark"
                    value="general_theme_dark"
                  >
                    Dark theme (default theme of Warp )
                  </option>
                  <option
                    id="modalDropdown_general_theme_light"
                    value="general_theme_light"
                  >
                    Light theme
                  </option>
                </select>
              </div>
            </div>
            {/* <!-- LEFT SIDE, BOTTOM DROPDOWN --> */}
            {/* <!-- <div className="modalDropdownContent">
                <div className="modalDropdown_title modalDropdown_child">
                    <p>Post sorting</p>
                </div>
                <div className="modalDropdown modalDropdown_child">
                    <select id="modalDropdown_warpstagram_postSorting2" name="modalDropdown_select">
                        <option value="warpstagram_postSorting_default">Default</option>
                        <option value="warpstagram_postSorting_new_to_old">Newest to oldest</option>
                        <option value="warpstagram_postSorting_old_to_new">Oldest to newest</option>
                        <option value="warpstagram_postSorting_AZ">A to Z</option>
                        <option value="warpstagram_postSorting_ZA">Z to A</option>
                    </select>
                </div>
            </div> --> */}
          </div>
          {/* <!-- RIGHT SIDE --> */}
          {/* <!-- RIGHT SIDE, TOP DROPDOWN --> */}
          <div className="modalDropdownColumn">
            <div className="modalDropdownContent">
              <div className="modalDropdown_title modalDropdown_child">
                <p>Startup tab on launch</p>
              </div>
              <div className="modalDropdown modalDropdown_child">
                <select
                  id="modalDropdown_general_startupTab"
                  name="modalDropdown_select"
                >
                  <option
                    id="modalDropdown_general_startupTab_audio"
                    value="general_startupTab_audio"
                  >
                    Audio (default startup tab)
                  </option>
                  <option
                    id="modalDropdown_general_startupTab_video"
                    value="general_startupTab_video"
                  >
                    Video
                  </option>
                  <option
                    id="modalDropdown_general_startupTab_warpstagram"
                    value="general_startupTab_warpstagram"
                  >
                    Warpstagram
                  </option>
                  <option
                    id="modalDropdown_general_startupTab_recent"
                    value="general_startupTab_recent"
                  >
                    Most recently used mode
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <ModalSpacer />
        <ModalSpacerLine />
        <ModalSpacer />
        <div className="modalPrefsCheckbox">
          <div className="modalPrefsCheckbox_child modalPrefsCheckbox_child_left">
            <p>Automatically start Warp on system start</p>
          </div>
          <div className="modalPrefsCheckbox_child modalPrefsCheckbox_child_right">
            <div
              className="button r modalCheckbox"
              id="modalPrefsCheckbox_autostartWarp"
            >
              <input
                type="checkbox"
                className="checkbox"
                id="modalPrefsCheckbox_autostartWarp_checkbox"
              />
              <div className="knobs "></div>
              <div className="layer "></div>
            </div>
          </div>
        </div>
        <div className="modalPrefsCheckbox">
          <div className="modalPrefsCheckbox_child modalPrefsCheckbox_child_left">
            <p>Warp will minimize to your system tray when you close it</p>
          </div>
          <div className="modalPrefsCheckbox_child modalPrefsCheckbox_child_right">
            <div
              className="button r modalCheckbox"
              id="modalPrefsCheckbox_minimizeToTrayOnClose"
            >
              <input
                type="checkbox"
                className="checkbox"
                id="modalPrefsCheckbox_minimizeToTrayOnClose_checkbox"
              />
              <div className="knobs "></div>
              <div className="layer "></div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="modalPrefsPanel modalPrefsPanel_bottom"> */}
    </Fragment>
  );
};
export default ModalPanelGeneral;
