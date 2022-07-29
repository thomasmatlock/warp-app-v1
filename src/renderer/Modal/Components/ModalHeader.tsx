import { Fragment } from 'react';
import './ModalHeader.scss';
import clearTextIcon from '../../../../assets/Search/close.svg';

const ModalHeader = (props) => {
  return (
    <Fragment>
      <div className="modal_preferences__header">
        <h3 className="modal_preferences__header__title">Settings</h3>
        <div className="modal_preferences__header__close">
          <img src={clearTextIcon} onClick={props.onClose} />
        </div>
      </div>
    </Fragment>
  );
};
export default ModalHeader;
