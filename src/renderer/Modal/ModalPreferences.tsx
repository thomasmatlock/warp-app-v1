import { Fragment } from 'react';
import './ModalPreferences.scss';
import Modal from './Modal';

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
      <button onClick={props.onClose}>Close</button>
    </Modal>
  );
};
export default ModalPreferences;
