import './ModalPanel.scss';

const ModalPanelAuths = () => {
  return (
    <div id="modalPrefsPanel_auths" className="modalPrefsPanel">
      <div
        id="modalPrefsPanel__auths__login_instagram"
        className="modalPrefsPanel__auths modalPrefsPanel__auths_licenseActivation"
      >
        <div
          id="modalPrefsPanel__auths_panel_top_audio"
          className="modalPrefsPanel__auths_panel modalPrefsPanel__auths_panel_primary"
        >
          <div className="modalPrefsPanel__auths_child  modalPrefsPanel__auths_child_title">
            <p>Login to Instagram</p>
          </div>
          <div
            id="loginInstagramButton"
            className="modalPrefsPanel__auths_child modalPrefsPanel__auths_child_btn"
          >
            <p>Login</p>
          </div>
        </div>
        <div
          id="modalPrefsPanel__auths_panel_middle_audio"
          className="modalPrefsPanel__auths_panel modalPrefsPanel__auths_panel_collapsible"
        />
        <div
          id="modalPrefsPanel__auths_panel_bottom_audio"
          className="modalPrefsPanel__auths_panel modalPrefsPanel__auths_panel_secondary modalPrefsPanel__auths_panel_collapsible"
        />
      </div>
    </div>
  );
};
export default ModalPanelAuths;
