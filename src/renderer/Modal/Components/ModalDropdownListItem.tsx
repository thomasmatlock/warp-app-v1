import { Fragment, useState } from 'react';
import './ModalDropdownListItem.scss';
// import ModalDropdownListItemOption from './ModalDropdownListItemOption';

const ModalDropdownListItem = (props) => {
  const [defaultValue, setDefaultValue] = useState(props.item.defaultValue);
  // const
  // console.log(defaultValue);

  const changeHandler = (e) => {
    var index = e.target.selectedIndex;
    // console.log(e.target.options[index].value);
    // console.log(e.target.options[index].id);
    // props.getID(props.item.id);
    props.getID(e.target.options[index].id);
    setDefaultValue(e.target.options[index]);
    var optionElement = e.target.childNodes[index];
    // console.log(optionElement);
  };
  const optionsList = props.item.options.map((option, index) => {
    // console.log(option.value);
    if (option.selected) {
      // setDefaultValue(option.value);
    }
    return (
      <option
        key={index}
        id={option.id}
        value={option.value}
        label={option.label}
        // defaultValue={option.selected}
        // selected={option.selected}
        // onClick={clickHandler}
        onClick={() => {
          console.log(option.id);

          // props.getID(option.id);
        }}
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
          <select
            id={props.item.selectID}
            onChange={changeHandler}
            name="modalDropdown_select"
            value={defaultValue.value}
          >
            {optionsList}
          </select>
        </div>
      </div>
    </Fragment>
  );
};
export default ModalDropdownListItem;
