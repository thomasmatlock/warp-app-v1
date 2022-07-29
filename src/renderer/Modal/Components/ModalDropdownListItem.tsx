import { Fragment } from 'react';
import './ModalDropdownListItem.scss';

const ModalDropdownListItem = (props) => {
  return (
    <Fragment>
      <div className="modalDropdownContent">
        <div className="modalDropdown_title modalDropdown_child">
          <p>{props.title1}</p>
        </div>
        <div className="modalDropdown modalDropdown_child">
          <select id={props.selectID1} name="modalDropdown_select">
            <option id={props.optionID1} value={props.optionValue1}>
              {props.optionLabel1}
            </option>
            <option id={props.optionID2} value={props.optionValue2}>
              {props.optionLabel2}
            </option>
            <option id={props.optionID3} value={props.optionValue3}>
              {props.optionLabel3}
            </option>
          </select>
        </div>
      </div>
    </Fragment>
  );
};
export default ModalDropdownListItem;
