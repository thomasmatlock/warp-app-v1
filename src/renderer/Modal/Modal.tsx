import { Fragment, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import NavContext from '../../storage/navContext';
import './Modal.scss';
import astronaut from '../../../assets/astronauts/png/Asset 8 whitened.png';
const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};
const ModalOverlay = (props) => {
  const navCtx = useContext(NavContext);

  return (
    <div
      className={
        navCtx.licenseModePrefs ? 'modal modal__license_mode' : 'modal'
      }
    >
      {/* <img src={astronaut} alt="" className="modal__astronaut" /> */}
      <div className="modal__content">{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  // console.log(navCtx.licenseModePrefs);
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};
export default Modal;
