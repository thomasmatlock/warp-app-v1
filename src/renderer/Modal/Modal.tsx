import { Fragment, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import NavContext from '../../store/navContext';
import './Modal.scss';
// import astronaut from '../../../assets/astronauts/png/Asset 8 whitened.png';
const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};
type Props = {
  onClose: () => void;
  children: React.ReactNode;
};
const ModalOverlay = (props: Props) => {
  const navCtx = useContext(NavContext);
  const { children } = props;

  return (
    <div
      className={
        navCtx.licenseModePrefs ? 'modal modal__license_mode' : 'modal'
      }
    >
      {/* <img src={astronaut} alt="" className="modal__astronaut" /> */}
      <div className="modal__content">{children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props: Props) => {
  const { onClose, children } = props;
  // console.log(navCtx.licenseModePrefs);
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};
export default Modal;
