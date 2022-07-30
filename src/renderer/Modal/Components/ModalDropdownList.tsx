import { Fragment } from 'react';
import ModalDropdownListItem from './ModalDropdownListItem';
import './ModalDropdownList.scss';

const ModalDropdownList = (props) => {
  return (
    <Fragment>
      <div className="modalDropdownContainer">
        {props.warpstagram && (
          <ModalDropdownListItem item={props.dropdownWarpstagram1} />
        )}
        {props.warpstagram && (
          <ModalDropdownListItem item={props.dropdownWarpstagram2} />
        )}
        {props.warpstagram && (
          <ModalDropdownListItem item={props.dropdownWarpstagram3} />
        )}
      </div>
    </Fragment>
  );
};
export default ModalDropdownList;
