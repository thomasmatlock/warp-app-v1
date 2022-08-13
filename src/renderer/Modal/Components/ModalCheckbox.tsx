import { Fragment, useContext } from 'react';
import './ModalCheckbox.scss';
// import PreferencesContext from '../../../../../../../storage/PreferencesContext';
const ModalCheckbox = (props) => {
  // const { prefsCtx } = useContext(PreferencesContext);
  // console.log(prefsCtx);
  // console.log(props.item);

  const clickHandler = (e) => {
    props.getID(props.item.id);
  };

  return (
    <Fragment>
      <div className="modalPrefsCheckbox">
        <div className="modalPrefsCheckbox_child modalPrefsCheckbox_child_left">
          <p>{props.item.title}</p>
        </div>
        <div className="modalPrefsCheckbox_child modalPrefsCheckbox_child_right">
          <div
            className="button r modalCheckbox"
            id="modalPrefsCheckbox_autostartWarp"
          >
            <input
              // onClick={props.getID(props.item.id)}
              onChange={clickHandler}
              type="checkbox"
              className="checkbox"
              // value="checked"
              checked={props.item.checked}
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
