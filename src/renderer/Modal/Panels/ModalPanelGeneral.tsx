import { Fragment } from 'react';
import './ModalPanel.scss';
import ModalSpacer from '../Components/ModalSpacer';
import ModalCheckbox from '../Components/ModalCheckbox';
import ModalDropdowList from '../Components/ModalSpacer';
import ModalSpacerLine from '../Components/ModalSpacerLine';

const ModalPanelGeneral = () => {
  const checkboxes = {
    autostartWarpLabel: 'Automatically start Warp on system start',
    minimizeToTrayOnCloseLabel:
      'Warp will minimize to your system tray when you close it',
  };
  return (
    <Fragment>
      <div id="modalPrefsPanel_general" className="modalPrefsPanel">
        <div className="modalDropdownContainer">
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
          </div>
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
        <ModalCheckbox label={checkboxes.autostartWarpLabel} />
        <ModalCheckbox label={checkboxes.minimizeToTrayOnCloseLabel} />
      </div>

      {/* <div className="modalPrefsPanel modalPrefsPanel_bottom"> */}
    </Fragment>
  );
};
export default ModalPanelGeneral;
