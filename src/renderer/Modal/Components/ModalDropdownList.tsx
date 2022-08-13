import { Fragment } from 'react';
import ModalDropdownListItem from './ModalDropdownListItem';
import './ModalDropdownList.scss';

const ModalDropdownList = (props) => {
  return (
    <Fragment>
      {/* <div className="modalDropdownContainer"> */}
      <ModalDropdownListItem item={props.item} />
      {/* </div> */}
    </Fragment>
  );
};
export default ModalDropdownList;
