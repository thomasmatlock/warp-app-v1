import { Fragment } from 'react';
import './ModalDropdownListItem.scss';

const ModalDropdownListItem = (props) => {
  console.log(props);

  return (
    <Fragment>
      <div className="modalDropdownContent">
        <div className="modalDropdown_title modalDropdown_child">
          <p>{props.item.title}</p>
        </div>
        <div className="modalDropdown modalDropdown_child">
          <select id={props.item.selectID} name="modalDropdown_select">
            {props.item.options[0].enabled && (
              <option
                id={props.item.options[0].id}
                value={props.item.options[0].value}
              >
                {props.item.options[0].label}
              </option>
            )}
            {props.item.options[1].enabled && (
              <option
                id={props.item.options[1].id}
                value={props.item.options[1].value}
              >
                {props.item.options[1].label}
              </option>
            )}
            {props.item.options[2].enabled && (
              <option
                id={props.item.options[2].id}
                value={props.item.options[2].value}
              >
                {props.item.options[2].label}
              </option>
            )}
            {props.item.options[3].enabled && (
              <option
                id={props.item.options[3].id}
                value={props.item.options[3].value}
              >
                {props.item.options[3].label}
              </option>
            )}
            {props.item.options[4].enabled && (
              <option
                id={props.item.options[4].id}
                value={props.item.options[4].value}
              >
                {props.item.options[4].label}
              </option>
            )}
            {props.item.options[5] && props.item.options[5].enabled && (
              <option
                id={props.item.options[5].id}
                value={props.item.options[5].value}
              >
                {props.item.options[5].label}
              </option>
            )}
          </select>
        </div>
      </div>
    </Fragment>
  );
};
export default ModalDropdownListItem;
