import { Fragment } from 'react';
import './ModalPanel.scss';
import Cards from './Cards';

const ModalPanelLicenses = () => {
  return (
    <Fragment>
      <div id="" className="modalPrefsPanel">
        {/* <div
          id="modalPrefsPanel__auths_audio"
          className="modalPrefsPanel__auths modalPrefsPanel__auths_licenseActivation"
        >
          <div
            id="modalPrefsPanel__auths_panel_top_audio"
            className="modalPrefsPanel__auths_panel modalPrefsPanel__auths_panel_primary"
          >
            <div className="modalPrefsPanel__auths_child  modalPrefsPanel__auths_child_title">
              <p>Audio Downloader only</p>
            </div>
            <div className="modalPrefsPanel__auths_child modalPrefsPanel__auths_child_btn">
              <p>Activate</p>
            </div>
          </div>
          <div
            id="modalPrefsPanel__auths_panel_middle_audio"
            className="modalPrefsPanel__auths_panel "
          ></div>
          <div
            id="modalPrefsPanel__auths_panel_bottom_audio"
            className="modalPrefsPanel__auths_panel modalPrefsPanel__auths_panel_secondary "
          ></div>
        </div> */}
        <Cards />
      </div>
    </Fragment>
  );
};
export default ModalPanelLicenses;
