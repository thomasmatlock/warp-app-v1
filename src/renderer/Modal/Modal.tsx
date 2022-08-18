import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
import astronaut from '../../../assets/astronauts/png/Asset 8 whitened.png';
const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};
const ModalOverlay = (props) => {
  return (
    <div className="modal">
      {/* <img src={astronaut} alt="" className="modal__astronaut" /> */}
      <div className="modal__content">{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
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
