import { Fragment } from 'react';
import './ModalPreferences.scss';
import Modal from './Modal';
import clearTextIcon from '../../../assets/Search/close.svg';

const ModalPreferences = (props) => {
  //  const cartItems = (
  //    <ul className={classes['cart-items']}>
  //      {cartCtx.items.map((item) => (
  //        <CartItem
  //          key={item.id}
  //          name={item.name}
  //          amount={item.amount}
  //          price={item.price}
  //          onRemove={cartItemRemoveHandler.bind(null, item.id)}
  //          onAdd={cartItemAddHandler.bind(null, item)}
  //        />
  //      ))}
  //    </ul>
  //  );
  return (
    <Modal onClose={props.onClose}>
      <div className="modal_preferences">
        <div className="modal_preferences__header">
          <div className="modal_preferences__header__title">
            <h3>Preferences</h3>
          </div>
          <div className="modal_preferences__header__close">
            <img src={clearTextIcon} onClick={props.onClose} />
          </div>
        </div>
      </div>
      {/* <button onClick={props.onClose}>Close</button> */}
    </Modal>
  );
};
export default ModalPreferences;
