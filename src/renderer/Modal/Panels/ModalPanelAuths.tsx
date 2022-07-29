import { Fragment } from 'react';
import './ModalPanel.scss';

const ModalPanelAuths = (props) => {
  return (
    <Fragment>
      {/* <!-- MODAL-ACTION --> */}
      <div
        id="modalActionComponent_login_1"
        className="modalActionComponent modalActionComponent_licenseActivation"
      >
        <div
          id="modalActionComponent_panel_top_audio"
          className="modalActionComponent_panel modalActionComponent_panel_primary"
        >
          <div className="modalActionComponent_child  modalActionComponent_child_title">
            <p>Login to Instagram</p>
          </div>
          <div
            id="loginInstagramButton"
            className="modalActionComponent_child modalActionComponent_child_btn"
          >
            <p>Login</p>
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

      {/* <!-- MODAL-ACTION --> */}
      <div
        id="modalActionComponent_login_2"
        className="modalActionComponent modalActionComponent_licenseActivation"
      >
        <div
          id="modalActionComponent_panel_top_audio"
          className="modalActionComponent_panel modalActionComponent_panel_primary"
        >
          <div className="modalActionComponent_child  modalActionComponent_child_title">
            <p>Login to Youtube</p>
          </div>
          <div
            id="loginYoutubeButton"
            className="modalActionComponent_child modalActionComponent_child_btn"
          >
            <p>Login</p>
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
    </Fragment>
  );
};
export default ModalPanelAuths;
