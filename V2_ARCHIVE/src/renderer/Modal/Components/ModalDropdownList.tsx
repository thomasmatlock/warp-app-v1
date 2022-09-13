import { Fragment } from 'react';
import ModalDropdownListItem from './ModalDropdownListItem';
import './ModalDropdownList.scss';

const ModalDropdownList = (props) => {
  // console.log(props.getID);

  return (
    <Fragment>
      {/* <div className="modalDropdownContainer"> */}
      <ModalDropdownListItem getID={props.getID} item={props.item} />
      {/* </div> */}
    </Fragment>
  );
};
export default ModalDropdownList;
