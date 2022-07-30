import { Fragment } from 'react';
import ModalDropdownListItem from './ModalDropdownListItem';
import './ModalDropdownList.scss';

const ModalDropdownList = (props) => {
  console.log(props);

  return (
    <Fragment>
      <div className="modalDropdownContainer">
        <ModalDropdownListItem item={props.dropdownWarpstagram1} />
        <ModalDropdownListItem item={props.dropdownWarpstagram2} />
        <ModalDropdownListItem item={props.dropdownWarpstagram3} />
      </div>
    </Fragment>
  );
};
export default ModalDropdownList;
