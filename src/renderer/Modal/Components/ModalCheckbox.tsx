import { Fragment } from 'react';
import './ModalCheckbox.scss';

const ModalCheckbox = (props) => {
  return (
    <Fragment>
      <div className="modalPrefsCheckbox">
        <div className="modalPrefsCheckbox_child modalPrefsCheckbox_child_left">
          <p>{props.label}</p>
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
    </Fragment>
  );
};
export default ModalCheckbox;
