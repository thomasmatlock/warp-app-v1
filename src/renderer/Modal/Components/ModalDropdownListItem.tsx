import { Fragment } from 'react';
import './ModalDropdownListItem.scss';
// import ModalDropdownListItemOption from './ModalDropdownListItemOption';

const ModalDropdownListItem = (props) => {
  const optionsList = props.item.options.map((option, index) => {
    return (
      <option
        key={index}
        id={option.id}
        value={option.value}
        label={option.label}
      />
    );
  });
  return (
    <Fragment>
      <div className="modalDropdownContent">
        <div className="modalDropdown_title modalDropdown_child">
          <p>{props.item.title}</p>
        </div>
        <div className="modalDropdown modalDropdown_child">
          <select id={props.item.selectID} name="modalDropdown_select">
            {optionsList}
          </select>
        </div>
      </div>
    </Fragment>
  );
};
export default ModalDropdownListItem;
