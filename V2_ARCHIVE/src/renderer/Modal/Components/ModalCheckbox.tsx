import { Fragment, useState, useContext } from 'react';
import './ModalCheckbox.scss';
// import PreferencesContext from '../../../../../../../storage/PreferencesContext';
const ModalCheckbox = (props) => {
  const [checkedValue, setCheckedValue] = useState(props.item.checked);
  // const [checkedValue, setCheckedValue] = useState('checked');
  // console.log(checkedValue);

  // const { prefsCtx } = useContext(PreferencesContext);
  // console.log(prefsCtx);
  // document.getElementById(props.item.id).addEventListener('click', () => {
  //   setCheckedValue(!checkedValue);
  // });
  // console.log(props.item.title, props.item.checked);

  const changeHandler = (e) => {
    // console.log(props.item);
    // console.log(e.target);
    // console.log(e.target.value);

    // props.item.checked ? setCheckedValue(false) : setCheckedValue(true);
    checkedValue ? setCheckedValue(false) : setCheckedValue(true);
    // console.log(checkedValue);

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
              onChange={changeHandler}
              type="checkbox"
              className="checkbox"
              // checked={true}
              checked={checkedValue}
              value={checkedValue}
              // value={props.item.checked}
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
