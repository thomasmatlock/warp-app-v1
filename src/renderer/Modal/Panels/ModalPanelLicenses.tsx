import { Fragment } from 'react';
import './ModalPanel.scss';

const ModalPanelLicenses = () => {
  return (
    <Fragment>
      <div id="modalPrefsPanel_license" className="modalPrefsPanel">
        <div className="modalActionComponent_Container">
          {/* <!-- MODAL-ACTION --> */}
          <div
            id="modalActionComponent_audio"
            className="modalActionComponent modalActionComponent_licenseActivation"
          >
            <div
              id="modalActionComponent_panel_top_audio"
              className="modalActionComponent_panel modalActionComponent_panel_primary"
            >
              <div className="modalActionComponent_child  modalActionComponent_child_title">
                <p>Audio Downloader only</p>
              </div>
              <div className="modalActionComponent_child modalActionComponent_child_btn">
                <p>Activate</p>
              </div>
            </div>
            <div
              id="modalActionComponent_panel_middle_audio"
              className="modalActionComponent_panel modalActionComponent_panel_collapsible"
            ></div>
            <div
              id="modalActionComponent_panel_bottom_audio"
              className="modalActionComponent_panel modalActionComponent_panel_secondary modalActionComponent_panel_collapsible"
            ></div>
          </div>
          <div
            id="modalActionComponent_video"
            className="modalActionComponent modalActionComponent_licenseActivation"
          >
            <div
              id="modalActionComponent_panel_top_video"
              className="modalActionComponent_panel modalActionComponent_panel_primary"
            >
              <div className="modalActionComponent_child  modalActionComponent_child_title">
                <p>Video Downloader only</p>
              </div>
              <div className="modalActionComponent_child modalActionComponent_child_btn">
                <p>Activate</p>
              </div>
            </div>
            <div
              id="modalActionComponent_panel_middle_video"
              className="modalActionComponent_panel modalActionComponent_panel_collapsible"
            ></div>
            <div
              id="modalActionComponent_panel_bottom_video"
              className="modalActionComponent_panel modalActionComponent_panel_secondary modalActionComponent_panel_collapsible"
            ></div>
          </div>
          <div
            id="modalActionComponent_warpstagram"
            className="modalActionComponent modalActionComponent_licenseActivation"
          >
            <div
              id="modalActionComponent_panel_top_warpstagram"
              className="modalActionComponent_panel modalActionComponent_panel_primary"
            >
              <div className="modalActionComponent_child  modalActionComponent_child_title">
                <p>Warpstagram only</p>
              </div>
              <div className="modalActionComponent_child modalActionComponent_child_btn">
                <p>Activate</p>
              </div>
            </div>
            <div
              id="modalActionComponent_panel_middle_warpstagram"
              className="modalActionComponent_panel modalActionComponent_panel_collapsible"
            ></div>
            <div
              id="modalActionComponent_panel_bottom_warpstagram"
              className="modalActionComponent_panel modalActionComponent_panel_secondary modalActionComponent_panel_collapsible"
            ></div>
          </div>
          <div
            id="modalActionComponent_bundle"
            className="modalActionComponent modalActionComponent_licenseActivation modalActionComponent_active"
          >
            <div
              id="modalActionComponent_panel_top_bundle"
              className="modalActionComponent_panel  modalActionComponent_panel_primary"
            >
              <div className="modalActionComponent_child  modalActionComponent_child_title">
                <p>Warp BUNDLE</p>
              </div>
              {/* <!-- <div className="modalActionComponent_child  modalActionComponent_child_activated">
                    <p>Activated</p>
                </div> --> */}
              <div className="modalActionComponent_child modalActionComponent_child_btn">
                <p>Activate</p>
              </div>
            </div>
            <div
              id="modalActionComponent_panel_middle_bundle"
              className="modalActionComponent_panel modalActionComponent_panel_collapsible"
            ></div>
            <div
              id="modalActionComponent_panel_bottom_bundle"
              className="modalActionComponent_panel modalActionComponent_panel_secondary modalActionComponent_panel_collapsible"
            >
              <div className="modalActionComponent_child  modalActionComponent_child_title">
                {/* <!-- <p>Warp BUNDLE (all 3 downloaders)</p> --> */}
              </div>
              {/* <div className="modalActionComponent_child  modalActionComponent_child_activated">
                <p>Activated</p>
              </div> */}
              {/* <div className="modalActionComponent_child modalActionComponent_child_btn">
                <p>Activate</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ModalPanelLicenses;
