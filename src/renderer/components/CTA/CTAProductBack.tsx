/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import styles from './CTAProductBack.module.scss';
import backIcon from '../../Global/back.svg';

export default function CTAProductBack(props: any) {
  // console.log(props);
  const { message, clickHandler, expanded } = props;
  const ctaStyle = expanded ? styles.cta_product__expanded : styles.cta_product;

  return (
    <div className={ctaStyle} onClick={clickHandler}>
      <img src={backIcon} alt="" className={styles.cta_product__icon} />
      <p className={styles.cta_text}>{message}</p>
    </div>
  );
}
