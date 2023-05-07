/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import styles from './CTAProduct.module.scss';

export default function CTAProduct(props: any) {
  // console.log(props);
  const { message, clickHandler } = props;

  return (
    <div className={styles.cta_product} onClick={clickHandler}>
      <p className={styles.cta_text}>{message}</p>
    </div>
  );
}
